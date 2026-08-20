'use strict';

/* Versiunile în engleză și maghiară ale site-ului.
   ------------------------------------------------------------------------
   Site-ul e generat în română de build.js. În loc să trecem fiecare șir din
   generatoare printr-o funcție de traducere — ceea ce ar însemna atins fiecare
   rând de proză din build.js și build-pagini.js — traducem pagina gata făcută.
   Avantajul e că româna rămâne sursa unică: orice text nou apare întâi în
   română, iar dacă nu e încă tradus se vede în română. Nu lipsește, nu strică
   pagina și apare în raportul de la sfârșitul build-ului.

   Ce se schimbă într-o copie tradusă:
     · textul propriu-zis și atributele citite de om (alt, title, aria-label)
     · lang pe <html> și og:locale
     · adresele către assets/, care primesc un ../ în plus, fiindcă paginile
       se oglindesc în en/ și hu/, dar fișierele statice nu
     · legăturile rel=alternate hreflang între cele trei versiuni
     · comutatorul de limbă din antet

   Ce NU se atinge: <script>, <style>, JSON-LD, atributele data-* pe care se
   sprijină JavaScriptul, numele firmei, codurile fiscale și codurile RAL —
   acelea sunt aceleași în orice limbă. */

const fs = require('fs');
const path = require('path');
const TRAD = require('./traduceri.js');

const LIMBI = {
  ro: { eticheta: 'Română',  scurt: 'RO', lang: 'ro', locale: 'ro_RO', dir: '' },
  en: { eticheta: 'English', scurt: 'EN', lang: 'en', locale: 'en_US', dir: 'en' },
  hu: { eticheta: 'Magyar',  scurt: 'HU', lang: 'hu', locale: 'hu_HU', dir: 'hu' }
};

/* Ce nu e proză și deci nu se traduce niciodată. Verificat înainte de căutarea
   în dicționar, ca raportul de lipsuri să conțină numai text pe care chiar are
   rost să-l traducă cineva.

   Prețurile rămân neatinse dinadins: aceleași cifre sunt produse și la execuție
   de UG.lei() din coș și din calculator, unde n-are cine să le traducă. Un preț
   scris altfel în pagină decât în coș ar părea o eroare de preț, nu una de
   limbă. „lei” e oricum forma internațională a monedei.

   La fel dimensiunile, codurile RAL, adresele de e-mail și tastele: un „Tab”
   tradus n-ar mai fi tasta de pe tastatură. */
