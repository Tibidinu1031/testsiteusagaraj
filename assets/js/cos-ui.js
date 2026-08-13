/**
 * cos-ui.js — interfața coșului.
 *
 * Trei lucruri, toate legate de aceeași stare din `cos.js`:
 *   1. numărul de pe butonul din antet;
 *   2. butoanele „Adaugă în coș” de pe cartele și de pe pagina de produs;
 *   3. tabelul din `cos.html`, unde se schimbă cantitățile.
 *
 * Nimic nu se randează din presupuneri: după fiecare operație se afișează ce a
 * răspuns serverul. Dacă cererea eșuează, butonul își revine la starea de
 * dinainte și clientul vede motivul, în loc să rămână cu un coș care pare
 * modificat dar nu este.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  if (!UG.cosPornit) return;

  var doc = document;

  function pe(el, ev, f) { el.addEventListener(ev, f); }
  function toate(sel, radacina) {
    return Array.prototype.slice.call((radacina || doc).querySelectorAll(sel));
  }

  /* --- 0. Coșul purtat prin adresă, numai pe `file://` -------------------- */

  /**
   * Deschis de pe disc, fiecare fișier are origine proprie: `localStorage` nu
   * se împarte între pagini, iar `window.name` este șters de browser la
   * navigarea între origini. Singurul canal rămas este adresa.
   *
   * Așa că, atât timp cât suntem pe `file://`, fiecare legătură internă din
   * pagină primește coșul curent în coadă. Pe `http://` nu se atinge nimic —
   * acolo `localStorage` funcționează normal și adresele rămân curate.
   */
  var PE_DISC = location.protocol === 'file:';

  function poartaCosul() {
    if (!PE_DISC) return;

    var cod = UG.cosCodat();

    toate('a[href]').forEach(function (a) {
      var href = a.getAttribute('href') || '';

      /* Se sar legăturile care nu duc la o altă pagină a site-ului. */
      if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return;

      var fara = href.split('?')[0].split('#')[0];
      if (!/\.html$/i.test(fara)) return;

      var ancora = href.indexOf('#') !== -1 ? href.slice(href.indexOf('#')) : '';
      a.setAttribute('href', fara + (cod ? '?c=' + encodeURIComponent(cod) : '') + ancora);
    });
  }

  /* --- 1. Numărul din antet ----------------------------------------------- */

  UG.cosAscultă(function (s) {
    toate('[data-cos-numar]').forEach(function (el) {
      el.textContent = s.bucati;
      el.hidden = s.bucati === 0;
    });
    poartaCosul();
  });

  /* --- 2. Butoanele „Adaugă în coș” --------------------------------------- */

  /**
   * Confirmarea stă pe buton, nu într-o fereastră.
   *
   * O casetă modală după fiecare adăugare întrerupe răsfoirea, iar pe telefon
   * acoperă tocmai lista din care omul alege. Butonul își schimbă textul două
   * secunde și numărul din antet crește — atât cât să se vadă că s-a întâmplat
   * ceva, fără să blocheze.
   */
  function raspunsPeButon(btn, text, reusit) {
    var initial = btn.dataset.textInitial || btn.textContent;
    btn.dataset.textInitial = initial;
    btn.textContent = text;
    btn.classList.toggle('btn--ok', reusit);
    btn.classList.toggle('btn--rau', !reusit);
    clearTimeout(btn._ceas);
    btn._ceas = setTimeout(function () {
      btn.textContent = initial;
      btn.classList.remove('btn--ok', 'btn--rau');
      btn.disabled = false;
    }, reusit ? 2000 : 4000);
  }

  pe(doc, 'click', function (e) {
    var btn = e.target.closest('[data-cos-adauga]');
    if (!btn) return;
    e.preventDefault();

    var id = Number(btn.dataset.cosAdauga);
    var camp = btn.parentElement.querySelector('[data-cos-bucati]');
    var bucati = camp ? Math.max(1, Number(camp.value) || 1) : 1;

    btn.disabled = true;
    btn.textContent = 'Se adaugă…';

    UG.cosAdaugă(id, bucati)
      .then(function () { raspunsPeButon(btn, 'Adăugat în coș', true); })
      .catch(function (err) { raspunsPeButon(btn, err.message || 'Nu s-a putut adăuga', false); });
  });

  /* --- 3. Pagina de coș ---------------------------------------------------- */

  var gazda = doc.getElementById('cos-continut');
  if (!gazda) return;

  function randează(s) {
    /* Nu mai există stare de „se încarcă” sau de eroare de rețea: coșul e
       local, deci ori are produse, ori e gol. */
    if (!s.articole.length) {
      gazda.innerHTML =
        '<p class="cos-gol">Coșul este gol.</p>' +
        '<p><a class="btn btn--primary btn--lg" href="magazin.html">Vezi toate produsele</a></p>';
      return;
    }

    gazda.innerHTML =
      '<div class="table-scroll"><table class="cos-tabel">' +
        '<caption class="sr-only">Produsele din coș</caption>' +
        '<thead><tr>' +
          '<th scope="col">Produs</th>' +
          '<th scope="col">Preț</th>' +
          '<th scope="col">Cantitate</th>' +
          '<th scope="col">Total</th>' +
          '<th scope="col"><span class="sr-only">Acțiuni</span></th>' +
        '</tr></thead><tbody>' +
        s.articole.map(rand).join('') +
      '</tbody></table></div>' +
      '<div class="cos-total">' +
        '<span>Total de plată</span>' +
        '<b>' + esc(s.total || '—') + '</b>' +
      '</div>' +
      '<p class="cos-nota">Prețurile includ TVA și transportul este gratuit. ' +
      'Totalul final este confirmat de magazin la finalizarea comenzii.</p>' +
      '<div class="cos-actiuni">' +
        '<a class="btn btn--ghost" href="magazin.html">Continuă cumpărăturile</a>' +
        '<a class="btn btn--primary btn--lg" href="finalizare.html">Finalizează comanda</a>' +
      '</div>';
  }

  function rand(a) {
    return '<tr>' +
      '<th scope="row">' +
        '<a href="produs/' + esc(a.fisier) + '.html">' + esc(a.nume) + '</a>' +
        '<small class="cos-detaliu">' + esc(a.dim) + ' · lamelă ' + a.lamela + ' mm</small>' +
      '</th>' +
      '<td>' + esc(a.pretBucata) + '</td>' +
      '<td><div class="cantitate">' +
        '<button type="button" data-cos-minus="' + a.cheie + '" aria-label="Scade cantitatea">−</button>' +
        '<output>' + a.bucati + '</output>' +
        '<button type="button" data-cos-plus="' + a.cheie + '" aria-label="Crește cantitatea"' +
          (a.bucati >= a.maxim ? ' disabled' : '') + '>+</button>' +
      '</div></td>' +
      '<td>' + esc(a.pretTotal) + '</td>' +
      '<td><button type="button" class="cos-scoate" data-cos-scoate="' + a.cheie + '">Scoate</button></td>' +
      '</tr>';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  pe(gazda, 'click', function (e) {
    var t = e.target;
    var s = UG.cosStare();
    var gaseste = function (cheie) {
      return s.articole.filter(function (a) { return a.cheie === cheie; })[0];
    };

    if (t.dataset.cosPlus) {
      var sus = gaseste(t.dataset.cosPlus);
      if (sus) UG.cosModifică(sus.cheie, sus.bucati + 1).catch(nimic);
    } else if (t.dataset.cosMinus) {
      var jos = gaseste(t.dataset.cosMinus);
      if (jos) UG.cosModifică(jos.cheie, jos.bucati - 1).catch(nimic);
    } else if (t.dataset.cosScoate) {
      UG.cosȘterge(t.dataset.cosScoate).catch(nimic);
    }
  });

  function nimic() { /* eroarea e deja în stare și se afișează la randare */ }

  UG.cosAscultă(randează);

  /* Tabelul coșului își scrie propriile legături la fiecare randare, deci ele
     trebuie rescrise DUPĂ. Ascultătorii se apelează în ordinea înregistrării,
     iar cel de la punctul 0 a rulat deja, înaintea acestei randări. */
  UG.cosAscultă(poartaCosul);

  UG.cosCitește().catch(nimic);
})(window.UG);
