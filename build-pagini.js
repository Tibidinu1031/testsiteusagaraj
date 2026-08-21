/**
 * build-pagini.js — conținutul propriu-zis al paginilor.
 * Încărcat de build.js, care oferă șabloanele.
 */

'use strict';

const B = require('./build.js');
const { pagina, grilaHTML, FILTRE, FIRMA, PLATI, MAGAZIN, CALCULATOR, esc, scrie, UG, butoaneSocial } = B;
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

/**
 * Întrebările frecvente — textul integral primit de la client, 17 august 2026.
 *
 * Lista veche a fost înlocuită în întregime, la cerere. Numerotarea din textul
 * primit („1.”, „2.”…) NU se păstrează în întrebare: ordinea o dă poziția în
 * listă, iar un număr scris în text ar rămâne greșit în ziua în care se adaugă
 * sau se scoate o întrebare la mijloc.
 *
 * Aceeași listă hrănește și `faqLd()`, adică datele structurate pentru Google.
 * Deci orice se schimbă aici se schimbă și în ce vede motorul de căutare — nu
 * există o a doua copie de întreținut.
 */
const INTREBARI = [
  ['Ce tipuri de uși de garaj comercializați?',
   'Oferim uși de garaj tip rulou din aluminiu, disponibile în mai multe dimensiuni, culori și configurații. Ușile pot fi acționate manual sau automat, în funcție de necesitățile fiecărui garaj.'],
  ['Ușile de garaj rulou sunt potrivite pentru orice garaj?',
   'În majoritatea cazurilor, da. Ușile tip rulou pot fi montate atât la garaje rezidențiale, cât și la spații comerciale sau industriale. Înainte de comandă recomandăm verificarea și măsurarea spațiului de montaj.'],
  ['Ce diferență este între lamelele de 55 mm și cele de 77 mm?',
   'Diferența principală este dimensiunea lamelei și nivelul de rezistență. Lamelele de 77 mm sunt o variantă mai robustă, recomandată în special pentru goluri mai mari și utilizare intensă.'],
  ['Ușa de garaj poate fi automatizată?',
   'Da. Ușile de garaj tip rulou pot fi echipate cu motor electric și telecomandă, pentru deschidere și închidere rapidă și confortabilă.'],
  ['Pot deschide ușa de garaj și manual dacă se întrerupe curentul?',
   'Da. În funcție de sistemul de acționare ales, ușa poate fi prevăzută cu sistem de deblocare pentru utilizarea manuală în cazul unei pene de curent.'],
  ['Ce culori sunt disponibile pentru ușile de garaj?',
   'Ușile sunt disponibile în mai multe culori și finisaje, inclusiv variante moderne precum gri antracit, alb, maro și alte nuanțe disponibile în funcție de model.'],
  ['Cum aflu ce dimensiune de ușă de garaj îmi trebuie?',
   'Dimensiunea se stabilește în funcție de golul existent și de spațiul disponibil pentru montaj. Pentru o ofertă corectă, este recomandată măsurarea golului și verificarea condițiilor de montaj.'],
  ['Oferiți și montaj pentru ușile de garaj?',
   'Da. Oferim servicii de montaj pentru ușile de garaj, iar echipa noastră poate verifica înainte de instalare condițiile existente și soluția potrivită pentru fiecare lucrare.'],
  ['Cât durează montajul unei uși de garaj rulou?',
   'Durata montajului depinde de dimensiunea ușii, tipul de acționare și condițiile existente la garaj. În cazul unei instalații pregătite corespunzător, montajul se poate realiza într-un timp scurt.'],
  ['Ușile de garaj rulou oferă protecție împotriva intemperiilor?',
   'Da. Lamelele din aluminiu și sistemul de închidere contribuie la protejarea garajului împotriva vântului, ploii, zăpezii și prafului, în limitele caracteristicilor tehnice ale modelului ales.'],
  ['Pot comanda o ușă de garaj făcută pe dimensiunea golului meu?',
   'Da. Ușile de garaj pot fi configurate în funcție de dimensiunile golului și de condițiile de montaj. Pentru o ofertă exactă, este important să avem dimensiunile corecte.'],
  ['Pot folosi ușa de garaj pentru un spațiu comercial sau industrial?',
   'Da. Pentru spațiile comerciale și industriale se pot alege configurații mai robuste, în funcție de dimensiunea golului și frecvența de utilizare.'],
  ['Ce întreținere necesită o ușă de garaj rulou?',
   'Pentru funcționare corectă și o durată de viață cât mai mare, recomandăm verificarea periodică a componentelor mecanice, a sistemului de acționare și curățarea lamelelor și a elementelor accesibile.'],
  ['Oferiți garanție pentru ușile de garaj?',
   'Da. Produsele și lucrările beneficiază de garanție conform condițiilor aplicabile. Perioada și condițiile de garanție sunt prezentate la momentul achiziției.'],
  ['Cum pot primi o ofertă pentru o ușă de garaj?',
   'Ne puteți contacta cu dimensiunile aproximative ale golului, localitatea și tipul de ușă dorit. Pe baza acestor informații vă putem orienta către soluția potrivită și vă putem pregăti o ofertă personalizată.'],
  ['De ce este recomandată măsurarea înainte de comandă?',
   'Măsurarea corectă este foarte importantă pentru alegerea dimensiunii ușii, a casetei și a sistemului de montaj. O măsurătoare corectă reduce riscul apariției problemelor la instalare.'],
  ['Ușa de garaj rulou economisește spațiu?',
   'Da. Unul dintre avantajele importante ale sistemului rulou este faptul că ușa se ridică vertical și se rulează într-o casetă, fără să ocupe spațiul din tavan necesar altor tipuri de uși.'],
  ['De ce să aleg o ușă de garaj rulou din aluminiu?',
   'Ușile din aluminiu oferă un raport foarte bun între greutate, rezistență și funcționalitate. Sistemul rulou este practic, ocupă puțin spațiu și poate fi configurat cu acționare manuală sau electrică.'],
  ['Montajul este disponibil doar în Dâmbovița?',
   'Nu. În funcție de lucrare și de locație, putem realiza montajul și în alte localități din țară. Pentru confirmarea disponibilității, contactați-ne și transmiteți localitatea și dimensiunile aproximative ale ușii.'],
  ['Pot solicita o ofertă dacă nu cunosc dimensiunile exacte?',
   'Da. Ne puteți trimite fotografii ale garajului și dimensiunile aproximative, iar echipa noastră vă poate indica informațiile necesare pentru stabilirea soluției potrivite.']
];

