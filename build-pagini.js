/**
 * build-pagini.js — conținutul propriu-zis al paginilor.
 * Încărcat de build.js, care oferă șabloanele.
 */

'use strict';

const B = require('./build.js');
const { pagina, grilaHTML, FILTRE, FIRMA, PLATI, MAGAZIN, esc, scrie, UG } = B;
const { PRODUSE, RAL, LAMELA, CATEGORII } = UG;
const lei = UG.lei;

const ORIGINE = 'https://usa-garaj.ro';
const scrise = [];
const S = (rel, html) => scrise.push(scrie(rel, html));

/* ==========================================================================
   Bucăți refolosite
   ========================================================================== */

/**
 * Capul de rubrică.
 *
 * `tag` contează: fiecare pagină trebuie să aibă exact un `h1`, iar pe paginile
 * de listă și de conținut titlul rubricii ESTE titlul paginii. Pe prima pagină
 * titlul principal e în erou, deci rubricile rămân `h2`.
 */
const rubrica = (n, supra, titlu, lede, extra = '', tag = 'h2') => `
    <div class="section-head reveal">
      <div class="section-head__text">
        <p class="eyebrow"><i class="eyebrow__n">${n}</i>${supra}</p>
        <${tag}>${titlu}</${tag}>
        ${lede ? `<p class="lede">${lede}</p>` : ''}
      </div>
      ${extra}
    </div>`;

const NOTA_COTE = `<div class="note reveal">
  <div>
    <p><b>Atenție la cote.</b> Dimensiunile scrise în denumirea produsului, sub forma
    L × H, includ ghidajele și caseta. Pentru spațiul util de trecere se scad
    <b>150 mm pe lățime și 300 mm pe înălțime</b> la ușile cu lamelă de 55 mm,
    respectiv <b>180 mm pe lățime și 377 mm pe înălțime</b> la cele cu lamelă de
    77 mm. Acolo unde producătorul declară explicit spațiul de trecere, acesta
    este afișat pe pagina produsului.</p>
  </div>
</div>`;

const INTREBARI = [
  ['Ce se întâmplă dacă rămâne garajul fără curent electric?',
   'Ușa poate fi acționată și manual. Sistemul este livrat cu manivelă și legătură cardanică, tocmai pentru situațiile în care nu există alimentare cu energie electrică.'],
  ['Ce conține livrarea unei uși de garaj automate?',
   'Livrarea include accesoriile necesare montajului: legătura cardanică, manivela, motorul tubular, centrala de comandă și 2 telecomenzi.'],
  ['Dimensiunile din denumire sunt cele ale golului de trecere?',
   'Nu. Dimensiunile menționate ca L × H includ ghidajele și caseta. Pentru spațiul util de trecere se scad 150 mm pe lățime și 300 mm pe înălțime la ușile cu lamelă de 55 mm, respectiv 180 mm pe lățime și 377 mm pe înălțime la cele cu lamelă de 77 mm.'],
  ['Care este diferența dintre lamela de 55 mm și cea de 77 mm?',
   'Lamela de 55 mm are 14 mm grosime și o masă a tabliei de 4 kg/m², cu ax din oțel zincat de Ø60 mm și ghidaje de 75 × 30 mm. Lamela de 77 mm are 18,5 mm grosime și 6 kg/m², cu ax de Ø70 mm și ghidaje de 90 × 35 mm, fiind indicată pentru deschideri mai mari.'],
  /* Timpul NU este unul singur pe tot catalogul: magazinul declară 10 secunde
     la majoritatea ușilor, 25 la 401/400/398/397/393/391 și 30 la 394. Un
     răspuns cu o singură cifră contrazicea fișa produsului. */
  ['Cât durează deschiderea ușii?',
   'Depinde de model. Magazinul declară aproximativ 10 secunde la majoritatea ușilor, 25 de secunde la ușile de 3000–3200 mm lățime și 30 de secunde la modelul de 3000 × 3000 mm cu lamelă de 55 mm. Valoarea exactă este trecută în fișa fiecărui produs.'],
  ['Se pot executa uși la alte dimensiuni decât cele din magazin?',
   'Da. Pe lângă produsele standard, disponibile în stoc, executăm și proiecte personalizate, la dimensiunile golului dumneavoastră.'],
  ['Cum pot plăti comanda?',
   PLATI.card
     ? `Puteți plăti cu cardul, online, prin ${PLATI.procesator} — acceptăm ${PLATI.carduri.join(', ')} — sau ramburs la livrare, în numerar. Pentru persoane juridice este disponibil și transferul bancar pe bază de proformă. Datele cardului se introduc pe pagina securizată a procesatorului, nu pe site-ul nostru.`
     : 'Comenzile se achită ramburs la livrare, în numerar, sau prin transfer bancar pe bază de factură proformă, pentru persoane juridice. Plata online cu cardul urmează să fie activată.']
];

const faqHTML = () => `<div class="faq reveal">
${INTREBARI.map(([q, a]) => `  <details>
    <summary>${q}</summary>
    <div><p>${a}</p></div>
  </details>`).join('\n')}
</div>`;

const faqLd = () => JSON.stringify({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: INTREBARI.map(([q, a]) => ({
    '@type': 'Question', name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }))
});

function cardIdentitate(base) {
  return `<div class="idcard reveal">
  <p class="idcard__head">Date de identificare <span>· verificabile la ONRC</span></p>
  <dl class="idcard__body">
    <div class="idrow"><dt>Denumire</dt><dd>${FIRMA.nume}</dd></div>
    <div class="idrow idrow--key"><dt>CUI</dt><dd>${FIRMA.cui}</dd></div>
    <div class="idrow idrow--key"><dt>Nr. Reg. Com.</dt><dd>${FIRMA.j}</dd></div>
    <div class="idrow"><dt>Sediu social</dt><dd>${FIRMA.adresa}</dd></div>
    <div class="idrow"><dt>Telefon</dt><dd><a href="tel:${FIRMA.telHref}">${FIRMA.tel}</a></dd></div>
    <div class="idrow"><dt>E-mail</dt><dd><a href="mailto:${FIRMA.email}">${FIRMA.email}</a></dd></div>
    <div class="idrow"><dt>Magazin</dt><dd><a href="${base}magazin.html">Catalogul nostru</a></dd></div>
  </dl>
</div>`;
}

const firimituri = (base, cai) => `<nav class="crumbs" aria-label="Firimituri">
  ${cai.map((c, i) => c[1] && i < cai.length - 1
    ? `<a href="${base}${c[1]}">${c[0]}</a>`
    : `<span aria-current="page">${c[0]}</span>`).join('<i aria-hidden="true">/</i>')}
</nav>`;

