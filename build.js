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

/* --- Controlul cotelor de imagine ---------------------------------------- */

/**
 * Citește lățimea și înălțimea reale dintr-un JPEG, din marcajul SOF.
 *
 * Există fiindcă `MASURI` din `catalog.js` ține cotele scrise de mână, iar ele
 * ajung în `width`/`height` pe fiecare `<img>`. Dacă cineva înlocuiește un
 * fișier cu altul de altă mărime — exact ce se întâmplă când o poză blurată e
 * schimbată cu una clară — cotele rămân vechi, iar browserul rezervă un loc de
 * altă formă decât imaginea: pagina sare la încărcare, iar raportul e strivit.
 * Eșecul e tăcut, deci merită prins automat.
 */
function coteImagine(cale) {
  const b = fs.readFileSync(cale);

  /* Formatul se citește din SEMNĂTURĂ, nu din extensie. Extensia minte ușor:
     pozele de profil au ajuns fișiere PNG salvate peste nume `.jpeg`, iar un
     cititor care se ia după extensie ar fi tăcut exact atunci când e nevoie
     de el. */
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
    return { l: b.readUInt32BE(16), h: b.readUInt32BE(20), tip: 'PNG' };
  }

  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length - 9) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
        return { l: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5), tip: 'JPEG' };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}

function verificaCoteImagini() {
  const nepotriviri = [], lipsa = [], grele = [];
  const vazute = new Set();

  for (const p of PRODUSE) {
    for (const g of UG.galerieProdus(p)) {
      if (vazute.has(g.src)) continue;
      vazute.add(g.src);

      const abs = path.join(IESIRE, g.src);
      if (!fs.existsSync(abs)) { lipsa.push(g.src); continue; }

      const real = coteImagine(abs);
      if (!real) continue;
      if (real.l !== g.l || real.h !== g.h) {
        nepotriviri.push(`${g.src}: declarat ${g.l}×${g.h}, fișier ${real.l}×${real.h}`);
      }

      /* Peste 400 KB o imagine de galerie devine o problemă de viteză, nu de
         calitate: se încarcă pe conexiuni mobile, la produse pe care omul doar
         le răsfoiește. Semnalat, nu blocat — decizia de a o micșora e a omului. */
      const kb = fs.statSync(abs).size / 1024;
      if (kb > 400) grele.push(`${g.src}: ${(kb / 1024).toFixed(2)} MB (${real.tip} ${real.l}×${real.h})`);
    }
  }

  if (lipsa.length) {
    console.warn('\n  ! IMAGINI LIPSĂ:');
    lipsa.forEach((n) => console.warn('      ' + n));
  }
  if (nepotriviri.length) {
    console.warn('\n  ! COTE NEPOTRIVITE — actualizați `MASURI` din catalog.js:');
    nepotriviri.forEach((n) => console.warn('      ' + n));
  }
  if (grele.length) {
    console.warn('\n  ! IMAGINI GRELE (peste 400 KB), de micșorat înainte de publicare:');
    grele.forEach((n) => console.warn('      ' + n));
  }
  return nepotriviri.length + lipsa.length;
}

/* --- Datele firmei ------------------------------------------------------- */

const FIRMA = {
  nume: 'ABBA CONFORT SOLUTIONS HOMES S.R.L.',
  marca: 'Usa-garaj.ro',
  cui: '40437439',
  j: 'J15/136/2019',
  adresa: 'Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște',
  tel: '0731 366 613',
  telHref: '+40731366613',

  /**
   * Două adrese, cu roluri diferite.
   *
   * `email` rămâne adresa implicită — cea folosită oriunde textul are nevoie de
   * un singur punct de contact: date structurate, descrieri de pagină, formule
   * de tipul „scrieți-ne la…”. Este cea de birou, fiindcă acolo ajunge orice,
   * inclusiv ce nu ține de o comandă.
   *
   * `emailuri` este lista completă, folosită acolo unde chiar încap amândouă:
   * pagina de contact și cartea de identitate. Rolul e scris lângă fiecare, ca
   * omul să nu trimită o reclamație la comenzi și o comandă la birou.
   */
  email: 'Office@abbaconfort.ro',
  emailComenzi: 'Comenzi@abbaconfort.ro',

  /* Lista, pentru locurile unde încap amândouă. Se construiește din câmpurile
     de mai sus, ca o adresă schimbată într-un loc să nu rămână veche în altul. */
  get emailuri() {
    return [
      { adresa: this.email,        rol: 'Secretariat și informații' },
      { adresa: this.emailComenzi, rol: 'Comenzi și oferte' }
    ];
  },

  site: 'https://usa-garaj.ro'
};