/* Numărul se scrie din POZIȚIA în listă, nu din text. Așa rămâne corect dacă se
   adaugă sau se scoate o întrebare la mijloc — altfel ar trebui renumerotate
   toate de mână, iar una uitată ar trece neobservată.

   `aria-hidden` pe număr: un cititor de ecran care ar spune „zero unu, Ce tipuri
   de uși…” adaugă zgomot, nu informație. Poziția în listă o anunță oricum. */
const faqHTML = () => `<div class="faq reveal">
${INTREBARI.map(([q, a], i) => `  <details>
    <summary><i class="faq__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</i>${q}</summary>
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
${FIRMA.emailuri.map((e) => `    <div class="idrow"><dt>${e.rol}</dt><dd><a href="mailto:${e.adresa}">${e.adresa}</a></dd></div>`).join('\n')}
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

/**
 * Banda din josul eroului.
 *
 * Eticheta „De ce noi?” stă pe loc, în stânga; doar mențiunile curg. Sunt două
 * roluri diferite — una întreabă, celelalte răspund — iar dacă întrebarea pleacă
 * din cadru odată cu răspunsurile, banda devine o înșiruire fără cap.
 *
 * Cele patru mențiuni se repetă de trei ori. Fiind scurte, la două repetări
 * rămâneau goluri pe ecranele late și se vedea bucla; animația mută șina cu
 * exact o treime, deci reluarea cade peste un set identic.
 *
 * Șina e ascunsă de la citire (`aria-hidden`) fiindcă textul triplat s-ar auzi
 * de trei ori la un cititor de ecran. Lista de dedesubt, vizibilă doar pentru
 * ele, spune cele patru lucruri o singură dată.
 */
const MOTIVE = ['Preț competitiv', 'Calitate garantată', 'Transport inclus', 'Montaj asigurat'];

const TICKER = `<div class="ticker">
    <p class="ticker__eticheta">De ce noi?</p>
    <div class="ticker__fereastra" aria-hidden="true">
      <div class="ticker__track">
        ${Array(3).fill(MOTIVE.map((t) => `<span class="ticker__item">${t}</span>`).join('')).join('')}
      </div>
    </div>
    <ul class="sr-only">${MOTIVE.map((t) => `<li>${t}</li>`).join('')}</ul>
  </div>`;

/**
 * Calculatorul de preț.
 *
 * A trecut proba și a rămas pe site — mențiunea „în testare” de aici a fost
 * scoasă la cerere, 20 august 2026, împreună cu cea din pagină.
 *
 * Se generează doar dacă `CALCULATOR` este adevărat în `build.js`. Blocul e
 * de sine stătător: nu împrumută nimic de la restul paginii și nu-i împrumută
 * nimic, deci retragerea lui înseamnă un comutator și un fișier șters.
 *
 * Cifrele sunt din listele furnizorului, în EURO, și sunt estimative. Pagina o
 * spune în insignă și în nota de la bază, fiindcă un preț afișat fără
 * avertisment devine, în mintea cumpărătorului, o promisiune.
 *
 * Calculul pas cu pas de dedesubt RĂMÂNE, deși nu mai e o cerință de probă:
 * cine cere o ofertă la comandă vrea să vadă de unde vine fiecare leu, nu doar
 * rezultatul.
 */
/**
 * Nuanțele oferite de calculator se DERIVĂ din catalog, nu se scriu de mână.
 *
 * Altfel calculatorul ar putea oferi o culoare pe care firma n-o produce, sau
 * ar rămâne fără una nou adăugată. Se iau combinațiile reale de RAL de pe
 * produsele existente și se ordonează după câte produse le folosesc.
 */
const CULORI_CALC = (() => {
  const set = new Map();
  UG.PRODUSE.forEach((p) => {
    if (!p.raluri || !p.raluri.length) return;
    const chei = [...p.raluri].sort();
    const id = chei.join("-");
    if (!set.has(id)) set.set(id, { id, chei, n: 0 });
    set.get(id).n++;
  });
  return [...set.values()].sort((a, b) => b.n - a.n);
})();