/* ==========================================================================
   Pagina principală
   ========================================================================== */

const s = UG.sumar();
const eroul = PRODUSE.filter((p) => p.id === 396)[0];

const HERO = `<section class="hero">
  <div class="wrap wrap--wide hero__grid">
    <div>
      <p class="eyebrow">Uși de garaj tip rulou · lamele ABBA</p>
      <h1 class="hero__title">Uși de garaj<br>tip rulou,<br><em>la milimetru.</em></h1>
      <p class="lede hero__lede">
        Tablier din lamele de aluminiu cu spumă poliuretanică, casetă compactă
        deasupra golului și acționare cu telecomandă — cu manivelă de rezervă,
        pentru zilele fără curent. Ușa urcă pe verticală, așa că spațiul din
        garaj rămâne al dumneavoastră.
      </p>
      <div class="hero__cta">
        <button type="button" class="btn btn--orange btn--lg" data-switch-open="">
          Răsfoiește produsele noastre
          <span class="btn__kbd"><kbd>⇧</kbd><kbd>Tab</kbd></span>
        </button>
      </div>
      <dl class="stats">
        <div class="stat"><dd class="stat__v">${s.total}</dd><dt class="stat__k">configurații în catalog</dt></div>
        <div class="stat"><dd class="stat__v">${s.laPromotie}</dd><dt class="stat__k">produse la preț redus</dt></div>
        <div class="stat"><dd class="stat__v">${new Intl.NumberFormat('ro-RO').format(s.pretMin)}<sup>lei</sup></dd><dt class="stat__k">cel mai accesibil preț</dt></div>
        <div class="stat"><dd class="stat__v">${s.latimeMin}–${s.latimeMax}<sup>mm</sup></dd><dt class="stat__k">interval de lățimi</dt></div>
      </dl>
    </div>

    <figure class="hero__panel">
      <div class="hero__stage plate ticks"><div id="hero-door"></div></div>
      <figcaption class="readout">
        <p class="readout__head"><span>Stare</span><b id="ro-stare" data-stare="jos">Închisă</b></p>
        <span class="readout__bar"><i id="ro-bara"></i></span>
        <dl class="readout__specs">
          <div><dt>Cotă</dt><dd id="ro-cota">—</dd></div>
          <div><dt>Lamelă</dt><dd id="ro-lamela">—</dd></div>
          <div><dt>Preț</dt><dd id="ro-pret">—</dd></div>
        </dl>
      </figcaption>
    </figure>
  </div>
</section>`;

const TICKER = `<div class="ticker" aria-hidden="true">
  <div class="ticker__track">
    ${Array(2).fill(['Transport gratuit','Montaj asigurat','Motor tubular cu centrală de comandă','2 telecomenzi incluse','Acționare manuală de siguranță','Deschidere în 10 secunde','Service și mentenanță','Proiecte la comandă']
      .map((t) => `<span class="ticker__item">${t}</span>`).join('')).join('')}
  </div>
</div>`;

const COMUTATOR = `<section class="section" id="comutator">
  <div class="wrap">
    <div class="switch-pitch">
      <div class="reveal">
        <p class="eyebrow"><i class="eyebrow__n">01</i>Mod de răsfoire</p>
        <h2 style="margin-block:var(--s-5) 0">Produsele noastre</h2>
        <p class="lede" style="margin-block-start:var(--s-5)">
          Douăzeci și una de uși nu se compară derulând o pagină. Țineți apăsată
          tasta <kbd>⇧</kbd> și apăsați <kbd>Tab</kbd>: catalogul se ridică peste
          pagină, iar ușile trec una câte una prin fața dumneavoastră, la scară,
          cu dimensiunea și prețul afișate dedesubt.
        </p>
        <ul class="hint-list">
          <li><span class="keys"><kbd>⇧</kbd><kbd>Tab</kbd></span> deschide și avansează</li>
          <li><span class="keys"><kbd>←</kbd><kbd>→</kbd></span> navighează în ambele sensuri</li>
          <li><span class="keys"><kbd>Enter</kbd></span> confirmă selecția</li>
          <li><span class="keys"><kbd>Esc</kbd></span> anulează, fără să schimbe nimic</li>
        </ul>
        <p style="margin-block-start:var(--s-6)">
          <button type="button" class="btn btn--primary" data-switch-open="">Deschide produsele noastre</button>
        </p>
      </div>
      <div class="switch-preview reveal" data-switch-open="" role="button" tabindex="0" aria-label="Deschide produsele noastre">
        <div class="switch-preview__rail" id="preview-rail"></div>
        <p class="switch-preview__cap" id="preview-cap"></p>
      </div>
    </div>
  </div>
</section>`;

const SERVICII = [
  ['Proiectare și montaj', 'Proiectăm și montăm uși de garaj tip rulou, adaptate golului existent. Montajul este asigurat de echipa noastră.'],
  ['Acționare cu telecomandă', 'Motor tubular, centrală de comandă și două telecomenzi, livrate împreună cu ușa. Deschiderea durează circa 10 secunde.'],
  ['Deschidere manuală', 'Manivelă și legătură cardanică, pentru situațiile în care alimentarea cu energie electrică lipsește.'],
  ['Service și mentenanță', 'Asigurăm mentenanța și service-ul tehnic al ușilor montate, pe toată durata de funcționare.'],
  ['Proiecte personalizate', 'Pe lângă produsele standard, disponibile în stoc, executăm uși la dimensiunile cerute de dumneavoastră.'],
  ['Transport gratuit', 'Transportul este inclus în prețul afișat, fără costuri adăugate la finalizarea comenzii.']
];

const svcHTML = () => `<div class="svc-grid reveal">
${SERVICII.map(([t, d], i) => `  <div class="svc">
    <span class="svc__n">${String(i + 1).padStart(2, '0')}</span>
    <h3>${t}</h3>
    <p>${d}</p>
  </div>`).join('\n')}
</div>`;

const GALERIE = `<div class="gallery reveal">
  <figure><img src="assets/img/usa-maro-8014-8019.jpeg" width="255" height="255" loading="lazy" decoding="async" alt="Ușă de garaj tip rulou, lamele maro, montată la o casă de locuit."><figcaption>Lamele maro 8014 / 8019</figcaption></figure>
  <figure><img src="assets/img/usa-gri-antracit.jpg" width="510" height="495" loading="lazy" decoding="async" alt="Ușă de garaj tip rulou în gri antracit, cu caseta montată deasupra golului."><figcaption>Gri antracit, RAL 7016</figcaption></figure>
  <figure><img src="assets/img/usa-detaliu-01.jpeg" width="275" height="183" loading="lazy" decoding="async" alt="Detaliu cu ghidajul lateral din aluminiu și capătul lamelelor."><figcaption>Detaliu ghidaj lateral</figcaption></figure>
  <figure><img src="assets/img/usa-detaliu-02.jpeg" width="300" height="300" loading="lazy" decoding="async" alt="Detaliu cu tablierul din lamele de aluminiu și lamela finală."><figcaption>Detaliu tablier</figcaption></figure>
</div>`;

