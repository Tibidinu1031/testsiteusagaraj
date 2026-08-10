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
 * Singura intervenție este ortografică: denumirile și descrierile sunt scrise
 * cu diacritice. Textul original, fără diacritice, este păstrat în
 * `numeOriginal`, ca diferența să poată fi verificată oricând.
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

  /** Ordinea este cea implicită a magazinului. */
  var PRODUSE = [
    {
      id: 401, lamela: 77, l: 3000, h: 2500, familie: 'maro', raluri: ['8019', '8014'], foto: 'maro',
      nume: 'Ușă garaj automată lamele ABBA 77mm L3000 × H2500, maro închis 8019, maro deschis 8014',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L3000 x H2500 , maro inchis 8019, maro deschis 8014',
      pretReg: 6100, pret: 5315, laPromotie: true,
      descriere: 'Spațiu util de trecere L2820 H2200',
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l3000-x-h2500-maro-inchis-8019-maro-deschis-8014'
    },
    {
      id: 400, lamela: 77, l: 3200, h: 2500, familie: 'maro', raluri: ['8019', '8014'], foto: 'maro',
      nume: 'Ușă garaj automată lamele ABBA 77mm L3200 × H2500, maro închis 8019, maro deschis 8014',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L3200 x H2500 , maro inchis 8019, maro deschis 8014',
      pretReg: 6150, pret: 5465, laPromotie: true,
      descriere: 'Spațiu util de trecere L3020 H2200',
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l3200-x-h2500-maro-inchis-8019-maro-deschis-8014'
    },
    {
      id: 399, lamela: 77, l: 3000, h: 3000, familie: 'maro', raluri: ['8019', '8014'], foto: 'maro',
      nume: 'Ușă garaj automată lamele ABBA 77mm L 3000 × 3000 H, maro închis 8019, maro deschis 8014',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L 3000 x 3000 H , maro inchis 8019, maro deschis 8014',
      pretReg: 6650, pret: 5880, laPromotie: true,
      descriere: 'Spațiu util de trecere L2820 H2700',
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l-3000-x-3000-h-maro-inchis-8019-maro-deschis-8014'
    },
    {
      id: 398, lamela: 55, l: 3200, h: 2500, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 55mm L3200 H2500, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 55mm L3200 H2500, GRI ANTRACIT',
      pretReg: 4800, pret: 4200, laPromotie: true,
      descriere: 'Spațiu util de trecere L3050 H2250',
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-lamele-abba-55mm-l3200-h2500-gri-antracit'
    },
    {
      id: 397, lamela: 55, l: 3000, h: 2200, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 55mm L3000 H2200, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 55mm L3000 H2200, GRI ANTRACIT',
      pretReg: 4330, pret: 3850, laPromotie: true,
      descriere: 'Spațiu util de trecere L2850 H 1950',
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-lamele-abba-55mm-l3000-h2200-gri-antracit'
    },
    {
      id: 396, lamela: 55, l: 3000, h: 2500, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 55mm L3000 H2500, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 55mm L3000 H2500, GRI ANTRACIT',
      pretReg: 4650, pret: 4050, laPromotie: true,
      descriere: 'Spațiu util de trecere L2850 H2250',
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-lamele-abba-55mm-l3000-h2500-gri-antracit'
    },
    {
      id: 394, lamela: 55, l: 3000, h: 3000, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 55mm L3000 H3000, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 55mm L3000 H3000, GRI ANTRACIT',
      pretReg: 5000, pret: 4400, laPromotie: true,
      descriere: 'Ușă garaj tip rulou automată, perfectă pentru orice garaj!',
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-lamele-abba-55mm-l3000-h3000-gri-antracit'
    },
    {
      id: 393, lamela: 77, l: 3000, h: 2500, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 77mm L3000 × H2500, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L3000 x H2500, GRI ANTRACIT',
      pretReg: 6100, pret: 5630, laPromotie: true,
      descriere: '',
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l3000-x-h2500-gri-antracit'
    },
    {
      id: 391, lamela: 77, l: 3200, h: 2500, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 77mm L3200 × H2500, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L3200 x H2500, GRI ANTRACIT',
      pretReg: 6840, pret: 5995, laPromotie: true,
      descriere: '',
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l3200-x-h2500-gri-antracit'
    },
    {
      id: 388, lamela: 77, l: 3000, h: 3000, familie: 'antracit', raluri: ['7016'], foto: 'antracit',
      nume: 'Ușă garaj automată lamele ABBA 77mm L 3000 × 3000 H, GRI ANTRACIT',
      numeOriginal: 'Usa garaj automata lamele ABBA 77mm L 3000 x 3000 H , GRI ANTRACIT ,',
      pretReg: 6800, pret: 6035, laPromotie: true,
      descriere: 'Ușă garaj tip rulou, potrivită pentru orice construcție!',
      categorii: [A77, NOI, PRO, C77],
      slug: 'usa-garaj-automata-lamele-abba-77mm-l-3000-x-3000-h-gri-antracit'
    },
    {
      id: 387, lamela: 55, l: 3000, h: 3000, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată 3000 × 3000, lamele ABBA 55 mm, maro 8014, maro 8019',
      numeOriginal: 'Usa garaj automata 3000 x 3000, lamele ABBA 55 mm , maro 8014, maro 8019',
      pretReg: 4800, pret: 4150, laPromotie: true,
      descriere: '',
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-3000-x-3000-lamele-abba-55-mm-maro-8014-maro-8019'
    },
    {
      id: 386, lamela: 55, l: 3200, h: 2500, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată 3200 × 2500, lamele ABBA 55 mm, maro 8014, maro 8019',
      numeOriginal: 'Usa garaj automata 3200 x 2500, lamele ABBA 55 mm , maro 8014, maro 8019',
      pretReg: 4450, pret: 3950, laPromotie: true,
      descriere: '',
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-3200-x-2500-lamele-abba-55-mm-maro-8014-maro-8019'
    },
    {
      id: 374, lamela: 55, l: 3150, h: 2250, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 3150 × 2250, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 3150 x 2250, lamele 55 mm, maro',
      pretReg: 4300, pret: 3950, laPromotie: true,
      descriere: '',
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-3150-x-2250-lamele-55-mm-maro'
    },
    {
      id: 184, lamela: 55, l: 2200, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2200 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2200 x 2200, lamele 55 mm, maro',
      pretReg: 3500, pret: 3290, laPromotie: true,
      descriere: 'Ușa de garaj automată de 55MM de tip rulou este exact ceea ce ai nevoie pentru garajul casei sau pentru spațiul de depozitare. Oferă un aspect plăcut și nu ocupă mult spațiu și în același timp oferă siguranța că nu poate fi deschisă de oricine. Pentru un confort sporit această ușă de garaj poate fi acționată electric prin telecomandă, dar și manual la nevoie.\nÎntre lamele se află spumă poliuretanică ce ajută la o mai bună izolare fonică și termică. Ușile de garaj tip rulou sunt mult mai utile decât cele secționale și le puteți achiziționa la un preț avantajos. Aluminiul din care este confecționată o astfel de ușă îi conferă rezistență în timp.',
      categorii: [A55, C55],
      slug: '%e2%a6%81usa-garaj-automata-abba-55mm-8014-8019-2200-x-2200-lamele-55-mm-maro'
    },
    {
      id: 183, lamela: 55, l: 2600, h: 2300, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2600 × 2300, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2600 x 2300, lamele 55 mm, maro',
      pretReg: 3750, pret: 3500, laPromotie: true,
      descriere: 'Ușa de garaj tip rulou este rezistentă în timp și nu se degradează din cauza utilizărilor repetate. Poate fi acționată foarte ușor în mod electric sau chiar manual, în funcție de nevoie. Este disponibilă într-o nuanță plăcută de maro, care poate completa frumos designul în spațiul în care este montată.\nEste utilă și nu ocupă foarte mult spațiu pentru că lamelele se strâng într-o casetă, oferind în același timp un spațiu de acces foarte mare. Este o ușă perfectă pentru un spațiu de depozitare sau chiar pentru garajul pentru mașină. Este silențioasă și se deschide/închide în doar 10 secunde.',
      categorii: [A55, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-2600-x-2300-lamele-55-mm-maro'
    },
    {
      id: 182, lamela: 55, l: 3000, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 3000 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 3000 x 2200, lamele 55 mm, maro',
      pretReg: 3900, pret: 3630, laPromotie: true,
      descriere: 'Ușa de garaj tip rulou este fiabilă și silențioasă și poate fi acționată atât electric, cât și manual. Perfectă pentru închiderea unui spațiu construit pentru autovehicul sau pentru un spațiu de depozitare. Este rezistentă la intemperii datorită procesului electrochimic prin care a fost vopsită. Spațiul de acces este suficient de mare, nu necesită foarte mult loc pentru că închiderea și deschiderea ușii constă în strângerea lamelelor în casetă.\nÎntre lamelele ușilor se află spumă poliuretanică, motiv pentru care izolează foarte bine fonic și termic, ceea ce aduce un plus și mai mult decât atât, nu produce zgomot atunci când este acționată.',
      categorii: [A55, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-3000-x-2200-lamele-55-mm-maro'
    },
    {
      id: 181, lamela: 55, l: 2300, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2300 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2300 x 2200, lamele 55 mm, maro',
      pretReg: 3350, pret: 3350, laPromotie: false,
      descriere: 'Ușă de garaj, de tip rulou, din aluminiu este ideală pentru garajul dumneavoastră, sistem de acces potrivit pentru spații rezidențiale, dar și comerciale sau industriale. Creată din lamele de 55 mm umplute cu spumă, acestea realizează închiderea perfectă. Țin hoții la distanță, izolează fonic și termic și vă asigură condiții optime pentru depozitarea diverselor bunuri.\nInclude sistem automat, acționat prin telecomandă, dar poate fi utilizată și manual, în cazul în care este nevoie. Închidere practică și compactă, practic ușa se rulează în caseta din aluminiu, explorând astfel spațiul pe verticală. Nu veți fi condiționați de spațiu, ca în cazul ușilor clasice, cu deschidere în laterală.',
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-2300-x-2200-lamele-55-mm-maro'
    },
    {
      id: 180, lamela: 55, l: 2200, h: 2100, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2200 × 2100, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2200 x 2100, lamele 55 mm, maro',
      pretReg: 3400, pret: 3250, laPromotie: true,
      descriere: 'Ușă de garaj cu sistem automat, de tip rulou, din lamele de 55 mm. Deschidere printr-o simplă apăsare de buton, dar la nevoie, poate fi acționată și manual.\nO alegere excelentă fie că vorbim de un garaj zilnic utilizat, aflat în perimetrul casei sau aproape orice tip de spațiu de depozitare. Securizează perimetrul, este antiefracție, dar are și un preț accesibil.\nLamelele sunt umplute cu spumă poliuretanică, ceea ce le face mai rezistente și eficiente în ceea ce privește izolarea fonică și termică în interiorul spațiului. Durabile chiar și expuse diferențelor de temperaturi.\nDimensiuni standard, ușa de garaj de 2200 × 2100 cm poate fi comandată imediat, în stoc disponibil, cu accesorii incluse',
      categorii: [A55, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-2200-x-2100-lamele-55-mm-maro'
    },
    {
      id: 179, lamela: 55, l: 3000, h: 2500, familie: 'maro', raluri: [], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 3000 × 2500, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 3000 x 2500, lamele 55 mm, maro',
      pretReg: 3700, pret: 3700, laPromotie: false,
      descriere: 'Ușă de garaj de tip rulou, ideală pentru închiderea garajului sau a altor spații rezidențiale sau comerciale, cu rol de depozitare mai ales. Au sistem de închidere automat, prevăzut cu telecomandă, dar poate fi acționat și manual în lipsa alimentării cu curent electric.\nLamelele de 55 mm acționează ca o barieră eficientă și contribuie la izolarea fonică și termică a spațiului închis cu o astfel de ușă. În plus, optimizați spațiul disponibil în interior, datorită sistemului compact, de tip rulou, cu închidere pe verticală.\nCulorile standard disponibile sunt: alb, nuanțe de maro, argintiu, gri, nuc, stejar, wenghe, mahon.',
      categorii: [A55, NOI, PRO, C55],
      slug: 'usa-garaj-automata-abba-55mm-3000-x-2500-lamele-55-mm-maro'
    },
    {
      id: 178, lamela: 55, l: 2400, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2400 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2400 x 2200, lamele 55 mm, maro',
      pretReg: 3550, pret: 3450, laPromotie: true,
      descriere: 'Ușă de garaj de tip rulou, din aluminiu. Lamelele sunt de 55 mm, umplute cu spumă poliuretanică, ceea ce înseamnă că acest panou de lamele va crea și izolare fonică și termică optimă. Ideală pentru spații înguste, datorită sistemului de închidere/deschidere pe verticală.\nUșa de garaj de tip rulou, cu acționare automată, vă optimizează timpii de deschidere, vine cu extra confort pentru utilizator. Menține bunurile în siguranță, are sistem de acces facil, închidere și deschidere rapidă, silențioasă. Ușa de garaj este durabilă și potrivită pentru orice tip de spațiu, inclusiv pentru cei care au nevoie de ușă de acces la garajul integrat în proiectul casei.\nSoluție rezidențială și comercială, la preț accesibil.',
      categorii: [A55, C55],
      slug: 'usa-garaj-automata-abba-55mm-8014-8019-2400-x-2200-lamele-55-mm-maro'
    },
    {
      id: 161, lamela: 55, l: 2500, h: 2200, familie: 'maro', raluri: ['8014', '8019'], foto: 'maro',
      nume: 'Ușă garaj automată ABBA 55MM, 8014/8019, 2500 × 2200, lamele 55 mm, maro',
      numeOriginal: 'Usa garaj automata ABBA 55MM, 8014/8019, 2500 x 2200, lamele 55 mm, maro',
      pretReg: 3650, pret: 3420, laPromotie: true,
      descriere: 'Ușă de garaj de tip rulou, realizată din lamele de 5 mm, umplute cu spumă poliuretanică. Cu sistem automat de deschidere/închidere. Lamelele se strâng, rulate pe verticală. Optime pentru a salva din spațiul disponibil. Izolează fonic și termic, creează un grad ridicat de siguranță, sunt o soluție optimă antiefracție.\nUșa de garaj de tip rulou este potrivită și pentru spații de depozitare, zone comerciale. Montajul este rapid, întreținere minimă pe termen lung.\nTimp de deschidere/închidere totală: 10 secunde, cu sistem silențios.',
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
  UG.ralProdus  = function (p) { return p.raluri[0] || 'maro'; };
  UG.fotoProdus = function (p) { return FOTO[p.foto]; };

  /** Reducerea procentuală — `null` dacă produsul nu e la promoție. */
  UG.reducere = function (p) {
    return p.laPromotie ? Math.round((1 - p.pret / p.pretReg) * 100) : null;
  };

  /** Preț formatat în convenția românească: 4.050,00 lei */
  UG.lei = function (v) { return fmtLei.format(v) + ' lei'; };

  /** Primul rând al descrierii — folosit ca rezumat pe cartelă. */
  UG.rezumat = function (p) { return (p.descriere || '').split('\n')[0]; };

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
