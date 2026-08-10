/**
 * app.js — punctul de intrare. Randează catalogul, eroul și filtrele,
 * apoi predă interacțiunea principală lui switcher.js.
 *
 * Script clasic, încărcat la finalul documentului: merge și peste `file://`,
 * unde modulele ES sunt refuzate de browser.
 */

(function (UG) {
  'use strict';

  var PRODUSE = UG.PRODUSE, RAL = UG.RAL, LAMELA = UG.LAMELA;
  var lei = UG.lei, reducere = UG.reducere, ralProdus = UG.ralProdus, urlProdus = UG.urlProdus;

  /* ==========================================================================
     Definițiile SVG partajate — o singură dată, pentru toată pagina
     ========================================================================== */

  document.body.insertAdjacentHTML('afterbegin', UG.defsSprite());

  /* ==========================================================================
     Temă
     ========================================================================== */

  (function tema() {
    var KEY = 'ug-tema';
    var root = document.documentElement;
    var salvata = null;
    try { salvata = localStorage.getItem(KEY); } catch (e) { /* file:// fără stocare */ }
    if (salvata) root.dataset.theme = salvata;

    var buton = document.querySelector('.theme-toggle');
    if (!buton) return;
    buton.addEventListener('click', function () {
      var acum = root.dataset.theme ||
        (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      var noua = acum === 'dark' ? 'light' : 'dark';
      root.dataset.theme = noua;
      try { localStorage.setItem(KEY, noua); } catch (e) { /* ignorat */ }
    });
  })();

  /* ==========================================================================
     Antet lipit de marginea de sus
     ========================================================================== */

  (function antet() {
    var hdr = document.querySelector('.hdr');
    if (!hdr || !('IntersectionObserver' in window)) return;
    var santinela = document.createElement('div');
    santinela.setAttribute('aria-hidden', 'true');
    hdr.parentNode.insertBefore(santinela, hdr);
    new IntersectionObserver(function (e) {
      hdr.classList.toggle('is-stuck', !e[0].isIntersecting);
    }).observe(santinela);
  })();

  /* ==========================================================================
     Erou
     ========================================================================== */

  (function erou() {
    var gazda = document.getElementById('hero-door');
    if (!gazda) return;

    // Ușa reprezentativă: 3000 × 2500, gri antracit, lamelă de 55 mm (id 396).
    var p = PRODUSE.filter(function (x) { return x.id === 396; })[0] || PRODUSE[0];
    gazda.innerHTML = UG.doorSVG(p, {
      anim: true,
      cote: true,
      titlu: p.nume + '. Desen la scară cu cote: ' + p.l + ' × ' + p.h + ' mm.'
    });

    /* --- Ciclul ușii ------------------------------------------------------
       Singura sursă de adevăr pentru durate. Alimentează și mișcarea
       tablierului, și afișajul de stare de lângă desen — nu au cum să se
       desincronizeze, fiindcă citesc din aceeași structură.               */
    var CICLU = {
      urcare:   2200,
      deschis:  7000,   // ușa stă ridicată 7 secunde, apoi coboară
      coborare: 2200,
      inchis:   1600
    };
    var TOTAL = CICLU.urcare + CICLU.deschis + CICLU.coborare + CICLU.inchis;

    var FAZE = [
      { pana: CICLU.urcare,                                    stare: 'Se ridică',  cod: 'urca' },
      { pana: CICLU.urcare + CICLU.deschis,                    stare: 'Deschisă',   cod: 'sus' },
      { pana: CICLU.urcare + CICLU.deschis + CICLU.coborare,   stare: 'Se coboară', cod: 'coboara' },
      { pana: TOTAL,                                           stare: 'Închisă',    cod: 'jos' }
    ];

    var tablier = gazda.querySelector('.door__curtain');
    var cursa = parseFloat(getComputedStyle(tablier).getPropertyValue('--cursa')) || 0;
    var linistit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var anim = null;
    if (!linistit && tablier.animate) {
      var moale = 'cubic-bezier(0.62, 0.02, 0.28, 1)';
      anim = tablier.animate([
        { offset: 0,                                   transform: 'translateY(0)',            easing: moale },
        { offset: CICLU.urcare / TOTAL,                transform: 'translateY(' + cursa + 'px)', easing: 'linear' },
        { offset: (CICLU.urcare + CICLU.deschis) / TOTAL, transform: 'translateY(' + cursa + 'px)', easing: moale },
        { offset: (TOTAL - CICLU.inchis) / TOTAL,      transform: 'translateY(0)',            easing: 'linear' },
        { offset: 1,                                   transform: 'translateY(0)' }
      ], { duration: TOTAL, iterations: Infinity, delay: 600 });
    }

    /* --- Afișajul de stare ------------------------------------------------ */

    var elStare = document.getElementById('ro-stare');
    var elBara  = document.getElementById('ro-bara');
    var elCota  = document.getElementById('ro-cota');
    var elLam   = document.getElementById('ro-lamela');
    var elPret  = document.getElementById('ro-pret');

    if (elCota) elCota.textContent = p.l + ' × ' + p.h + ' mm';
    if (elLam)  elLam.textContent  = p.lamela + ' mm · ' + RAL[ralProdus(p)].ral;
    if (elPret) elPret.textContent = lei(p.pret);

    var ultimulCod = null;
    var bucla = null;

    function faza(t) {
      for (var i = 0; i < FAZE.length; i++) if (t < FAZE[i].pana) return FAZE[i];
      return FAZE[FAZE.length - 1];
    }

    function tic() {
      if (!anim || !elStare) return;
      var t = Number(anim.currentTime) || 0;
      var poz = ((t - 600) % TOTAL + TOTAL) % TOTAL;
      var f = faza(poz);
      if (f.cod !== ultimulCod) {
        ultimulCod = f.cod;
        elStare.textContent = f.stare;
        elStare.dataset.stare = f.cod;
      }
      if (elBara) elBara.style.transform = 'scaleX(' + (poz / TOTAL).toFixed(4) + ')';
      bucla = requestAnimationFrame(tic);
    }

    if (linistit) {
      if (elStare) { elStare.textContent = 'Deschisă'; elStare.dataset.stare = 'sus'; }
      if (elBara) elBara.style.transform = 'scaleX(1)';
    }

    /* Bucla pornește necondiționat: `tic` recalculează starea din
       `anim.currentTime` la fiecare cadru, deci eticheta e corectă din prima
       redesenare, fără să depindă de momentul în care se declanșează
       observatorul. Acesta din urmă doar oprește lucrul când eroul iese din
       cadru — nu are rost un cadru pe secundă pentru ceva nevăzut. */
    if (anim) {
      bucla = requestAnimationFrame(tic);

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (intrari) {
          if (intrari[0].isIntersecting) {
            anim.play();
            if (bucla === null) bucla = requestAnimationFrame(tic);
          } else {
            anim.pause();
            if (bucla !== null) { cancelAnimationFrame(bucla); bucla = null; }
          }
        }, { threshold: 0 }).observe(gazda);
      }
    }
  })();

  /* ==========================================================================
     Cifrele din erou — calculate din catalog, nu scrise de mână
     ========================================================================== */

  (function cifre() {
    var s = UG.sumar();
    function set(id, html) {
      var el = document.getElementById(id);
      if (el) el.innerHTML = html;
    }
    set('stat-total', s.total);
    set('stat-promo', s.laPromotie);
    set('stat-pret', new Intl.NumberFormat('ro-RO').format(s.pretMin) + '<sup>lei</sup>');
    set('stat-latime', s.latimeMin + '–' + s.latimeMax + '<sup>mm</sup>');
  })();

  /* ==========================================================================
     Catalog
     ========================================================================== */

  var grila = document.getElementById('grid');

  /* Cartelele sunt scrise în HTML de `build.js`, deci pagina are conținut și
     fără scripturi. Aici se randează doar dacă grila a rămas goală — adică
     dacă pagina a fost servită fără pasul de generare. */
  if (grila && !grila.querySelector('.card')) {
    grila.innerHTML = PRODUSE.map(function (p) {
      var c = RAL[ralProdus(p)];
      var red = reducere(p);
      var raluri = p.raluri.length
        ? p.raluri.map(function (r) { return RAL[r].ral; }).join(' / ')
        : c.nume;

      var rez = UG.rezumat(p);

      return '<article class="card reveal" id="card-' + p.id + '" ' +
          'data-lamela="' + p.lamela + '" data-familie="' + p.familie + '" ' +
          'data-promo="' + (p.laPromotie ? 1 : 0) + '">' +
        '<div class="card__figure plate">' +
          '<div class="card__badges">' +
            '<span class="badge">lamelă ' + p.lamela + ' mm</span>' +
            (red ? '<span class="badge badge--sale">−' + red + '%</span>' : '') +
          '</div>' +
          UG.doorSVG(p, { titlu: p.nume + ', ' + c.nume }) +
          // Fotografia reală a magazinului, dezvăluită la trecerea cursorului.
          '<img class="card__photo" src="' + UG.fotoProdus(p) + '" alt="Fotografie ' +
            (p.familie === 'antracit' ? 'ușă gri antracit' : 'ușă maro') +
            '" loading="lazy" decoding="async">' +
        '</div>' +
        '<div class="card__body">' +
          '<h3 class="card__title"><a href="produs/' + UG.fisierProdus(p) + '.html">' + p.nume + '</a></h3>' +
          '<div class="spec-row">' +
            '<span>' + p.l + ' × ' + p.h + ' mm</span>' +
            '<span>' + raluri + '</span>' +
          '</div>' +
          (rez ? '<p class="card__desc">' + rez + '</p>' : '') +
          '<div class="price">' +
            '<span class="price__now">' + lei(p.pret) + '</span>' +
            (p.laPromotie ? '<s class="price__was">' + lei(p.pretReg) + '</s>' : '') +
            (red ? '<span class="price__off">−' + red + '%</span>' : '') +
          '</div>' +
          '<div class="card__foot">' +
            '<span>Transport gratuit</span>' +
            '<button type="button" class="btn btn--sm btn--ghost" data-switch-open="' + p.id + '">' +
              'Comută <kbd>⇧</kbd></button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ==========================================================================
     Filtre
     ========================================================================== */

  (function filtre() {
    if (!grila) return;

    var carduri = Array.prototype.slice.call(grila.querySelectorAll('.card'));
    var contor = document.getElementById('filter-count');
    var gol = document.getElementById('empty');
    var stare = { lamela: 'toate', familie: 'toate', promo: false };

    function aplica() {
      var vizibile = 0;
      carduri.forEach(function (card) {
        var ok =
          (stare.lamela === 'toate' || card.dataset.lamela === stare.lamela) &&
          (stare.familie === 'toate' || card.dataset.familie === stare.familie) &&
          (!stare.promo || card.dataset.promo === '1');
        card.classList.toggle('is-hidden', !ok);
        if (ok) vizibile++;
      });
      if (contor) contor.innerHTML = '<b>' + vizibile + '</b> din ' + carduri.length + ' produse';
      if (gol) gol.hidden = vizibile > 0;
    }

    Array.prototype.forEach.call(document.querySelectorAll('.chip[data-filtru]'), function (chip) {
      chip.addEventListener('click', function () {
        var filtru = chip.dataset.filtru;
        if (filtru === 'promo') {
          stare.promo = !stare.promo;
          chip.setAttribute('aria-pressed', String(stare.promo));
        } else {
          stare[filtru] = chip.dataset.valoare;
          Array.prototype.forEach.call(
            document.querySelectorAll('.chip[data-filtru="' + filtru + '"]'),
            function (c) { c.setAttribute('aria-pressed', String(c === chip)); }
          );
        }
        aplica();
      });
    });

    // Comutatorul cere golirea filtrelor când produsul confirmat e ascuns.
    document.addEventListener('catalog:reset', function () {
      stare.lamela = 'toate';
      stare.familie = 'toate';
      stare.promo = false;
      Array.prototype.forEach.call(document.querySelectorAll('.chip[data-filtru]'), function (c) {
        c.setAttribute('aria-pressed', String(c.dataset.valoare === 'toate'));
      });
      aplica();
    });

    aplica();
  })();

  /* ==========================================================================
     Miniatura care invită la comutator
     ========================================================================== */

  (function previzualizare() {
    var rail = document.getElementById('preview-rail');
    if (!rail) return;

    var alese = [180, 396, 401, 388, 386].map(function (id) {
      return PRODUSE.filter(function (p) { return p.id === id; })[0];
    }).filter(Boolean);
    var activ = 2;

    rail.innerHTML = alese.map(function (p, i) {
      return '<div class="switch-preview__cell' + (i === activ ? ' is-on' : '') + '" aria-hidden="true">' +
        UG.doorSVG(p) + '</div>';
    }).join('');

    var cap = document.getElementById('preview-cap');
    if (cap) {
      var p = alese[activ];
      cap.innerHTML = '<b>' + p.l + ' × ' + p.h + ' mm · lamelă ' + p.lamela + ' mm</b><span>03 / 21</span>';
    }
  })();

  /* ==========================================================================
     Tabelul tehnic — completat din aceleași constante ca desenele
     ========================================================================== */

  (function tehnic() {
    var corp = document.getElementById('spec-body');
    if (!corp) return;

    var randuri = [
      ['Pasul lamelei',        function (g) { return g.pas + ' mm'; }],
      ['Grosimea lamelei',     function (g) { return String(g.grosime).replace('.', ',') + ' mm'; }],
      ['Masa tabliei',         function (g) { return g.masa + ' kg/m²'; }],
      ['Caseta din aluminiu',  function (g) { return g.caseta + ' mm'; }],
      ['Ghidaje din aluminiu', function (g) { return g.pas === 55 ? '75 × 30 mm' : '90 × 35 mm'; }],
      ['Ax din oțel zincat',   function (g) { return 'Ø ' + g.ax + ' mm'; }],
      ['Umplutură',            function () { return 'spumă poliuretanică'; }],
      ['Lagăre',               function () { return 'oțel'; }]
    ];

    corp.innerHTML = randuri.map(function (r) {
      return '<tr><th scope="row">' + r[0] + '</th>' +
        '<td>' + r[1](LAMELA[55]) + '</td>' +
        '<td>' + r[1](LAMELA[77]) + '</td></tr>';
    }).join('');
  })();

  /* ==========================================================================
     Apariția la derulare
     ========================================================================== */

  (function aparitii() {
    var tinte = document.querySelectorAll('.reveal');
    if (!tinte.length) return;

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(tinte, function (t) { t.classList.add('is-in'); });
      return;
    }

    var obs = new IntersectionObserver(function (intrari) {
      intrari.forEach(function (intrare, i) {
        if (!intrare.isIntersecting) return;
        // Decalaj mic, în cascadă, doar în cadrul aceluiași lot.
        intrare.target.style.setProperty('--reveal-delay', Math.min(i, 6) * 55 + 'ms');
        intrare.target.classList.add('is-in');
        obs.unobserve(intrare.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(tinte, function (t) { obs.observe(t); });

    /* Plasă de siguranță: dacă observatorul nu se declanșează din orice motiv,
       conținutul nu are voie să rămână invizibil. */
    setTimeout(function () {
      Array.prototype.forEach.call(document.querySelectorAll('.reveal:not(.is-in)'), function (t) {
        var r = t.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.5) t.classList.add('is-in');
      });
    }, 1200);
  })();

  /* ==========================================================================
     Anul din subsol
     ========================================================================== */

  var an = document.getElementById('an');
  if (an) an.textContent = new Date().getFullYear();

  /* ======================================================================== */

  UG.initSwitcher();
})(window.UG);
