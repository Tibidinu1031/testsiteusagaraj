/**
 * build.js — generatorul site-ului.
 *
 *   node build.js
 *
 * Produce toate paginile din aceleași date pe care le folosește și browserul:
 * `assets/js/catalog.js` și `assets/js/door.js` sunt încărcate aici printr-un
 * shim de `window`, deci desenele și prețurile din HTML-ul livrat sunt generate
 * de exact același cod care rulează în pagină. Nu există două surse de adevăr.
 *
 * Cartelele de produs sunt scrise în HTML la generare, nu construite din
 * JavaScript la încărcare. Consecințele contează: pagina are conținut și fără
 * scripturi, iar motoarele de căutare văd cele 21 de produse cu prețuri.
 *
 * Textul paginilor de informare și al celor legale NU este scris de mine: e
 * preluat la generare de pe usa-garaj.ro, prin API-ul WordPress. Termenii și
 * politica de confidențialitate sunt angajamente juridice ale firmei — ar fi
 * fost o greșeală să le inventez.
 */

'use strict';

const fs = require('fs');
const path = require('path');

/* --- Încărcarea modulelor de browser ------------------------------------ */

global.window = {};
require('./assets/js/catalog.js');
require('./assets/js/door.js');
const UG = global.window.UG;

const { PRODUSE, CATEGORII, RAL } = UG;

/* --- Datele firmei ------------------------------------------------------- */

const FIRMA = {
  nume: 'ABBA CONFORT SOLUTIONS HOMES S.R.L.',
  marca: 'Usa-garaj.ro',
  cui: '40437439',
  j: 'J15/136/2019',
  adresa: 'Sat Voinești, Com. Voinești, Str. Principală, Nr. 146, jud. Dâmbovița',
  tel: '0731 366 613',
  telHref: '+40731366613',
  email: 'contact@usa-garaj.ro',
  site: 'https://usa-garaj.ro'
};

const ORIGINE = 'https://usa-garaj.ro';
const IESIRE = __dirname;
const VER = 'v=9';

/* --- Unelte -------------------------------------------------------------- */

const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const lei = UG.lei;

function scrie(rel, html) {
  const abs = path.join(IESIRE, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, html, 'utf8');
  return rel;
}

/* --- Structura navigării ------------------------------------------------- */

const NAV = [
  { href: 'index.html',                            text: 'Acasă' },
  { href: 'magazin.html',                          text: 'Magazin' },
  { href: 'categorie/usi-garaj-rulou-55-mm.html',  text: 'Rulou 55 mm' },
  { href: 'categorie/usi-garaj-rulou-77-mm.html',  text: 'Rulou 77 mm' },
  { href: 'categorie/promotii.html',               text: 'Promoții' },
  { href: 'tehnic.html',                           text: 'Tehnic' },
  { href: 'intrebari-frecvente.html',              text: 'Întrebări' },
  { href: 'contact.html',                          text: 'Contact' }
];

const SUBSOL = {
  'Produse': [
    ['categorie/usi-garaj-rulou-55-mm.html', 'Uși garaj rulou 55 mm'],
    ['categorie/usi-garaj-rulou-77-mm.html', 'Uși garaj rulou 77 mm'],
    ['categorie/promotii.html', 'Promoții'],
    ['categorie/produse-noi.html', 'Produse noi'],
    ['magazin.html', 'Magazin']
  ],
  'Informații utile': [
    ['termeni-si-conditii.html', 'Termeni și condiții'],
    ['confidentialitate.html', 'Confidențialitate'],
    ['politica-de-cookies.html', 'Politica de cookie-uri'],
    ['anulare-tranzactie.html', 'Anulare tranzacție']
  ],
  'Comenzi': [
    ['cum-cumpar.html', 'Cum cumpăr'],
    ['metode-de-plata.html', 'Metode de plată'],
    ['transport-si-retururi.html', 'Transport și retururi'],
    [ORIGINE + '/cos/', 'Coșul meu']
  ],
  'Asistență': [
    ['contact.html', 'Contactează-ne'],
    ['intrebari-frecvente.html', 'Întrebări frecvente'],
    ['solutionarea-litigiilor.html', 'Soluționarea litigiilor'],
    ['https://anpc.ro/', 'ANPC']
  ]
};

