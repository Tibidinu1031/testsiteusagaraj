'use strict';

/**
 * build-localitati.js — lista de județe și localități pentru formularul de comandă.
 *
 *   node build-localitati.js
 *
 * Produce `assets/js/localitati.js`, încărcat DOAR pe pagina de finalizare.
 *
 * DE CE EXISTĂ
 *
 * WooCommerce validează județul: acceptă numai codurile auto (`DB`, `B`, `CJ`…)
 * sau numele scris exact ca în nomenclatorul lui. Un client care scria
 * „DAMBOVITA” primea „The provided state (DAMBOVITA) is not valid” și nu putea
 * trimite comanda. Câmpul liber era, deci, o capcană.
 *
 * Județul devine o listă închisă, cu valorile chiar codurile cerute de
 * WooCommerce. Localitatea rămâne un câmp SCRIIBIL, cu sugestii filtrate după
 * județ: datele au 13.754 de localități, dar sunt de la recensământul din 2002,
 * iar dacă o comună lipsește, clientul trebuie să poată totuși comanda.
 * WooCommerce nu validează localitatea, deci nu riscăm nimic lăsând-o liberă.
 *
 * SURSA
 *
 *   https://github.com/romania/localitati  —  json/orase-dupa-judet-auto.min.json
 *
 * Aleasă dintre mai multe fiindcă are licență permisivă (WTFPL) și depozitul e
 * întreținut; celelalte găsite erau fără licență declarată. Datele în sine sunt
 * din nomenclatorul public SIRUTA.
 *
 * Numele de localități vin FĂRĂ diacritice, așa cum sunt în sursă. Pentru o
 * listă de sugestii e în regulă — ba chiar ferește de nepotriviri între „ș” cu
 * virgulă și „ş” cu sedilă. Numele de județe sunt scrise aici de mână, cu
 * diacriticele corecte: sunt 42 și se văd în formular ca listă închisă.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SURSA = 'https://raw.githubusercontent.com/romania/localitati/master/json/orase-dupa-judet-auto.min.json';

/**
 * Codurile și numele județelor.
 *
 * Codurile sunt EXACT cele pe care le acceptă WooCommerce — verificate față de
 * lista pe care o întoarce el în mesajul de eroare, 42 la 42, fără lipsuri și
 * fără adaosuri. Numele sunt scrise cu diacritice corecte (virgulă, nu sedilă).
 */
const JUDETE = {
  AB: 'Alba',          AR: 'Arad',            AG: 'Argeș',
  BC: 'Bacău',         BH: 'Bihor',           BN: 'Bistrița-Năsăud',
  BT: 'Botoșani',      BR: 'Brăila',          BV: 'Brașov',
  B:  'București',     BZ: 'Buzău',           CL: 'Călărași',
  CS: 'Caraș-Severin', CJ: 'Cluj',            CT: 'Constanța',
  CV: 'Covasna',       DB: 'Dâmbovița',       DJ: 'Dolj',
  GL: 'Galați',        GR: 'Giurgiu',         GJ: 'Gorj',
  HR: 'Harghita',      HD: 'Hunedoara',       IL: 'Ialomița',
  IS: 'Iași',          IF: 'Ilfov',           MM: 'Maramureș',
  MH: 'Mehedinți',     MS: 'Mureș',           NT: 'Neamț',
  OT: 'Olt',           PH: 'Prahova',         SJ: 'Sălaj',
  SM: 'Satu Mare',     SB: 'Sibiu',           SV: 'Suceava',
  TR: 'Teleorman',     TM: 'Timiș',           TL: 'Tulcea',
  VL: 'Vâlcea',        VS: 'Vaslui',          VN: 'Vrancea'
};

function adu(url) {
  return new Promise((rezolva, respinge) => {
    https.get(url, (r) => {
      if (r.statusCode !== 200) { respinge(new Error('HTTP ' + r.statusCode)); return; }
      let d = '';
      r.on('data', (c) => { d += c; });
      r.on('end', () => rezolva(d));
    }).on('error', respinge);
  });
}

async function main() {
  console.log('Aduc datele de la ' + SURSA);
  const brut = JSON.parse(await adu(SURSA));

  const coduri = Object.keys(JUDETE);
  const dinSursa = Object.keys(brut);

  /* Verificarea contează: dacă sursa se schimbă și nu mai acoperă un județ,
     clienții de acolo rămân fără sugestii, în tăcere. Mai bine se oprește. */
  const lipsa = coduri.filter((c) => dinSursa.indexOf(c) === -1);
  if (lipsa.length) throw new Error('Sursa nu acoperă județele: ' + lipsa.join(', '));

  const localitati = {};
  let total = 0;
  for (const cod of coduri) {
    const nume = brut[cod]
      .map((o) => String(o.nume || '').trim())
      .filter(Boolean);
    /* Aceeași denumire apare de mai multe ori în județ — sate omonime din
       comune diferite. Într-o listă de sugestii ar arăta ca o eroare. */
    const unice = nume.filter((n, i) => nume.indexOf(n) === i);
    unice.sort((a, b) => a.localeCompare(b, 'ro'));
    localitati[cod] = unice;
    total += unice.length;
  }

  const iesire = path.join(__dirname, 'assets', 'js', 'localitati.js');
  const continut = `/* GENERAT de build-localitati.js — nu se editează de mână.
   Sursa: ${SURSA}
   Județele: ${coduri.length}. Localități, după eliminarea omonimelor: ${total}. */
(function (w) {
  var UG = w.UG = w.UG || {};
  UG.JUDETE = ${JSON.stringify(JUDETE)};
  UG.LOCALITATI = ${JSON.stringify(localitati)};
}(window));
`;
  fs.writeFileSync(iesire, continut, 'utf8');

  const kb = (fs.statSync(iesire).size / 1024).toFixed(0);
  console.log(`\n${coduri.length} județe, ${total} localități.`);
  console.log(`Scris assets/js/localitati.js — ${kb} KB`);
}

main().catch((e) => { console.error('EȘUAT:', e.message); process.exit(1); });
