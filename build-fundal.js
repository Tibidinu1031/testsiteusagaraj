'use strict';

/**
 * build-fundal.js — tiparul de fundal al paginii.
 *
 *   node build-fundal.js
 *
 * Produce `assets/img/fundal-emblema.png`, dala de 560×560 care se repetă în
 * spatele întregului site (stratul 2 din `body` — vezi base.css).
 *
 * De ce un script și nu o imagine editată de mână: dala e derivată din siglă.
 * Dacă sigla se schimbă, tiparul se reface rulând comanda de mai sus, nu
 * redesenând într-un editor și sperând că nimerim aceleași poziții. Fișierul
 * PNG rezultat se comite ca orice altă imagine — site-ul nu depinde de script
 * ca să funcționeze, doar ca să poată fi refăcut.
 *
 * Ce face, față de dala dinainte:
 *   · scoate textul „ABBA CONFORT DELIVERY SRL / MEREU MAI DEVREME” de sub
 *     fiecare camion — la mărimea la care se repetă în fundal era oricum
 *     nelizibil, iar pe telefon intra sub titlul eroului și se citeau două
 *     texte suprapuse;
 *   · lasă doar camionul;
 *   · coboară opacitatea la 0,5, scrisă în canalul alfa. În CSS nu se poate da
 *     opacitate unui singur strat de fundal, iar `opacity` pe `body` ar
 *     estompa toată pagina — deci se coace în imagine.
 *
 * Node nu are decodor de PNG, dar are `zlib`, iar restul formatului e simplu:
 * un antet, șiruri de octeți comprimate și un filtru pe fiecare rând. E scris
 * mai jos, cât să acopere ce ne trebuie (8 biți pe canal), nu tot standardul.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/* ------------------------------------------------------------------ citire */

function bucatiPNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('nu e PNG');
  const out = [];
  let i = 8;
  while (i < buf.length) {
    const lung = buf.readUInt32BE(i);
    const tip = buf.toString('ascii', i + 4, i + 8);
    out.push({ tip, date: buf.slice(i + 8, i + 8 + lung) });
    i += 12 + lung;                                   /* lung + tip + date + CRC */
  }
  return out;
}

/* Reface un rând din cel filtrat. Cele cinci filtre din standard; `a` e
   octetul din stânga la aceeași poziție de canal, `b` cel de deasupra. */
function defiltreaza(tip, rand, precedent, bpp) {
  const n = rand.length;
  for (let i = 0; i < n; i++) {
    const a = i >= bpp ? rand[i - bpp] : 0;
    const b = precedent ? precedent[i] : 0;
    const c = (precedent && i >= bpp) ? precedent[i - bpp] : 0;
    let x = rand[i];
    if (tip === 1) x += a;
    else if (tip === 2) x += b;
    else if (tip === 3) x += (a + b) >> 1;
    else if (tip === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      x += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
    }
    rand[i] = x & 0xff;
  }
  return rand;
}

/** Citește un PNG pe 8 biți și întoarce pixeli RGBA, patru octeți fiecare. */
function citestePNG(cale) {
  const bucati = bucatiPNG(fs.readFileSync(cale));
  const ihdr = bucati.filter((b) => b.tip === 'IHDR')[0].date;
  const l = ihdr.readUInt32BE(0), h = ihdr.readUInt32BE(4);
  const adancime = ihdr[8], tipCuloare = ihdr[9];
  if (adancime !== 8) throw new Error('sunt tratate doar PNG-urile pe 8 biți, nu ' + adancime);
  if (ihdr[12] !== 0) throw new Error('PNG întrețesut, netratat');

  const paleta = bucati.filter((b) => b.tip === 'PLTE')[0];
  const trns = bucati.filter((b) => b.tip === 'tRNS')[0];

  const canale = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[tipCuloare];
  if (!canale) throw new Error('tip de culoare netratat: ' + tipCuloare);

  const brut = zlib.inflateSync(Buffer.concat(
    bucati.filter((b) => b.tip === 'IDAT').map((b) => b.date)));

  const bpp = canale;
  const pePixel = l * bpp;
  const px = Buffer.alloc(l * h * 4);
  let precedent = null, poz = 0;

  for (let y = 0; y < h; y++) {
    const tipFiltru = brut[poz++];
    const rand = Buffer.from(brut.slice(poz, poz + pePixel));
    poz += pePixel;
    defiltreaza(tipFiltru, rand, precedent, bpp);
    precedent = rand;

    for (let x = 0; x < l; x++) {
      const s = x * bpp, d = (y * l + x) * 4;
      if (tipCuloare === 6) { rand.copy(px, d, s, s + 4); }
      else if (tipCuloare === 2) { rand.copy(px, d, s, s + 3); px[d + 3] = 255; }
      else if (tipCuloare === 0) { px[d] = px[d + 1] = px[d + 2] = rand[s]; px[d + 3] = 255; }
      else if (tipCuloare === 4) { px[d] = px[d + 1] = px[d + 2] = rand[s]; px[d + 3] = rand[s + 1]; }
      else if (tipCuloare === 3) {
        const idx = rand[s];
        px[d] = paleta.date[idx * 3]; px[d + 1] = paleta.date[idx * 3 + 1];
        px[d + 2] = paleta.date[idx * 3 + 2];
        px[d + 3] = (trns && idx < trns.date.length) ? trns.date[idx] : 255;
      }
    }
  }
  return { l, h, px };
}