const contactHTML = (base) => `<div class="contact-grid">
  <div class="contact-cta reveal">
    <div class="contact-lines">
      <a class="contact-line" href="tel:${FIRMA.telHref}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"/></svg>
        <div><small>Telefon</small><b>${FIRMA.tel}</b></div>
      </a>
      <a class="contact-line" href="mailto:${FIRMA.email}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>
        <div><small>Poștă electronică</small><b>${FIRMA.email}</b></div>
      </a>
      <a class="contact-line" href="magazin.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8Z"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7"/></svg>
        <div><small>Comandă online</small><b>Vezi catalogul și comandă</b></div>
      </a>
    </div>
    <p class="lede" style="font-size:var(--t--1)">
      Pentru o ofertă corectă, trimiteți-ne lățimea și înălțimea golului măsurate
      la zid, precum și spațiul disponibil deasupra golului, necesar pentru
      montarea casetei.
    </p>
  </div>
  ${cardIdentitate(base)}
</div>`;

/* --- index.html ---------------------------------------------------------- */

const recomandate = [396, 401, 388, 180, 386, 161, 397, 178]
  .map((id) => PRODUSE.filter((p) => p.id === id)[0]).filter(Boolean);

S('index.html', pagina({
  base: '', activ: 'index.html',
  titlu: 'Uși de garaj tip rulou ABBA — lamele de 55 mm și 77 mm | Usa-garaj.ro',
  descriere: `Uși de garaj tip rulou ABBA, cu lamele de 55 mm și 77 mm, acționare automată cu telecomandă. ${s.total} de configurații, de la ${lei(s.pretMin)}, transport gratuit și montaj asigurat. ${FIRMA.nume}, CUI ${FIRMA.cui}, ${FIRMA.j}.`,
  ld: faqLd(),
  corp: `${HERO}
${TICKER}
${COMUTATOR}

<section class="section section--alt" id="catalog">
  <div class="wrap wrap--wide">
    ${rubrica('02', 'Selecție din catalog', 'Fiecare ușă, desenată la cotele ei',
      'Desenele nu sunt ilustrații decorative: lățimea, înălțimea, pasul lamelei, caseta și ghidajele sunt redate la scară, din specificația fiecărui produs. Treceți cu cursorul peste o cartelă ca să vedeți fotografia reală.',
      `<p class="filter-count mono"><b>${recomandate.length}</b> din ${s.total} produse</p>`)}
    ${grilaHTML(recomandate, '')}
    <p style="margin-block-start:var(--s-6);text-align:center">
      <a class="btn btn--primary btn--lg" href="magazin.html">Vezi toate cele ${s.total} de produse</a>
    </p>
  </div>
</section>

<section class="section" id="tehnic">
  <div class="wrap">
    ${rubrica('03', 'Fișă tehnică', '55 mm sau 77 mm',
      'Diferența dintre cele două familii nu este estetică, ci structurală. Lamela mai groasă înseamnă tablier mai rigid, ax mai gros și ghidaje mai late — adică deschideri mai mari, executate în siguranță.')}
    <div class="stack-lg">
      ${tabelTehnic()}
      ${NOTA_COTE}
      <p><a class="btn btn--ghost" href="tehnic.html">Toate detaliile tehnice</a></p>
    </div>
  </div>
</section>

<section class="section section--alt" id="servicii">
  <div class="wrap">
    ${rubrica('04', 'Ce facem, de la măsurătoare la mentenanță', 'Serviciile noastre', '')}
    ${svcHTML()}
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${rubrica('05', 'Din teren', 'Lucrări executate',
      'Fotografii de la montaje reale. Sunt păstrate la dimensiunea lor originală, fără mărire forțată.')}
    ${GALERIE}
  </div>
</section>

<section class="section section--alt" id="intrebari">
  <div class="wrap">
    ${rubrica('06', 'Înainte să comandați', 'Întrebări frecvente', '')}
    ${faqHTML()}
  </div>
</section>

<section class="section" id="contact">
  <div class="wrap">
    ${rubrica('07', 'Stăm de vorbă', 'Contact și date de identificare',
      'Spuneți-ne dimensiunile golului și culoarea dorită, iar noi vă răspundem cu varianta potrivită din catalog sau cu o ofertă la comandă.', '', 'h2')}
    ${contactHTML('')}
  </div>
</section>`
}));

/* --- Tabelul tehnic ------------------------------------------------------ */

function tabelTehnic() {
  const randuri = [
    ['Pasul lamelei', (g) => g.pas + ' mm'],
    ['Grosimea lamelei', (g) => String(g.grosime).replace('.', ',') + ' mm'],
    ['Masa tabliei', (g) => g.masa + ' kg/m²'],
    ['Caseta din aluminiu', (g) => g.caseta + ' mm'],
    ['Ghidaje din aluminiu', (g) => (g.pas === 55 ? '75 × 30 mm' : '90 × 35 mm')],
    ['Ax din oțel zincat', (g) => 'Ø ' + g.ax + ' mm'],
    ['Umplutură', () => 'spumă poliuretanică'],
    ['Lagăre', () => 'oțel']
  ];
  return `<div class="spec-panel reveal">
  <div class="table-scroll">
    <table class="spec">
      <caption>Cote constructive comparate</caption>
      <thead><tr><th scope="col">Element</th><th scope="col">Lamelă 55 mm</th><th scope="col">Lamelă 77 mm</th></tr></thead>
      <tbody>
${randuri.map((r) => `        <tr><th scope="row">${r[0]}</th><td>${r[1](LAMELA[55])}</td><td>${r[1](LAMELA[77])}</td></tr>`).join('\n')}
      </tbody>
    </table>
  </div>
</div>`;
}

/* --- magazin.html + categorii -------------------------------------------- */

function paginaLista(o) {
  return pagina({
    base: o.base, activ: o.activ,
    titlu: o.titlu, descriere: o.descriere,
    corp: `<section class="section">
  <div class="wrap wrap--wide">
    ${firimituri(o.base, o.cai)}
    ${rubrica(o.n, o.supra, o.h1, o.lede,
      `<p class="filter-count mono" id="filter-count"><b>${o.lista.length}</b> din ${o.lista.length} produse</p>`, 'h1')}
    ${FILTRE}
    ${grilaHTML(o.lista, o.base, 2)}
    <p class="empty-state" id="empty" hidden>Nicio ușă nu corespunde acestor filtre. Încercați o altă combinație.</p>
  </div>
</section>`
  });
}