const extern = (h) => /^https?:/.test(h);
const leg = (base, h) => (extern(h) ? h : base + h);

/* --- Șabloane ------------------------------------------------------------ */

function jsonLd(base) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': ['Organization', 'HomeAndConstructionBusiness'],
    '@id': FIRMA.site + '/#firma',
    name: FIRMA.marca,
    legalName: FIRMA.nume,
    url: FIRMA.site + '/',
    taxID: FIRMA.cui,
    identifier: [
      { '@type': 'PropertyValue', name: 'CUI', value: FIRMA.cui },
      { '@type': 'PropertyValue', name: 'Nr. Registrul Comerțului', value: FIRMA.j }
    ],
    telephone: '+4' + FIRMA.telHref.replace('+40', '0'),
    email: FIRMA.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Str. Principală, Nr. 146',
      addressLocality: 'Sat Voinești, Com. Voinești',
      addressRegion: 'Dâmbovița',
      addressCountry: 'RO'
    },
    areaServed: 'RO'
  });
}

function pagina(o) {
  const base = o.base || '';
  const nav = NAV.map((n) =>
    `<a href="${base}${n.href}"${n.href === o.activ ? ' aria-current="page"' : ''}>${n.text}</a>`
  ).join('\n        ');

  const subsol = Object.entries(SUBSOL).map(([titlu, linkuri]) => `
        <div>
          <h2>${titlu}</h2>
          <ul>
            ${linkuri.map(([h, t]) =>
              `<li><a href="${leg(base, h)}"${extern(h) ? ' rel="noopener nofollow"' : ''}>${t}</a></li>`
            ).join('\n            ')}
          </ul>
        </div>`).join('');

  return `<!doctype html>
<html lang="ro" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

<title>${esc(o.titlu)}</title>
<meta name="description" content="${esc(o.descriere)}">
<meta name="author" content="${FIRMA.nume}">
<meta name="theme-color" content="#0b0d0e" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#f4f2ed" media="(prefers-color-scheme: light)">

<meta property="og:type" content="${o.ogType || 'website'}">
<meta property="og:locale" content="ro_RO">
<meta property="og:site_name" content="${FIRMA.marca}">
<meta property="og:title" content="${esc(o.titlu)}">
<meta property="og:description" content="${esc(o.descriere)}">

<link rel="icon" href="${base}assets/img/logo-abba.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..800&family=IBM+Plex+Mono:wght@400;500;600&display=swap">

<script>document.documentElement.classList.add('js');</script>

<link rel="stylesheet" href="${base}assets/css/tokens.css?${VER}">
<link rel="stylesheet" href="${base}assets/css/base.css?${VER}">
<link rel="stylesheet" href="${base}assets/css/door.css?${VER}">
<link rel="stylesheet" href="${base}assets/css/components.css?${VER}">
<link rel="stylesheet" href="${base}assets/css/switcher.css?${VER}">

<script type="application/ld+json">${jsonLd(base)}</script>
${o.ld ? `<script type="application/ld+json">${o.ld}</script>` : ''}
</head>

<body>
<a class="skip-link" href="#continut">Sari la conținutul principal</a>

<div class="idbar">
  <div class="wrap wrap--wide idbar__inner">
    <p class="idbar__legal">
      <b>${FIRMA.nume}</b>
      <span class="idbar__sep" aria-hidden="true">·</span>
      <span class="idbar__code"><span>CUI</span>&nbsp;${FIRMA.cui}</span>
      <span class="idbar__sep" aria-hidden="true">·</span>
      <span class="idbar__code"><span>Nr. Reg. Com.</span>&nbsp;${FIRMA.j}</span>
    </p>
    <p><a class="idbar__tel" href="tel:${FIRMA.telHref}">${FIRMA.tel}</a></p>
  </div>
</div>

<header class="hdr">
  <div class="wrap wrap--wide hdr__inner">
    <a class="brand" href="${base}index.html" aria-label="${FIRMA.marca} — prima pagină">
      <img class="brand__mark" src="${base}assets/img/logo-abba.png" alt="" width="150" height="150" decoding="async">
      <span class="brand__name">
        <b>Ușă&#8288;-&#8288;Garaj<span style="color:var(--acc)">.ro</span></b>
        <small>Uși rulou ABBA</small>
      </span>
    </a>

    <nav class="nav" aria-label="Navigare principală">
        ${nav}
    </nav>

    <div class="hdr__actions">
      <button type="button" class="icon-btn theme-toggle" aria-label="Schimbă tema, întunecată sau luminoasă">
        <svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
        <svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M22 12h-2.4M4.4 12H2m15.1-7.1-1.7 1.7M8.6 15.4l-1.7 1.7m10.2 0-1.7-1.7M8.6 8.6 6.9 6.9"/></svg>
      </button>
      <button type="button" class="btn btn--primary" data-switch-open="">
        Comutator
        <span class="btn__kbd"><kbd>⇧</kbd><kbd>Tab</kbd></span>
      </button>
    </div>
  </div>
</header>

<main id="continut">
${o.corp}
</main>

<footer class="ftr">
  <div class="wrap wrap--wide">
    <div class="ftr__cols">
      <div>
        <a class="brand" href="${base}index.html" style="margin-block-end:var(--s-4)">
          <img class="brand__mark" src="${base}assets/img/logo-abba.png" alt="" width="150" height="150" loading="lazy" decoding="async">
          <span class="brand__name">
            <b>Ușă&#8288;-&#8288;Garaj<span style="color:var(--acc)">.ro</span></b>
            <small>Uși rulou ABBA</small>
          </span>
        </a>
        <p style="font-size:var(--t--1);color:var(--ink-muted);max-inline-size:34ch">
          Uși de garaj tip rulou cu lamele de aluminiu, acționate cu telecomandă.
          Proiectare, montaj și service.
        </p>
      </div>
${subsol}
    </div>

    <div class="ftr__legal">
      <p>
        <strong>${FIRMA.nume}</strong>
        <span class="idbar__sep" aria-hidden="true">·</span>
        <span class="idbar__code"><span>CUI</span>&nbsp;${FIRMA.cui}</span>
        <span class="idbar__sep" aria-hidden="true">·</span>
        <span class="idbar__code"><span>Nr. Reg. Com.</span>&nbsp;${FIRMA.j}</span>
        <span class="idbar__sep" aria-hidden="true">·</span>
        ${FIRMA.adresa}
      </p>
      <p>Toate drepturile rezervate © <span id="an">2026</span></p>
    </div>
  </div>
</footer>

<div class="switcher" id="switcher" aria-hidden="true">
  <div class="switcher__scrim"></div>
  <div class="switcher__panel" role="dialog" aria-modal="true" aria-label="Comutator de produse" tabindex="-1">
    <p class="switcher__bar">
      <span><strong>Comutator</strong> · uși de garaj rulou</span>
      <span class="switcher__idx" id="sw-idx"></span>
    </p>
    <div class="switcher__viewport" id="sw-viewport">
      <div class="switcher__rail" id="sw-rail" role="listbox" aria-label="Produse disponibile"></div>
    </div>
    <div class="switcher__caption">
      <p class="switcher__name" id="sw-name"></p>
      <p class="switcher__specs" id="sw-specs"></p>
      <p class="switcher__price" id="sw-price"></p>
    </div>
    <p class="switcher__foot">
      <span><kbd>⇧</kbd><kbd>Tab</kbd> înainte</span>
      <span><kbd>←</kbd><kbd>→</kbd> navighezi</span>
      <span><kbd>Enter</kbd> confirmi</span>
      <span><kbd>Esc</kbd> anulezi</span>
    </p>
    <p class="sr-only" id="sw-live" role="status" aria-live="polite"></p>
  </div>
</div>

<button type="button" class="switch-fab" data-switch-open="">
  <kbd>⇧</kbd> Comutator
</button>

<script>window.UG_BASE = ${JSON.stringify(base)};</script>
<script src="${base}assets/js/catalog.js?${VER}"></script>
<script src="${base}assets/js/door.js?${VER}"></script>
<script src="${base}assets/js/switcher.js?${VER}"></script>
<script src="${base}assets/js/app.js?${VER}"></script>
</body>
</html>
`;
}