/* ------------------------------------------------------------------ scriere */

function bucata(tip, date) {
  const lung = Buffer.alloc(4); lung.writeUInt32BE(date.length);
  const corp = Buffer.concat([Buffer.from(tip, 'ascii'), date]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(corp) >>> 0);
  return Buffer.concat([lung, corp, crc]);
}

const TABEL_CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = TABEL_CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ -1;
}

/** Scrie RGBA pe 8 biți, fără filtrare (tip 0): dala e mică, iar zlib o duce. */
function scriePNG(cale, l, h, px) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(l, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6;                            /* 8 biți, RGBA */

  const randuri = Buffer.alloc(h * (l * 4 + 1));
  for (let y = 0; y < h; y++) {
    randuri[y * (l * 4 + 1)] = 0;
    px.copy(randuri, y * (l * 4 + 1) + 1, y * l * 4, (y + 1) * l * 4);
  }

  fs.writeFileSync(cale, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    bucata('IHDR', ihdr),
    bucata('IDAT', zlib.deflateSync(randuri, { level: 9 })),
    bucata('IEND', Buffer.alloc(0))
  ]));
}

/* ------------------------------------------------------------------ lucrul */

function main() {
  /* Sursa e dala originală, cu text cu tot, păstrată neatinsă. Ieșirea e alt
     fișier, deci scriptul poate fi rulat de câte ori e nevoie și dă de fiecare
     dată același rezultat — dacă ar citi ce tocmai a scris, a doua rulare ar
     lucra pe o imagine din care textul lipsește deja. */
  const dir = path.join(__dirname, 'assets', 'img');
  const sursa = path.join(dir, 'fundal-emblema-sursa.png');
  const iesire = path.join(dir, 'fundal-emblema.png');

  const { l, h, px } = citestePNG(sursa);
  console.log(`Dala citită: ${l}×${h}`);

  /* Fundalul dalei e alb opac, nu transparent: cerneala se recunoaște după cât
     de închisă e, nu după alfa. Pragul e ridicat dinadins — orice nu e alb
     curat contează drept cerneală, ca marginile netezite ale literelor să intre
     în bandă, nu să rămână pe dinafară ca o umbră de text. */
  const inchis = (i) => (px[i] + px[i + 1] + px[i + 2]) / 3 < 250 && px[i + 3] > 4;

  const areCerneala = new Array(h).fill(false);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < l; x++) {
      if (inchis((y * l + x) * 4)) { areCerneala[y] = true; break; }
    }
  }
  const benzi = [];
  let inceput = -1;
  for (let y = 0; y <= h; y++) {
    if (y < h && areCerneala[y]) { if (inceput < 0) inceput = y; }
    else if (inceput >= 0) { benzi.push({ sus: inceput, jos: y - 1, inalt: y - inceput }); inceput = -1; }
  }

  console.log('Benzi cu cerneală, de sus în jos:');
  benzi.forEach((b) => console.log(`  rândurile ${b.sus}–${b.jos} (înalte ${b.inalt}) ` +
    (b.inalt >= PRAG_CAMION ? '→ camion' : '→ text')));

  /* Se PĂSTREAZĂ benzile camioanelor și se șterge tot restul rândurilor, în loc
     să se șteargă benzile de text. Diferența contează: ștergând textul, orice
     rând de literă rămas sub prag supraviețuia și se vedea ca o umbră. Așa,
     tot ce nu e camion dispare, oricât de palid ar fi. */
  const eCamion = new Array(h).fill(false);
  const camioane = benzi.filter((b) => b.inalt >= PRAG_CAMION);
  camioane.forEach((b) => { for (let y = b.sus; y <= b.jos; y++) eCamion[y] = true; });

  let sterse = 0;
  for (let y = 0; y < h; y++) {
    if (eCamion[y]) continue;
    for (let x = 0; x < l; x++) {
      const i = (y * l + x) * 4;
      px[i] = px[i + 1] = px[i + 2] = 255; px[i + 3] = 0;
    }
    sterse++;
  }

  /* Opacitatea se aplică pe canalul alfa, atât. Sursa are deja fundal
     transparent și cerneală opacă, deci înjumătățirea alfei dă exact emblema
     la jumătate de intensitate — culoarea bleumarin rămâne culoarea ei, iar
     marginile netezite rămân line.

     Prima variantă deducea opacitatea din cât de închis e pixelul. Ieșea
     greșit: zonele transparente ale sursei au RGB negru sub alfa zero, deci
     treceau drept cerneală deplină, iar dala căpăta două benzi opace pe toată
     lățimea, exact pe rândurile camioanelor. */
  for (let i = 3; i < px.length; i += 4) px[i] = Math.round(px[i] * OPACITATE);

  scriePNG(iesire, l, h, px);
  const kb = (fs.statSync(iesire).size / 1024).toFixed(1);
  console.log(`\n${camioane.length} camioane păstrate, ${sterse} rânduri șterse, opacitate ${OPACITATE}.`);
  console.log(`Scris ${path.relative(__dirname, iesire)} — ${kb} KB`);
}

/* O bandă mai înaltă decât atât e camion; sub, e un rând de text. Camioanele
   au ~85 de rânduri, rândurile de text ~16. Pragul stă la mijloc, cu loc de
   greșeală de ambele părți. */
const PRAG_CAMION = 40;
const OPACITATE = 0.5;

main();