/* Pastila de culoare: pentru o combinație de două nuanțe se împarte în două,
   ca omul să vadă din start că ușa are două tonuri, nu unul. */
const pastilaCuloare = (chei) => chei.length > 1
  ? `<i class="calc-pastila" style="background:linear-gradient(135deg, ${UG.RAL[chei[0]].hex} 0 50%, ${UG.RAL[chei[1]].hex} 50% 100%)"></i>`
  : `<i class="calc-pastila" style="background:${UG.RAL[chei[0]].hex}"></i>`;

const numeCuloare = (chei) => chei.map((k) => UG.RAL[k].nume).join(" / ");

const CALCULATOR_HTML = `
    <div class="calc reveal" id="calculator">
      <div class="calc__cap">
        <div>
          <p class="calc__insigna">Preț estimativ</p>
          <h3 class="calc__titlu">Calculator de preț</h3>
          <p class="calc__lede">Introduceți cotele golului și alegeți lamela.
          Estimarea include ușa, motorul cu telecomandă, accesoriile de
          deblocare, montajul și transportul.</p>
        </div>
      </div>

      <div class="calc__form">
        <fieldset class="calc__camp calc__camp--lat">
          <legend>Lamelă</legend>
          <div class="calc__chips">
            <label><input type="radio" name="calc-lamela" value="55" checked><span>55 mm</span></label>
            <label><input type="radio" name="calc-lamela" value="77"><span>77 mm</span></label>
          </div>
        </fieldset>

        <fieldset class="calc__camp calc__camp--lat">
          <legend>Culoare</legend>
          <div class="calc__chips calc__chips--culori">
${CULORI_CALC.map((c, i) => `            <label><input type="radio" name="calc-culoare" value="${c.id}"${i === 0 ? " checked" : ""} data-nume="${esc(numeCuloare(c.chei))}" data-ral="${c.chei.map((k) => UG.RAL[k].ral).join(" / ")}"><span>${pastilaCuloare(c.chei)}${esc(numeCuloare(c.chei))}</span></label>`).join(String.fromCharCode(10))}
          </div>
        </fieldset>

        <div class="calc__camp">
          <label for="calc-l">Lățimea golului</label>
          <div class="calc__intrare">
            <input id="calc-l" type="number" inputmode="numeric" min="1300" max="4800" step="10"
                   placeholder="2500" data-calc-latime>
            <span>mm</span>
          </div>
        </div>

        <div class="calc__camp">
          <label for="calc-h">Înălțimea golului</label>
          <div class="calc__intrare">
            <input id="calc-h" type="number" inputmode="numeric" min="1500" max="4800" step="10"
                   placeholder="2200" data-calc-inaltime>
            <span>mm</span>
          </div>
        </div>
      </div>

      <div class="calc__rezultat" data-calc-rezultat aria-live="polite"></div>

      <div class="calc__actiuni" data-calc-actiuni hidden>
        <div class="cantitate">
          <label class="sr-only" for="calc-buc">Cantitate</label>
          <input id="calc-buc" type="number" min="1" max="99" value="1" inputmode="numeric" data-calc-bucati>
        </div>
        <button type="button" class="btn btn--primary btn--lg" data-calc-cos>Adaugă în coș</button>
      </div>

      <div class="calc__detaliu" data-calc-detaliu hidden></div>

      <p class="calc__disclaimer">
        <b>Estimare, nu ofertă fermă.</b> Cifrele pornesc din lista de prețuri a
        producătorului și sunt în euro. Prețul final depinde de culoare, de
        condițiile de montaj și de cursul valutar din ziua comenzii. Pentru o
        ofertă fermă, <a href="contact.html">scrieți-ne cotele exacte</a>.
      </p>
    </div>`;

const HERO = `<section class="hero">
  <div class="wrap wrap--wide hero__grid">
    <div>
      <h1 class="hero__title">Partenerul vostru pentru proiectarea și montarea ușilor de garaj de tip rulou</h1>
      <div class="hero__cta">
        <button type="button" class="btn btn--orange btn--lg" data-switch-open="">
          Răsfoiește produsele noastre
          <span class="btn__kbd"><kbd>⇧</kbd><kbd>Tab</kbd></span>
        </button>
        <!-- Butonul „Calculator” a fost mutat în bara de navigare, între
             „Promoții” și „Tehnic”. Aici concura cu chemarea principală: două
             butoane mari alăturate nu spun care e pasul întâi. -->
      </div>

      <!-- Paginile de Facebook stau SUB chemarea principală, nu lângă ea: sunt
           o a doua cale, nu una egală. Alături, ar fi concurat cu butonul care
           duce la produse — adică exact ce trebuie apăsat întâi. -->
      <div class="fb-grup fb-grup--erou">
        ${butoaneSocial('fb-btn--lg')}
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
  ${TICKER}
</section>`;

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

/* Aici au stat sloturile pentru fotografiile din teren (`LUCRARI`) și galeria
   construită din ele (`GALERIE`), folosite de secțiunea 06 „Din teren”.
   Secțiunea a fost ștearsă la cerere, deci amândouă au rămas fără niciun
   consumator. Regulile de stil `.gallery` din `components.css` sunt lăsate pe
   loc: nu strică nimic și sunt de folos dacă secțiunea se întoarce. */

