/**
 * calculator.js — estimatorul de preț pentru uși la comandă.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  FUNCȚIONALITATE ÎN TESTARE.                                         │
 * │  Poate fi retrasă fără urme: se pune `CALCULATOR: false` în build.js │
 * │  și se șterge acest fișier. Nimic altceva nu depinde de el.          │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * SURSA CIFRELOR
 * Tabelele de mai jos sunt copiate din listele de preț ABBA CONFORT primite pe
 * 16.09.2026: „LAMELE 55 TABEL NOU.xlsx” și „TABEL 77 NOU.xlsx”. Nu sunt
 * scrise de mână: au fost extrase automat din Excel și verificate față de lista
 * anterioară (SC FRIGOTRANS CONEXIM SRL, ediția 22.III) — aceleași cote, aceleași
 * lungimi de rând, fiecare valoare cu ~5 % peste cea veche. Valorile sunt în
 * EURO, conțin TVA (scrie pe foaie) și NU includ acționarea — de aceea formula
 * o adaugă separat.
 *
 * O CAPCANĂ A FIȘIERULUI EXCEL
 * Valorile de peste 1000 au fost tastate cu punct de mii („1.007”), iar Excel
 * le-a reținut ca zecimale (1,007). La extragere, orice valoare sub 100 a fost
 * înmulțită cu 1000. Că regula e cea bună se vede din rânduri: fiecare rămâne
 * strict crescător de la stânga la dreapta, fără nicio treaptă de 1000 lipsă.
 *
 * TABELELE SUNT TRIUNGHIULARE
 * Nu orice lățime merge cu orice înălțime. Rândurile scad în lungime pe măsură
 * ce ușa crește: la 77 mm, înălțimea de 4800 mm are prețuri doar până la
 * 3100 mm lățime. Combinațiile care lipsesc din tabel nu se estimează —
 * calculatorul cere contactarea firmei, în loc să inventeze o cifră.
 *
 * ROTUNJIREA E O REGULĂ A FURNIZORULUI, NU O COMODITATE
 * „La calcularea pretului unei usi dimensiunile pe latime si inaltime se
 * rotunjesc in plus la dimensiunile din tabel.” Deci o ușă de 2430 mm se
 * tarifează la 2500 mm. Rotunjirea în jos ar da un preț mai mic decât cel real.
 *
 * O NEPOTRIVIRE DIN LISTA VECHE, DISPĂRUTĂ
 * În tabelul de 77 mm din ediția anterioară, la înălțimea 4800 și lățimea
 * 2600, prețul era 1544 — mai mic decât cel de la 2500 mm (1566), deși toate
 * celelalte valori creșteau. Era păstrat ca atare, ca greșeală de tipar a
 * furnizorului. Lista nouă are acolo 1688, între vecinii lui, deci rândul e
 * acum monoton ca toate celelalte. Nu mai e nimic de lămurit.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  /* --- Datele furnizorului, în euro, fără acționare --------------------- */

  var TABELE = {
  55: {
    latimi: [1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3100,3200,3300,3400,3500],
    preturi: {
      1500: [329,342,357,372,386,400,415,428,443,458,473,486,501,516,529,544,559,572,587,602,615,630,645],
      1600: [337,352,366,381,396,411,425,440,455,469,484,499,513,528,543,558,572,587,602,616,631,646,660],
      1700: [351,365,381,396,412,426,442,458,473,488,503,519,533,549,564,580,595,610,626,641,656,671,687],
      1800: [363,379,395,411,427,443,459,475,490,506,522,539,554,570,586,602,617,634,650,666,681,697,713],
      1900: [376,393,410,425,442,459,476,491,508,525,542,558,574,591,608,624,641,657,674,690,707,723,740],
      2000: [389,406,423,440,458,475,491,509,526,543,561,578,594,612,629,646,664,680,698,715,732,750,767],
      2100: [445,462,467,484,501,518,536,552,569,587,604,621,637,655,672,689,706,723,741,757,807,824,841],
      2200: [455,471,477,494,511,528,546,563,581,599,615,633,650,668,685,702,719,737,756,804,822,839,857],
      2300: [467,484,490,508,526,544,562,580,597,615,633,652,670,688,706,723,741,759,812,828,846,864,882],
      2400: [480,498,504,522,541,560,578,596,615,633,652,670,689,708,726,744,763,815,835,852,870,888,907],
      2500: [492,510,518,537,555,574,593,613,632,651,670,689,708,728,747,765,817,837,857,875,894,912,931],
      2600: [505,523,531,551,570,590,610,629,649,669,688,708,728,748,767,819,839,859,880,898,918,938],
      2700: [518,537,545,565,585,606,626,646,666,687,707,727,747,768,820,841,861,881,903,922,942],
      2800: [526,546,554,575,595,616,636,657,677,698,718,739,759,813,834,854,875,895,917,936],
      2900: [539,559,568,589,610,631,652,673,694,715,737,758,812,833,854,875,896,917,940],
      3000: [551,572,582,604,625,647,668,690,712,733,755,810,832,853,875,896,918,940],
      3100: [564,585,606,627,648,669,690,711,732,753,807,828,849,870,891,912,933],
      3200: [588,609,631,652,674,695,717,738,760,815,837,858,880,901,923,944],
      3300: [596,618,641,663,685,706,728,750,804,826,848,870,891,914,936],
      3400: [609,632,654,676,699,721,743,799,821,844,866,888,910,933,956]
    }
  },
  77: {
    latimi: [1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,4100,4200,4300,4400,4500,4600,4700,4800],
    preturi: {
      1800: [693,714,737,759,782,804,826,849,872,895,917,939,962,984,1007,1029,1051,1074,1110,1133,1155,1178,1192,1209,1227,1256,1278,1300,1323,1346,1368],
      1900: [720,742,766,790,814,837,861,884,908,931,954,979,1002,1026,1049,1073,1096,1119,1158,1181,1204,1228,1243,1261,1281,1310,1335,1358,1382,1406,1429],
      2000: [738,761,785,810,834,858,882,906,929,953,978,1002,1026,1050,1074,1098,1122,1147,1185,1210,1234,1258,1274,1292,1312,1343,1367,1391,1416,1441,1465],
      2100: [756,779,803,828,853,878,902,927,951,976,1001,1026,1050,1075,1099,1125,1149,1174,1213,1238,1262,1287,1303,1322,1343,1374,1399,1424,1449,1474,1498],
      2200: [783,807,834,859,885,910,937,962,988,1013,1040,1065,1091,1116,1142,1169,1194,1220,1261,1286,1312,1338,1354,1374,1398,1430,1455,1482,1509,1535,1560],
      2300: [801,825,852,878,904,930,958,984,1010,1036,1063,1089,1115,1141,1168,1194,1220,1246,1288,1315,1341,1367,1385,1405,1429,1462,1488,1514,1542,1569,1595],
      2400: [818,844,870,898,924,951,978,1005,1032,1058,1086,1112,1139,1167,1193,1220,1246,1274,1317,1343,1370,1396,1415,1436,1460,1494,1520,1548,1576,1603,1630],
      2500: [845,873,900,928,956,984,1012,1040,1068,1096,1124,1152,1180,1208,1236,1263,1292,1320,1364,1391,1420,1448,1467,1489,1514,1549,1577,1605,1635,1663,1692],
      2600: [863,890,919,947,975,1004,1033,1062,1090,1118,1147,1175,1204,1233,1261,1289,1318,1346,1391,1420,1448,1477,1496,1519,1545,1581,1610,1638,1668,1698,1726],
      2700: [881,908,938,966,995,1025,1054,1083,1112,1141,1170,1199,1228,1257,1286,1316,1344,1373,1420,1448,1477,1507,1527,1550,1576,1613,1642,1672,1703,1731,1761],
      2800: [899,926,957,986,1015,1045,1074,1105,1134,1163,1193,1222,1253,1282,1311,1341,1371,1401,1447,1476,1506,1536,1557,1580,1608,1645,1675,1704,1737,1766,1796],
      2900: [925,954,986,1016,1047,1077,1109,1139,1170,1200,1232,1262,1293,1323,1354,1385,1415,1446,1494,1525,1556,1587,1609,1634,1661,1700,1731,1762,1796,1826,1857],
      3000: [943,973,1004,1035,1067,1098,1130,1160,1192,1223,1255,1285,1317,1348,1380,1411,1442,1473,1522,1553,1584,1616,1638,1664,1693,1732,1764,1794,1829,1861,1892],
      3100: [961,991,1023,1054,1087,1118,1150,1182,1214,1245,1278,1309,1341,1373,1405,1436,1468,1500,1550,1581,1614,1645,1668,1695,1723,1764,1796,1828,1863,1895],
      3200: [988,1020,1052,1086,1118,1151,1184,1217,1250,1283,1316,1348,1382,1414,1447,1480,1513,1546,1597,1630,1662,1696,1720,1747,1777,1819,1852,1885],
      3300: [1026,1067,1099,1133,1166,1199,1232,1265,1298,1331,1364,1398,1430,1464,1496,1530,1562,1596,1647,1680,1714,1746,1770,1798,1828,1870,1904],
      3400: [1053,1095,1130,1154,1188,1222,1256,1290,1324,1359,1393,1427,1462,1495,1530,1563,1598,1632,1685,1719,1754,1787,1812,1841,1872,1916,1951],
      3500: [1070,1114,1149,1183,1218,1253,1287,1322,1357,1391,1426,1461,1495,1530,1564,1600,1635,1670,1723,1758,1792,1827,1853,1882,1913,1958],
      3600: [1088,1132,1168,1192,1227,1263,1298,1334,1368,1404,1440,1474,1510,1545,1580,1615,1651,1686,1740,1776,1811,1846,1872,1903,1934],
      3700: [1115,1161,1197,1234,1269,1306,1343,1379,1415,1452,1488,1525,1560,1597,1634,1670,1706,1743,1799,1834,1871,1908,1935],
      3800: [1133,1179,1216,1242,1279,1316,1352,1389,1427,1464,1500,1537,1574,1611,1648,1685,1722,1759,1815,1852,1889,1927],
      3900: [1151,1198,1235,1273,1310,1347,1385,1423,1460,1497,1535,1572,1610,1647,1684,1722,1760,1798,1854,1892,1930],
      4000: [1168,1216,1254,1281,1319,1357,1394,1432,1471,1509,1547,1584,1622,1661,1699,1737,1774,1812,1871,1909],
      4100: [1195,1244,1284,1323,1362,1401,1441,1479,1518,1557,1597,1636,1675,1714,1754,1792,1831,1870],
      4200: [1213,1263,1303,1330,1370,1409,1449,1489,1529,1569,1608,1647,1687,1727,1766,1806,1846],
      4300: [1231,1282,1322,1362,1402,1443,1483,1522,1563,1603,1643,1684,1724,1764,1805,1845],
      4400: [1258,1310,1351,1380,1422,1463,1504,1546,1587,1628,1670,1710,1751,1793,1834],
      4500: [1275,1328,1370,1412,1454,1496,1538,1580,1622,1663,1705,1747,1789,1831,1873],
      4600: [1293,1347,1389,1419,1461,1504,1546,1589,1631,1673,1716,1758,1801,1843],
      4700: [1310,1365,1408,1451,1494,1537,1580,1623,1666,1709,1752,1796,1839,1882],
      4800: [1338,1394,1438,1468,1512,1556,1600,1644,1688,1732,1777,1821,1865,1909]
    }
  }
  };

  /**
   * Formula de preț, pe familie de lamelă.
   *
   * Pașii, în ordinea în care se aplică:
   *   1. preț din tabel  (ușa goală, fără acționare)
   *   2. + acționare     (motor cu centrală și 2 telecomenzi)
   *   3. + accesorii     (ochet deblocare motor 13 € + manivelă cu cârlig 13 €)
   *   4. − 45 %          (discountul comercial față de lista furnizorului)
   *   5. − 3 %           (a doua reducere, pe prețul DEJA redus — nu −48 %)
   *   6. + 280 €         (adaosul casei)
   *   7. × cursul BNR    (în interfață; aici totul rămâne în euro)
   *
   * Scris ca în instrucțiunea primită: 77 = (tabel + 326) − 45 % − 3 % + 280,
   * 55 = (tabel + 220) − 45 % − 3 % + 280. Cele 326 și 220 nu sunt constante
   * de sine stătătoare, ci acționarea plus cele două accesorii (300 + 13 + 13,
   * respectiv 194 + 13 + 13); sunt ținute separat ca să se vadă din ce sunt
   * făcute și ca schimbarea unui motor să nu ceară recalculat un total de mână.
   *
   * Acționarea diferă între familii fiindcă sunt motoare diferite: la 77 mm
   * axul e de Ø70 mm, cu centrală externă (300 €); la 55 mm motorul e cu
   * reductor (194 €). Ambele cifre sunt din lista furnizorului, secțiunea
   * PRETURI ACTIONARI, iar accesoriile din PRETURI OPTIONALE.
   */
  var FORMULA = {
    55: { actionare: 194, actionareNume: 'Motor cu centrală și 2 telecomenzi, cu reductor' },
    77: { actionare: 300, actionareNume: 'Motor cu centrală externă și 2 telecomenzi (ax Ø70 mm)' }
  };

  var ACCESORII = [
    { nume: 'Ochet deblocare motor', pret: 13 },
    { nume: 'Manivelă cu cârlig',    pret: 13 }
  ];

  var REDUCERE  = 0.45;
  var REDUCERE2 = 0.03;   /* se aplică pe rezultatul primei: × 0,55 × 0,97 */
  var ADAOS = 280;

  UG.calcTabele = TABELE;
  UG.calcFormula = FORMULA;

  /** Rotunjeste în SUS la prima cotă din listă. `null` dacă depășește tabelul. */
  function rotunjeste(valoare, lista) {
    for (var i = 0; i < lista.length; i++) if (lista[i] >= valoare) return lista[i];
    return null;
  }

  /**
   * Estimează prețul. Întoarce fie `{ ok: true, ... }` cu toți pașii, fie
   * `{ ok: false, motiv }` — niciodată o cifră aproximată.
   */
  UG.calculeazaPret = function (lamela, latime, inaltime) {
    var t = TABELE[lamela], f = FORMULA[lamela];
    if (!t) return { ok: false, motiv: 'Lamelă necunoscută.' };

    var inaltimi = Object.keys(t.preturi).map(Number).sort(function (a, b) { return a - b; });

    var L = rotunjeste(latime, t.latimi);
    var H = rotunjeste(inaltime, inaltimi);

    if (L === null || H === null) {
      return { ok: false, motiv: 'Dimensiunea depășește tabelul de preț: maximum ' +
        t.latimi[t.latimi.length - 1] + ' × ' + inaltimi[inaltimi.length - 1] + ' mm.' };
    }

    var rand = t.preturi[H];
    var idx = t.latimi.indexOf(L);
    var dinTabel = rand[idx];

    /* Rândurile sunt mai scurte decât lista de lățimi acolo unde combinația nu
       se produce. Nu e o eroare de date, e o limită reală de fabricație. */
    if (dinTabel === undefined || dinTabel === null) {
      var maxL = t.latimi[rand.length - 1];
      return { ok: false, motiv: 'La înălțimea de ' + H + ' mm, lățimea maximă disponibilă este ' +
        maxL + ' mm.' };
    }

    var accesorii = ACCESORII.reduce(function (s, a) { return s + a.pret; }, 0);
    var subtotal = dinTabel + f.actionare + accesorii;
    var dupaReducere = subtotal * (1 - REDUCERE);
    var dupaReducere2 = dupaReducere * (1 - REDUCERE2);
    var final = dupaReducere2 + ADAOS;

    return {
      ok: true,
      lamela: lamela,
      cerut: { l: latime, h: inaltime },
      folosit: { l: L, h: H },
      rotunjit: L !== latime || H !== inaltime,
      dinTabel: dinTabel,
      actionare: f.actionare,
      actionareNume: f.actionareNume,
      accesorii: ACCESORII,
      accesoriiTotal: accesorii,
      subtotal: subtotal,
      procentReducere: REDUCERE * 100,
      valoareReducere: subtotal * REDUCERE,
      dupaReducere: dupaReducere,
      procentReducere2: REDUCERE2 * 100,
      valoareReducere2: dupaReducere * REDUCERE2,
      dupaReducere2: dupaReducere2,
      adaos: ADAOS,
      final: Math.round(final)
    };
  };
})(window.UG);