const NETRADUS = new RegExp([
  /^(?:[\s·|+.,:;()€×–—-]|&nbsp;|&#8288;|\d)*$/,       /* semne și cifre goale     */
  /^[\d.,]+\s*(?:lei|€|EUR|RON)$/,                     /* 3.950,00 lei             */
  /^[\d\s×x]+\s*mm$/,                                  /* 3200 × 2500 mm, 20 mm    */
  /^[LHØ]\s*[\d.,]+(?:\s*mm)?$/,                       /* L 3000, Ø 70 mm          */
  /^−?[\d.,]+\s*%$/,                                   /* −11%                     */
  /^[\w.+-]+@[\w.-]+$/,                                /* adrese de e-mail         */
  /^(?:⇧|Tab|Enter|Esc|←|→|↑|↓|V|SOL|ANPC)$/,          /* taste și acronime        */
  /^(?:RAL\s*)?\d{4}$/,                                /* coduri RAL               */
  /^J\d+$/,                                            /* nr. registrul comerțului */
  /^[\d.,]+\s*(?:kg|W|A|Nm|mm|m)$/,                    /* unități tehnice          */
  /^https?:\/\/\S+$/,                                  /* adrese web               */
  /^(?:mm|✓|!|\/|\.ro)$/,                              /* fragmente de marcaj      */

  /* Numele proprii ale firmei și ale mărcii. Sunt aceleași pe factură, în
     registrul comerțului și pe colet — traduse, n-ar mai duce nicăieri. */
  /^ABBA CONFORT DELIVERY SRL$/,
  /^usa-garaj$/,
  /^Ușă&#8288;-&#8288;Garaj$/,
  /^&nbsp;J\d+$/,
  /^Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște$/
].map((r) => '(?:' + r.source + ')').join('|'));

/* ---------------------------------------------------------------- traducere */

/* Împarte HTML-ul în bucăți: etichete, comentarii, blocuri de cod și text.
   Un înlocuitor rulat pe tot fișierul ar nimeri și în interiorul atributelor
   sau al scripturilor; aici „text” înseamnă strict ce vede omul între
   etichete, iar scripturile și stilurile trec neatinse. */
function bucati(html) {
  const out = [];
  const tipar = /<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1>|<[^>]+>/gi;
  let i = 0, m;
  while ((m = tipar.exec(html))) {
    if (m.index > i) out.push({ tip: 'text', s: html.slice(i, m.index) });
    out.push({ tip: (m[0][1] === '!' || m[1]) ? 'opac' : 'eticheta', s: m[0] });
    i = m.index + m[0].length;
  }
  if (i < html.length) out.push({ tip: 'text', s: html.slice(i) });
  return out;
}

/* Atributele pe care le citește un om (sau un cititor de ecran). `content` e
   tratat separat, fiindcă pe <meta> ține și date tehnice, nu doar proză. */
const ATRIBUTE_OM = ['alt', 'title', 'placeholder', 'aria-label'];
const META_TRADUS = /(?:name|property)="(?:description|og:title|og:description)"/i;

function traduExpresie(s, dict, lipsa, limba) {
  const parti = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const miez = parti[2];
  if (!miez || NETRADUS.test(miez)) return s;

  /* Dicționarul întâi: o denumire scrisă explicit bate orice tipar. */
  let nou = dict[miez];

  /* Apoi tiparele — denumiri de produs, cote, procente. Bucățile pe care le
     scot din tipar se întorc prin aceeași funcție, ca să se traducă și ele.

     Important: dacă o bucată nu se rezolvă, expresia întreagă se socotește
     netradusă, chiar dacă tiparul s-a potrivit. Altfel un titlu ca
     „<ceva netradus> | Usa-garaj.ro” ar trece drept tradus fiindcă tiparul
     titlului se potrivește, iar golul n-ar apărea niciodată în raport. */
  if (nou === undefined) {
    let bucataLipsa = false;
    const rezolva = (bucata) => {
      if (NETRADUS.test(bucata)) return bucata;
      const t = dict[bucata];
      if (t !== undefined) return t;
      const prinTipar = TRAD.aplicaReguli(bucata, limba, rezolva);
      if (prinTipar !== null) return prinTipar;
      bucataLipsa = true;
      return bucata;
    };
    nou = TRAD.aplicaReguli(miez, limba, rezolva);
    if (bucataLipsa) nou = null;
  }

  if (nou === null || nou === undefined) {
    lipsa.set(miez, (lipsa.get(miez) || 0) + 1);
    return s;
  }
  return parti[1] + nou + parti[3];
}

function traduEticheta(tag, dict, lipsa, limba) {
  let out = tag;
  for (const a of ATRIBUTE_OM) {
    out = out.replace(new RegExp('(\\s' + a + '=")([^"]*)(")', 'i'),
      (tot, cap, val, coada) => cap + traduExpresie(val, dict, lipsa, limba) + coada);
  }
  if (/^<meta\b/i.test(out) && META_TRADUS.test(out)) {
    out = out.replace(/(\scontent=")([^"]*)(")/i,
      (tot, cap, val, coada) => cap + traduExpresie(val, dict, lipsa, limba) + coada);
  }
  return out;
}

/* ------------------------------------------------------------------ adrese */

/* Paginile se oglindesc în en/ și hu/; assets/ nu. Deci o legătură către altă
   pagină rămâne neschimbată — se rezolvă în aceeași limbă, exact ce vrem —
   iar una către un fișier static urcă un nivel în plus. */
function urcaAssets(html) {
  return html.replace(/\b(href|src)="((?:\.\.\/)*)assets\//g,
    (tot, atr, sus) => atr + '="' + sus + '../assets/');
}

/* --------------------------------------------- comutator și legături hreflang */

/* Drumul de la pagina curentă către aceeași pagină în altă limbă. */
function catreLimba(rel, limbaCurenta, limbaTinta) {
  const p = rel.split(path.sep).join('/');
  const laRadacinaLimbii = '../'.repeat(p.split('/').length - 1);
  const iesireDinLimba = limbaCurenta === 'ro' ? '' : '../';
  const intrareInLimba = LIMBI[limbaTinta].dir ? LIMBI[limbaTinta].dir + '/' : '';
  return laRadacinaLimbii + iesireDinLimba + intrareInLimba + p;
}

function alternate(rel, limbaCurenta) {
  const linii = Object.keys(LIMBI).map((k) =>
    `<link rel="alternate" hreflang="${LIMBI[k].lang}" href="${catreLimba(rel, limbaCurenta, k)}">`);
  linii.push(`<link rel="alternate" hreflang="x-default" href="${
    catreLimba(rel, limbaCurenta, 'ro')}">`);
  return linii.join('\n');
}

/* Trei legături adevărate, nu butoane cu JavaScript: merg cu motoarele de
   căutare, merg cu „deschide în filă nouă” și merg și dacă scriptul n-a
   apucat să se încarce. hreflang și lang pe fiecare spun browserului și
   cititorului de ecran în ce limbă duce, chiar dacă eticheta e de două
   litere. Limba curentă rămâne în listă, marcată — altfel utilizatorul nu
   vede în ce limbă se află. */
function comutator(limbaCurenta, rel) {
  const legaturi = Object.keys(LIMBI).map((k) => {
    const L = LIMBI[k];
    const activ = k === limbaCurenta;
    return `        <a href="${catreLimba(rel, limbaCurenta, k)}" hreflang="${L.lang}"` +
      ` lang="${L.lang}" title="${L.eticheta}"${activ ? ' aria-current="true"' : ''}>` +
      `${L.scurt}</a>`;
  }).join('\n');

  return `<nav class="limbi" aria-label="${TRAD.numeComutator[limbaCurenta]}">\n${legaturi}\n      </nav>`;
}

/* ------------------------------------------------- mențiunea de pe juridice */

/* Traducerea unui text juridic e făcută ca să fie înțeleasă, nu ca să înlocuiască
   angajamentul asumat de firmă. Clauza care produce efecte rămâne cea românească
   — e formularea scrisă de firmă și cea pe care o citește ANPC-ul. Un cumpărător
   care citește pagina în engleză sau maghiară trebuie să afle asta din pagină,
   nu dintr-un litigiu, așa că punem mențiunea sus, înaintea textului, cu o
   legătură directă către originalul românesc. */
const PAGINI_JURIDICE = [
  'termeni-si-conditii.html', 'confidentialitate.html', 'politica-de-cookies.html',
  'anulare-tranzactie.html', 'solutionarea-litigiilor.html', 'transport-si-retururi.html'
];

const MENTIUNE = {
  en: (catre) => 'This is a translation provided for your convenience. The ' +
    `<a href="${catre}">Romanian version</a> is the one that has legal effect; ` +
    'where the two differ, the Romanian text prevails.',
  hu: (catre) => 'Ez a szöveg tájékoztató jellegű fordítás. Jogi hatállyal a ' +
    `<a href="${catre}">román változat</a> bír; eltérés esetén a román szöveg az irányadó.`
};

function adaMentiune(html, rel, cod) {
  if (cod === 'ro') return html;
  const nume = rel.split(path.sep).join('/');
  if (PAGINI_JURIDICE.indexOf(nume) === -1) return html;

  const bloc = `<p class="mentiune-traducere">${MENTIUNE[cod](catreLimba(rel, cod, 'ro'))}</p>`;
  /* După titlul paginii, nu înaintea lui: mențiunea lămurește textul care
     urmează, deci n-are ce căuta deasupra numelui documentului. */
  return html.replace(/(<\/h1>)/, '$1\n' + bloc);
}

/* --------------------------------------------------------------- o versiune */

function versiune(radacina, rel, htmlRo, cod, raport) {
  const L = LIMBI[cod];
  let html = htmlRo;

  if (cod !== 'ro') {
    const dict = TRAD[cod] || {};
    html = bucati(html).map((b) => {
      if (b.tip === 'text') return traduExpresie(b.s, dict, raport.lipsa, cod);
      if (b.tip === 'eticheta') return traduEticheta(b.s, dict, raport.lipsa, cod);
      return b.s;                                  /* script, style, comentariu */
    }).join('');
    html = urcaAssets(html);
    html = html.replace(/<html lang="ro"/, `<html lang="${L.lang}"`);
    html = html.replace(/(<meta property="og:locale" content=")[^"]*"/, `$1${L.locale}"`);
  }

  html = html.replace(/<meta name="theme-color"[^>]*>/,
    (tot) => tot + '\n' + alternate(rel, cod));
  html = html.replace('<!--UG-LIMBI-->', comutator(cod, rel));
  html = adaMentiune(html, rel, cod);

  const iesire = path.join(radacina, L.dir, rel);
  fs.mkdirSync(path.dirname(iesire), { recursive: true });
  fs.writeFileSync(iesire, html, 'utf8');
}

/* ------------------------------------------------------------------ intrare */

const SARITE = ['node_modules', '.git', 'assets', 'wordpress', 'scratchpad', 'en', 'hu'];

function paginiDin(dir, radacina, acc = []) {
  for (const n of fs.readdirSync(dir)) {
    if (SARITE.indexOf(n) !== -1) continue;
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) paginiDin(p, radacina, acc);
    else if (n.endsWith('.html')) acc.push(path.relative(radacina, p));
  }
  return acc;
}

function construieste(radacina) {
  const rel = paginiDin(radacina, radacina);
  const raport = { lipsa: new Map() };

  for (const r of rel) {
    const htmlRo = fs.readFileSync(path.join(radacina, r), 'utf8');
    for (const cod of Object.keys(LIMBI)) versiune(radacina, r, htmlRo, cod, raport);
  }

  const lipsa = [...raport.lipsa.entries()].sort((a, b) => b[1] - a[1]);
  const cuvinte = lipsa.reduce((n, [s]) => n + s.split(/\s+/).length, 0);

  console.log(`\nVersiuni de limbă: ${rel.length} pagini × ${Object.keys(LIMBI).length} limbi`);
  console.log(`  dicționar: ${Object.keys(TRAD.en || {}).length} expresii`);

  const caleLipsa = path.join(radacina, 'traduceri-lipsa.json');
  if (lipsa.length) {
    console.log(`  ${lipsa.length} expresii netraduse (${cuvinte} cuvinte) — rămân în română`);
    fs.writeFileSync(caleLipsa,
      JSON.stringify(lipsa.map(([s, n]) => ({ n, s })), null, 1), 'utf8');
  } else {
    console.log('  acoperire completă');
    if (fs.existsSync(caleLipsa)) fs.unlinkSync(caleLipsa);
  }
  return rel.length;
}

module.exports = { construieste, LIMBI };