/* --- Cartela de produs --------------------------------------------------- */

/**
 * @param {number} nivel nivelul titlului cartelei. Contează pentru structura
 *   documentului: pe paginile de listă titlul paginii e `h1`, deci cartelele
 *   trebuie să fie `h2`; pe prima pagină rubrica e deja `h2`, deci rămân `h3`.
 *   Fără asta apare o săritură de nivel, semnalată de orice audit.
 */
function cardHTML(p, base, nivel) {
  const H = 'h' + (nivel || 3);
  const c = RAL[UG.ralProdus(p)];
  const red = UG.reducere(p);
  const raluri = p.raluri.length ? p.raluri.map((r) => RAL[r].ral).join(' / ') : c.nume;
  const rez = UG.rezumat(p);

  return `<article class="card reveal" id="card-${p.id}" data-lamela="${p.lamela}" data-familie="${p.familie}" data-promo="${p.laPromotie ? 1 : 0}">
  <div class="card__figure plate">
    <div class="card__badges">
      <span class="badge">lamelă ${p.lamela} mm</span>
      ${red ? `<span class="badge badge--sale">−${red}%</span>` : ''}
    </div>
    ${UG.doorSVG(p, { titlu: `${p.nume}, ${c.nume}` })}
    <img class="card__photo" src="${base}${UG.fotoProdus(p)}" alt="Fotografie ${p.familie === 'antracit' ? 'ușă gri antracit' : 'ușă maro'}" loading="lazy" decoding="async">
  </div>
  <div class="card__body">
    <${H} class="card__title"><a href="${base}produs/${UG.fisierProdus(p)}.html">${esc(p.nume)}</a></${H}>
    <div class="spec-row">
      <span>${p.l} × ${p.h} mm</span>
      <span>${raluri}</span>
    </div>
    ${rez ? `<p class="card__desc">${esc(rez)}</p>` : ''}
    <div class="price">
      <span class="price__now">${lei(p.pret)}</span>
      ${p.laPromotie ? `<s class="price__was">${lei(p.pretReg)}</s>` : ''}
      ${red ? `<span class="price__off">−${red}%</span>` : ''}
    </div>
    <div class="card__foot">
      <span>Transport gratuit</span>
      <button type="button" class="btn btn--sm btn--ghost" data-switch-open="${p.id}">Comută <kbd>⇧</kbd></button>
    </div>
  </div>
</article>`;
}

