/**
 * cos.js — coșul de cumpărături.
 *
 * COȘUL ESTE LOCAL. Adăugarea, cantitățile și totalurile se fac în browser,
 * din `catalog.js`, fără nicio cerere de rețea.
 *
 * De ce, după ce prima variantă mergea prin Store API la fiecare clic:
 *
 *   1. Site-ul se deschide și direct de pe disc, prin `file://`. De acolo
 *      browserul blochează orice `fetch()` extern — originea este `null` și
 *      niciun server nu o poate accepta. Coșul murea cu „NetworkError” înainte
 *      să apuce să afișeze ceva.
 *   2. Chiar servit prin HTTP, fiecare adăugare depindea de un WordPress care
 *      răspunde, cu CORS configurat. Adică un catalog perfect funcțional
 *      devenea inutilizabil din cauza unui backend neconfigurat încă.
 *   3. Nici nu era nevoie: prețurile, denumirile și cotele sunt deja în pagină,
 *      generate din același `catalog.js`.
 *
 * Serverul intră în joc într-un singur moment — la „Plasează comanda”, unde
 * `checkout.js` trimite coșul local către magazin și cere totalul oficial.
 * Până atunci, totul merge fără rețea.
 *
 * TOTALURILE AFIȘATE SUNT INFORMATIVE. Suma finală, cu transport și TVA, o
 * confirmă magazinul la finalizare. Diferența e semnalată explicit în pagină,
 * ca nimeni să nu descopere alt total abia pe factură.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  var CHEIE = 'ug-cos';
  var CFG = window.UG_MAGAZIN || {};

  /** [{ id, bucati }] — singura stare păstrată. Restul se derivă din catalog. */
  var randuri = [];
  var ascultatori = [];

  var stare = {
    articole: [],
    bucati: 0,
    total: null,
    incarca: false,
    eroare: null
  };

  /* --- Păstrarea ----------------------------------------------------------- */

  /**
   * Coșul se scrie în DOUĂ locuri, iar motivul e o particularitate de browser
   * care altfel arată exact ca un coș stricat.
   *
   * Firefox dă fiecărui fișier deschis prin `file://` o origine proprie
   * (`privacy.file_unique_origin`, activ implicit). Consecința: `produs/x.html`
   * și `cos.html` primesc fiecare câte un `localStorage` separat. Insigna din
   * antet arăta produsele adăugate, iar pagina de coș — deschisă de la altă
   * origine — raporta sincer că nu are nimic. Două adevăruri, două sertare.
   *
   * `window.name` supraviețuiește navigării în aceeași filă indiferent de
   * origine, deci acoperă tocmai golul. Se păstrează doar identificatori de
   * produs și cantități — nimic personal.
   *
   * Pe `http://` și `https://` localStorage funcționează normal și rămâne
   * sursa principală; `window.name` e doar plasa de dedesubt.
   */
  var PREFIX = 'ug-cos:';

  function curata(brut) {
    return Array.isArray(brut) ? brut.filter(function (r) {
      return r && typeof r.id === 'number' && r.bucati > 0;
    }) : [];
  }

  function dinLocal() {
    try {
      var v = localStorage.getItem(CHEIE);
      return v === null ? null : curata(JSON.parse(v));
    } catch (e) {
      return null;
    }
  }

  function dinFila() {
    try {
      var n = String(window.name || '');
      if (n.indexOf(PREFIX) !== 0) return null;
      return curata(JSON.parse(n.slice(PREFIX.length)));
    } catch (e) {
      return null;
    }
  }

  /**
   * Coșul transportat prin adresă: `?c=401.2_396.1`.
   *
   * Necesar DOAR pe `file://`, unde nimic altceva nu traversează paginile:
   * fiecare fișier are origine proprie, deci `localStorage` e separat, iar
   * `window.name` este ȘTERS DE BROWSER la navigarea între origini diferite —
   * protecție anti-urmărire, activă în Firefox și Chrome. Am încercat întâi cu
   * `window.name` și exact de asta n-a funcționat.
   *
   * Adresa este singurul canal pe care browserul nu-l taie. Se codează compact,
   * doar identificatori și cantități.
   */
  function dinAdresa() {
    try {
      var m = /[?&]c=([^&#]+)/.exec(location.search);
      if (!m) return null;
      return curata(decodeURIComponent(m[1]).split('_').map(function (bucata) {
        var p = bucata.split('.');
        return { id: Number(p[0]), bucati: Number(p[1]) || 1 };
      }));
    } catch (e) {
      return null;
    }
  }

  UG.cosCodat = function () {
    return randuri.map(function (r) { return r.id + '.' + r.bucati; }).join('_');
  };

  function citeste() {
    /* Adresa are întâietate: dacă cineva tocmai a fost trimis aici cu un coș în
       link, acela e coșul curent, oricât de vechi ar fi sertarul local. */
    var adresa = dinAdresa();
    if (adresa && adresa.length) return adresa;

    var local = dinLocal();
    if (local && local.length) return local;

    var fila = dinFila();
    if (fila && fila.length) return fila;

    return local || [];
  }

  function scrie() {
    var s = JSON.stringify(randuri);
    try { localStorage.setItem(CHEIE, s); } catch (e) { /* mod privat sau blocat */ }
    try { window.name = PREFIX + s; } catch (e) { /* nimic de făcut */ }
  }

  /* --- Derivarea ----------------------------------------------------------- */

  function produs(id) {
    return UG.PRODUSE.filter(function (p) { return p.id === id; })[0] || null;
  }

  function recalculeaza() {
    var suma = 0;

    stare.articole = randuri.map(function (r) {
      var p = produs(r.id);
      if (!p) return null;
      suma += p.pret * r.bucati;
      return {
        cheie: String(p.id),
        id: p.id,
        nume: p.nume,
        bucati: r.bucati,
        maxim: 99,
        pretBucata: UG.lei(p.pret),
        pretTotal: UG.lei(p.pret * r.bucati),
        fisier: UG.fisierProdus(p),
        lamela: p.lamela,
        dim: p.l + ' × ' + p.h + ' mm'
      };
    }).filter(Boolean);

    /* Un produs scos din catalog nu are ce căuta în coș. Se elimină tăcut:
       alternativa e un rând care arată o denumire goală și un preț zero. */
    if (stare.articole.length !== randuri.length) {
      randuri = randuri.filter(function (r) { return produs(r.id); });
      scrie();
    }

    stare.bucati = stare.articole.reduce(function (n, a) { return n + a.bucati; }, 0);
    stare.total = stare.articole.length ? UG.lei(suma) : null;
    stare.totalNumeric = suma;
  }

  function anunta() {
    recalculeaza();
    ascultatori.forEach(function (f) {
      try { f(stare); } catch (e) { /* un ascultător stricat nu oprește restul */ }
    });
  }

  /* --- Interfața publică ---------------------------------------------------- */

  UG.cosAscultă = function (f) {
    ascultatori.push(f);
    recalculeaza();
    f(stare);
    return function () {
      ascultatori = ascultatori.filter(function (x) { return x !== f; });
    };
  };

  UG.cosStare = function () { recalculeaza(); return stare; };

  UG.cosAdaugă = function (id, bucati) {
    var p = produs(id);
    if (!p) return Promise.reject(new Error('Produsul nu există în catalog.'));

    bucati = Math.max(1, Number(bucati) || 1);
    var existent = randuri.filter(function (r) { return r.id === id; })[0];

    if (existent) {
      existent.bucati = Math.min(99, existent.bucati + bucati);
    } else {
      randuri.push({ id: id, bucati: Math.min(99, bucati) });
    }

    scrie();
    anunta();
    return Promise.resolve(stare);
  };

  UG.cosModifică = function (cheie, bucati) {
    var id = Number(cheie);
    if (bucati <= 0) return UG.cosȘterge(cheie);

    randuri.forEach(function (r) {
      if (r.id === id) r.bucati = Math.min(99, Math.max(1, bucati));
    });

    scrie();
    anunta();
    return Promise.resolve(stare);
  };

  UG.cosȘterge = function (cheie) {
    var id = Number(cheie);
    randuri = randuri.filter(function (r) { return r.id !== id; });
    scrie();
    anunta();
    return Promise.resolve(stare);
  };

  UG.cosGolește = function () {
    randuri = [];
    scrie();
    anunta();
  };

  /** Compatibilitate: pagina de coș o chema ca să încarce de pe server. */
  UG.cosCitește = function () { anunta(); return Promise.resolve(stare); };

  /** Conținutul brut, pentru sincronizarea de la finalizare. */
  UG.cosRanduri = function () { return randuri.slice(); };

  /* --- Legătura cu magazinul, folosită DOAR la finalizare ------------------ */

  var CHEIE_JETON = 'ug-cart-token';

  UG.cosJeton = function () {
    try { return localStorage.getItem(CHEIE_JETON) || ''; } catch (e) { return ''; }
  };

  UG.cosUitaJeton = function () {
    try { localStorage.removeItem(CHEIE_JETON); } catch (e) { /* nimic */ }
  };

  /**
   * Cerere către Store API. Folosită numai de `checkout.js`.
   *
   * Aruncă un mesaj explicit când site-ul e deschis de pe disc: acolo nicio
   * cerere nu poate reuși, iar „NetworkError” nu spune nimănui de ce.
   */
  UG.cosCerere = function (cale, optiuni) {
    optiuni = optiuni || {};

    if (!CFG.store) {
      return Promise.reject(new Error('Magazinul nu este configurat încă.'));
    }
    if (location.protocol === 'file:') {
      return Promise.reject(new Error(
        'Comanda nu poate fi trimisă când pagina este deschisă direct de pe disc. ' +
        'Site-ul trebuie servit prin http:// sau https://.'
      ));
    }

    var anteturi = { 'Content-Type': 'application/json' };
    var j = UG.cosJeton();
    if (j) anteturi['Cart-Token'] = j;

    return fetch(CFG.store + cale, {
      method: optiuni.method || 'GET',
      headers: anteturi,
      body: optiuni.body ? JSON.stringify(optiuni.body) : undefined
    }).then(function (r) {
      var nou = r.headers.get('Cart-Token');
      if (nou) {
        try { localStorage.setItem(CHEIE_JETON, nou); } catch (e) { /* mod privat */ }
      }
      return r.json().then(function (date) {
        if (!r.ok) {
          var e = new Error((date && date.message) || 'Cererea către magazin a eșuat.');
          e.cod = date && date.code;
          throw e;
        }
        return date;
      }).catch(function (e) {
        if (e instanceof SyntaxError) throw new Error('Răspuns neinteligibil de la magazin.');
        throw e;
      });
    });
  };

  /**
   * Urcă coșul local în magazin, chiar înainte de plasarea comenzii.
   *
   * Se golește întâi coșul de pe server: dacă cineva a lăsat o sesiune veche,
   * altfel s-ar aduna peste ce e acum în browser și clientul ar plăti dublu.
   */
  UG.cosSincronizează = function () {
    return UG.cosCerere('/cart')
      .then(function (cos) {
        var vechi = (cos.items || []).map(function (a) { return a.key; });
        return vechi.reduce(function (lant, cheie) {
          return lant.then(function () {
            return UG.cosCerere('/cart/remove-item', { method: 'POST', body: { key: cheie } });
          });
        }, Promise.resolve());
      })
      .then(function () {
        return randuri.reduce(function (lant, r) {
          return lant.then(function () {
            return UG.cosCerere('/cart/add-item', {
              method: 'POST',
              body: { id: r.id, quantity: r.bucati }
            });
          });
        }, Promise.resolve());
      });
  };

  UG.cosPornit = true;

  randuri = citeste();

  /* Cele două sertare se aliniază imediat la încărcare. Fără asta, un coș venit
     din `window.name` ar rămâne necunoscut pentru localStorage-ul paginii
     curente, iar următoarea citire l-ar pierde. */
  if (randuri.length) scrie();

  recalculeaza();
})(window.UG);