const contactHTML = (base) => `<div class="contact-grid">
  <div class="contact-cta reveal">
    <div class="contact-lines">
      <a class="contact-line" href="tel:${FIRMA.telHref}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"/></svg>
        <div><small>Telefon</small><b>${FIRMA.tel}</b></div>
      </a>
${FIRMA.emailuri.map((e) => `      <a class="contact-line" href="mailto:${e.adresa}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>
        <div><small>${e.rol}</small><b>${e.adresa}</b></div>
      </a>`).join('\n')}
      <!-- Adresa e o legătură către hartă, nu text mort. Interogarea folosește
           chiar adresa din datele firmei, deci o mutare a sediului schimbă și
           pinul, nu doar rândul scris. Forma maps.google.com/?q= merge pe orice
           dispozitiv: pe telefon deschide aplicația instalată, pe desktop
           pagina web. -->
      <a class="contact-line" href="https://maps.google.com/?q=${encodeURIComponent(FIRMA.adresa)}"
         target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>
        <div><small>Sediu · vezi în Google Maps</small><b>${FIRMA.adresa}</b></div>
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
  base: '', activ: 'index.html', mainClasa: 'acasa',
  titlu: 'Uși de garaj tip rulou ABBA — lamele de 55 mm și 77 mm | Usa-garaj.ro',
  descriere: `Uși de garaj tip rulou ABBA, cu lamele de 55 mm și 77 mm, acționare automată cu telecomandă. ${s.total} de configurații, de la ${lei(s.pretMin)}, transport gratuit și montaj asigurat. ${FIRMA.nume}, CUI ${FIRMA.cui}, ${FIRMA.j}.`,
  ld: faqLd(),
  /* Scriptul calculatorului se încarcă DOAR pe prima pagină, fiindcă doar
     acolo există blocul. Cât timp funcționalitatea e în probă, celelalte 42 de
     pagini nu plătesc pentru ea nici măcar o cerere. */
  scripturi: CALCULATOR ? ['calculator.js'] : [],
  corp: `${HERO}

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
    ${rubrica('03', 'De ce ne poți contacta?', 'Uși de garaj de tip rulou, acționate prin telecomandă',
      'Dacă aveți nevoie de o ușă de garaj nouă, fie că este prima alegere, fie că o înlocuiți pe cea veche, noi suntem soluția. Producem și montăm uși de garaj cu design personalizat și în dimensiuni diverse.')}
    <div class="stack-lg">
      <div class="proza reveal">
        <p>Ușile de garaj sunt mai mult decât un portal de acces spre garaj. Sunt
        asigurarea dumneavoastră că bunurile vă sunt protejate. Iar noi le
        proiectăm și montăm pe cele potrivite, atât pentru spații rezidențiale,
        cât și comerciale.</p>

        <p>Realizate din aluminiu, astfel de uși de garaj sunt soluția pentru un
        plus de siguranță și intimitate. Sunt durabile și au marele avantaj de a
        putea fi montate chiar și în spații înguste. Datorită sistemului de
        închidere, respectiv deschidere, nu vor ocupa spațiu inutil ca în cazul
        ușilor clasice.</p>
      </div>
      ${NOTA_COTE}
      <p><a class="btn btn--ghost" href="tehnic.html">Toate detaliile tehnice</a></p>
    </div>
  </div>
</section>

<section class="section section--alt" id="servicii">
  <div class="wrap">
    ${rubrica('04', 'Ce facem, de la măsurătoare la mentenanță', 'Serviciile noastre', '')}
    ${svcHTML()}

    <div class="proza reveal" style="margin-block-start:var(--s-6)">
      <p>Cu noi veți câștiga un partener pe termen lung. Proiectăm și montăm uși
      de garaj de tip rulou, acționate prin telecomandă sau cu deschidere
      clasică, manuală. Serviciile noastre sunt extinse și includ mentenanța,
      service-ul, precum și proiecte personalizate de uși de garaj.</p>

      <p>Pentru ușile de garaj standard, în stoc disponibil, puteți comanda
      imediat în funcție de dimensiuni și culoare.</p>
    </div>
  </div>
</section>

<!-- ==========================================================================
     05 — Unde se potrivesc. Secțiune nouă, cerută după „Serviciile noastre”.
     Se încheie cu chemarea la ofertă personalizată, fiindcă ultimul paragraf
     duce exact acolo: „proiectăm personalizat, în culoarea dorită”.
     ========================================================================== -->
