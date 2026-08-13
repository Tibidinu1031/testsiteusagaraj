/**
 * switcher.js — „Comutatorul de produse”.
 *
 * Comportament, calchiat după comutatorul de aplicații al sistemului:
 *
 *   ⇧ ținut apăsat + Tab   deschide panoul și avansează selecția
 *   ⇧ eliberat             confirmă produsul selectat
 *   ← →                    navighează în ambele sensuri
 *   Enter                  confirmă
 *   Esc                    anulează și redă focalizarea de unde a fost luată
 *
 * O notă despre accesibilitate, fiindcă e ușor de greșit: interceptarea
 * necondiționată a lui ⇧+Tab ar distruge navigarea inversă cu tastatura, adică
 * exact publicul care depinde cel mai mult de ea. De aceea scurtătura se
 * armează doar când focalizarea NU se află deja pe un element interactiv.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  var CAMPURI_TEXT = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';

  UG.initSwitcher = function () {
    var PRODUSE = UG.PRODUSE, RAL = UG.RAL;
    var root = document.getElementById('switcher');
    if (!root) return;

    var rail     = root.querySelector('#sw-rail');
    var viewport = root.querySelector('#sw-viewport');
    var elName   = root.querySelector('#sw-name');
    var elSpecs  = root.querySelector('#sw-specs');
    var elPrice  = root.querySelector('#sw-price');
    var elIdx    = root.querySelector('#sw-idx');
    var elLive   = root.querySelector('#sw-live');

    var index = 0;
    var deschis = false;
    var mod = null;            // 'rapid' (⇧ ținut apăsat) sau 'fix' (deschis cu butonul)
    var focalizareAnterioara = null;

    /* --- Construcția plăcilor, o singură dată ---------------------------- */

    rail.innerHTML = PRODUSE.map(function (p, i) {
      var c = RAL[UG.ralDesen(p)];
      return '<button type="button" class="tile" role="option" id="sw-tile-' + i + '" ' +
        'aria-selected="' + (i === 0) + '" data-i="' + i + '" tabindex="-1" ' +
        'title="' + p.nume + '">' +
        '<span class="tile__tag">' + p.lamela + '</span>' +
        '<span class="tile__art">' + UG.doorSVG(p, { titlu: p.nume + ', ' + c.nume }) + '</span>' +
        '</button>';
    }).join('');

    var tiles = Array.prototype.slice.call(rail.querySelectorAll('.tile'));

    /* --- Redarea stării -------------------------------------------------- */

    /**
     * Aduce placa selectată în mijlocul ferestrei.
     *
     * Calculul se face exclusiv în coordonate de așezare în pagină
     * (`offsetLeft`, `clientWidth`), nu prin `getBoundingClientRect`: panoul
     * are o transformare de scară la deschidere, iar dreptunghiurile raportate
     * de browser sunt deja scalate — s-ar amesteca două sisteme de măsură.
     */
    function pozitioneazaSina() {
      var t = tiles[index];
      if (!t) return;
      var padStanga = parseFloat(getComputedStyle(viewport).paddingLeft) || 0;
      var x = viewport.clientWidth / 2 - padStanga - (t.offsetLeft + t.offsetWidth / 2);
      rail.style.transform = 'translateX(' + Math.round(x) + 'px)';
    }

    function deseneaza() {
      var p = PRODUSE[index];
      var c = RAL[UG.ralDesen(p)];
      var red = UG.reducere(p);

      tiles.forEach(function (t, i) { t.setAttribute('aria-selected', String(i === index)); });
      rail.setAttribute('aria-activedescendant', 'sw-tile-' + index);

      elName.textContent = p.nume;

      // Se afișează toate codurile RAL declarate, nu doar cel folosit la desen.
      var culori = p.raluri.length
        ? p.raluri.map(function (r) {
            return '<i class="switcher__swatch" style="background:' + RAL[r].hex + '"></i>' + RAL[r].ral;
          }).join(' / ')
        : '<i class="switcher__swatch" style="background:' + c.hex + '"></i>' + c.nume;

      elSpecs.innerHTML =
        '<span>' + culori + '</span>' +
        '<span>' + p.l + ' × ' + p.h + ' mm</span>' +
        '<span>lamelă ' + p.lamela + ' mm</span>';

      elPrice.innerHTML = '<b>' + UG.lei(p.pret) + '</b>' +
        (p.laPromotie ? '<s>' + UG.lei(p.pretReg) + '</s><em>−' + red + '%</em>' : '');

      elIdx.innerHTML = '<b>' + String(index + 1).padStart(2, '0') + '</b> / ' + PRODUSE.length;
      elLive.textContent = p.nume + '. ' + UG.lei(p.pret) +
        '. Poziția ' + (index + 1) + ' din ' + PRODUSE.length + '.';

      pozitioneazaSina();
    }

    function muta(pas) {
      index = (index + pas + PRODUSE.length) % PRODUSE.length;
      deseneaza();
    }

    function prefersReduced() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /* --- Deschidere / închidere ------------------------------------------ */

    function deschide(modul, pornireLa) {
      if (deschis) return;
      deschis = true;
      mod = modul;
      focalizareAnterioara = document.activeElement;
      if (pornireLa !== null && pornireLa !== undefined) index = pornireLa;

      root.classList.add('is-open');
      root.removeAttribute('aria-hidden');
      document.body.classList.add('is-locked');

      deseneaza();
      // Sina se măsoară corect abia după ce panoul are dimensiuni finale.
      requestAnimationFrame(pozitioneazaSina);
      root.querySelector('.switcher__panel').focus({ preventScroll: true });
    }

    /** Confirmarea duce la cartela produsului din catalog și o pune în evidență. */
    function evidentiazaCartela(p) {
      var card = document.getElementById('card-' + p.id);
      if (!card) return;

      // Dacă filtrele active ascund produsul, le golim ca să fie vizibil.
      // Evenimentul e tratat sincron, deci cartela e deja vizibilă mai jos.
      if (card.classList.contains('is-hidden')) {
        document.dispatchEvent(new CustomEvent('catalog:reset'));
      }

      card.scrollIntoView({ block: 'center', behavior: prefersReduced() ? 'auto' : 'smooth' });
      card.classList.remove('is-flash');
      void card.offsetWidth;             // repornește animația de la capăt
      card.classList.add('is-flash');
      var link = card.querySelector('.card__title a');
      if (link) link.focus({ preventScroll: true });
    }

    function inchide(confirma) {
      if (!deschis) return;
      var p = PRODUSE[index];

      deschis = false;
      mod = null;
      root.classList.remove('is-open');
      root.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');

      if (confirma) {
        evidentiazaCartela(p);
      } else if (focalizareAnterioara && focalizareAnterioara.focus) {
        focalizareAnterioara.focus({ preventScroll: true });
      }
      focalizareAnterioara = null;
    }

    /* --- Tastatura -------------------------------------------------------- */

    document.addEventListener('keydown', function (e) {
      if (!deschis) {
        // Armare: ⇧+Tab, dar numai dacă nu suntem în mijlocul unei navigări cu Tab.
        if (e.key === 'Tab' && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
          var a = document.activeElement;
          var inInteractiv = a && a !== document.body &&
            ((a.matches && a.matches(CAMPURI_TEXT)) ||
             (a.closest && a.closest('a[href], button, [tabindex]:not([tabindex="-1"])')));
          if (inInteractiv) return;    // navigare inversă normală: nu ne atingem de ea

          e.preventDefault();
          deschide('rapid', 0);
        }
        return;
      }

      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          // În modul rapid ⇧ este ținut apăsat, deci ⇧+Tab înseamnă „înainte”.
          // În modul fix se aplică convenția obișnuită: Tab înainte, ⇧+Tab înapoi.
          muta(mod === 'rapid' ? (e.shiftKey ? 1 : -1) : (e.shiftKey ? -1 : 1));
          break;
        case 'ArrowRight': case 'ArrowDown':
          e.preventDefault(); muta(1); break;
        case 'ArrowLeft': case 'ArrowUp':
          e.preventDefault(); muta(-1); break;
        case 'Home':
          e.preventDefault(); index = 0; deseneaza(); break;
        case 'End':
          e.preventDefault(); index = PRODUSE.length - 1; deseneaza(); break;
        case 'Enter': case ' ':
          e.preventDefault(); inchide(true); break;
        case 'Escape':
          e.preventDefault(); inchide(false); break;
      }
    });

    // Eliberarea lui ⇧ confirmă — dar numai în modul rapid.
    document.addEventListener('keyup', function (e) {
      if (deschis && mod === 'rapid' && e.key === 'Shift') inchide(true);
    });

    /* --- Mausul și atingerea --------------------------------------------- */

    /* O glisare se încheie și cu un `click` pe placa de sub deget. Fără steagul
       de mai jos, răsfoirea prin glisare ar confirma din greșeală produsul —
       adică exact ce nu voia utilizatorul când a glisat. */
    var tocmaiAmGlisat = false;

    rail.addEventListener('click', function (e) {
      if (tocmaiAmGlisat) { tocmaiAmGlisat = false; return; }
      var t = e.target.closest('.tile');
      if (!t) return;
      index = Number(t.dataset.i);
      deseneaza();
      inchide(true);
    });

    /* Selecția care urmărește cursorul are sens doar pentru maus. La atingere,
       degetul „trece” peste plăci în timpul glisării și ar schimba selecția la
       fiecare pixel. */
    rail.addEventListener('pointermove', function (e) {
      if (mod !== 'fix' || e.pointerType !== 'mouse') return;
      var t = e.target.closest('.tile');
      if (!t || Number(t.dataset.i) === index) return;
      index = Number(t.dataset.i);
      deseneaza();
    });

    root.querySelector('.switcher__scrim')
        .addEventListener('click', function () { inchide(false); });

    /* --- Glisarea pe ecranele tactile ------------------------------------ */

    /**
     * Prima variantă asculta doar `pointerdown` și `pointerup`. Pe desktop
     * mergea; pe telefon, niciodată. Două motive, amândouă tăcute:
     *
     *   1. Browserul mobil decide la primele pixele cine primește gestul.
     *      Fără `touch-action: pan-y` pe viewport îl lua el, pentru derulare,
     *      și trimitea `pointercancel` — `pointerup` nu mai venea deloc.
     *   2. Chiar cu gestul primit, degetul se ridică des în afara elementului
     *      pe care a început. Fără captarea indicatorului, `pointerup` se
     *      livrează altcuiva.
     *
     * Se rezolvă amândouă: `setPointerCapture` ține evenimentele legate de
     * viewport până la final, iar `pointercancel` curăță starea, ca o glisare
     * întreruptă să nu lase un început agățat care apoi se combină cu
     * următoarea atingere și dă un salt neașteptat.
     *
     * Decizia se ia și pe verticală: o mișcare mai degrabă verticală este o
     * încercare de derulare a paginii, nu o răsfoire, și se ignoră.
     */
    var x0 = null, y0 = null, idIndicator = null;

    function incepe(e) {
      x0 = e.clientX;
      y0 = e.clientY;
      idIndicator = e.pointerId;
      try { viewport.setPointerCapture(e.pointerId); } catch (err) { /* nu e obligatoriu */ }
    }

    function termina(e) {
      if (x0 === null || e.pointerId !== idIndicator) return;

      var dx = e.clientX - x0;
      var dy = e.clientY - y0;
      x0 = y0 = idIndicator = null;
      try { viewport.releasePointerCapture(e.pointerId); } catch (err) { /* deja eliberat */ }

      /* Prag de 36 px, dar numai dacă gestul e mai lat decât înalt. */
      if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) {
        tocmaiAmGlisat = true;
        muta(dx < 0 ? 1 : -1);
      }
    }

    function renunta(e) {
      if (e.pointerId !== idIndicator) return;
      x0 = y0 = idIndicator = null;
    }

    viewport.addEventListener('pointerdown', incepe);
    viewport.addEventListener('pointerup', termina);
    viewport.addEventListener('pointercancel', renunta);

    viewport.addEventListener('wheel', function (e) {
      var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 8) return;
      e.preventDefault();
      muta(d > 0 ? 1 : -1);
    }, { passive: false });

    /* --- Declanșatoare din pagină ---------------------------------------- */

    Array.prototype.forEach.call(document.querySelectorAll('[data-switch-open]'), function (b) {
      function porneste() {
        var la = -1;
        PRODUSE.forEach(function (p, i) { if (p.id === b.dataset.switchOpen) la = i; });
        deschide('fix', la >= 0 ? la : index);
      }
      b.addEventListener('click', porneste);

      // Declanșatoarele care nu sunt <button> nu primesc „click” de la tastatură.
      if (b.tagName !== 'BUTTON') {
        b.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); porneste(); }
        });
      }
    });

    window.addEventListener('resize', function () { if (deschis) pozitioneazaSina(); });

    deseneaza();
  };
})(window.UG);
