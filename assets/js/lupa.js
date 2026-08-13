/**
 * lupa.js — deschiderea fotografiilor la mărime mare.
 *
 * Funcționează prin delegare, pe orice container marcat cu `data-galerie`:
 * banda de pe pagina produsului și galeria din vizualizarea rapidă. Delegarea
 * contează, fiindcă galeria din panoul de produse se reconstruiește la fiecare
 * schimbare de selecție — un ascultător pus pe fiecare imagine ar dispărea
 * odată cu ea.
 *
 * Fotografiile magazinului au între 255 și 510 px pe latura mare. De aceea
 * lupa NU le mărește peste rezoluția lor: le arată la dimensiunea reală,
 * centrate. O poză de 255 px întinsă pe tot ecranul arată mai rău decât una
 * mică și clară — iar aici clientul chiar vrea să vadă textura lamelei.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  UG.initLupa = function () {
    var overlay = null, imgMare = null, elIndice = null, elTitlu = null;
    var grup = [], pozitie = 0, deschizator = null;

    function construieste() {
      overlay = document.createElement('div');
      overlay.className = 'lupa';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Fotografie mărită');
      overlay.hidden = true;
      overlay.innerHTML =
        '<button type="button" class="lupa__inchide" aria-label="Închide">&times;</button>' +
        '<button type="button" class="lupa__nav lupa__nav--prev" aria-label="Fotografia anterioară">&#8249;</button>' +
        '<figure class="lupa__cadru">' +
          '<img class="lupa__img" alt="">' +
          '<figcaption class="lupa__legenda">' +
            '<span class="lupa__titlu"></span>' +
            '<span class="lupa__indice"></span>' +
          '</figcaption>' +
        '</figure>' +
        '<button type="button" class="lupa__nav lupa__nav--next" aria-label="Fotografia următoare">&#8250;</button>';

      document.body.appendChild(overlay);
      imgMare  = overlay.querySelector('.lupa__img');
      elIndice = overlay.querySelector('.lupa__indice');
      elTitlu  = overlay.querySelector('.lupa__titlu');

      overlay.querySelector('.lupa__inchide').addEventListener('click', inchide);
      overlay.querySelector('.lupa__nav--prev').addEventListener('click', function (e) { e.stopPropagation(); muta(-1); });
      overlay.querySelector('.lupa__nav--next').addEventListener('click', function (e) { e.stopPropagation(); muta(1); });

      /* Clic pe fundal închide; clic pe fotografie nu. */
      overlay.addEventListener('click', function (e) {
        if (!e.target.closest('.lupa__cadru') && !e.target.closest('.lupa__nav')) inchide();
      });
    }

    function arata() {
      var sursa = grup[pozitie];
      imgMare.src = sursa.currentSrc || sursa.src;
      imgMare.alt = sursa.alt || '';
      elTitlu.textContent = sursa.alt || '';
      elIndice.textContent = (pozitie + 1) + ' / ' + grup.length;

      var singura = grup.length < 2;
      overlay.querySelector('.lupa__nav--prev').hidden = singura;
      overlay.querySelector('.lupa__nav--next').hidden = singura;
    }

    function muta(pas) {
      pozitie = (pozitie + pas + grup.length) % grup.length;
      arata();
    }

    function deschide(img) {
      if (!overlay) construieste();
      var container = img.closest('[data-galerie]');
      grup = container ? Array.prototype.slice.call(container.querySelectorAll('img')) : [img];
      pozitie = Math.max(0, grup.indexOf(img));
      deschizator = img;

      arata();
      overlay.hidden = false;
      document.body.classList.add('is-locked');
      overlay.querySelector('.lupa__inchide').focus({ preventScroll: true });
    }

    function inchide() {
      if (!overlay || overlay.hidden) return;
      overlay.hidden = true;
      /* Panoul de produse poate fi încă deschis dedesubt și are nevoie de
         blocarea derulării; se ridică doar dacă nu o mai cere nimeni. */
      if (!document.querySelector('.switcher.is-open')) {
        document.body.classList.remove('is-locked');
      }
      if (deschizator && deschizator.focus) deschizator.focus({ preventScroll: true });
      deschizator = null;
    }

    /* --- Declanșarea ------------------------------------------------------ */

    document.addEventListener('click', function (e) {
      var img = e.target.closest('[data-galerie] img');
      if (!img) return;
      e.preventDefault();
      deschide(img);
    });

    /* Imaginile nu sunt butoane, deci nu primesc focalizare implicit. Marcajul
       le dă `tabindex`, iar aici li se dă comportamentul de tastatură. */
    document.addEventListener('keydown', function (e) {
      var img = e.target.closest && e.target.closest('[data-galerie] img');
      if (img && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); deschide(img); return; }

      if (!overlay || overlay.hidden) return;
      if (e.key === 'Escape')     { e.preventDefault(); e.stopPropagation(); inchide(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); muta(1); }
      else if (e.key === 'ArrowLeft')  { e.preventDefault(); muta(-1); }
    }, true);   /* faza de captare: `Esc` închide lupa înainte să ajungă la panoul de produse */
  };
})(window.UG);