S('magazin.html', paginaLista({
  base: '', activ: 'magazin.html', n: '01', supra: 'Catalog complet',
  cai: [['Acasă', 'index.html'], ['Magazin', null]],
  titlu: `Magazin — toate cele ${s.total} de uși de garaj rulou | Usa-garaj.ro`,
  descriere: `Catalogul complet: ${s.total} de uși de garaj tip rulou cu lamele de 55 mm și 77 mm, de la ${lei(s.pretMin)}. Prețuri și disponibilitate întocmai ca în magazin.`,
  h1: `Toate cele ${s.total} de uși`,
  lede: `Catalogul întreg, cu prețurile și reducerile din magazin. Filtrele de mai jos lucrează pe aceeași listă: ${UG.dinCategorie(CATEGORII.C55).length} de uși cu lamelă de 55 mm și ${UG.dinCategorie(CATEGORII.C77).length} cu lamelă de 77 mm.`,
  lista: PRODUSE
}));

const CATEGORII_PAGINI = [
  { fisier: 'usi-garaj-rulou-55-mm', cat: CATEGORII.C55, n: '01',
    h1: 'Uși garaj rulou 55 mm', supra: 'Categorie',
    lede: 'Lamelă de 55 mm, 14 mm grosime, masă a tabliei de 4 kg/m², ax de Ø60 mm și ghidaje de 75 × 30 mm. Varianta potrivită pentru garaje de locuință.' },
  { fisier: 'usi-garaj-rulou-77-mm', cat: CATEGORII.C77, n: '01',
    h1: 'Uși garaj rulou 77 mm', supra: 'Categorie',
    lede: 'Lamelă de 77 mm, 18,5 mm grosime, masă a tabliei de 6 kg/m², ax de Ø70 mm și ghidaje de 90 × 35 mm. Pentru deschideri mari și utilizare intensă.' },
  { fisier: 'promotii', cat: CATEGORII.PRO, n: '01',
    h1: 'Promoții', supra: 'Preț redus',
    lede: 'Produsele aflate în categoria „PROMOȚII” a magazinului. Prețul tăiat și cel curent sunt cele din magazin, neschimbate.' },
  { fisier: 'produse-noi', cat: CATEGORII.NOI, n: '01',
    h1: 'Produse noi', supra: 'Intrate recent',
    lede: 'Produsele aflate în categoria „PRODUSE NOI” a magazinului.' }
];

for (const c of CATEGORII_PAGINI) {
  const lista = UG.dinCategorie(c.cat);
  S(`categorie/${c.fisier}.html`, paginaLista({
    base: '../', activ: `categorie/${c.fisier}.html`, n: c.n, supra: c.supra,
    cai: [['Acasă', 'index.html'], ['Magazin', 'magazin.html'], [c.h1, null]],
    titlu: `${c.h1} — ${lista.length} produse | Usa-garaj.ro`,
    descriere: `${c.h1}: ${lista.length} produse în catalogul ${FIRMA.marca}. ${c.lede}`,
    h1: c.h1, lede: c.lede, lista
  }));
}

/* --- Paginile de produs -------------------------------------------------- */

