/**
 * door.js — desenul tehnic al ușii, generat din specificația produsului.
 *
 * Fotografiile puse la dispoziție de producător au între 255 și 510 px pe
 * latura mare; mărite la dimensiunea unei cartele ar arăta prost. În locul lor,
 * fiecare produs este DESENAT la scară: unitatea sistemului de coordonate este
 * milimetrul, așa că lățimea, înălțimea, pasul lamelei, caseta și ghidajele
 * respectă cotele reale din pagina „Tehnic”.
 *
 * Consecința utilă: o ușă cu lamelă de 55 mm și una de 77 mm se disting cu
 * ochiul liber, pentru că desenul are exact numărul real de lamele.
 *
 * Redarea folosește modele („pattern”) partajate — 8 definiții pentru tot
 * catalogul, nu câteva sute de dreptunghiuri per pagină.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  /* Culoarea desenului vine din `ralDesen`, nu din `ralProdus`: una singură pe
     familie, aleasă ca să semene cu fotografia dezvăluită la hover. Vezi nota
     din catalog.js. */
  var RAL = UG.RAL, LAMELA = UG.LAMELA, ralDesen = UG.ralDesen;

  /* --- Unelte de culoare -------------------------------------------------- */

  function hex2rgb(h) {
    return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  }

  function rgb2hex(r, g, b) {
    return '#' + [r, g, b].map(function (v) {
      return Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0');
    }).join('');
  }

  /** Amestecă spre alb (t > 0) sau spre negru (t < 0). */
  function tone(hex, t) {
    var c = hex2rgb(hex), target = t >= 0 ? 255 : 0, k = Math.abs(t);
    return rgb2hex(c[0] + (target - c[0]) * k, c[1] + (target - c[1]) * k, c[2] + (target - c[2]) * k);
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* --- Definițiile partajate ---------------------------------------------- */

  var PASI = [55, 77];

  /**
   * Blocul <defs> folosit de toate desenele din pagină.
   * Se injectează o singură dată, într-un SVG ascuns.
   */
  UG.defsSprite = function () {
    var out = '';

    Object.keys(RAL).forEach(function (cod) {
      var c = RAL[cod];
      var seam = tone(c.hex, -0.55);
      var lo   = tone(c.hex, -0.28);
      var hi   = tone(c.hex, 0.34);
      var hi2  = tone(c.hex, 0.13);

      /* Profilul unei lamele extrudate: teșitură luminoasă sus, umbră jos. */
      out += '<linearGradient id="lam-' + cod + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="' + hi + '"/>' +
        '<stop offset="9%" stop-color="' + hi2 + '"/>' +
        '<stop offset="36%" stop-color="' + c.hex + '"/>' +
        '<stop offset="80%" stop-color="' + c.hex + '"/>' +
        '<stop offset="95%" stop-color="' + lo + '"/>' +
        '<stop offset="100%" stop-color="' + seam + '"/></linearGradient>';

      /* Ghidajul e un profil vertical: shading pe orizontală. */
      out += '<linearGradient id="cyl-' + cod + '" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0%" stop-color="' + lo + '"/>' +
        '<stop offset="18%" stop-color="' + hi2 + '"/>' +
        '<stop offset="52%" stop-color="' + c.hex + '"/>' +
        '<stop offset="100%" stop-color="' + seam + '"/></linearGradient>';

      /* Caseta e un cilindru culcat: aceleași opriri, dar pe verticală. */
      out += '<linearGradient id="cylv-' + cod + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="' + lo + '"/>' +
        '<stop offset="18%" stop-color="' + hi2 + '"/>' +
        '<stop offset="52%" stop-color="' + c.hex + '"/>' +
        '<stop offset="100%" stop-color="' + seam + '"/></linearGradient>';

      PASI.forEach(function (pas) {
        out += '<pattern id="slat-' + cod + '-' + pas + '" width="40" height="' + pas +
          '" patternUnits="userSpaceOnUse">' +
          '<rect width="40" height="' + pas + '" fill="url(#lam-' + cod + ')"/></pattern>';
      });
    });

    /* Lumina rece care cade oblic peste tabliere. */
    out += '<linearGradient id="sheen" x1="0" y1="0" x2="0.85" y2="1">' +
      '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>' +
      '<stop offset="42%" stop-color="#ffffff" stop-opacity="0.03"/>' +
      '<stop offset="100%" stop-color="#000000" stop-opacity="0.20"/></linearGradient>';

    /* Interiorul garajului, văzut prin deschidere. Neutru și întunecat, cu
       pardoseala abia luminată: e un gol în care privești, nu un panou colorat.
       Varianta caldă de dinainte se citea ca un dreptunghi maro — adică exact
       ca „lipsește ușa” în intervalul în care tablierul e ridicat. */
    out += '<linearGradient id="interior" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#040608"/>' +
      '<stop offset="62%" stop-color="#090d11"/>' +
      '<stop offset="100%" stop-color="#161d24"/></linearGradient>';

    return '<svg aria-hidden="true" focusable="false" width="0" height="0" ' +
      'style="position:absolute;pointer-events:none"><defs>' + out + '</defs></svg>';
  };

  /* --- Desenul propriu-zis ------------------------------------------------ */

  /** Liniile de cotă, în maniera unui plan de execuție. */
  function coteSVG(l, h, gh, cs, p) {
    var y = h + 170, x = l + 175, t = 26, S = 108;

    return '<g class="door__dims" fill="none" stroke="currentColor" stroke-width="7">' +
      '<path d="M0 ' + (h + 40) + 'V' + (y + t) + 'M' + l + ' ' + (h + 40) + 'V' + (y + t) + '" opacity="0.45"/>' +
      '<path d="M0 ' + y + 'H' + l + '"/>' +
      '<path d="M0 ' + (y - t) + 'v' + (t * 2) + 'M' + l + ' ' + (y - t) + 'v' + (t * 2) + '"/>' +
      '<path d="M' + (l + 40) + ' 0H' + (x + t) + 'M' + (l + 40) + ' ' + h + 'H' + (x + t) + '" opacity="0.45"/>' +
      '<path d="M' + x + ' 0V' + h + '"/>' +
      '<path d="M' + (x - t) + ' 0h' + (t * 2) + 'M' + (x - t) + ' ' + h + 'h' + (t * 2) + '"/>' +
      '<path d="M' + gh + ' -90H' + (l - gh) + '" opacity="0.55" stroke-dasharray="26 20"/>' +
      '<path d="M' + gh + ' ' + (-90 - t) + 'v' + (t * 2) + 'M' + (l - gh) + ' ' + (-90 - t) + 'v' + (t * 2) + '" opacity="0.55"/>' +
      '</g>' +
      '<g class="door__dimtext" fill="currentColor" font-size="' + S + '" ' +
      'font-family="IBM Plex Mono, monospace" font-weight="500">' +
      '<text x="' + (l / 2) + '" y="' + (y - 34) + '" text-anchor="middle">L ' + l + '</text>' +
      '<text x="' + (x + 34) + '" y="' + (h / 2) + '" text-anchor="middle" ' +
      'transform="rotate(90 ' + (x + 34) + ' ' + (h / 2) + ')">H ' + h + '</text>' +
      '<text x="' + (l / 2) + '" y="' + (-90 - 40) + '" text-anchor="middle" opacity="0.7" ' +
      'font-size="' + (S * 0.82) + '">lamelă ' + p.lamela + ' mm · casetă ' + cs + ' mm</text></g>';
  }

  /**
   * Randează o ușă la scară.
   *
   * @param {Object} p produsul
   * @param {{anim?: boolean, cote?: boolean, titlu?: string}} [opt]
   *   anim — rulează tablierul în sus la încărcare (folosit în erou)
   *   cote — adaugă liniile de cotă, ca pe un plan de execuție
   * @returns {string} marcaj SVG
   */
  UG.doorSVG = function (p, opt) {
    opt = opt || {};
    var anim = !!opt.anim, cote = !!opt.cote;
    var cod = ralDesen(p);
    var geo = LAMELA[p.lamela];

    var l = p.l, h = p.h;
    var gh = geo.ghidaj;          // lățimea ghidajului lateral
    var cs = geo.caseta;          // înălțimea casetei
    var apX = gh, apW = l - gh * 2, apY = cs, apH = h - cs;
    var finala = geo.pas * 1.45;  // lamela finală, mai înaltă

    var uid = 'd' + p.id + (anim ? 'a' : '');
    /* Marginea de sus trebuie să cuprindă linia de cotă de la -90 ȘI textul de
       deasupra ei: scris la y = -130 cu corp de 88, urcă până pe la -205.
       La 150 era tăiat de marginea planșei. */
    var pad = cote ? { t: 280, r: 330, b: 300, l: 330 } : { t: 8, r: 8, b: 90, l: 8 };
    var vb = [-pad.l, -pad.t, l + pad.l + pad.r, h + pad.t + pad.b].join(' ');

    /* Cursa de ridicare: tablierul urcă până se strânge complet în casetă,
       exact ca o ușă rulou adevărată.

       O variantă anterioară o oprea la 58 %, ca tablierul cu lamele — adică
       produsul vândut — să rămână vizibil cât ușa stă sus. Argumentul era
       comercial, dar rezultatul arăta ca o ușă blocată la jumătate, iar o ușă
       de garaj care nu se deschide complet ridică exact întrebarea greșită.
       Ciclul revine oricum la închis după 7 secunde, deci lamelele se văd la
       loc; nu se pierde nimic din prezentarea produsului. */
    var cursa = apH;
    var eticheta = opt.titlu || (p.nume + '. Desen la scară, ' + l + ' × ' + h + ' mm.');

    return '<svg viewBox="' + vb + '" role="img" aria-label="' + esc(eticheta) + '" ' +
      'preserveAspectRatio="xMidYMid meet" class="door' + (anim ? ' door--anim' : '') + '">' +

      '<defs><clipPath id="' + uid + '-ap"><rect x="' + apX + '" y="' + apY +
      '" width="' + apW + '" height="' + apH + '"/></clipPath></defs>' +

      '<ellipse cx="' + (l / 2) + '" cy="' + (h + 34) + '" rx="' + (l * 0.53) +
      '" ry="26" fill="#000" opacity="0.28" class="door__shadow"/>' +

      '<rect x="' + apX + '" y="' + apY + '" width="' + apW + '" height="' + apH +
      '" fill="url(#interior)"/>' +

      '<g clip-path="url(#' + uid + '-ap)">' +
        '<g class="door__curtain" style="--cursa:' + (-cursa) + 'px">' +
          '<g transform="translate(' + apX + ' ' + apY + ')">' +
            '<rect x="0" y="0" width="' + apW + '" height="' + apH +
            '" fill="url(#slat-' + cod + '-' + p.lamela + ')"/>' +
            '<rect x="0" y="' + (apH - finala) + '" width="' + apW + '" height="' + finala +
            '" fill="url(#cyl-' + cod + ')" opacity="0.95"/>' +
            '<rect x="0" y="' + (apH - finala) + '" width="' + apW +
            '" height="2.5" fill="#000" opacity="0.45"/>' +
            '<rect x="' + (apW / 2 - 130) + '" y="' + (apH - finala * 0.62) +
            '" width="260" height="' + (finala * 0.3) + '" rx="' + (finala * 0.12) +
            '" fill="#000" opacity="0.35"/>' +
            '<rect x="0" y="0" width="' + apW + '" height="' + apH + '" fill="url(#sheen)"/>' +
          '</g>' +
        '</g>' +
      '</g>' +

      '<rect x="0" y="' + apY + '" width="' + gh + '" height="' + apH +
      '" fill="url(#cyl-' + cod + ')"/>' +
      '<g transform="translate(' + l + ' 0) scale(-1 1)">' +
        '<rect x="0" y="' + apY + '" width="' + gh + '" height="' + apH +
        '" fill="url(#cyl-' + cod + ')"/>' +
      '</g>' +

      '<rect x="0" y="0" width="' + l + '" height="' + cs + '" rx="' + (cs * 0.09) +
      '" fill="url(#cylv-' + cod + ')"/>' +
      '<rect x="0" y="0" width="' + l + '" height="' + cs + '" rx="' + (cs * 0.09) +
      '" fill="url(#sheen)"/>' +
      '<rect x="0" y="' + (cs - 6) + '" width="' + l + '" height="6" fill="#000" opacity="0.42"/>' +
      '<rect x="0" y="2" width="' + l + '" height="2" fill="#fff" opacity="0.12"/>' +

      (cote ? coteSVG(l, h, gh, cs, p) : '') +
      '</svg>';
  };
})(window.UG);