/* --- Domeniile ----------------------------------------------------------- */

/**
 * Cele două adrese ale magazinului, într-un singur loc.
 *
 * `sit` este domeniul pe care îl vede clientul — vitrina, coșul, finalizarea,
 * confirmarea. `api` este WordPress-ul care ține stocul, comenzile și
 * facturile; clientul nu ajunge niciodată pe el, nici măcar pentru o clipă.
 *
 * De ce sunt separate: cerința e ca vechiul domeniu să nu apară nicăieri în
 * bara de adrese. WordPress-ul rămâne fizic pe aceeași găzduire, dar răspunde
 * pe un subdomeniu al domeniului NOU, deci brandul e același tot parcursul.
 *
 * Singurul domeniu străin din tot fluxul este pagina NETOPIA, unde se introduc
 * datele cardului. Acolo redirectarea nu e un neajuns, ci cerința PCI-DSS care
 * ține numărul de card departe de serverele noastre.
 *
 * DE COMPLETAT după cumpărarea domeniului. Cât timp `api` e gol, coșul și
 * finalizarea nu se generează — site-ul rămâne catalogul de acum, fără să
 * promită un magazin care nu funcționează.
 */
const MAGAZIN = {
  /**
   * Domeniul vitrinei. Se schimbă cu cel nou după cumpărare.
   * Folosit doar la `sitemap.xml` și la adresele de retur din mu-plugin.
   */
  sit: 'https://usa-garaj.ro',

  /**
   * Backendul WooCommerce.
   *
   * IMPORTANT, ca să nu se piardă ideea: aici clientul NU ajunge niciodată.
   * Coșul vorbește cu adresa asta prin `fetch()`, adică cereri de fundal —
   * bara de adrese nu se schimbă, nu există redirect, nu se vede nimic. Numai
   * navigările sunt vizibile, iar singura navigare externă din tot fluxul este
   * pagina NETOPIA, unde se introduce cardul.
   *
   * De aceea coșul poate funcționa de azi, cu WordPress-ul actual, iar la
   * mutarea pe domeniul nou se schimbă un singur rând.
   */
  api: 'https://usa-garaj.ro',

  /** Adresa Store API, derivată. */
  get store() { return this.api ? `${this.api}/wp-json/wc/store/v1` : ''; },

  /** Coșul are nevoie doar de un backend care să-l servească. */
  get activ() { return Boolean(this.api); }
};

/* --- Metodele de plată --------------------------------------------------- */

/**
 * Sursa unică pentru tot ce spune site-ul despre plată.
 *
 * `card` este un COMUTATOR DE ADEVĂR, nu o preferință de design. Magazinul are
 * astăzi un singur gateway activ — `cod`, adică ramburs; verificat la
 * `/wp-json/wc/store/v1/cart`, câmpul `payment_methods`. Cât timp e `false`,
 * site-ul nu promite plata cu cardul nicăieri.
 *
 * Se trece pe `true` DOAR după ce plata cu cardul chiar funcționează în
 * producție — pașii sunt în NETOPIA.md. Verificarea de încheiere:
 *
 *   curl -s https://SUBDOMENIU/wp-json/wc/store/v1/cart | grep payment_methods
 *
 * Când răspunsul conține „netopiapayments”, comutatorul poate trece pe `true`
 * și se rulează din nou `node build.js`.
 */