for (const p of PRODUSE) {
  const c = UG.culoareDesen(p);
  const red = UG.reducere(p);
  const raluri = UG.culoriProdus(p);
  const paragrafe = UG.paragrafe(p);

  /* Rândurile fișei.
     Ordinea: mai întâi ce ține de produsul concret — gabarit, gol de trecere,
     culoare — apoi specificațiile așa cum le declară magazinul PENTRU ACEST
     produs, apoi codul.
     `sarite` sunt rândurile magazinului deja acoperite mai sus; se elimină ca
     să nu apară dimensiunea de două ori, o dată ca „3000 × 2500 mm” și o dată
     ca „L3000 H2500”. */
  const sarite = /^(dimensiun|culoare|spa[țt]iu util|cote utile)/i;
  const randuriMagazin = p.spec.filter(([k]) => !sarite.test(k));

  const randuri = [
    ['Dimensiune totală (L × H)', `${p.l} × ${p.h} mm`],
    ...(p.pasaj ? [['Spațiu util de trecere', p.pasaj.replace(/^L/, 'L ').replace(/ H/, ' × H ')]] : []),
    ['Pasul lamelei', `${p.lamela} mm`],
    ['Culoare', raluri],
    ...randuriMagazin,
    ['Cod produs', String(p.id)]
  ];

  /* Magazinul nu publică specificații pentru toate produsele. Unde lipsesc, se
     spune asta pe față și se trimite la fișa tehnică a familiei, în loc să se
     treacă drept cote de produs cotele generale de 55/77 mm. */
  const notaSpec = p.spec.length
    ? 'Specificațiile de mai sus sunt cele declarate de magazin pentru acest produs.'
    : `Magazinul nu publică o fișă de specificații pentru acest produs. Cotele constructive ale familiei de ${p.lamela} mm sunt în <a href="../tehnic.html">fișa tehnică</a>.`;

  const inrudite = PRODUSE
    .filter((x) => x.id !== p.id && x.lamela === p.lamela && x.familie === p.familie)
    .slice(0, 4);
  const completare = PRODUSE.filter((x) => x.id !== p.id && inrudite.indexOf(x) === -1).slice(0, 4 - inrudite.length);
  const sugestii = inrudite.concat(completare);

  const ld = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product',
    name: p.nume, sku: String(p.id),
    description: paragrafe[0] || p.nume,
    color: raluri,
    width: { '@type': 'QuantitativeValue', value: p.l, unitCode: 'MMT' },
    height: { '@type': 'QuantitativeValue', value: p.h, unitCode: 'MMT' },
    brand: { '@type': 'Brand', name: 'ABBA' },
    offers: {
      '@type': 'Offer', priceCurrency: 'RON', price: String(p.pret),
      availability: 'https://schema.org/InStock',
      url: UG.urlProdus(p),
      seller: { '@type': 'Organization', name: FIRMA.nume }
    }
  });

  S(`produs/${UG.fisierProdus(p)}.html`, pagina({
    base: '../', activ: '',
    titlu: `${p.nume} — ${lei(p.pret)} | Usa-garaj.ro`,
    descriere: `${p.nume}. ${lei(p.pret)}${p.laPromotie ? `, redus de la ${lei(p.pretReg)}` : ''}. Lamelă ${p.lamela} mm, ${p.l} × ${p.h} mm, ${raluri}. Transport gratuit.`,
    ogType: 'product', ld,
    corp: `<section class="section">
  <div class="wrap">
    ${firimituri('../', [['Acasă', 'index.html'], ['Magazin', 'magazin.html'], [p.nume, null]])}

    <div class="produs">
      <div class="produs__media">
        <div class="plate ticks produs__plansa">${UG.doorSVG(p, { cote: true, titlu: `${p.nume}. Desen la scară cu cote.` })}</div>
        <figure class="produs__foto">
          <div class="produs__foto-banda" data-galerie>
${UG.galerieProdus(p).map((g, i) => `            <img src="../${g.src}" width="${g.l}" height="${g.h}" loading="lazy" decoding="async" tabindex="0" role="button" alt="${i === 0 ? `Fotografie ${p.familie === 'antracit' ? 'ușă de garaj gri antracit' : 'ușă de garaj maro'}` : `Detaliu ${i} — ${esc(p.nume)}`}">`).join('\n')}
          </div>
          <figcaption>${UG.galerieProdus(p).length} fotografii din magazin · ${raluri}</figcaption>
        </figure>
      </div>

      <div class="produs__info">
        <p class="eyebrow"><i class="eyebrow__n">${p.lamela}</i>mm lamelă</p>
        <h1 class="produs__titlu">${esc(p.nume)}</h1>

        <div class="price produs__pret">
          <span class="price__now">${lei(p.pret)}</span>
          ${p.laPromotie ? `<s class="price__was">${lei(p.pretReg)}</s><span class="price__off">−${red}%</span>` : ''}
        </div>
        <p class="produs__stoc"><i aria-hidden="true"></i>În stoc · transport gratuit · montaj asigurat</p>

        ${paragrafe.length ? `<div class="produs__desc">${paragrafe.map((t) => `<p>${esc(t)}</p>`).join('\n            ')}</div>` : ''}

        <div class="table-scroll produs__spec">
          <table class="spec">
            <caption>Specificații</caption>
            <tbody>
${randuri.map(([k, v]) => `              <tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('\n')}
            </tbody>
          </table>
        </div>
        <p class="produs__nota">${notaSpec}</p>

        ${p.colet.length ? `<div class="produs__colet">
          <h2 class="produs__colet-titlu">Conținut colet</h2>
          <ul class="colet">
${p.colet.map((x) => `            <li>${esc(x)}</li>`).join('\n')}
          </ul>
        </div>` : ''}

        <div class="produs__cta">
          <div class="cantitate cantitate--mare">
            <label class="sr-only" for="buc-${p.id}">Cantitate</label>
            <input id="buc-${p.id}" type="number" min="1" max="99" value="1" inputmode="numeric" data-cos-bucati>
          </div>
          <button type="button" class="btn btn--primary btn--lg" data-cos-adauga="${p.id}">Adaugă în coș</button>
          <a class="btn btn--ghost btn--lg" href="tel:${FIRMA.telHref}">Sună la ${FIRMA.tel}</a>
        </div>
        <p class="produs__nota">Prețul include TVA. Transportul se calculează la finalizarea comenzii.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap wrap--wide">
    ${rubrica('02', 'Alte variante', 'Produse înrudite', '')}
    <div class="grid-products">
${sugestii.map((x) => B.cardHTML(x, '../')).join('\n')}
    </div>
  </div>
</section>`
  }));
}

/* --- tehnic.html --------------------------------------------------------- */

S('tehnic.html', pagina({
  base: '', activ: 'tehnic.html',
  titlu: 'Fișă tehnică — uși de garaj rulou 55 mm și 77 mm | Usa-garaj.ro',
  descriere: 'Cote constructive pentru ușile de garaj tip rulou ABBA: pas lamelă, grosime, masă tablier, casetă, ghidaje, ax. Regula de calcul a spațiului util de trecere.',
  corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], ['Tehnic', null]])}
    ${rubrica('01', 'Fișă tehnică', '55 mm sau 77 mm',
      'Diferența dintre cele două familii nu este estetică, ci structurală. Lamela mai groasă înseamnă tablier mai rigid, ax mai gros și ghidaje mai late — adică deschideri mai mari, executate în siguranță.', '', 'h1')}
    <div class="stack-lg">
      ${tabelTehnic()}
      ${NOTA_COTE}
      <div class="spec-panel reveal">
        <div class="table-scroll">
          <table class="spec">
            <caption>Ce cuprinde livrarea unei uși automate</caption>
            <tbody>
              <tr><th scope="row">Acționare</th><td>motor tubular cu centrală de comandă</td></tr>
              <tr><th scope="row">Telecomenzi</th><td>2 bucăți</td></tr>
              <tr><th scope="row">Acționare de rezervă</th><td>manivelă și legătură cardanică</td></tr>
              <tr><th scope="row">Timp de deschidere / închidere</th><td>circa 10 secunde</td></tr>
              <tr><th scope="row">Lamelă finală</th><td>din aluminiu, inclusă</td></tr>
              <tr><th scope="row">Grosime tablă casetă</th><td>0,95 mm</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>`
}));

/* --- intrebari-frecvente.html -------------------------------------------- */

S('intrebari-frecvente.html', pagina({
  base: '', activ: 'intrebari-frecvente.html',
  titlu: 'Întrebări frecvente — uși de garaj rulou | Usa-garaj.ro',
  descriere: 'Răspunsuri la întrebările frecvente despre ușile de garaj tip rulou: acționare fără curent, conținutul livrării, cote, diferența dintre lamela de 55 și 77 mm.',
  ld: faqLd(),
  corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], ['Întrebări frecvente', null]])}
    ${rubrica('01', 'Înainte să comandați', 'Întrebări frecvente', '', '', 'h1')}
    ${faqHTML()}
  </div>
</section>`
}));

/* --- contact.html -------------------------------------------------------- */

S('contact.html', pagina({
  base: '', activ: 'contact.html',
  titlu: `Contact — ${FIRMA.nume}, CUI ${FIRMA.cui}, ${FIRMA.j} | Usa-garaj.ro`,
  descriere: `Contact ${FIRMA.marca}: telefon ${FIRMA.tel}, e-mail ${FIRMA.email}. ${FIRMA.nume}, CUI ${FIRMA.cui}, ${FIRMA.j}, ${FIRMA.adresa}.`,
  corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], ['Contact', null]])}
    ${rubrica('01', 'Stăm de vorbă', 'Contact și date de identificare',
      'Spuneți-ne dimensiunile golului și culoarea dorită, iar noi vă răspundem cu varianta potrivită din catalog sau cu o ofertă la comandă.', '', 'h1')}
    ${contactHTML('')}
  </div>
</section>`
}));