/* ==========================================================================
   Interfața. Tot ce urmează atinge DOAR elementele din `#calculator`, deci
   ștergerea blocului din pagină dezactivează calculatorul fără efecte laterale.
   ========================================================================== */

(function (UG) {
  'use strict';

  /* Fără DOM nu există interfață de construit. Garda ține fișierul încărcabil
     și în Node, ca formula de mai sus să poată fi verificată cu un script,
     fără browser — exact ce s-a făcut ca să se confirme cifrele. */
  if (typeof document === 'undefined') return;

  var gazda = document.getElementById('calculator');
  if (!gazda || !UG.calculeazaPret) return;

  var campL    = gazda.querySelector('[data-calc-latime]');
  var campH    = gazda.querySelector('[data-calc-inaltime]');
  var iesire   = gazda.querySelector('[data-calc-rezultat]');
  var actiuni  = gazda.querySelector('[data-calc-actiuni]');
  var campBuc  = gazda.querySelector('[data-calc-bucati]');

  /* Ultimul rezultat valid, ca butonul de coș să nu recalculeze la apăsare —
     ar putea prinde altă cifră decât cea pe care omul tocmai a citit-o. */
  var ultimul = null;

  /**
   * Cursul BNR: cel copt la generare, împrospătat dacă backendul răspunde.
   *
   * BNR nu trimite antet CORS, deci pagina nu-l poate cere direct — verificat.
   * Backendul magazinului poate, fiindcă iese în internet de pe server, nu din
   * browser. Dacă nu răspunde, rămâne cursul din ziua generării, iar data lui
   * este scrisă lângă preț: un curs fără ziua lui nu poate fi verificat.
   */
  var curs = window.UG_CURS || { eur: 5.2535, data: '', sursa: 'implicit' };

  (function improspateazaCurs() {
    var cfg = window.UG_MAGAZIN || {};
    if (!cfg.store) return;
    fetch(cfg.store.replace('/wc/store/v1', '/ug/v1') + '/curs')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (c) {
        if (c && c.eur > 0) { curs = { eur: c.eur, data: c.data, sursa: 'BNR' }; deseneaza(); }
      })
      .catch(function () { /* rămâne cursul copt la generare */ });
  })();

  var lei = function (v) {
    return new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .format(v) + ' lei';
  };
  var dataRo = function (iso) {
    if (!iso) return '';
    var p = iso.split('-');
    return p.length === 3 ? p[2] + '.' + p[1] + '.' + p[0] : iso;
  };

  var eur = function (v) {
    return new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v) + ' €';
  };
  var mm = function (v) { return v + ' mm'; };

  function lamelaAleasa() {
    var ales = gazda.querySelector('[name="calc-lamela"]:checked');
    return ales ? Number(ales.value) : 55;
  }

  /* Nuanța NU schimbă prețul — la furnizor costă la fel — dar schimbă produsul
     comandat, deci trebuie să ajungă în comandă. Fără ea, la atelier ar sosi o
     ușă „la comandă” fără să se știe în ce culoare. */
  function culoareAleasa() {
    var ales = gazda.querySelector('[name="calc-culoare"]:checked');
    if (!ales) return null;
    return { nume: ales.dataset.nume || '', ral: ales.dataset.ral || '' };
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function deseneaza() {
    var l = Number(campL.value), h = Number(campH.value);

    if (!l || !h) {
      iesire.innerHTML = '<p class="calc-gol">Introduceți lățimea și înălțimea golului.</p>';
      actiuni.hidden = true;
      ultimul = null;
      return;
    }

    var r = UG.calculeazaPret(lamelaAleasa(), l, h);

    if (!r.ok) {
      iesire.innerHTML = '<p class="calc-nu"><b>Nu putem estima automat.</b> ' + esc(r.motiv) +
        ' Sunați-ne la <a href="tel:+40731366613">0731 366 613</a> și facem oferta împreună.</p>';
      actiuni.hidden = true;
      ultimul = null;
      return;
    }

    ultimul = r;
    actiuni.hidden = false;

    var inLei = Math.round(r.final * curs.eur);

    iesire.innerHTML =
      '<p class="calc-suma">' + lei(inLei) + '</p>' +
      '<p class="calc-suma-eur">' + eur(r.final) + '</p>' +
      '<p class="calc-curs">Curs BNR ' + (curs.data ? dataRo(curs.data) : '') +
        ': 1 € = ' + String(curs.eur).replace('.', ',') + ' lei</p>' +
      (r.rotunjit
        ? '<p class="calc-nota">Calculat la <b>' + mm(r.folosit.l) + ' × ' + mm(r.folosit.h) +
          '</b> — lista furnizorului rotunjește în sus la cotele din tabel.</p>'
        : '<p class="calc-nota">Cotă exactă din tabel: ' + mm(r.folosit.l) + ' × ' + mm(r.folosit.h) + '.</p>');

    /* Aici a stat desfășurarea „Cum a ieșit cifra”: preț de listă, culoare,
       acționare, accesorii, subtotal, reducere, montaj, preț final — fiecare pe
       rândul lui. A fost scoasă la cerere. Calculul din `UG.calculeazaPret`
       rămâne neatins; doar nu se mai arată pas cu pas. */
  }

  /* --- Cererea de ofertă ---------------------------------------------------
   *
   * DE CE NU „ADAUGĂ ÎN COȘ”
   *
   * O ușă la comandă nu poate trece prin coș. WooCommerce adaugă acolo numai
   * produse care există la el, iar un preț venit din browser n-ar fi de crezut:
   * oricine poate schimba cifra înainte s-o trimită și ar cumpăra o ușă de
   * 6.000 € cu un leu. Prețul se stabilește la firmă, nu în pagină.
   *
   * Deci calculatorul dă o estimare, iar butonul trimite o CERERE: cotele,
   * culoarea și estimarea pleacă pe e-mail, împreună cu datele de contact.
   * Firma răspunde cu prețul ferm.
   *
   * Cererea pleacă prin WordPress-ul magazinului, nu printr-un serviciu străin:
   * vitrina e statică și n-are cum trimite e-mail singură, iar de acolo pleacă
   * deja confirmările de comandă — deci drumul e dovedit.
   */
  var formular = gazda.querySelector('[data-calc-formular]');
  var btnCere  = gazda.querySelector('[data-calc-cere]');
  var reusit   = gazda.querySelector('[data-calc-cerere-reusit]');
  var eroareC  = gazda.querySelector('[data-calc-cerere-eroare]');

  if (btnCere && formular) {
    btnCere.addEventListener('click', function () {
      formular.hidden = false;
      btnCere.hidden = true;
      var primul = formular.querySelector('input[name="nume"]');
      if (primul) { primul.focus(); }
      formular.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  }

  /* Județele și localitățile, aceleași date ca la finalizarea comenzii. */
  (function judeteInCerere() {
    if (!formular) return;
    var selJudet = formular.querySelector('select[name="judet"]');
    var campOras = formular.querySelector('input[name="localitate"]');
    var lista = document.getElementById('lista-localitati-cerere');
    if (!selJudet || !UG.JUDETE) return;

    Object.keys(UG.JUDETE)
      .sort(function (a, b) { return UG.JUDETE[a].localeCompare(UG.JUDETE[b], 'ro'); })
      .forEach(function (cod) {
        var o = document.createElement('option');
        o.value = UG.JUDETE[cod];   /* aici pleacă NUMELE, nu codul: e un
                                       e-mail citit de om, nu o validare WooCommerce */
        o.textContent = UG.JUDETE[cod];
        o.dataset.cod = cod;
        selJudet.appendChild(o);
      });

    selJudet.addEventListener('change', function () {
      if (!lista) return;
      var ales = selJudet.selectedOptions[0];
      var cod = ales ? ales.dataset.cod : '';
      lista.innerHTML = '';
      ((UG.LOCALITATI && UG.LOCALITATI[cod]) || []).forEach(function (n) {
        var o = document.createElement('option');
        o.value = n;
        lista.appendChild(o);
      });
      if (campOras) {
        campOras.placeholder = cod ? 'Scrieți sau alegeți din listă' : 'Alegeți întâi județul';
      }
    });
  }());

  if (formular) {
    formular.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!ultimul) return;

      var ia = function (n) {
        var c = formular.querySelector('[name="' + n + '"]');
        return c ? (c.value || '').trim() : '';
      };

      /* Validare minimă, aceeași ca la finalizare: numai ce chiar blochează
         un răspuns — un nume, un telefon și un e-mail la care se poate scrie. */
      /* Greșeala se arată PE CÂMPUL greșit, nu doar într-un rând jos.
         Prima variantă spunea „completați un telefon complet” sub formular,
         fără să marcheze care câmp e de vină — iar cineva care scrisese numele
         din greșeală în căsuța de telefon nu avea cum să-și dea seama; a și
         raportat că „nu are câmp de telefon”. Aceeași purtare ca la
         finalizarea comenzii: chenar roșu și mesaj sub câmp. */
      var arata = function (nume, mesaj) {
        var camp = formular.querySelector('[name="' + nume + '"]');
        var cutie = camp && camp.closest('.camp');
        if (!cutie) return;
        var p = cutie.querySelector('.camp__eroare');
        if (mesaj) {
          cutie.dataset.eroare = '1';
          camp.setAttribute('aria-invalid', 'true');
          if (p) { p.textContent = mesaj; p.hidden = false; }
        } else {
          delete cutie.dataset.eroare;
          camp.removeAttribute('aria-invalid');
          if (p) { p.hidden = true; }
        }
      };

      var gresite = [];
      [
        ['nume',    !ia('nume'),                                                    'Scrieți numele.'],
        ['telefon', ia('telefon').replace(/[^\d]/g, '').length < 10,                'Un număr de telefon complet, cu prefix.'],
        ['email',   !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(ia('email')),             'Adresă de e-mail invalidă.']
      ].forEach(function (r) {
        arata(r[0], r[1] ? r[2] : null);
        if (r[1]) gresite.push(r[0]);
      });

      if (gresite.length) {
        eroareC.textContent = gresite.length === 1
          ? 'Mai e un câmp de completat, marcat mai sus.'
          : 'Mai sunt câmpuri de completat, marcate mai sus.';
        eroareC.hidden = false;
        var primul = formular.querySelector('[name="' + gresite[0] + '"]');
        if (primul) { primul.focus(); primul.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
        return;
      }
      eroareC.hidden = true;

      var c = culoareAleasa();
      var bucati = Math.max(1, Number(campBuc && campBuc.value) || 1);

      var date = {
        nume: ia('nume'), telefon: ia('telefon'), email: ia('email'),
        judet: ia('judet'), localitate: ia('localitate'), adresa: ia('adresa'),
        mesaj: ia('mesaj'), website: ia('website'),

        lamela: ultimul.lamela + ' mm',
        latime: ultimul.cerut.l + ' mm',
        inaltime: ultimul.cerut.h + ' mm',
        culoare: c ? (c.nume + (c.ral ? ' (' + c.ral + ')' : '')) : '',
        bucati: String(bucati),
        /* Estimarea merge ca text, ca la firmă să se vadă ce a văzut și
           clientul. E marcată în e-mail drept estimare, nu ofertă. */
        estimare: lei(Math.round(ultimul.final * curs.eur)) + ' (' + eur(ultimul.final) + ')'
      };

      var btn = formular.querySelector('[data-calc-trimite]');
      var textInitial = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Se trimite…';

      /* Endpointul stă lângă Store API, în același WordPress. Adresa se
         derivă din cea a magazinului, ca să nu fie scrisă de două ori. */
      var store = (window.UG_MAGAZIN && window.UG_MAGAZIN.store) || '';
      var adresaApi = store.replace('/wc/store/v1', '/ug/v1');
      if (!adresaApi) {
        eroareC.textContent = 'Magazinul nu este configurat. Sunați-ne la 0731 366 613.';
        eroareC.hidden = false;
        btn.disabled = false;
        btn.textContent = textInitial;
        return;
      }

      fetch(adresaApi + '/cerere-oferta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(date)
      }).then(function (r) {
        return r.json().then(function (j) {
          if (!r.ok) throw new Error(j.message || 'Cererea nu a putut fi trimisă.');
          return j;
        });
      }).then(function () {
        formular.hidden = true;
        if (reusit) {
          reusit.hidden = false;
          reusit.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }).catch(function (e) {
        btn.disabled = false;
        btn.textContent = textInitial;
        eroareC.textContent = e.message +
          ' Ne puteți suna la 0731 366 613 și preluăm cererea la telefon.';
        eroareC.hidden = false;
      });
    });
  }


  gazda.addEventListener('input', deseneaza);
  gazda.addEventListener('change', deseneaza);
  deseneaza();
})(window.UG);
