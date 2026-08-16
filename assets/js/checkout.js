/**
 * checkout.js — plasarea comenzii.
 *
 * Un singur apel contează, `POST /checkout`. Restul e validare de formular și
 * păstrarea datelor completate, ca omul să nu le rescrie dacă plata eșuează.
 *
 * FLUXUL PLĂȚII CU CARDUL
 * Store API răspunde cu `payment_result.redirect_url`. În mod normal, pluginul
 * NETOPIA pune acolo o pagină WordPress intermediară, care afișează un mesaj și
 * abia apoi trimite la procesator. Mu-plugin-ul `netopia-direct-redirect.php`
 * schimbă asta: adresa primită e chiar pagina NETOPIA. Clientul sare direct de
 * pe domeniul nostru la procesator, fără să vadă vreo pagină WordPress.
 *
 * De aceea nu se validează aici că adresa arată într-un anume fel — se
 * urmează ce spune serverul. Dacă mu-plugin-ul lipsește, plata tot merge, doar
 * că apare hopul intermediar.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  var form = document.getElementById('form-finalizare');
  if (!form || !UG.cosPornit) return;

  var CHEIE_DATE = 'ug-date-livrare';
  var eroareGenerala = document.getElementById('finalizare-eroare');
  var buton = document.getElementById('btn-plaseaza');
  var rezumat = document.getElementById('rezumat-comanda');

  /* --- Rezumatul comenzii -------------------------------------------------- */

  UG.cosAscultă(function (s) {
    if (!rezumat) return;

    if (!s.articole.length) {
      rezumat.innerHTML = '<p class="cos-nota">Coșul este gol. ' +
        '<a href="magazin.html">Alegeți un produs</a> înainte de a finaliza.</p>';
      if (buton) buton.disabled = true;
      return;
    }

    if (buton) buton.disabled = false;
    rezumat.innerHTML =
      s.articole.map(function (a) {
        return '<div class="rezumat__rand"><span>' + esc(a.nume) +
          ' × ' + a.bucati + '</span><span>' + esc(a.pretTotal) + '</span></div>';
      }).join('') +
      '<div class="rezumat__rand rezumat__rand--total"><span>Total de plată</span>' +
      '<b>' + esc(s.total || '—') + '</b></div>';
  });

  UG.cosCitește().catch(function () { /* rezumatul rămâne pe mesajul de eroare */ });

  /* --- Datele completate, păstrate ---------------------------------------- */

  /**
   * Se rețin local ca să nu fie rescrise după o plată eșuată.
   *
   * Deliberat FĂRĂ e-mail și telefon în cheia păstrată? Nu — sunt necesare la
   * reluare, iar datele rămân pe dispozitivul clientului, nu pleacă nicăieri.
   * Se șterg în momentul în care comanda a reușit.
   */
  function incarcaDate() {
    try {
      var d = JSON.parse(localStorage.getItem(CHEIE_DATE) || '{}');
      Object.keys(d).forEach(function (k) {
        var c = form.elements[k];
        if (c) c.value = d[k];
      });
    } catch (e) { /* nimic păstrat */ }
  }

  function salveazaDate(date) {
    try { localStorage.setItem(CHEIE_DATE, JSON.stringify(date)); } catch (e) { /* mod privat */ }
  }

  UG.checkoutUitaDate = function () {
    try { localStorage.removeItem(CHEIE_DATE); } catch (e) { /* nimic */ }
  };

  incarcaDate();

  /* --- Validarea ----------------------------------------------------------- */

  function aratăEroare(camp, mesaj) {
    var cutie = camp.closest('.camp');
    if (!cutie) return;
    var p = cutie.querySelector('.camp__eroare');
    if (mesaj) {
      cutie.dataset.eroare = '1';
      camp.setAttribute('aria-invalid', 'true');
      if (p) { p.textContent = mesaj; p.hidden = false; }
    } else {
      delete cutie.dataset.eroare;
      camp.removeAttribute('aria-invalid');
      if (p) { p.hidden = true; }
    }
  }

  /**
   * Regulile sunt cele care chiar blochează livrarea, nu maximul posibil.
   *
   * Telefonul acceptă spații, puncte și prefix internațional: oamenii îl scriu
   * în zece feluri, iar respingerea unui număr valid pentru că are spații e
   * modul cel mai simplu de a pierde o comandă. Se cere doar să rămână cel
   * puțin 10 cifre după curățare.
   */
  function verifica(camp) {
    var v = (camp.value || '').trim();

    if (camp.required && !v) { aratăEroare(camp, 'Câmp obligatoriu.'); return false; }
    if (!v) { aratăEroare(camp, null); return true; }

    if (camp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      aratăEroare(camp, 'Adresă de e-mail invalidă.'); return false;
    }
    if (camp.type === 'tel' && v.replace(/[^\d]/g, '').length < 10) {
      aratăEroare(camp, 'Introduceți un număr de telefon complet.'); return false;
    }
    if (camp.name === 'postcode' && !/^\d{6}$/.test(v.replace(/\s/g, ''))) {
      aratăEroare(camp, 'Codul poștal are 6 cifre.'); return false;
    }

    aratăEroare(camp, null);
    return true;
  }

  Array.prototype.forEach.call(form.querySelectorAll('input'), function (c) {
    c.addEventListener('blur', function () { verifica(c); });
    c.addEventListener('input', function () {
      if (c.closest('.camp') && c.closest('.camp').dataset.eroare) verifica(c);
    });
  });

  /* --- Trimiterea ---------------------------------------------------------- */

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var campuri = Array.prototype.slice.call(form.querySelectorAll('input[name]'));
    var valide = campuri.map(verifica);

    if (valide.indexOf(false) !== -1) {
      var primul = campuri[valide.indexOf(false)];
      primul.focus();
      primul.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    var adresa = {};
    campuri.forEach(function (c) { adresa[c.name] = (c.value || '').trim(); });
    adresa.country = 'RO';
    salveazaDate(adresa);

    var metoda = (form.elements.plata && form.elements.plata.value) || 'cod';

    var corp = {
      billing_address: adresa,
      shipping_address: adresa,
      payment_method: metoda,
      payment_data: []
    };

    /* ---------------------------------------------------------------------
       ADORMIT — 16 august 2026, odată cu `PLATI.card = false` din build.js.
       Magazinul funcționează pe ramburs; formularul nu mai oferă cardul, deci
       ramura de mai jos nu ar fi oricum niciodată atinsă. E păstrată, nu
       ștearsă: la reactivare se decomentează împreună cu comutatorul.

       Pluginul NETOPIA cere metoda aleasă și în `payment_data`; fără ea,
       `validate_fields()` respinge comanda cu „Alege metoda de plata”.

    if (metoda === 'netopiapayments') {
      corp.payment_data = [{ key: 'netopia_method_pay', value: 'credit_card' }];
    }
    --------------------------------------------------------------------- */

    if (eroareGenerala) eroareGenerala.hidden = true;
    buton.disabled = true;
    buton.textContent = 'Se trimite comanda…';

    /* Aici, și abia aici, coșul local urcă în magazin. Până în acest punct
       clientul a răsfoit și a ales fără nicio cerere de rețea. */
    UG.cosSincronizează()
      .then(function () {
        return UG.cosCerere('/checkout', { method: 'POST', body: corp });
      })
      .then(function (r) {
        var rezultat = r.payment_result || {};
        var nr = r.order_number || r.order_id || '';

        /* Cardul: serverul dă adresa NETOPIA, mergem acolo. Coșul NU se golește
           aici — dacă plata eșuează, clientul îl regăsește intact. Golirea o
           face pagina de confirmare, după ce comanda chiar există. */
        if (rezultat.redirect_url) {
          window.location.assign(rezultat.redirect_url);
          return;
        }

        /**
         * De aici încolo nu mai există nicio redirectare de plată. Regulile de
         * mai jos există pentru că varianta dinainte trecea direct la „comandă
         * confirmată”, indiferent ce răspundea serverul — adică putea anunța o
         * plată care nu se întâmplase niciodată.
         */

        /* Card ales, dar fără adresă de plată: plata NU a pornit. Nu se
           confirmă nimic. */
        if (metoda !== 'cod') {
          throw new Error(
            'Plata cu cardul nu a putut fi pornită. Reîncercați sau alegeți ramburs la livrare.'
          );
        }

        /* Magazinul semnalează explicit eșecul plății. */
        if (rezultat.payment_status && rezultat.payment_status !== 'success'
            && rezultat.payment_status !== 'pending') {
          throw new Error('Comanda nu a fost acceptată de magazin. Încercați din nou sau sunați-ne.');
        }

        /* Fără număr de comandă nu avem dovada că s-a înregistrat ceva. */
        if (!nr) {
          throw new Error('Comanda nu a primit număr de la magazin. Sunați-ne ca să o confirmăm.');
        }

        /* Ramburs, comandă înregistrată: abia acum se poate goli coșul. */
        UG.checkoutUitaDate();
        UG.cosUitaJeton();
        UG.cosGolește();
        window.location.assign('comanda-confirmata.html?nr=' + encodeURIComponent(nr));
      })
      .catch(function (err) {
        buton.disabled = false;
        buton.textContent = 'Plasează comanda';
        if (eroareGenerala) {
          eroareGenerala.textContent = err.message ||
            'Comanda nu a putut fi trimisă. Încercați din nou sau sunați-ne.';
          eroareGenerala.hidden = false;
          eroareGenerala.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      });
  });

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
})(window.UG);