<section class="section" id="unde">
  <div class="wrap">
    ${rubrica('05', 'Unde se potrivesc', 'Despre ușile noastre', '')}

    <div class="unde">
      <div class="proza reveal">
        <p>Ușile de garaj de tip rulou sunt versatile și se potrivesc în orice
        spațiu. Sunt o soluție practică pentru siguranța garajului, atât pentru
        spații comerciale, cât și rezidențiale. Este una dintre alegerile
        populare, cu mecanism simplu și practic. Funcționează silențios, vă
        scutesc de efort la închidere și deschidere și vin într-o varietate de
        culori și dimensiuni.</p>

        <p>Un avantaj major al ușilor de garaj de tip rulou este salvarea
        spațiului. Chiar și când nu dispuneți de un garaj generos ca suprafață, o
        ușă de acces de tip rulou vă avantajează. Cu închidere și deschidere pe
        verticală, interiorul îl veți exploata la maximum.</p>

        <p>Sunt o alegere potrivită fie că locuiți la apartament și dețineți un
        garaj în zona special amenajată pentru astfel de spații de depozitare,
        fie că locuiți la casă și ați proiectat și garajul ca parte din curtea
        dumneavoastră.</p>

        <p>Astfel de uși de tip rulou vor deservi și celor care au hale sau alte
        tipuri de spații comerciale, depozite. Proiectăm personalizat, în funcție
        de dimensiunile dorite, în culoarea dorită!</p>
      </div>

      <aside class="oferta reveal">
        <h3>Căutați alte dimensiuni și design-uri?</h3>
        <p>Știm, nu suntem toți la fel, iar despre gusturi nu discutăm. Ne place
        să creăm, să ne distingem prin ofertele personalizate. Solicitați acum
        serviciile noastre, ușile dorite, după caracteristicile dorite. Pentru
        noi va fi o provocare pe care o acceptăm numaidecât!</p>
        <p class="oferta__nota">Vă vom contacta curând pentru a vă prezenta
        oferta noastră.</p>
        <a class="btn btn--orange btn--lg" href="contact.html">Solicitați o ofertă</a>
      </aside>
    </div>
${CALCULATOR ? CALCULATOR_HTML : ''}
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
    lede: 'Lamelă de 77 mm, 20 mm grosime, masă a tabliei de 6 kg/m², ax de Ø70 mm și ghidaje de 90 × 35 mm. Pentru deschideri mari și utilizare intensă.' },
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
    ...randuriMagazin
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

/**
 * Specificațiile celor două familii, transcrise din fișa producătorului.
 *
 * Sunt liste SEPARATE, nu două coloane ale aceluiași tabel, fiindcă fișa nu
 * declară aceleași câmpuri pentru amândouă: la 55 mm apare caseta, cu cotă și
 * grosime de tablă, la 77 mm nu apare deloc. Într-un tabel comparativ ar fi
 * ieșit o celulă goală în dreptul casetei — iar o celulă goală într-o fișă
 * tehnică se citește „nu are”, ceea ce ar fi fals. Aici lipsa e pur și simplu
 * absentă, nu afirmată.
 *
 * Singura intervenție asupra textului este ortografică: diacritice și virgulă
 * zecimală (18,5 în loc de 18.5), ca peste tot pe site. Nicio cotă schimbată.
 */
const SPEC_55 = [
  ['Casetă din tablă de aluminiu', '250 × 250 mm, grosime 0,95 mm'],
  ['Capace laterale din aluminiu', '250 mm'],
  ['Lamele din aluminiu cu spumă poliuretanică', '55 mm, grosime 14 mm'],
  ['Greutate covor lamelă', '4 kg/m²'],
  ['Lamelă finală', 'din aluminiu'],
  ['Ax metalic zincat', 'Ø 60 mm'],
  ['Rulmenți', 'oțel'],
  ['Ghidaje (picioare) ușă din aluminiu', '75 × 30 mm']
];

const SPEC_77 = [
  ['Capace laterale din aluminiu', '300 sau 350 mm'],
  ['Lamele din aluminiu cu spumă poliuretanică', '77 mm, grosime 20 mm'],
  ['Greutate covor lamelă', '6 kg/m²'],
  ['Lamelă finală', 'din aluminiu'],
  ['Ax metalic zincat', 'Ø 70 mm'],
  ['Rulmenți', 'oțel'],
  ['Ghidaje (picioare) ușă din aluminiu', '90 × 35 mm']
];

const tabelSpec = (titlu, randuri) => `<div class="spec-panel reveal">
  <div class="table-scroll">
    <table class="spec">
      <caption>${titlu}</caption>
      <tbody>
${randuri.map(([k, v]) => `        <tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('\n')}
      </tbody>
    </table>
  </div>
</div>`;

/* Diagramele de profil, cu cotele lor reale luate din catalog — aceeași sursă
   ca galeriile de produs, deci o imagine schimbată nu trebuie actualizată în
   două locuri. `data-galerie` le face să se deschidă în lupă. */
const figuraProfil = (cheie, alt, legenda) => {
  const m = UG.MASURI[cheie];
  return `<figure class="profil">
    <img src="${UG.FOTO[cheie]}" width="${m[0]}" height="${m[1]}" alt="${alt}"
         loading="lazy" decoding="async" tabindex="0" role="button">
    <figcaption>${legenda}</figcaption>
  </figure>`;
};

/* --- despre-noi.html ------------------------------------------------------
 *
 * Textul este PRELUAT VERBATIM de pe abbaconfort.ro/despre-noi, la cererea
 * clientului, împreună cu fotografiile de acolo.
 *
 * Ce NU am preluat, și de ce:
 *   · pagina sursă conține de două ori aceeași idee — o variantă veche, fără
 *     diacritice, urmată de una completă și îngrijită. Am păstrat-o pe a doua;
 *     amândouă una sub alta ar fi arătat ca o scăpare de redactare.
 *   · blocul de contact de pe acea pagină dă alt telefon (+40 799 443 094) și
 *     altă formă a adresei decât datele din `FIRMA`. Nu le-am amestecat: două
 *     numere diferite pe același site înseamnă un client care sună aiurea.
 *     Contactul de aici vine, ca peste tot, din `FIRMA`.
 */
const GALERIE_DESPRE = `<div class="gallery reveal" data-galerie="despre">
  <figure>
    <img src="assets/img/despre/despre-01.jpeg" width="1600" height="777" loading="lazy" decoding="async" alt="Echipa ABBA Confort la o lucrare de montaj">
  </figure>
  <figure>
    <img src="assets/img/despre/despre-02.jpeg" width="1600" height="777" loading="lazy" decoding="async" alt="Ușă de garaj tip rulou montată la o hală">
  </figure>
  <figure>
    <img src="assets/img/despre/despre-03.jpeg" width="1600" height="777" loading="lazy" decoding="async" alt="Montaj de ușă de garaj tip rulou">
  </figure>
  <figure>
    <img src="assets/img/despre/despre-04.jpeg" width="1600" height="777" loading="lazy" decoding="async" alt="Lucrare finalizată, ușă de garaj cu acționare electrică">
  </figure>
  <figure>
    <img src="assets/img/despre/despre-05.jpeg" width="1600" height="777" loading="lazy" decoding="async" alt="Ușă de garaj tip rulou, vedere din exterior">
  </figure>