/* ==========================================================================
   Paginile de conținut, preluate de pe site-ul existent
   ========================================================================== */

const PAGINI_CONTINUT = [
  ['termeni-si-conditii', 'Termeni și condiții'],
  ['confidentialitate', 'Confidențialitate'],
  ['politica-de-cookies', 'Politica de cookie-uri'],
  ['anulare-tranzactie', 'Anulare tranzacție'],
  ['cum-cumpar', 'Cum cumpăr'],
  ['metode-de-plata', 'Metode de plată'],
  ['transport-si-retururi', 'Transport și retururi'],
  ['solutionarea-litigiilor', 'Soluționarea litigiilor']
];

/** Păstrează doar marcajul semantic; aruncă stilurile și scripturile temei. */
function curata(html) {
  let t = html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Se păstrează un set restrâns de etichete; restul se elimină, textul rămâne.
  t = t.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (intreg, tag, attr) => {
    const t2 = tag.toLowerCase();
    const permise = ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'br', 'a'];
    if (permise.indexOf(t2) === -1) return '';
    if (t2 === 'a') {
      const href = (attr.match(/href\s*=\s*"([^"]*)"/i) || [])[1];
      return intreg[1] === '/' ? '</a>' : (href ? `<a href="${href}" rel="noopener">` : '<a>');
    }
    return intreg[1] === '/' ? `</${t2}>` : `<${t2}>`;
  });

  return t.replace(/(\s|&nbsp;)+/g, ' ')
          .replace(/<p>\s*<\/p>/g, '')
          .trim();
}

/**
 * Pagina „Metode de plată”, scrisă din `PLATI`, nu preluată de pe magazin.
 *
 * Pe usa-garaj.ro pagina este goală, iar varianta generată până acum spunea
 * doar atât — „textul urmează”. Nu e un răspuns pentru un cumpărător care vrea
 * să știe cum plătește. Aici se descriu metodele chiar active în magazin, iar
 * cardul apare NUMAI dacă `PLATI.card` este adevărat: dacă gateway-ul nu e
 * activat, site-ul nu are voie să-l promită.
 */
function metodeDePlataHTML() {
  const active = PLATI.metode.filter((m) => m.cod === 'card' ? PLATI.card : m.activ);

  const cardActiv = PLATI.card;

  return `
      <p>Comanda se finalizează aici, pe site. Adăugați produsele în
      <a href="cos.html">coș</a>, completați datele de livrare și alegeți una
      dintre metodele de mai jos. Prețurile afișate sunt cele finale, în lei.</p>

      <h2>Metode disponibile</h2>
      <ul>
${active.map((m) => `        <li><b>${esc(m.nume)}</b> — ${esc(m.text)}</li>`).join('\n')}
      </ul>

${cardActiv ? `      <h2>Plata cu cardul</h2>
      <p>Plățile cu cardul sunt procesate de <b>${esc(PLATI.procesator)}</b>
      (<a href="${PLATI.procesatorUrl}" rel="noopener nofollow">${PLATI.procesatorUrl.replace('https://', '')}</a>),
      procesator autorizat de Banca Națională a României. Acceptăm carduri
      ${PLATI.carduri.join(', ')}, emise atât în țară cât și în străinătate.</p>

      <p>La finalizarea comenzii sunteți redirecționat către pagina securizată a
      procesatorului. <b>Datele cardului nu trec prin site-ul nostru și nu sunt
      stocate de magazin</b> — le introduceți direct la procesator, pe o conexiune
      criptată. Dacă banca dumneavoastră cere autentificare 3-D Secure, veți
      primi codul obișnuit prin aplicație sau SMS.</p>

      <p>Suma este blocată la autorizare și încasată la confirmarea comenzii.
      Dacă plata nu reușește, comanda rămâne neplătită și puteți relua plata sau
      alege ramburs, fără să pierdeți coșul.</p>` : `      <h2>Plata cu cardul</h2>
      <p>Plata online cu cardul nu este deocamdată activă în magazin. Până la
      activarea ei, comenzile se achită ramburs la livrare sau prin transfer
      bancar. Pentru orice nelămurire ne puteți suna la
      <a href="tel:${FIRMA.telHref}">${FIRMA.tel}</a>.</p>`}

      <h2>Facturare</h2>
      <p>Pentru fiecare comandă emitem factură fiscală, transmisă pe e-mail.
      Persoanele juridice pot solicita factură proformă înainte de plată, la
      <a href="mailto:${FIRMA.email}">${FIRMA.email}</a>.</p>

      <h2>Retur și restituirea banilor</h2>
      <p>Aveți dreptul de a vă retrage din contract în termen de 14 zile de la
      livrare, conform OUG 34/2014. ${cardActiv ? 'Sumele plătite cu cardul se restituie pe același card, prin procesator, în maximum 14 zile de la data la care am fost informați de decizia de retragere.' : 'Sumele se restituie în maximum 14 zile de la data la care am fost informați de decizia de retragere.'}
      Condițiile complete sunt în
      <a href="termeni-si-conditii.html">Termeni și condiții</a> și în
      <a href="anulare-tranzactie.html">Anulare tranzacție</a>.</p>

      <p>Pentru reclamații puteți folosi
      <a href="https://anpc.ro/" rel="noopener nofollow">ANPC</a> și platforma
      europeană <a href="https://ec.europa.eu/consumers/odr" rel="noopener nofollow">SOL</a>.</p>`;
}

/* ==========================================================================
   Coș, finalizare, rezultatul comenzii
   ========================================================================== */

/** Câmpurile cerute de Store API la `billing_address`, în ordinea de completat. */
const CAMPURI = [
  ['first_name', 'Prenume',  'text',  'given-name',        true],
  ['last_name',  'Nume',     'text',  'family-name',       true],
  ['email',      'E-mail',   'email', 'email',             true],
  ['phone',      'Telefon',  'tel',   'tel',               true],
  ['address_1',  'Adresă (stradă, număr)', 'text', 'address-line1', true],
  ['address_2',  'Bloc, scară, apartament', 'text', 'address-line2', false],
  ['city',       'Localitate', 'text', 'address-level2',   true],
  ['state',      'Județ',    'text',  'address-level1',    true],
  ['postcode',   'Cod poștal', 'text', 'postal-code',      true]
];