const grilaHTML = (lista, base, nivel) =>
  `<div class="grid-products" id="grid">\n${lista.map((p) => cardHTML(p, base, nivel)).join('\n')}\n</div>`;

const FILTRE = `<div class="filters reveal">
  <div class="filter-group">
    <span class="filter-group__label" id="lbl-lamela">Lamelă</span>
    <div class="chips" role="group" aria-labelledby="lbl-lamela">
      <button type="button" class="chip" data-filtru="lamela" data-valoare="toate" aria-pressed="true">Toate</button>
      <button type="button" class="chip" data-filtru="lamela" data-valoare="55" aria-pressed="false">55 mm</button>
      <button type="button" class="chip" data-filtru="lamela" data-valoare="77" aria-pressed="false">77 mm</button>
    </div>
  </div>
  <div class="filter-group">
    <span class="filter-group__label" id="lbl-culoare">Culoare</span>
    <div class="chips" role="group" aria-labelledby="lbl-culoare">
      <button type="button" class="chip" data-filtru="familie" data-valoare="toate" aria-pressed="true">Toate</button>
      <button type="button" class="chip" data-filtru="familie" data-valoare="antracit" aria-pressed="false"><i class="chip__swatch" style="background:#383e42" aria-hidden="true"></i>Gri antracit</button>
      <button type="button" class="chip" data-filtru="familie" data-valoare="maro" aria-pressed="false"><i class="chip__swatch" style="background:#4a3526" aria-hidden="true"></i>Maro</button>
    </div>
  </div>
  <div class="filter-group">
    <span class="filter-group__label" id="lbl-oferta">Ofertă</span>
    <div class="chips" role="group" aria-labelledby="lbl-oferta">
      <button type="button" class="chip" data-filtru="promo" data-valoare="da" aria-pressed="false">Doar prețuri reduse</button>
    </div>
  </div>
</div>`;

module.exports = { pagina, cardHTML, grilaHTML, FILTRE, FIRMA, esc, scrie, UG, NAV };

/* Restul generatorului este în build-pagini.js, încărcat mai jos, ca fișierul
   acesta să rămână la o dimensiune citibilă. */
require('./build-pagini.js');
