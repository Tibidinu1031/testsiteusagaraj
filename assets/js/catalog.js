/**
 * catalog.js — catalogul de produse.
 *
 * SURSA: WooCommerce Store API de pe usa-garaj.ro
 *   /wp-json/wc/store/v1/products?per_page=100   → 21 de produse
 *   /wp-json/wc/store/v1/products/categories     → 55 MM: 15, 77 MM: 6
 *
 * Nimic nu este estimat sau completat de mână. Prețul întreg (`pretReg`),
 * prețul curent (`pret`), starea de promoție (`laPromotie`), descrierea și
 * categoriile sunt copiate întocmai din răspunsul magazinului. `id` este
 * chiar identificatorul WooCommerce, ca fiecare rând să fie verificabil.
 *
 * Câmpurile de detaliu — toate preluate din descrierea produsului din magazin:
 *
 *   descriere  rezumatul scurt (`short_description`)
 *   proza      paragrafele de prezentare din descrierea lungă
 *   pasaj      spațiul util de trecere, acolo unde magazinul îl declară
 *   spec       blocul „Specificații” al produsului, rând cu rând
 *   colet      blocul „Conținut colet”
 *
 * `spec` conține cotele DECLARATE DE MAGAZIN PENTRU ACEST PRODUS, nu cotele
 * generale ale familiei de 55/77 mm. Distincția contează: două uși de 77 mm
 * au ghidaje diferite (90 × 35 la 401, 75 × 30 la 400) și timpi de acționare
 * diferiți (25 s la 401, 10 s la 399), fiindcă așa scrie în magazin. Pagina de
 * produs afișează cotele produsului; cele generale rămân în „Tehnic”.
 *
 * Intervenții asupra textului, toate ortografice sau de unitate de măsură,
 * niciuna asupra vreunei valori — lista completă e în README, secțiunea
 * „Corecturi față de textul magazinului”.
 *
 * Atenție la o confuzie ușor de făcut: „PROMOȚII” și „PRODUSE NOI” au fiecare
 * 16 produse, dar catalogul întreg are 21. Numărul 16 este al unei categorii,
 * nu al magazinului.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  var RAL = {
    '7016': { hex: '#383e42', nume: 'Gri antracit', ral: 'RAL 7016' },
    '8014': { hex: '#4a3526', nume: 'Maro deschis', ral: 'RAL 8014' },
    '8019': { hex: '#3d3635', nume: 'Maro închis',  ral: 'RAL 8019' },
    'maro': { hex: '#4a3526', nume: 'Maro',         ral: 'Maro' }
  };

  /**
   * Culoarea cu care se DESENEAZĂ ușa, una singură pe familie.
   *
   * Nu se mai ia `raluri[0]`. Ușile maro sunt oferite în două nuanțe — 8014
   * „maro deschis” și 8019 „maro închis” — iar ordinea în care magazinul le
   * enumeră diferă de la un produs la altul: „maro inchis 8019, maro deschis
   * 8014” la 401/400/399, „maro 8014, maro 8019” la 387/386. Cu `raluri[0]`,
   * aceleași uși ieșeau desenate în două culori diferite, iar cele desenate în
   * 8019 (#3d3635, practic gri) nu semănau deloc cu fotografia care apare la
   * trecerea cursorului — un maro cald, măsurat #4a3b33.
   *
   * Desenul urmează acum fotografia: 8014 pentru maro, 7016 pentru antracit.
   * Codurile RAL declarate rămân afișate toate, în ordinea din magazin.
   */
  var RAL_FAMILIE = { maro: '8014', antracit: '7016' };

  /** Cote constructive din pagina „Tehnic”. */
  var LAMELA = {
    55: { pas: 55, caseta: 250, ghidaj: 75, grosime: 14,   masa: 4, ax: 60 },
    77: { pas: 77, caseta: 300, ghidaj: 90, grosime: 18.5, masa: 6, ax: 70 }
  };

  /** Fotografiile magazinului, descărcate local. */
  var FOTO = {
    maro:     'assets/img/usa-maro-8014-8019.jpeg',
    antracit: 'assets/img/usa-gri-antracit.jpg'
  };

  var BASE = 'https://usa-garaj.ro/produs/';

  var C55 = 'USI GARAJ RULOU 55 MM', C77 = 'USI GARAJ RULOU 77 MM';
  var A55 = 'ACTIONARE TELECOMANDA 55', A77 = 'ACTIONARE TELECOMANDA 77MM';
  var NOI = 'PRODUSE NOI', PRO = 'PROMOTII';

  /* Conținutul coletului, în cele două formulări ale magazinului. */
  var COLET_A = ['centrală de comandă', '2 telecomenzi', 'manivelă', 'cheiță deblocare motor', 'ușă rulou'];
  var COLET_B = ['ușă rulou', 'centrală de comandă', '2 telecomenzi', 'manivelă'];

  /** Ordinea este cea implicită a magazinului. */
  var PRODUSE = [
    {
      id: 401, lamela: 77, l: 3000, h: 2500, familie: 'maro', raluri: ['8019', '8014'], foto: 'maro',
      nume: 'Ușă garaj automată lamele ABBA 77mm L3000 × H2500, maro închis 8019, maro deschis 8014',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L3000 x H2500 , maro inchis 8019, maro deschis 8014',
      pretReg: 6100, pret: 5315, laPromotie: true,
      pasaj: 'L2820 H2200',
      descriere: 'Spațiu util de trecere L2820 H2200',
      proza: [
        'Ușa de tip rulou cu lamele de 77 mm este o variantă economică și fiabilă pentru închiderea garajului, cu o durată îndelungată de viață. Ușa garajului trebuie să facă față intemperiilor și altor factori externi și deschiderilor/închiderilor multiple. Vopseaua este aplicată în câmp electrostatic, motiv pentru care este și rezistentă. Ușa este confecționată din aluminiu de înaltă calitate, iar lamelele sunt umplute cu spumă poliuretanică, oferind izolare termică și fonică. Deschiderea se face în sistem electric cu ajutorul telecomenzii sau de la butonul centralei cu receptor. Totuși, acționarea ușii este permisă chiar și în cazul în care nu există curent, fiind prevăzută și cu acționare manuală.',
        'Alegeți o astfel de ușă pentru siguranța bunurilor din garaj, dar și pentru design-ul elegant ce se va încadra perfect cu orice stil al casei.'
      ],
      spec: [
        ['Dimensiune', 'L3000 H2500'],
        ['Casetă aluminiu', '300 sau 350 mm, grosime 0,95 mm'],
        ['Ghidaje din aluminiu', '90 mm × 35 mm'],
        ['Grosime lamele', '19 mm'],
        ['Timp deschidere/închidere', '25 secunde'],
        ['Culoare', 'maro închis sau maro deschis']
      ],
      colet: COLET_A,
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l3000-x-h2500-maro-inchis-8019-maro-deschis-8014'
    },
    {
      id: 400, lamela: 77, l: 3200, h: 2500, familie: 'maro', raluri: ['8019', '8014'], foto: 'maro',
      nume: 'Ușă garaj automată lamele ABBA 77mm L3200 × H2500, maro închis 8019, maro deschis 8014',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L3200 x H2500 , maro inchis 8019, maro deschis 8014',
      pretReg: 6150, pret: 5465, laPromotie: true,
      pasaj: 'L3020 H2200',
      descriere: 'Spațiu util de trecere L3020 H2200',
      proza: [
        'Ușa de garaj tip rulou poate fi alegerea excelentă pentru dumneavoastră. Este realizată din aluminiu, având lamelele de 77 mm umplute cu spumă poliuretanică având și rolul de a izola fonic și termic. Este calitativă, are un design plăcut și se poate manevra atât electric cât și manual. Aceste uși sunt recunoscute pentru fiabilitatea și siguranța acestora, având de asemenea și rol estetic. Sistemul de închidere și deschidere se efectuează în aproximativ 10 secunde.',
        'În plus, calitatea este reprezentată prin faptul că sunt vopsite prin procedee speciale, electrochimice, acest lucru ducând la o rezistență îndelungată.',
        'Dispuneți de toate accesoriile necesare, inclusiv de telecomandă pentru o eficientizare a timpului.'
      ],
      spec: [
        ['Culoare', 'maro'],
        ['Timp deschidere/închidere', '25 secunde'],
        ['Dimensiune', 'L3200 H2500'],
        ['Casetă aluminiu', '300 mm, grosime 0,95 mm'],
        ['Ghidaje din aluminiu', '75 mm × 30 mm'],
        ['Grosime lamele', '19 mm'],
        ['Capace laterale din aluminiu', '300 mm']
      ],
      colet: COLET_A,
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l3200-x-h2500-maro-inchis-8019-maro-deschis-8014'
    },
    {
      id: 399, lamela: 77, l: 3000, h: 3000, familie: 'maro', raluri: ['8019', '8014'], foto: 'maro',
      nume: 'Ușă garaj automată lamele ABBA 77mm L 3000 × 3000 H, maro închis 8019, maro deschis 8014',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L 3000 x 3000 H , maro inchis 8019, maro deschis 8014',
      pretReg: 6650, pret: 5880, laPromotie: true,
      pasaj: 'L2820 H2700',
      descriere: 'Spațiu util de trecere L2820 H2700',
      proza: [
        'O ușă de garaj de tip rulou vă menține obiectele pe care le dețineți în siguranță, oferind în același timp izolare fonică și termică. Ușa este confecționată din aluminiu, lamelele de 77 mm sunt umplute cu spumă poliuretanică. Sistemul electric încorporat permite deschiderea și închiderea ușii la o apăsare de buton, fiecare în doar 10 secunde. Datorită faptului că lamelele se strâng într-o casetă, se face economie de spațiu și accesibilitatea este sporită. Ușa este vopsită prin procedee speciale electrochimice, ceea ce îi oferă o rezistență îndelungată. Ușa de garaj de tip rulou este fiabilă și generează un zgomot redus. Întreținerea acesteia este extrem de ușoară.'
      ],
      spec: [
        ['Dimensiune', 'L3000 H3000'],
        ['Casetă aluminiu', '300 sau 350 mm, grosime 0,95 mm'],
        ['Grosime lamele', '19 mm'],
        ['Timp deschidere/închidere', '10 secunde'],
        ['Culoare', 'maro închis sau maro deschis']
      ],
      colet: COLET_A,
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l-3000-x-3000-h-maro-inchis-8019-maro-deschis-8014'
    },
    {
      id: 398, lamela: 55, l: 3200, h: 2500, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 55mm L3200 H2500, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 55mm L3200 H2500, GRI ANTRACIT',
      pretReg: 4800, pret: 4200, laPromotie: true,
      pasaj: 'L3050 H2250',
      descriere: 'Spațiu util de trecere L3050 H2250',
      proza: [
        'Ușă de garaj de tip rulou, realizată din lamele de 55 mm, umplute cu spumă poliuretanică. Cu sistem automat de deschidere/închidere. Lamelele se strâng, rulate pe verticală. Optime pentru a salva din spațiul disponibil. Izolează fonic și termic, creează un grad ridicat de siguranță, sunt o soluție optimă antiefracție.',
        'Ușa de garaj de tip rulou este potrivită și pentru spații de depozitare, zone comerciale. Montajul este rapid, întreținere minimă pe termen lung.',
        'Timp de deschidere/închidere totală: 25 secunde, cu sistem silențios.'
      ],
      spec: [
        ['Culoare', 'Gri Antracit'],
        ['Dimensiune', 'L3200 H2500'],
        ['Casetă de aluminiu', '250 mm, grosime 0,95 mm'],
        ['Capace laterale din aluminiu', '250 mm'],
        ['Lamele', 'grosime 14 mm'],
        ['Greutate lamele', '4 kg/mp'],
        ['Rulmenți oțel / ax acționare', '60 mm, oțel zincat']
      ],
      colet: COLET_A,
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-lamele-abba-55mm-l3200-h2500-gri-antracit'
    },
    {
      id: 397, lamela: 55, l: 3000, h: 2200, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 55mm L3000 H2200, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 55mm L3000 H2200, GRI ANTRACIT',
      pretReg: 4330, pret: 3850, laPromotie: true,
      pasaj: 'L2850 H1950',
      descriere: 'Spațiu util de trecere L2850 H1950',
      proza: [
        'Ușa de garaj tip rulou este fiabilă și silențioasă și poate fi acționată atât electric, cât și manual. Perfectă pentru închiderea unui spațiu construit pentru autovehicul sau pentru un spațiu de depozitare. Este rezistentă la intemperii datorită procesului electrochimic prin care a fost vopsită. Spațiul de acces este suficient de mare, nu necesită foarte mult loc pentru că închiderea și deschiderea ușii constă în strângerea lamelelor în casetă.',
        'Între lamelele ușilor se află spumă poliuretanică, motiv pentru care izolează foarte bine fonic și termic, ceea ce aduce un plus și mai mult decât atât, nu produce zgomot atunci când este acționată.',
        'O astfel de ușă este soluția perfectă pentru închiderea unui garaj sau a unui spațiu de depozitare, având toate caracteristicile necesare, alături de un aspect elegant și simplu.'
      ],
      spec: [
        ['Culoare', 'Gri Antracit'],
        ['Dimensiune', '3000 × 2200'],
        ['Timp de deschidere/închidere', '25 secunde'],
        ['Casetă din aluminiu', '250 mm, grosime 0,95 mm'],
        ['Ghidaje ușă din aluminiu', '75 mm × 30 mm'],
        ['Rulmenți', 'oțel'],
        ['Ax metalic zincat', 'Ø 70 mm']
      ],
      colet: COLET_A,
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-lamele-abba-55mm-l3000-h2200-gri-antracit'
    },
    {
      id: 396, lamela: 55, l: 3000, h: 2500, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 55mm L3000 H2500, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 55mm L3000 H2500, GRI ANTRACIT',
      pretReg: 4650, pret: 4050, laPromotie: true,
      pasaj: 'L2850 H2250',
      descriere: 'Spațiu util de trecere L2850 H2250',
      proza: [
        'Ușă de garaj de tip rulou, ideală pentru închiderea garajului sau a altor spații rezidențiale sau comerciale, cu rol de depozitare mai ales. Au sistem de închidere automat, prevăzut cu telecomandă, dar poate fi acționat și manual în lipsa alimentării cu curent electric.',
        'Lamelele de 55 mm acționează ca o barieră eficientă și contribuie la izolarea fonică și termică a spațiului închis cu o astfel de ușă. În plus, optimizați spațiul disponibil în interior, datorită sistemului compact, de tip rulou, cu închidere pe verticală.',
        'Include accesoriile necesare, legătură cardanică, manivelă, motorul tubular, cu centrală de comandă și 2 telecomenzi.'
      ],
      spec: [
        ['Culoare', 'Gri Antracit'],
        ['Dimensiune', '3000 × 2500 mm'],
        ['Lamele', '14 mm grosime'],
        ['Ghidaje aluminiu', '75 mm × 30 mm'],
        ['Timp închidere/deschidere', '10 secunde'],
        ['Casetă aluminiu', '250 mm']
      ],
      colet: [],
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-lamele-abba-55mm-l3000-h2500-gri-antracit'
    },
    {
      id: 394, lamela: 55, l: 3000, h: 3000, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 55mm L3000 H3000, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 55mm L3000 H3000, GRI ANTRACIT',
      pretReg: 5000, pret: 4400, laPromotie: true,
      pasaj: 'L2850 H2750',
      descriere: 'Ușă garaj tip rulou automată, perfectă pentru orice garaj!',
      proza: [
        'Ușa de garaj automată de 55MM de tip rulou este exact ceea ce ai nevoie pentru garajul casei sau pentru spațiul de depozitare. Oferă un aspect plăcut și nu ocupă mult spațiu și în același timp oferă siguranța că nu poate fi deschisă de oricine. Pentru un confort sporit această ușă de garaj poate fi acționată electric prin telecomandă, dar și manual la nevoie.',
        'Între lamele se află spumă poliuretanică ce ajută la o mai bună izolare fonică și termică. Ușile de garaj tip rulou sunt mult mai utile decât cele secționale și le puteți achiziționa la un preț avantajos. Aluminiul din care este confecționată o astfel de ușă îi conferă rezistență în timp.',
        'O astfel de ușă de garaj este o soluție ideală pentru a închide orice fel de spațiu, chiar și unul industrial.'
      ],
      spec: [
        ['Spațiu util de trecere', 'L2850 mm H2750 mm'],
        ['Culoare', 'Gri Antracit'],
        ['Dimensiune', 'L3000 H3000'],
        ['Timp de deschidere/închidere', '30 secunde'],
        ['Dimensiune casetă', '250 mm, grosime 0,95 mm'],
        ['Dimensiune capace laterale', '250 mm din aluminiu'],
        ['Lamele din aluminiu cu spumă poliuretanică', '55 mm, grosime 14 mm'],
        ['Ax metalic zincat', '55 mm'],
        ['Ghidaje', '75 mm × 30 mm']
      ],
      colet: COLET_A,
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-lamele-abba-55mm-l3000-h3000-gri-antracit'
    },
    {
      id: 393, lamela: 77, l: 3000, h: 2500, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 77mm L3000 × H2500, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L3000 x H2500, GRI ANTRACIT',
      pretReg: 6100, pret: 5630, laPromotie: true,
      pasaj: '',
      descriere: '',
      proza: [
        'O ușă de garaj de tip rulou vă menține obiectele pe care le dețineți în siguranță, oferind în același timp izolare fonică și termică. Ușa este confecționată din aluminiu, lamelele de 77 mm sunt umplute cu spumă poliuretanică. Sistemul electric încorporat permite deschiderea și închiderea ușii la o apăsare de buton, fiecare în doar 10 secunde. Datorită faptului că lamelele se strâng într-o casetă, se face economie de spațiu și accesibilitatea este sporită. Ușa este vopsită prin procedee speciale electrochimice, ceea ce îi oferă o rezistență îndelungată. Ușa de garaj de tip rulou este fiabilă și generează un zgomot redus. Întreținerea acesteia este extrem de ușoară.',
        'O astfel de ușă va completa perfect fațada oricărei case, având un design elegant.'
      ],
      spec: [
        ['Dimensiune', 'L3000 H2500'],
        ['Casetă aluminiu', '300 sau 350 mm, grosime 0,95 mm'],
        ['Grosime lamele', '19 mm'],
        ['Timp deschidere/închidere', '25 secunde'],
        ['Culoare', 'Gri Antracit']
      ],
      colet: COLET_B,
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l3000-x-h2500-gri-antracit'
    },
    {
      id: 391, lamela: 77, l: 3200, h: 2500, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 77mm L3200 × H2500, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L3200 x H2500, GRI ANTRACIT',
      pretReg: 6840, pret: 5995, laPromotie: true,
      pasaj: '',
      descriere: '',
      proza: [
        'Ușa de tip rulou cu lamele de 77 mm este o variantă economică și fiabilă pentru închiderea garajului, cu o durată îndelungată de viață. Ușa garajului trebuie să facă față intemperiilor și altor factori externi și deschiderilor/închiderilor multiple. Vopseaua este aplicată în câmp electrostatic, motiv pentru care este și rezistentă. Ușa este confecționată din aluminiu de înaltă calitate, iar lamelele sunt umplute cu spumă poliuretanică, oferind izolare termică și fonică. Deschiderea se face în sistem electric cu ajutorul telecomenzii sau de la butonul centralei cu receptor. Totuși, acționarea ușii este permisă chiar și în cazul în care nu există curent, fiind prevăzută și cu acționare manuală.'
      ],
      spec: [
        ['Dimensiune', 'L3200 H2500'],
        ['Casetă aluminiu', '300 sau 350 mm, grosime 0,95 mm'],
        ['Ghidaje din aluminiu', '90 mm × 35 mm'],
        ['Grosime lamele', '19 mm'],
        ['Timp deschidere/închidere', '25 secunde'],
        ['Culoare', 'Gri Antracit']
      ],
      colet: COLET_B,
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l3200-x-h2500-gri-antracit'
    },
    {
      id: 388, lamela: 77, l: 3000, h: 3000, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 77mm L 3000 × 3000 H, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L 3000 x 3000 H , GRI ANTRACIT ,',
      pretReg: 6800, pret: 6035, laPromotie: true,
      pasaj: 'L2820 H2700',
      descriere: 'Ușă garaj tip rulou, potrivită pentru orice construcție!',
      proza: [
        'Ușă de garaj tip rulou cu lamele de 77 mm reprezintă o variantă economică și fiabilă pentru închiderea garajelor, spațiilor comerciale, magazine, chioșcuri, foișoare, pontoane barcă. Prin sistemul de rulare a covorului de lamele în caseta superioară, se poate monta cu ușurință oriunde.',
        'Sistemele de acționare mixte din componența ușii de garaj tip rulou permit utilizarea acesteia chiar și în lipsa curentului, fiind prevăzută cu acționare manuală. Acționarea ușilor de garaj se realizează prin intermediul sistemului de utilizare electric, fiind necesară doar o apăsare pe butonul telecomenzii sau al centralei cu receptor.',
        'Ușa de garaj tip rulou are atât rolul de a izola termic, cât și fonic, fiind realizată din aluminiu și având lamelele umplute cu spumă poliuretanică. Acestea pot fi utilizate în multiple contexte, întrebuințările pornind de la clasica ușă de garaj, până la cea de ușă pentru o hală industrială sau pentru un spațiu comercial.',
        'Componentele folosite la producția ușii sunt de cea mai bună calitate, fiind realizate din aluminiu (ghidaje laterale, casetă superioară și lamele injectate cu spumă poliuretanică). Vopseaua este aplicată prin vopsire în câmp electrostatic și are o bună rezistență în timp.',
        'Gama variată de culori se încadrează perfect în arhitectura oricărei construcții, culorile standard fiind următoarele: alb, maro deschis, maro închis, argintiu, antracit, nuc, stejar auriu. Se poate vopsi în orice culoare din paletarul RAL, la un cost suplimentar.',
        'Prețurile competitive au poziționat ușile de garaj rulou în topul vânzărilor.'
      ],
      spec: [
        ['Spațiu util de trecere', 'L2820 mm H2700'],
        ['Lamele', '77 mm injectate cu spumă poliuretanică, 18 mm grosime'],
        ['Casetă și capace laterale', 'aluminiu, 300 / 350 mm'],
        ['Ghidaje din aluminiu', '90 mm × 35 mm'],
        ['Lamela terminală', 'aluminiu extrudat'],
        ['Rulmenți / ax acționare', 'oțel; ax 70 mm, oțel zincat'],
        ['Acționare', 'motor tubular + centrală de comandă + 2 telecomenzi'],
        ['Acționare de rezervă', 'legătură cardanică + manivelă']
      ],
      colet: COLET_B,
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l-3000-x-3000-h-gri-antracit'
    },
    {
      id: 387, lamela: 55, l: 3000, h: 3000, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată 3000 × 3000, lamele ABBA 55 mm, maro 8014, maro 8019',
      numeOriginal: 'Usa garaj automata 3000 x 3000, lamele ABBA 55 mm , maro 8014, maro 8019',
      pretReg: 4800, pret: 4150, laPromotie: true,
      pasaj: 'L2850 H2750',
      descriere: 'Spațiu util de trecere L2850 H2750',
      proza: [
        'Ușă de garaj, de tip rulou, din aluminiu este ideală pentru garajul dumneavoastră, sistem de acces potrivit pentru spații rezidențiale, dar și comerciale sau industriale. Creată din lamele de 55 mm umplute cu spumă, acestea realizează închiderea perfectă. Țin hoții la distanță, izolează fonic și termic și vă asigură condiții optime pentru depozitarea diverselor bunuri.',
        'Include sistem automat, acționat prin telecomandă, dar poate fi utilizată și manual, în cazul în care este nevoie. Închidere practică și compactă, practic ușa se rulează în caseta din aluminiu, explorând astfel spațiul pe verticală. Nu veți fi condiționați de spațiu, ca în cazul ușilor clasice, cu deschidere în laterală.'
      ],
      spec: [],
      colet: ['legătură cardanică + manivelă', 'motor tubular + centrală de comandă + 2 telecomenzi'],
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-3000-x-3000-lamele-abba-55-mm-maro-8014-maro-8019'
    },
    {
      id: 386, lamela: 55, l: 3200, h: 2500, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată 3200 × 2500, lamele ABBA 55 mm, maro 8014, maro 8019',
      numeOriginal: 'Usa garaj automata 3200 x 2500, lamele ABBA 55 mm , maro 8014, maro 8019',
      pretReg: 4450, pret: 3950, laPromotie: true,
      pasaj: 'L3050 H2250',
      descriere: 'Spațiu util de trecere L3050 H2250',
      proza: [
        'Ușă garaj tip rulou cu lamele de 55 mm reprezintă o variantă economică și fiabilă pentru închiderea garajelor, spațiilor comerciale, magazine, chioșcuri, foișoare, pontoane barcă. Prin sistemul de rulare a covorului de lamele în caseta superioară, se poate monta cu ușurință oriunde.',
        'Sistemele de acționare mixte din componența ușii de garaj tip rulou permit utilizarea acesteia chiar și în lipsa curentului, fiind prevăzută cu acționare manuală. Acționarea ușilor de garaj se realizează prin intermediul sistemului de utilizare electric, fiind necesară doar o apăsare pe butonul telecomenzii sau al centralei cu receptor.',
        'Ușa de garaj tip rulou are atât rolul de a izola termic, cât și fonic, fiind realizată din aluminiu și având lamelele umplute cu spumă poliuretanică. Acestea pot fi utilizate în multiple contexte, întrebuințările pornind de la clasica ușă de garaj, până la cea de ușă pentru o hală industrială sau pentru un spațiu comercial.',
        'Componentele folosite la producția ușii sunt de cea mai bună calitate, fiind realizate din aluminiu (ghidaje laterale, casetă superioară și lamele injectate cu spumă poliuretanică). Vopseaua este aplicată prin vopsire în câmp electrostatic și are o bună rezistență în timp, durata de utilizare a produsului fiind mai mare de 10 ani.',
        'Gama variată de culori se încadrează perfect în arhitectura oricărei construcții, culorile standard fiind următoarele: alb, maro deschis, maro închis, argintiu, gri antracit, nuc, stejar auriu, wenghe, mahon. De asemenea, se poate vopsi în orice culoare din paletarul RAL, la un cost suplimentar.',
        'Prețurile competitive au poziționat ușile de garaj rulou în topul vânzărilor.'
      ],
      spec: [
        ['Lamele', '55 mm injectate cu spumă poliuretanică, 14 mm grosime'],
        ['Casetă și capace laterale', 'aluminiu, 250 mm'],
        ['Ghidaje din aluminiu', '75 mm × 30 mm'],
        ['Lamela terminală', 'aluminiu extrudat'],
        ['Rulmenți / ax acționare', 'oțel; ax 60 mm, oțel zincat'],
        ['Acționare', 'motor tubular + centrală de comandă + 2 telecomenzi'],
        ['Acționare de rezervă', 'legătură cardanică + manivelă']
      ],
      colet: [],
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-3200-x-2500-lamele-abba-55-mm-maro-8014-maro-8019'
    },
    {
      id: 374, lamela: 55, l: 3150, h: 2250, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 3150 × 2250, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 3150 x 2250, lamele 55 mm, maro',
      pretReg: 4300, pret: 3950, laPromotie: true,
      pasaj: 'L3000 H2000',
      descriere: '',
      proza: [
        'Include accesoriile necesare, legătură cardanică, manivelă, motorul tubular, cu centrală de comandă și 2 telecomenzi.'
      ],
      spec: [
        ['Culoare', 'maro'],
        ['Dimensiune', 'L3150 H2250'],
        ['Spațiu util de trecere', 'L3000 H2000'],
        ['Lamele', '14 mm grosime'],
        ['Ghidaje aluminiu', '75 mm × 30 mm'],
        ['Timp închidere/deschidere', '10 secunde'],
        ['Casetă aluminiu', '250 mm']
      ],
      colet: [],
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-3150-x-2250-lamele-55-mm-maro'
    },
    {
      id: 184, lamela: 55, l: 2200, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2200 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2200 x 2200, lamele 55 mm, maro',
      pretReg: 3500, pret: 3290, laPromotie: true,
      pasaj: '',
      descriere: 'Ușa de garaj automată de 55MM de tip rulou este exact ceea ce ai nevoie pentru garajul casei sau pentru spațiul de depozitare. Oferă un aspect plăcut și nu ocupă mult spațiu și în același timp oferă siguranța că nu poate fi deschisă de oricine. Pentru un confort sporit această ușă de garaj poate fi acționată electric prin telecomandă, dar și manual la nevoie.\nÎntre lamele se află spumă poliuretanică ce ajută la o mai bună izolare fonică și termică. Ușile de garaj tip rulou sunt mult mai utile decât cele secționale și le puteți achiziționa la un preț avantajos. Aluminiul din care este confecționată o astfel de ușă îi conferă rezistență în timp.',
      proza: [
        'O astfel de ușă de garaj este o soluție ideală pentru a închide orice fel de spațiu, chiar și unul industrial.'
      ],
      spec: [
        ['Culoare', 'maro'],
        ['Dimensiune', '2200 × 2200'],
        ['Timp de deschidere/închidere', '10 secunde'],
        ['Dimensiune casetă', '250 mm, grosime 0,95 mm'],
        ['Dimensiune capace laterale', '250 mm din aluminiu'],
        ['Lamele din aluminiu cu spumă poliuretanică', '55 mm, grosime 14 mm'],
        ['Ax metalic zincat', '55 mm'],
        ['Ghidaje', '75 mm × 30 mm']
      ],
      colet: [],
      categorii: [A55, C55],
      slug: '%e2%a6%81usa-garaj-automata-abba-55mm-8014-8019-2200-x-2200-lamele-55-mm-maro'
    },
    {
      id: 183, lamela: 55, l: 2600, h: 2300, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2600 × 2300, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2600 x 2300, lamele 55 mm, maro',
      pretReg: 3750, pret: 3500, laPromotie: true,
      pasaj: '',
      descriere: 'Ușa de garaj tip rulou este rezistentă în timp și nu se degradează din cauza utilizărilor repetate. Poate fi acționată foarte ușor în mod electric sau chiar manual, în funcție de nevoie. Este disponibilă într-o nuanță plăcută de maro, care poate completa frumos designul în spațiul în care este montată.\nEste utilă și nu ocupă foarte mult spațiu pentru că lamelele se strâng într-o casetă, oferind în același timp un spațiu de acces foarte mare. Este o ușă perfectă pentru un spațiu de depozitare sau chiar pentru garajul pentru mașină. Este silențioasă și se deschide/închide în doar 10 secunde.',
      proza: [
        'Datorită materialelor din care este confecționată și procesului electrochimic prin care este vopsită, ușa va rezista în aceleași condiții în timp. De asemenea izolează fonic și termic spațiul interior.'
      ],
      spec: [
        ['Culoare', 'maro'],
        ['Dimensiune', '2600 × 2300'],
        ['Timp de deschidere/închidere', '10 secunde'],
        ['Ax metalic zincat', 'Ø 70 mm'],
        ['Casetă din aluminiu', '250 mm, grosime 0,95 mm'],
        ['Capace laterale din aluminiu', '250 mm'],
        ['Grosime lamele cu spumă poliuretanică', '14 mm'],
        ['Ghidaje', '75 mm × 30 mm']
      ],
      colet: [],
      categorii: [A55, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-2600-x-2300-lamele-55-mm-maro'
    },
    {
      id: 182, lamela: 55, l: 3000, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 3000 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 3000 x 2200, lamele 55 mm, maro',
      pretReg: 3900, pret: 3630, laPromotie: true,
      pasaj: '',
      descriere: 'Ușa de garaj tip rulou este fiabilă și silențioasă și poate fi acționată atât electric, cât și manual. Perfectă pentru închiderea unui spațiu construit pentru autovehicul sau pentru un spațiu de depozitare. Este rezistentă la intemperii datorită procesului electrochimic prin care a fost vopsită. Spațiul de acces este suficient de mare, nu necesită foarte mult loc pentru că închiderea și deschiderea ușii constă în strângerea lamelelor în casetă.\nÎntre lamelele ușilor se află spumă poliuretanică, motiv pentru care izolează foarte bine fonic și termic, ceea ce aduce un plus și mai mult decât atât, nu produce zgomot atunci când este acționată.',
      proza: [
        'O astfel de ușă este soluția perfectă pentru închiderea unui garaj sau a unui spațiu de depozitare, având toate caracteristicile necesare, alături de un aspect elegant și simplu.'
      ],
      spec: [
        ['Culoare', 'maro'],
        ['Dimensiune', '3000 × 2200'],
        ['Timp de deschidere/închidere', '10 secunde'],
        ['Casetă din aluminiu', '250 mm, grosime 0,95 mm'],
        ['Ghidaje ușă din aluminiu', '75 mm × 30 mm'],
        ['Rulmenți', 'oțel'],
        ['Ax metalic zincat', 'Ø 70 mm']
      ],
      colet: [],
      categorii: [A55, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-3000-x-2200-lamele-55-mm-maro'
    },
    {
      id: 181, lamela: 55, l: 2300, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2300 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2300 x 2200, lamele 55 mm, maro',
      pretReg: 3350, pret: 3350, laPromotie: false,
      pasaj: '',
      descriere: 'Ușă de garaj, de tip rulou, din aluminiu este ideală pentru garajul dumneavoastră, sistem de acces potrivit pentru spații rezidențiale, dar și comerciale sau industriale. Creată din lamele de 55 mm umplute cu spumă, acestea realizează închiderea perfectă. Țin hoții la distanță, izolează fonic și termic și vă asigură condiții optime pentru depozitarea diverselor bunuri.\nInclude sistem automat, acționat prin telecomandă, dar poate fi utilizată și manual, în cazul în care este nevoie. Închidere practică și compactă, practic ușa se rulează în caseta din aluminiu, explorând astfel spațiul pe verticală. Nu veți fi condiționați de spațiu, ca în cazul ușilor clasice, cu deschidere în laterală.',
      proza: [
        'Materialele de calitate contribuie la o rezistență îndelungată. Ușa de garaj de tip rulou ABBA este din aluminiu, elementele sale componente sunt vopsite prin procedee speciale.'
      ],
      spec: [
        ['Dimensiuni', '2300 × 2200 mm'],
        ['Culoare', 'maro'],
        ['Timp închidere/deschidere', '10 secunde'],
        ['Capace laterale', '250 mm'],
        ['Lamele', '55 mm, grosime 14 mm'],
        ['Ax metalic', 'Ø 70 mm']
      ],
      colet: [],
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-2300-x-2200-lamele-55-mm-maro'
    },
    {
      id: 180, lamela: 55, l: 2200, h: 2100, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2200 × 2100, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2200 x 2100, lamele 55 mm, maro',
      pretReg: 3400, pret: 3250, laPromotie: true,
      pasaj: '',
      descriere: 'Ușă de garaj cu sistem automat, de tip rulou, din lamele de 55 mm. Deschidere printr-o simplă apăsare de buton, dar la nevoie, poate fi acționată și manual.\nO alegere excelentă fie că vorbim de un garaj zilnic utilizat, aflat în perimetrul casei sau aproape orice tip de spațiu de depozitare. Securizează perimetrul, este antiefracție, dar are și un preț accesibil.\nLamelele sunt umplute cu spumă poliuretanică, ceea ce le face mai rezistente și eficiente în ceea ce privește izolarea fonică și termică în interiorul spațiului. Durabile chiar și expuse diferențelor de temperaturi.\nDimensiuni standard, ușa de garaj de 2200 × 2100 mm poate fi comandată imediat, în stoc disponibil, cu accesorii incluse.',
      proza: [
        'Ușa de garaj și componentele sale sunt din aluminiu, se comportă excelent în timp și la uzură și sunt vopsite prin procedeu special, electrochimic.'
      ],
      spec: [
        ['Culoare', 'maro'],
        ['Dimensiune', '2200 × 2100 mm'],
        ['Casetă aluminiu', '250 mm, grosime 0,95 mm'],
        ['Timp închidere/deschidere', '10 secunde'],
        ['Ax metalic', 'Ø 70 mm'],
        ['Ghidaje ușă', '75 mm × 30 mm']
      ],
      colet: [],
      categorii: [A55, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-2200-x-2100-lamele-55-mm-maro'
    },
    {
      id: 179, lamela: 55, l: 3000, h: 2500, familie: 'maro', raluri: [], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 3000 × 2500, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 3000 x 2500, lamele 55 mm, maro',
      pretReg: 3700, pret: 3700, laPromotie: false,
      pasaj: 'L2850 H2250',
      descriere: 'Ușă de garaj de tip rulou, ideală pentru închiderea garajului sau a altor spații rezidențiale sau comerciale, cu rol de depozitare mai ales. Au sistem de închidere automat, prevăzut cu telecomandă, dar poate fi acționat și manual în lipsa alimentării cu curent electric.\nLamelele de 55 mm acționează ca o barieră eficientă și contribuie la izolarea fonică și termică a spațiului închis cu o astfel de ușă. În plus, optimizați spațiul disponibil în interior, datorită sistemului compact, de tip rulou, cu închidere pe verticală.\nCulorile standard disponibile sunt: alb, nuanțe de maro, argintiu, gri, nuc, stejar, wenghe, mahon.',
      proza: [
        'Include accesoriile necesare, legătură cardanică, manivelă, motorul tubular, cu centrală de comandă și 2 telecomenzi.'
      ],
      spec: [
        ['Cote utile de trecere', 'L2850 H2250'],
        ['Culoare', 'maro'],
        ['Dimensiune', '3000 × 2500 mm'],
        ['Lamele', '14 mm grosime'],
        ['Ghidaje aluminiu', '75 mm × 30 mm'],
        ['Timp închidere/deschidere', '10 secunde'],
        ['Casetă aluminiu', '250 mm']
      ],
      colet: [],
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-abba-55mm-3000-x-2500-lamele-55-mm-maro'
    },
    {
      id: 178, lamela: 55, l: 2400, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2400 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2400 x 2200, lamele 55 mm, maro',
      pretReg: 3550, pret: 3450, laPromotie: true,
      pasaj: '',
      descriere: 'Ușă de garaj de tip rulou, din aluminiu. Lamelele sunt de 55 mm, umplute cu spumă poliuretanică, ceea ce înseamnă că acest panou de lamele va crea și izolare fonică și termică optimă. Ideală pentru spații înguste, datorită sistemului de închidere/deschidere pe verticală.\nUșa de garaj de tip rulou, cu acționare automată, vă optimizează timpii de deschidere, vine cu extra confort pentru utilizator. Menține bunurile în siguranță, are sistem de acces facil, închidere și deschidere rapidă, silențioasă. Ușa de garaj este durabilă și potrivită pentru orice tip de spațiu, inclusiv pentru cei care au nevoie de ușă de acces la garajul integrat în proiectul casei.\nSoluție rezidențială și comercială, la preț accesibil.',
      proza: [
        'Sistemul este unul silențios la acționare și dispune de telecomandă, pentru o mai rapidă și ușoară utilizare, de la distanță.'
      ],
      spec: [
        ['Dimensiune', '2400 × 2200 mm'],
        ['Casetă aluminiu', '250 mm, grosime 0,95 mm'],
        ['Greutate lamele', '4 kg'],
        ['Grosime lamele', '14 mm'],
        ['Ghidaje ușă', '75 mm × 30 mm'],
        ['Timp deschidere/închidere', '10 secunde'],
        ['Culoare', 'maro']
      ],
      colet: [],
      categorii: [A55, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-2400-x-2200-lamele-55-mm-maro'
    },
    {
      id: 161, lamela: 55, l: 2500, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2500 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2500 x 2200, lamele 55 mm, maro',
      pretReg: 3650, pret: 3420, laPromotie: true,
      pasaj: '',
      descriere: 'Ușă de garaj de tip rulou, realizată din lamele de 55 mm, umplute cu spumă poliuretanică. Cu sistem automat de deschidere/închidere. Lamelele se strâng, rulate pe verticală. Optime pentru a salva din spațiul disponibil. Izolează fonic și termic, creează un grad ridicat de siguranță, sunt o soluție optimă antiefracție.\nUșa de garaj de tip rulou este potrivită și pentru spații de depozitare, zone comerciale. Montajul este rapid, întreținere minimă pe termen lung.\nTimp de deschidere/închidere totală: 10 secunde, cu sistem silențios.',
      proza: [
        'Ușa de garaj comandată vine la pachet cu accesoriile necesare. Opțional, puteți solicita centrala cu acționare prin telecomandă, senzor infraroșu și avertizor optic.'
      ],
      spec: [
        ['Culoare', 'standard maro; la comandă puteți alege nuanța conform catalog'],
        ['Dimensiune', '2500 × 2200 mm'],
        ['Casetă de aluminiu', '250 mm, grosime 0,95 mm'],
        ['Capace laterale din aluminiu', '250 mm'],
        ['Lamele', 'grosime 14 mm'],
        ['Greutate lamele', '4 kg/mp'],
        ['Rulmenți oțel / ax acționare', '60 mm, oțel zincat']
      ],
      colet: [],
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-2500-x-2200-lamele-55-mm-maro'
    }
  ];

  var fmtLei = new Intl.NumberFormat('ro-RO', {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  });

  UG.RAL = RAL;
  UG.LAMELA = LAMELA;
  UG.FOTO = FOTO;
  UG.PRODUSE = PRODUSE;
  UG.CATEGORII = { C55: C55, C77: C77, NOI: NOI, PRO: PRO, A55: A55, A77: A77 };

  UG.urlProdus  = function (p) { return BASE + p.slug + '/'; };

  /**
   * Numele fișierului local al paginii de produs.
   *
   * Un slug din magazin conține o secvență procentuală („%e2%a6%81…”). Folosită
   * ca nume de fișier, serverul o decodifică la cerere și nu mai găsește
   * fișierul — pagina răspundea cu 404. Secvențele sunt eliminate din numele
   * local; adresa către magazin rămâne cea originală, neatinsă.
   */
  UG.fisierProdus = function (p) {
    return p.slug.replace(/%[0-9a-f]{2}/gi, '').replace(/^-+|-+$/g, '');
  };

  /** Codul RAL folosit la DESEN — unul pe familie, ca desenul să dea cu poza. */
  UG.ralDesen = function (p) { return RAL_FAMILIE[p.familie] || 'maro'; };

  /** Codul RAL folosit ca etichetă, când e nevoie de unul singur. */
  UG.ralProdus = function (p) { return p.raluri[0] || 'maro'; };

  /** Toate codurile RAL declarate de magazin, în ordinea din denumire. */
  UG.culoriProdus = function (p) {
    return p.raluri.length ? p.raluri.map(function (r) { return RAL[r].ral; }).join(' / ')
                           : RAL[UG.ralProdus(p)].nume;
  };

  UG.fotoProdus = function (p) { return FOTO[p.foto]; };

  /** Reducerea procentuală — `null` dacă produsul nu e la promoție. */
  UG.reducere = function (p) {
    return p.laPromotie ? Math.round((1 - p.pret / p.pretReg) * 100) : null;
  };

  /** Preț formatat în convenția românească: 4.050,00 lei */
  UG.lei = function (v) { return fmtLei.format(v) + ' lei'; };

  /**
   * Rezumatul de pe cartelă.
   *
   * Magazinul lasă `short_description` gol la 5 produse. În loc de o cartelă
   * fără text, se coboară pe primul paragraf al descrierii lungi și, în ultimă
   * instanță, pe spațiul util de trecere — tot valori ale magazinului, nimic
   * inventat aici.
   */
  UG.rezumat = function (p) {
    var d = (p.descriere || '').split('\n')[0];
    if (d) return d;
    if (p.proza && p.proza.length) return p.proza[0];
    return p.pasaj ? 'Spațiu util de trecere ' + p.pasaj : '';
  };

  /** Paragrafele descrierii: rezumatul scurt, apoi proza din descrierea lungă. */
  UG.paragrafe = function (p) {
    return (p.descriere || '').split('\n').concat(p.proza || []).filter(Boolean);
  };

  UG.dinCategorie = function (nume) {
    return PRODUSE.filter(function (p) { return p.categorii.indexOf(nume) !== -1; });
  };

  UG.sumar = function () {
    var preturi = PRODUSE.map(function (p) { return p.pret; });
    return {
      total: PRODUSE.length,
      laPromotie: PRODUSE.filter(function (p) { return p.laPromotie; }).length,
      pretMin: Math.min.apply(null, preturi),
      latimeMin: Math.min.apply(null, PRODUSE.map(function (p) { return p.l; })),
      latimeMax: Math.max.apply(null, PRODUSE.map(function (p) { return p.l; }))
    };
  };
})(window.UG);