const campHTML = ([nume, eticheta, tip, autocomplete, obligatoriu]) => `
        <div class="camp${nume === 'address_1' || nume === 'address_2' ? ' camp--lat' : ''}">
          <label for="f-${nume}">${eticheta}${obligatoriu ? '' : ' <span style="opacity:.6">(opțional)</span>'}</label>
          <input id="f-${nume}" name="${nume}" type="${tip}" autocomplete="${autocomplete}"${obligatoriu ? ' required' : ''}>
          <p class="camp__eroare" hidden></p>
        </div>`;

function paginiCumparare() {
  /* --- cos.html --------------------------------------------------------- */
  S('cos.html', pagina({
    base: '', activ: '',
    titlu: `Coșul de cumpărături | ${FIRMA.marca}`,
    descriere: 'Produsele alese și totalul comenzii.',
    noindex: true,
    corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], ['Coș', null]])}
    ${rubrica('01', 'Comandă', 'Coșul dumneavoastră', '', '', 'h1')}
    <div id="cos-continut" class="reveal">
      <p class="cos-gol">Se încarcă coșul…</p>
    </div>
  </div>
</section>`
  }));

  /* --- finalizare.html -------------------------------------------------- */
  const metode = [
    /* Explicația e deliberat explicită. Cumpărătorul care alege „card” se
       așteaptă să vadă aici câmpuri pentru numărul cardului; ele nu apar
       niciodată pe site-ul nostru, fiindcă PCI-DSS cere ca numărul de card să
       nu treacă prin serverele comerciantului. Dacă nu spunem de la început
       unde se introduc, pasul următor pare o eroare. */
    PLATI.card ? `<label class="plata-optiune">
            <input type="radio" name="plata" value="netopiapayments" checked>
            <span><b>Card bancar, online</b>
            <span>${PLATI.carduri.join(', ')}. <b>Datele cardului se introduc la pasul următor</b>, pe pagina securizată ${PLATI.procesator} — nu aici. Nu se cer pe site-ul nostru și nu sunt stocate de magazin. După plată reveniți automat.</span></span>
          </label>` : '',
    `<label class="plata-optiune">
            <input type="radio" name="plata" value="cod"${PLATI.card ? '' : ' checked'}>
            <span><b>Ramburs la livrare</b>
            <span>Plătiți curierului, în numerar, la primirea coletului.</span></span>
          </label>`
  ].filter(Boolean).join('\n          ');

  S('finalizare.html', pagina({
    base: '', activ: '',
    titlu: `Finalizarea comenzii | ${FIRMA.marca}`,
    descriere: 'Datele de facturare și livrare, apoi plata.',
    noindex: true,
    scripturi: ['checkout.js'],
    corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], ['Coș', 'cos.html'], ['Finalizare', null]])}
    ${rubrica('01', 'Comandă', 'Finalizarea comenzii', '', '', 'h1')}

    <form id="form-finalizare" class="stack-lg reveal" novalidate>
      <div>
        <h2>Date de facturare și livrare</h2>
        <div class="form-grid">
${CAMPURI.map(campHTML).join('')}
        </div>
      </div>

      <div>
        <h2>Metoda de plată</h2>
        <div class="plata-optiuni">
          ${metode}
        </div>
      </div>

      <div>
        <h2>Rezumatul comenzii</h2>
        <div class="rezumat" id="rezumat-comanda">
          <p class="cos-nota">Se încarcă…</p>
        </div>
      </div>

      <p id="finalizare-eroare" class="camp__eroare" hidden></p>

      <div class="cos-actiuni">
        <a class="btn btn--ghost" href="cos.html">Înapoi la coș</a>
        <button type="submit" class="btn btn--primary btn--lg" id="btn-plaseaza">
          Plasează comanda
        </button>
      </div>

      <p class="cos-nota">
        Prin plasarea comenzii confirmați că ați citit
        <a href="termeni-si-conditii.html">Termenii și condițiile</a> și
        <a href="confidentialitate.html">Politica de confidențialitate</a>.
        Aveți drept de retragere în 14 zile, conform OUG 34/2014.
      </p>
    </form>
  </div>
</section>`
  }));

  /* --- comanda-confirmata.html ------------------------------------------ */
  S('comanda-confirmata.html', pagina({
    base: '', activ: '',
    titlu: `Comandă confirmată | ${FIRMA.marca}`,
    descriere: 'Comanda a fost înregistrată.',
    noindex: true,
    scripturi: ['confirmare.js'],
    corp: `<section class="section">
  <div class="wrap">
    <div class="rezultat reveal">
      <div class="rezultat__semn" aria-hidden="true">✓</div>
      <h1>Vă mulțumim pentru comandă</h1>
      <p class="lede">Comanda a fost înregistrată și veți primi confirmarea pe e-mail.</p>
      <p class="rezultat__cod" id="cod-comanda" hidden></p>
      <p>Vă contactăm telefonic pentru stabilirea datei de livrare și a montajului.
      Dacă aveți întrebări între timp, sunați la
      <a href="tel:${FIRMA.telHref}">${FIRMA.tel}</a>.</p>
      <div class="cos-actiuni" style="justify-content:center">
        <a class="btn btn--primary" href="index.html">Înapoi la prima pagină</a>
        <a class="btn btn--ghost" href="magazin.html">Vezi catalogul</a>
      </div>
    </div>
  </div>
</section>`
  }));

  /* --- plata-esuata.html ------------------------------------------------ */
  S('plata-esuata.html', pagina({
    base: '', activ: '',
    titlu: `Plata nu a fost finalizată | ${FIRMA.marca}`,
    descriere: 'Plata nu a fost finalizată.',
    noindex: true,
    corp: `<section class="section">
  <div class="wrap">
    <div class="rezultat reveal">
      <div class="rezultat__semn rezultat__semn--rau" aria-hidden="true">!</div>
      <h1>Plata nu a fost finalizată</h1>
      <p class="lede">Nu s-a reținut nicio sumă de pe card.</p>
      <p>Produsele au rămas în coș. Puteți relua plata, puteți alege ramburs la
      livrare sau ne puteți suna la <a href="tel:${FIRMA.telHref}">${FIRMA.tel}</a> —
      preluăm comanda și telefonic.</p>
      <div class="cos-actiuni" style="justify-content:center">
        <a class="btn btn--primary" href="finalizare.html">Reia plata</a>
        <a class="btn btn--ghost" href="cos.html">Vezi coșul</a>
      </div>
    </div>
  </div>
</section>`
  }));
}