const PLATI = {
  /**
   * OPRIT LA CERERE — 16 august 2026. Magazinul rămâne pe ramburs.
   *
   * Arhitectura pentru card NU a fost ștearsă, ci pusă în adormire:
   *   · intrările de metodă sunt comentate mai jos, nu tăiate;
   *   · blocul NETOPIA din `assets/js/checkout.js` e comentat, cu marcaj;
   *   · `wordpress/netopia-direct-redirect.php` rămâne neatins;
   *   · pașii compleți de reactivare sunt în NETOPIA.md.
   *
   * Comutatorul acesta este singurul lucru care trebuie mutat pe `true` ca
   * site-ul să promită din nou plata cu cardul: pagina „Metode de plată”,
   * întrebările frecvente, descrierile și formularul de finalizare se rescriu
   * toate din el. Cât timp e `false`, nicăieri pe site nu apare cuvântul card
   * ca metodă disponibilă.
   *
   * Starea reală a magazinului, verificată azi:
   *   curl -s https://usa-garaj.ro/wp-json/wc/store/v1/cart
   *   → "payment_methods":["cod"]
   *
   * Deci `false` nu e o preferință de design, ci adevărul de pe server. Un site
   * care anunță plata cu cardul fără gateway activ este exact genul de
   * promisiune neacoperită pentru care ANPC dă amendă.
   */
  card: false,
  procesator: 'NETOPIA Payments',
  procesatorUrl: 'https://netopia-payments.com',
  carduri: ['Visa', 'Visa Electron', 'Mastercard', 'Maestro'],
  metode: [
    {
      cod: 'cod',
      nume: 'Ramburs la livrare',
      text: 'Plătiți curierului, în numerar, în momentul livrării. Metodă disponibilă pentru toate produsele din catalog.',
      activ: true
    }

    /* ---------------------------------------------------------------------
       ADORMITE. Se readuc în listă la reactivarea plății online.
       Cardul depinde și de comutatorul `card` de mai sus; transferul bancar
       poate fi reactivat singur, fiind o metodă manuală, fără gateway.

    ,{
      cod: 'card',
      nume: 'Card bancar, online',
      text: 'Plată cu cardul în pagina securizată a procesatorului. Datele cardului se introduc pe serverele procesatorului, nu pe site-ul nostru, iar magazinul nu le stochează.',
      activ: true
    },
    {
      cod: 'transfer',
      nume: 'Transfer bancar (ordin de plată)',
      text: 'Pentru persoane juridice și comenzi pe bază de factură proformă. Detaliile de cont se transmit la confirmarea comenzii.',
      activ: true
    }
    --------------------------------------------------------------------- */
  ]
};

const ORIGINE = 'https://usa-garaj.ro';
const IESIRE = __dirname;
const VER = 'v=51';

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

/* „Acasă” și „Magazin” au fost scoase din bara de sus: sigla duce deja la prima
   pagină, iar magazinul e la un clic prin oricare dintre categorii, prin
   butonul „Produsele noastre” și prin subsol. O bară cu opt intrări obosește
   ochiul mai mult decât ajută; rămân șase, toate distincte între ele.
   Legăturile există în continuare în subsol și în harta site-ului. */