</div>`;

S('despre-noi.html', pagina({
  base: '', activ: 'despre-noi.html',
  titlu: `Despre noi — ${FIRMA.nume} | ${FIRMA.marca}`,
  descriere: 'ABBA Confort — partener de încredere pentru soluții eficiente, servicii de calitate și produse premium. Viziunea, misiunea și lucrările noastre.',
  corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], ['Despre noi', null]])}
    ${rubrica('01', 'Abba Confort', 'Despre noi', 'Problema ta, soluția noastră!', '', 'h1')}

    <div class="stack-lg">
      <div class="proza reveal">
        <p>La <b>Abba Confort</b>, ne-am propus să devenim un partener de încredere
        pentru toți clienții noștri, oferind soluții eficiente, servicii de calitate
        și produse premium. Prin inovație, responsabilitate și profesionalism,
        construim relații solide și durabile cu beneficiarii și partenerii noștri.</p>

        <h2>Viziunea noastră</h2>
        <p>Ne dorim să fim recunoscuți ca un lider în domeniul nostru, un partener
        care administrează eficient resursele, se dezvoltă constant și investește în
        responsabilitate socială. Succesul nostru este strâns legat de succesul
        clienților noștri, motiv pentru care ne angajăm să oferim cele mai bune
        soluții personalizate pentru nevoile lor.</p>

        <h2>Misiunea noastră</h2>
        <p>Obiectivul principal al <b>Abba Confort</b> este să stabilim și să menținem
        cele mai înalte standarde profesionale pe piața românească. Ne dorim să aducem
        un plus de valoare prin:</p>
        <ul class="lista-semne">
          <li><span aria-hidden="true">✅</span> <b>Servicii moderne și inovatoare</b> — utilizăm tehnologie de ultimă generație pentru a oferi soluții eficiente și rapide.</li>
          <li><span aria-hidden="true">✅</span> <b>Relații excelente cu beneficiarii și partenerii noștri</b> — punem accent pe colaborare și comunicare deschisă pentru a înțelege nevoile fiecărui client.</li>
          <li><span aria-hidden="true">✅</span> <b>Flexibilitate și personalizare</b> — adaptăm produsele și serviciile noastre astfel încât să corespundă cerințelor specifice ale fiecărui partener.</li>
        </ul>

        <h2>Ce oferim?</h2>
        <p>Ne adresăm atât companiilor, cât și persoanelor fizice care își doresc
        servicii de calitate superioară. Prin colaborarea cu noi, clienții beneficiază de:</p>
        <ul class="lista-semne">
          <li><span aria-hidden="true">✔️</span> <b>O gamă completă de produse și servicii personalizate</b> — concepute pentru a optimiza activitatea și a crește eficiența operațională.</li>
          <li><span aria-hidden="true">✔️</span> <b>Creșterea profitabilității</b> — prin soluții eficiente care ajută la reducerea costurilor și îmbunătățirea proceselor interne.</li>
          <li><span aria-hidden="true">✔️</span> <b>Control administrativ îmbunătățit</b> — acces la tehnologii moderne pentru o mai bună gestionare a resurselor.</li>
        </ul>

        <h2>De ce să alegi Abba Confort?</h2>
        <ul class="lista-semne">
          <li><span aria-hidden="true">🔹</span> <b>Experiență și profesionalism</b> — echipa noastră are o vastă experiență în domeniu, oferind soluții inovatoare și eficiente.</li>
          <li><span aria-hidden="true">🔹</span> <b>Investiții continue în modernizare</b> — ne actualizăm constant parcul logistic și tehnologiile pentru a asigura servicii de top.</li>
          <li><span aria-hidden="true">🔹</span> <b>Calitate garantată</b> — fiecare produs și serviciu este testat și optimizat pentru a oferi cele mai bune rezultate.</li>
          <li><span aria-hidden="true">🔹</span> <b>Transparență și încredere</b> — relațiile pe termen lung sunt fundamentul afacerii noastre.</li>
        </ul>

        <p>La <b>Abba Confort</b>, succesul nostru este construit pe <b>încrederea
        clienților</b> și pe <b>angajamentul nostru față de excelență</b>. Investim
        constant în dezvoltarea companiei și în îmbunătățirea serviciilor pentru a
        oferi soluții de calitate superioară.</p>

        <p class="despre-final"><span aria-hidden="true">🌟</span> <b>Alege Abba Confort —
        partenerul tău de încredere pentru servicii moderne și soluții eficiente!</b>
        <span aria-hidden="true">🌟</span></p>
      </div>

      ${rubrica('02', 'Din teren', 'Lucrări executate', '')}
      ${GALERIE_DESPRE}

      ${rubrica('03', 'Ce facem', 'Serviciile noastre', '')}
      ${svcHTML()}

      ${rubrica('04', 'Date oficiale', 'Cine răspunde de comandă', '')}
      ${cardIdentitate('')}

      <p><a class="btn btn--orange btn--lg" href="contact.html">Contactați-ne</a></p>
    </div>
  </div>
</section>`
}));