async function paginiContinut() {
  for (const [slug, titlu] of PAGINI_CONTINUT) {
    let corpText = '';
    try {
      const r = await fetch(`${ORIGINE}/wp-json/wp/v2/pages?slug=${slug}&_fields=content`);
      const d = await r.json();
      if (Array.isArray(d) && d[0] && d[0].content && d[0].content.rendered) {
        corpText = curata(d[0].content.rendered);
      }
    } catch (e) {
      console.warn(`  ! nu am putut prelua „${slug}”: ${e.message}`);
    }

    /* Trei pagini (metode de plată, transport și retururi, soluționarea
       litigiilor) sunt goale și pe site-ul existent: nu au text publicat, doar
       antet și subsol. Nu inventez conținut juridic sau comercial în locul
       firmei — pagina spune deschis că textul urmează și trimite la magazin și
       la organismele oficiale. */
    /* „Metode de plată” se scrie din `PLATI`, nu se preia: pe magazin e goală,
       iar plata este exact informația pe care un cumpărător o caută. */
    if (slug === 'metode-de-plata') {
      S(`${slug}.html`, pagina({
        base: '', activ: '',
        titlu: `${titlu} | ${FIRMA.marca}`,
        descriere: PLATI.card
          ? `Metode de plată acceptate de ${FIRMA.marca}: card bancar prin ${PLATI.procesator}, ramburs la livrare și transfer bancar. Factură fiscală pentru fiecare comandă.`
          : `Metode de plată acceptate de ${FIRMA.marca}: ramburs la livrare și transfer bancar. Factură fiscală pentru fiecare comandă.`,
        corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], [titlu, null]])}
    ${rubrica('01', 'Document', titlu, '', '', 'h1')}
    <div class="proza reveal">
      ${metodeDePlataHTML()}
    </div>
    ${cardIdentitate('')}
  </div>
</section>`
      }));
      console.log(`  · „${slug}” scrisă din configurație (card: ${PLATI.card ? 'activ' : 'inactiv'})`);
      continue;
    }

    const areText = corpText && corpText.replace(/<[^>]*>/g, '').trim().length > 80;
    const continut = areText ? corpText : `
      <p>Această pagină nu are încă text publicat pe site-ul magazinului.
      Până la completarea ei, vă stăm la dispoziție direct:</p>
      <ul>
        <li>telefon <a href="tel:${FIRMA.telHref}">${FIRMA.tel}</a></li>
        <li>e-mail <a href="mailto:${FIRMA.email}">${FIRMA.email}</a></li>
      </ul>
      <p>Pentru reclamații și soluționarea alternativă a litigiilor puteți folosi
      <a href="https://anpc.ro/" rel="noopener nofollow">ANPC</a> și platforma europeană
      <a href="https://ec.europa.eu/consumers/odr" rel="noopener nofollow">SOL</a>.</p>`;

    if (!areText) console.warn(`  ! „${slug}” este goală și pe usa-garaj.ro — pagina generată o semnalează`);

    S(`${slug}.html`, pagina({
      base: '', activ: '',
      titlu: `${titlu} | ${FIRMA.marca}`,
      descriere: `${titlu} — ${FIRMA.nume}, CUI ${FIRMA.cui}, ${FIRMA.j}.`,
      corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], [titlu, null]])}
    ${rubrica('01', 'Document', titlu, '', '', 'h1')}
    <div class="proza reveal">
      ${continut}
    </div>
    ${cardIdentitate('')}
  </div>
</section>`
    }));
  }

  /* --- paginile de cumpărare -------------------------------------------- */

  /**
   * Se generează DOAR când există un backend care să le servească.
   *
   * Un coș care arată bine dar nu poate adăuga nimic e mai rău decât lipsa
   * coșului: clientul își pierde timpul completând, apoi lovește un perete.
   * Cât timp `MAGAZIN.api` e gol, site-ul rămâne catalogul de acum.
   */
  if (MAGAZIN.activ) paginiCumparare();

  /* --- harta site ------------------------------------------------------- */
  S('harta-site.html', pagina({
    base: '', activ: '',
    titlu: `Harta site | ${FIRMA.marca}`,
    descriere: 'Toate paginile site-ului Usa-garaj.ro.',
    corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], ['Harta site', null]])}
    ${rubrica('01', 'Cuprins', 'Harta site', '', '', 'h1')}
    <div class="proza reveal">
      <h2>Catalog</h2>
      <ul>
        <li><a href="magazin.html">Magazin — toate cele ${PRODUSE.length} de produse</a></li>
        ${CATEGORII_PAGINI.map((c) => `<li><a href="categorie/${c.fisier}.html">${c.h1}</a></li>`).join('\n        ')}
      </ul>
      <h2>Produse</h2>
      <ul>
        ${PRODUSE.map((p) => `<li><a href="produs/${UG.fisierProdus(p)}.html">${esc(p.nume)}</a> — ${lei(p.pret)}</li>`).join('\n        ')}
      </ul>
      <h2>Informații</h2>
      <ul>
        <li><a href="tehnic.html">Tehnic</a></li>
        <li><a href="intrebari-frecvente.html">Întrebări frecvente</a></li>
        <li><a href="contact.html">Contact</a></li>
        ${PAGINI_CONTINUT.map(([sl, t]) => `<li><a href="${sl}.html">${t}</a></li>`).join('\n        ')}
      </ul>
    </div>
  </div>
</section>`
  }));

  /* --- sitemap.xml ------------------------------------------------------ */

  /* Paginile de cumpărare poartă `noindex` și nu au ce căuta în sitemap: sunt
     stări personale, nu conținut. Un coș indexat ajunge în rezultate ca pagină
     goală și trage în jos calitatea percepută a întregului site. */
  const NEINDEXATE = ['cos.html', 'finalizare.html', 'comanda-confirmata.html', 'plata-esuata.html'];

  /* Domeniul public este cel al vitrinei, o dată configurat. */
  const GAZDA = MAGAZIN.sit || ORIGINE;

  const azi = new Date().toISOString().slice(0, 10);
  const urls = scrise
    .filter((f) => f.endsWith('.html') && NEINDEXATE.indexOf(f.replace(/\\/g, '/')) === -1)
    .map((f) => `  <url><loc>${GAZDA}/${f.replace(/\\/g, '/')}</loc><lastmod>${azi}</lastmod></url>`)
    .join('\n');
  scrie('sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  scrie('robots.txt',
    `User-agent: *\nAllow: /\n${NEINDEXATE.map((f) => `Disallow: /${f}`).join('\n')}\nSitemap: ${GAZDA}/sitemap.xml\n`);

  console.log(`\nGenerate ${scrise.length} pagini HTML + sitemap.xml + robots.txt`);
  console.log(`  ${PRODUSE.length} pagini de produs`);
  console.log(`  ${CATEGORII_PAGINI.length} pagini de categorie`);
  console.log(`  ${PAGINI_CONTINUT.length} pagini de conținut preluate de pe usa-garaj.ro`);
}

paginiContinut();