const NAV = [
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
    /* Coșul este AICI, nu în alt magazin. Cât timp acest link ducea în afară,
       tot restul integrării nu conta: un singur clic scotea clientul din site. */
    ['cos.html', 'Coșul meu']
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
      streetAddress: 'Strada Radu de la Afumați 17, Sc. G',
      addressLocality: 'Târgoviște',
      postalCode: '130150',
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
<meta name="theme-color" content="#f4f2ed">

${o.noindex ? `<meta name="robots" content="noindex, nofollow">
` : ''}<meta property="og:type" content="${o.ogType || 'website'}">
<meta property="og:locale" content="ro_RO">
<meta property="og:site_name" content="${FIRMA.marca}">
<meta property="og:title" content="${esc(o.titlu)}">
<meta property="og:description" content="${esc(o.descriere)}">

<link rel="icon" href="${base}assets/img/logo-abba-confort.jpeg" type="image/jpeg">
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
      <span class="brand__mark" aria-hidden="true"></span>
      <span class="brand__name">
        <b>Ușă&#8288;-&#8288;Garaj<span style="color:var(--acc)">.ro</span></b>
        <small>Parte a Grupului Abba Confort</small>
      </span>
    </a>

    <nav class="nav" aria-label="Navigare principală">
        ${nav}
    </nav>

    <div class="hdr__actions">
      ${MAGAZIN.activ ? `<a class="icon-btn cos-buton" href="${base}cos.html" aria-label="Coșul de cumpărături">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 4h2.2l2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.55L20.6 8H6.4"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>
        <span class="cos-buton__n" data-cos-numar hidden>0</span>
      </a>
      ` : ''}<button type="button" class="btn btn--primary hdr__cta" data-switch-open="">
        <span class="hdr__cta-lung">Produsele noastre</span>
        <span class="hdr__cta-scurt">Produse</span>
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
          <span class="brand__mark" aria-hidden="true"></span>
          <span class="brand__name">
            <b>Ușă&#8288;-&#8288;Garaj<span style="color:var(--acc)">.ro</span></b>
            <small>Parte a Grupului Abba Confort</small>
          </span>
        </a>
        <p style="font-size:var(--t--1);color:var(--ink-muted);max-inline-size:34ch">
          Uși de garaj tip rulou cu lamele de aluminiu, acționate cu telecomandă.
          Proiectare, montaj și service.
        </p>
        <img class="ftr__sigla" src="${base}assets/img/logo-abba-confort.jpeg"
             alt="ABBA CONFORT — problema ta, soluția noastră"
             width="1600" height="1600" loading="lazy" decoding="async">
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
  <div class="switcher__panel" role="dialog" aria-modal="true" aria-label="Produsele noastre" tabindex="-1">
    <p class="switcher__bar">
      <span><strong>Produsele noastre</strong> · uși de garaj rulou</span>
      <span class="switcher__idx" id="sw-idx"></span>
    </p>
    <div class="switcher__viewport" id="sw-viewport">
      <div class="switcher__rail" id="sw-rail" role="listbox" aria-label="Produse disponibile"></div>
    </div>
    <div class="switcher__caption">
      <p class="switcher__name" id="sw-name"></p>
      <p class="switcher__specs" id="sw-specs"></p>
      <p class="switcher__price" id="sw-price"></p>
      <button type="button" class="btn btn--sm btn--ghost qv__toggle" id="sw-qv-toggle"
              aria-expanded="false" aria-controls="sw-qv">
        Vizualizare rapidă <kbd>V</kbd>
      </button>

      <!-- Acțiunile stăteau în coloana din dreapta a vizualizării rapide, deci
           ieșeau centrate FAȚĂ DE EA, adică împinse spre marginea din dreapta a
           panoului. Mutate aici, sub butonul de vizualizare, cad pe aceeași
           axă cu el și cu numele produsului. Rămân vizibile și cu vizualizarea
           închisă: „adaugă în coș” e util în orice moment al răsfoirii. -->
      <div class="switcher__actiuni">
        <div class="qv__actiuni">
          <button type="button" class="btn btn--primary btn--sm" id="sw-qv-adauga">Adaugă în coș</button>
          <a class="btn btn--ghost btn--sm" id="sw-qv-link" href="#">Vezi pagina produsului</a>
        </div>
        <p class="qv__stare" id="sw-qv-stare" role="status" aria-live="polite"></p>
      </div>
    </div>

    <!-- Vizualizarea rapidă: fotografiile reale, cotele și adăugarea în coș,
         fără să părăsești răsfoirea. Se completează din switcher.js. -->
    <div class="qv" id="sw-qv" hidden>
      <div class="qv__galerie" id="sw-qv-galerie" data-galerie></div>
      <div class="qv__date">
        <dl class="qv__spec" id="sw-qv-spec"></dl>
      </div>
    </div>

    <p class="switcher__foot">
      <span><kbd>⇧</kbd><kbd>Tab</kbd> înainte</span>
      <span><kbd>←</kbd><kbd>→</kbd> navighezi</span>
      <span><kbd>V</kbd> vizualizare rapidă</span>
      <span><kbd>Enter</kbd> confirmi</span>
      <span><kbd>Esc</kbd> anulezi</span>
    </p>
    <p class="sr-only" id="sw-live" role="status" aria-live="polite"></p>
  </div>
</div>

<button type="button" class="switch-fab" data-switch-open="">
  <kbd>⇧</kbd> Produsele noastre
</button>

<script>window.UG_BASE = ${JSON.stringify(base)};
window.UG_MAGAZIN = ${JSON.stringify({ store: MAGAZIN.store, activ: MAGAZIN.activ, card: PLATI.card })};</script>
<script src="${base}assets/js/catalog.js?${VER}"></script>
<script src="${base}assets/js/door.js?${VER}"></script>
<script src="${base}assets/js/switcher.js?${VER}"></script>
<script src="${base}assets/js/lupa.js?${VER}"></script>
${MAGAZIN.activ ? `<script src="${base}assets/js/cos.js?${VER}"></script>
<script src="${base}assets/js/cos-ui.js?${VER}"></script>
` : ''}${(o.scripturi || []).map((s) => `<script src="${base}assets/js/${s}?${VER}"></script>`).join('\n')}
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
  const c = UG.culoareDesen(p);
  const red = UG.reducere(p);
  const raluri = UG.culoriProdus(p);
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
      <button type="button" class="btn btn--sm btn--ghost" data-switch-open="${p.id}">Răsfoiește <kbd>⇧</kbd></button>
    </div>
    ${MAGAZIN.activ ? `<button type="button" class="btn btn--primary btn--sm card__cos" data-cos-adauga="${p.id}">Adaugă în coș</button>` : ''}
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

module.exports = { pagina, cardHTML, grilaHTML, FILTRE, FIRMA, PLATI, MAGAZIN, esc, scrie, UG, NAV, verificaCoteImagini };

/* Restul generatorului este în build-pagini.js, încărcat mai jos, ca fișierul
   acesta să rămână la o dimensiune citibilă. */
require('./build-pagini.js');