S('tehnic.html', pagina({
  base: '', activ: 'tehnic.html',
  titlu: 'Tehnic — uși de garaj tip rulou, lamelă 55 și 77 mm | Usa-garaj.ro',
  descriere: 'Fișa tehnică a ușilor de garaj tip rulou: cum se citesc dimensiunile, calculul spațiului util de trecere, specificațiile complete pentru lamela de 55 mm și cea de 77 mm.',
  corp: `<section class="section">
  <div class="wrap">
    ${firimituri('', [['Acasă', 'index.html'], ['Tehnic', null]])}
    ${rubrica('01', 'Fișă tehnică', 'Uși de garaj tip rulou',
      'Confecționate din aluminiu, cu lamelele umplute cu spumă poliuretanică. Mai jos: cum se citesc cotele din denumirea produsului, cum se află spațiul util de trecere și specificațiile complete ale celor două familii de lamelă.', '', 'h1')}

    <div class="stack-lg">

      <div class="reveal">
        <h2>Cum se citesc dimensiunile</h2>
        <p class="lede" style="margin-block-start:var(--s-4)">
          Dimensiunile listate pe site sunt <b>AAAA × BBBB</b>, unde
          <b>AAAA = lățimea</b>, iar <b>BBBB = înălțimea</b>.
        </p>
        <p style="margin-block-start:var(--s-4);max-inline-size:var(--measure);color:var(--ink-muted)">
          Aceste cote reprezintă dimensiunile de execuție ale ușilor de garaj și
          includ <b>ghidajele pe lățime</b> și <b>caseta pe înălțime</b>.
        </p>
      </div>

      <div class="note reveal">
        <div>
          <p><b>Spațiul util de trecere</b> se află scăzând din cotele de execuție:</p>
          <ul class="calcul">
            <li><b>Uși rulou 55 mm</b><span>AAAA − 150 mm și BBBB − 300 mm</span></li>
            <li><b>Uși rulou 77 mm</b><span>AAAA − 180 mm și BBBB − 377 mm</span></li>
          </ul>
          <p>Acolo unde producătorul declară explicit spațiul de trecere, acesta
          este afișat pe pagina produsului.</p>
        </div>
      </div>

      <div class="reveal">
        <h2>De ce o ușă tip rulou</h2>
        <div class="proza" style="margin-block-start:var(--s-4)">
          <p>Ușa de garaj reprezintă un element foarte important în cadrul
          amenajărilor exterioare de calitate, iar gama de culori vă permite
          înviorarea peisajului casei dumneavoastră. Recunoscute pentru
          fiabilitatea și siguranța lor, ușile tip rulou reprezintă alegerea
          ideală în echiparea garajului dumneavoastră.</p>

          <p>Confecționată din aluminiu, ușa de garaj rezidențială tip rulou
          orizontal izolează termic și fonic, având lamelele umplute cu spumă
          poliuretanică. Acestea pot fi utilizate în diverse contexte, de la
          obișnuitul rol de ușă de garaj, până la cel de ușă pentru spațiu
          comercial sau pentru o hală industrială.</p>

          <p>Prin modalitatea de închidere-deschidere, spațiul ocupat de ușa de
          garaj este foarte mic, iar accesibilitatea este sporită. Avantajul
          ușilor de tip rulou față de cele secționale constă în faptul că toate
          lamelele se strâng într-o casetă care necesită și ocupă un spațiu mult
          mai mic.</p>

          <p>Constructiv, ușile de garaj tip rulou sunt niște rulouri exterioare
          de dimensiuni mai mari, care au lamelele umplute cu spumă poliuretanică
          pentru izolare termică și rezistență. În funcție de mărimea ușii sau de
          rezistența și izolarea termică cerute de proiect, lamelele au
          dimensiunea de <b>55</b> sau <b>77 mm</b>.</p>
        </div>
      </div>

      <div class="profile reveal" data-galerie>
        ${figuraProfil('det01',
          'Secțiune comparativă prin profilul P55 și profilul PA77, cu cotele 55 / 12 mm și 77 / 21 mm.',
          'Profil P55 și profil PA77, comparate')}
        ${figuraProfil('det04',
          'Secțiune prin lamela de 55 mm, cu grosimea de 14 mm și umplutura de spumă poliuretanică.',
          'Lamela de 55 mm, în secțiune')}
      </div>

      <div class="reveal">
        <h2>Specificații tehnice</h2>
      </div>

      <div class="spec-doua">
        ${tabelSpec('Uși tip rulou cu lamelă de 55 mm', SPEC_55)}
        ${tabelSpec('Uși tip rulou cu lamelă de 77 mm', SPEC_77)}
      </div>

      ${tabelSpec('Ce cuprinde livrarea unei uși automate', [
        ['Acționare', 'motor tubular cu centrală de comandă'],
        ['Telecomenzi', '2 bucăți'],
        ['Acționare de rezervă', 'manivelă și legătură cardanică'],
        ['Timp de deschidere / închidere', 'circa 10 secunde, în funcție de model'],
        ['Lamelă finală', 'din aluminiu, inclusă']
      ])}

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
      <a href="mailto:${FIRMA.emailComenzi}">${FIRMA.emailComenzi}</a>.</p>

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

/**
 * Actualizează datele firmei în textele preluate de pe WordPress.
 *
 * Paginile legale — termeni, confidențialitate, cookie-uri — sunt aduse la
 * generare de pe magazin și NU sunt scrise aici: sunt angajamente juridice ale
 * firmei. Textul lor rămâne neatins.
 *
 * Se înlocuiesc doar DATELE DE IDENTIFICARE, care s-au schimbat efectiv:
 * denumirea, codul fiscal, numărul din registrul comerțului și o adresă de
 * e-mail care nu mai există. Nu e o rescriere a documentului, ci corectarea
 * unor identificatori — un document care trimite la o adresă moartă sau la o
 * firmă cu alt CUI e mai rău decât unul netradus.
 *
 * Lista e explicită, pereche cu pereche, tocmai ca fiecare schimbare să poată
 * fi văzută dintr-o privire. Sursa adevărată rămâne WordPress-ul: dacă textele
 * sunt actualizate acolo, perechile de aici devin fără efect și pot fi șterse.
 */
const DATE_INLOCUITE = [
  [/ABBA\s+CONFORT\s+SOLUTIONS\s+HOMES\s+S\.?R\.?L\.?/gi, FIRMA.nume],
  [/\bJ15\s*\/\s*136\s*\/\s*2019\b/gi, FIRMA.j],
  [/\b40437439\b/g, FIRMA.cui],
  [/bestroll\.eu@gmail\.com/gi, FIRMA.email],
  [/contact@usa-garaj\.ro/gi, FIRMA.email],
  /* Sediul din textele juridice era încă cel vechi, din Voinești. Virgula
     dinaintea localității repetate e prinsă în tipar fiindcă apare o dată cu
     spațiu înainte și o dată fără, iar altfel ar rămâne un „, ,” în frază. */
  [/Sat\s+Voinesti\s+Com\.\s+Voinesti,\s*Str\.\s*Principala,\s*Nr\.\s*146,\s*Voinesti\s*,/gi,
    FIRMA.adresa + ',']
];

function actualizeazaDatele(text) {
  return DATE_INLOCUITE.reduce((t, [tipar, nou]) => t.replace(tipar, nou), text);
}

async function paginiContinut() {
  /* Paginile pentru care CEREREA a eșuat, nu cele întoarse goale. Distincția e
     tot ce ține textul juridic în viață: o pagină goală pe magazin e un fapt și
     se semnalează în pagină, dar o rețea căzută e un accident, iar tratarea lor
     la fel ar publica termeni și confidențialitate fără text. */
  const esuate = [];

  for (const [slug, titlu] of PAGINI_CONTINUT) {
    let corpText = '';
    let adus = false;   // cererea a reușit, oricare ar fi răspunsul
    try {
      const r = await fetch(`${ORIGINE}/wp-json/wp/v2/pages?slug=${slug}&_fields=content`);
      if (!r.ok) throw new Error(`răspuns HTTP ${r.status}`);
      const d = await r.json();
      adus = true;
      if (Array.isArray(d) && d[0] && d[0].content && d[0].content.rendered) {
        corpText = actualizeazaDatele(curata(d[0].content.rendered));
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

    /* Cererea a căzut: pagina de pe disc rămâne NEATINSĂ. A o rescrie cu textul
       de rezervă ar înlocui termeni și condiții cu „pagina nu are încă text” —
       exact greșeala pe care o recompilare automată ar face-o tăcut, în fiecare
       zi în care serverul nu răspunde. */
    if (!adus) { esuate.push(slug); continue; }

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

  /* Compilarea se încheie cu eroare, ca o recompilare automată să NU comită
     un site din care lipsesc pagini. Fișierele vechi sunt încă pe disc. */
  if (esuate.length) {
    console.error(`
  ! COMPILARE INCOMPLETĂ — ${esuate.length} pagini nu au putut fi preluate:`);
    esuate.forEach((sl) => console.error(`      ${sl} (fișierul vechi a rămas neatins)`));
    process.exitCode = 1;
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

  B.verificaCoteImagini();

  console.log(`\nGenerate ${scrise.length} pagini HTML + sitemap.xml + robots.txt`);
  console.log(`  ${PRODUSE.length} pagini de produs`);
  console.log(`  ${CATEGORII_PAGINI.length} pagini de categorie`);
  console.log(`  ${PAGINI_CONTINUT.length} pagini de conținut preluate de pe usa-garaj.ro`);
}

/* Versiunile de limba se construiesc din paginile romanesti gata scrise, deci
   la sfarsit de tot — dupa paginile de continut, care se aduc prin retea.
   Legate aici, nu intr-o comanda separata, ca `node build.js` sa ramana
   singurul lucru de retinut si sa nu existe stare pe jumatate construita. */
paginiContinut().then(() => {
  require('./build-limbi.js').construieste(__dirname);
});
