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
 * Tabelele de mai jos sunt copiate din listele de preț ale furnizorului,
 * „USI GARAJ 55.pdf” și „USI GARAJ 77.pdf” (SC FRIGOTRANS CONEXIM SRL,
 * ediția 22.III). Nu sunt scrise de mână: au fost extrase automat din PDF și
 * verificate punctual față de original. Valorile sunt în EURO și NU includ
 * acționarea — de aceea formula o adaugă separat.
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
 * O NEPOTRIVIRE ÎN SURSĂ, PĂSTRATĂ CA ATARE
 * În tabelul de 77 mm, la înălțimea 4800 și lățimea 2600, prețul este 1544,
 * mai mic decât cel de la 2500 mm (1566), deși toate celelalte valori cresc.
 * Pare o greșeală de tipar în lista furnizorului. NU a fost corectată aici:
 * datele rămân cele primite, iar diferența se lămurește cu furnizorul.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  /* --- Datele furnizorului, în euro, fără acționare --------------------- */

  var TABELE = {
  55: {
    latimi: [1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3100,3200,3300,3400,3500],
    preturi: {
      1500: [313,326,340,354,368,381,395,408,422,436,450,463,477,491,504,518,532,545,559,573,586,600,614],
      1600: [321,335,349,363,377,391,405,419,433,447,461,475,489,503,517,531,545,559,573,587,601,615,629],
      1700: [334,348,363,377,392,406,421,436,450,465,479,494,508,523,537,552,567,581,596,610,625,639,654],
      1800: [346,361,376,391,407,422,437,452,467,482,497,513,528,543,558,573,588,604,619,634,649,664,679],
      1900: [358,374,390,405,421,437,453,468,484,500,516,531,547,563,579,594,610,626,642,657,673,689,705],
      2000: [370,387,403,419,436,452,468,485,501,517,534,550,566,583,599,615,632,648,665,681,697,714,730],
      2100: [424,440,445,461,477,493,510,526,542,559,575,591,607,624,640,656,672,689,706,721,769,785,801],
      2200: [433,449,454,470,487,503,520,536,553,570,586,603,619,636,652,669,685,702,720,766,783,799,816],
      2300: [445,461,467,484,501,518,535,552,569,586,603,621,638,655,672,689,706,723,773,789,806,823,840],
      2400: [457,474,480,497,515,533,550,568,586,603,621,638,656,674,691,709,727,776,795,811,829,846,864],
      2500: [469,486,493,511,529,547,565,584,602,620,638,656,674,693,711,729,778,797,816,833,851,869,887],
      2600: [481,498,506,525,543,562,581,599,618,637,655,674,693,712,730,780,799,818,838,855,874,893],
      2700: [493,511,519,538,557,577,596,615,634,654,673,692,711,731,781,801,820,839,860,878,897],
      2800: [501,520,528,548,567,587,606,626,645,665,684,704,723,774,794,813,833,852,873,891],
      2900: [513,532,541,561,581,601,621,641,661,681,702,722,773,793,813,833,853,873,895],
      3000: [525,545,554,575,595,616,636,657,678,698,719,771,792,812,833,853,874,895],
      3100: [537,557,577,597,617,637,657,677,697,717,769,789,809,829,849,869,889],
      3200: [560,580,601,621,642,662,683,703,724,776,797,817,838,858,879,899],
      3300: [568,589,610,631,652,672,693,714,766,787,808,829,849,870,891],
      3400: [580,602,623,644,666,687,708,761,782,804,825,846,867,889,910]
    }
  },
  77: {
    latimi: [1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,4100,4200,4300,4400,4500,4600,4700,4800],
    preturi: {
      1800: [660,680,702,723,745,766,787,809,830,852,873,894,916,937,959,980,1001,1023,1057,1079,1100,1122,1135,1151,1169,1196,1217,1238,1260,1282,1303],
      1900: [686,707,730,752,775,797,820,842,865,887,909,932,954,977,999,1022,1044,1066,1103,1125,1147,1170,1184,1201,1220,1248,1271,1293,1316,1339,1361],
      2000: [703,725,748,771,794,817,840,863,885,908,931,954,977,1000,1023,1046,1069,1092,1129,1152,1175,1198,1213,1230,1250,1279,1302,1325,1349,1372,1395],
      2100: [720,742,765,789,812,836,859,883,906,930,953,977,1000,1024,1047,1071,1094,1118,1155,1179,1202,1226,1241,1259,1279,1309,1332,1356,1380,1404,1427],
      2200: [746,769,794,818,843,867,892,916,941,965,990,1014,1039,1063,1088,1113,1137,1162,1201,1225,1250,1274,1290,1309,1331,1362,1386,1411,1437,1462,1486],
      2300: [763,786,811,836,861,886,912,937,962,987,1012,1037,1062,1087,1112,1137,1162,1187,1227,1252,1277,1302,1319,1338,1361,1392,1417,1442,1469,1494,1519],
      2400: [779,804,829,855,880,906,931,957,983,1008,1034,1059,1085,1111,1136,1162,1187,1213,1254,1279,1305,1330,1348,1368,1390,1423,1448,1474,1501,1527,1552],
      2500: [805,831,857,884,910,937,964,990,1017,1044,1070,1097,1124,1150,1177,1203,1230,1257,1299,1325,1352,1379,1397,1418,1442,1475,1502,1529,1557,1584,1611],
      2600: [822,848,875,902,929,956,984,1011,1038,1065,1092,1119,1147,1174,1201,1228,1255,1282,1325,1352,1379,1407,1425,1447,1471,1506,1533,1560,1589,1617,1644],
      2700: [839,865,893,920,948,976,1004,1031,1059,1087,1114,1142,1170,1197,1225,1253,1280,1308,1352,1379,1407,1435,1454,1476,1501,1536,1564,1592,1622,1649,1677],
      2800: [856,882,911,939,967,995,1023,1052,1080,1108,1136,1164,1193,1221,1249,1277,1306,1334,1378,1406,1434,1463,1483,1505,1531,1567,1595,1623,1654,1682,1710],
      2900: [881,909,939,968,997,1026,1056,1085,1114,1143,1173,1202,1231,1260,1290,1319,1348,1377,1423,1452,1482,1511,1532,1556,1582,1619,1649,1678,1710,1739,1769],
      3000: [898,927,956,986,1016,1046,1076,1105,1135,1165,1195,1224,1254,1284,1314,1344,1373,1403,1450,1479,1509,1539,1560,1585,1612,1650,1680,1709,1742,1772,1802],
      3100: [915,944,974,1004,1035,1065,1095,1126,1156,1186,1217,1247,1277,1308,1338,1368,1398,1429,1476,1506,1537,1567,1589,1614,1641,1680,1710,1741,1774,1805],
      3200: [941,971,1002,1034,1065,1096,1128,1159,1190,1222,1253,1284,1316,1347,1378,1410,1441,1472,1521,1552,1583,1615,1638,1664,1692,1732,1764,1795],
      3300: [977,1016,1047,1079,1110,1142,1173,1205,1236,1268,1299,1331,1362,1394,1425,1457,1488,1520,1569,1600,1632,1663,1686,1712,1741,1781,1813],
      3400: [1003,1043,1076,1099,1131,1164,1196,1229,1261,1294,1327,1359,1392,1424,1457,1489,1522,1554,1605,1637,1670,1702,1726,1753,1783,1825,1858],
      3500: [1019,1061,1094,1127,1160,1193,1226,1259,1292,1325,1358,1391,1424,1457,1490,1524,1557,1590,1641,1674,1707,1740,1765,1792,1822,1865],
      3600: [1036,1078,1112,1135,1169,1203,1236,1270,1303,1337,1371,1404,1438,1471,1505,1538,1572,1606,1657,1691,1725,1758,1783,1812,1842],
      3700: [1062,1106,1140,1175,1209,1244,1279,1313,1348,1383,1417,1452,1486,1521,1556,1590,1625,1660,1713,1747,1782,1817,1843],
      3800: [1079,1123,1158,1183,1218,1253,1288,1323,1359,1394,1429,1464,1499,1534,1570,1605,1640,1675,1729,1764,1799,1835],
      3900: [1096,1141,1176,1212,1248,1283,1319,1355,1390,1426,1462,1497,1533,1569,1604,1640,1676,1712,1766,1802,1838],
      4000: [1112,1158,1194,1220,1256,1292,1328,1364,1401,1437,1473,1509,1545,1582,1618,1654,1690,1726,1782,1818],
      4100: [1138,1185,1223,1260,1297,1334,1372,1409,1446,1483,1521,1558,1595,1632,1670,1707,1744,1781],
      4200: [1155,1203,1241,1267,1305,1342,1380,1418,1456,1494,1531,1569,1607,1645,1682,1720,1758],
      4300: [1172,1221,1259,1297,1335,1374,1412,1450,1489,1527,1565,1604,1642,1680,1719,1757],
      4400: [1198,1248,1287,1314,1354,1393,1432,1472,1511,1550,1590,1629,1668,1708,1747],
      4500: [1214,1265,1305,1345,1385,1425,1465,1505,1545,1584,1624,1664,1704,1744,1784],
      4600: [1231,1283,1323,1351,1391,1432,1472,1513,1553,1593,1634,1674,1715,1755],
      4700: [1248,1300,1341,1382,1423,1464,1505,1546,1587,1628,1669,1710,1751,1792],
      4800: [1274,1328,1370,1398,1440,1482,1524,1566,1544,1650,1692,1734,1776,1818]
    }
  }  };

  /**
   * Formula de preț, pe familie de lamelă.
   *
   * Pașii, în ordinea în care se aplică:
   *   1. preț din tabel  (ușa goală, fără acționare)
   *   2. + acționare     (motor cu centrală și 2 telecomenzi)
   *   3. + accesorii     (cheiță deblocare motor 12 € + manivelă cu cârlig 12 €)
   *   4. − 40 %          (discountul comercial față de lista furnizorului)
   *   5. + 200 €         (adaosul casei)
   *
   * Acționarea diferă între familii fiindcă sunt motoare diferite: la 77 mm
   * axul e de Ø70 mm (248 €), la 55 mm motorul e cu reductor (184 €). Ambele
   * cifre sunt din lista furnizorului, secțiunea ACȚIONĂRI.
   */
  var FORMULA = {
    55: { actionare: 184, actionareNume: 'Motor cu centrală și 2 telecomenzi, cu reductor' },
    77: { actionare: 248, actionareNume: 'Motor cu centrală externă și 2 telecomenzi (ax Ø70 mm)' }
  };

  var ACCESORII = [
    { nume: 'Cheiță deblocare motor', pret: 12 },
    { nume: 'Manivelă cu cârlig',     pret: 12 }
  ];

  var REDUCERE = 0.40;
  var ADAOS = 200;

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
    var final = dupaReducere + ADAOS;

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
  var detaliu  = gazda.querySelector('[data-calc-detaliu]');
  var actiuni  = gazda.querySelector('[data-calc-actiuni]');
  var campBuc  = gazda.querySelector('[data-calc-bucati]');
  var btnCos   = gazda.querySelector('[data-calc-cos]');

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

  function randDetaliu(eticheta, valoare, clasa) {
    return '<div class="calc-pas' + (clasa ? ' ' + clasa : '') + '">' +
      '<span>' + eticheta + '</span><b>' + valoare + '</b></div>';
  }

  function deseneaza() {
    var l = Number(campL.value), h = Number(campH.value);

    if (!l || !h) {
      iesire.innerHTML = '<p class="calc-gol">Introduceți lățimea și înălțimea golului.</p>';
      detaliu.innerHTML = '';
      detaliu.hidden = true;
      actiuni.hidden = true;
      ultimul = null;
      return;
    }

    var r = UG.calculeazaPret(lamelaAleasa(), l, h);

    if (!r.ok) {
      iesire.innerHTML = '<p class="calc-nu"><b>Nu putem estima automat.</b> ' + esc(r.motiv) +
        ' Sunați-ne la <a href="tel:+40731366613">0731 366 613</a> și facem oferta împreună.</p>';
      detaliu.innerHTML = '';
      detaliu.hidden = true;
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

    detaliu.hidden = false;
    detaliu.innerHTML =
      '<p class="calc-detaliu__titlu">Cum a ieșit cifra</p>' +
      randDetaliu('Ușă ' + r.lamela + ' mm, ' + mm(r.folosit.l) + ' × ' + mm(r.folosit.h) +
                  ' <small>(preț de listă, fără acționare)</small>', eur(r.dinTabel)) +
      (function () {
        var c = culoareAleasa();
        return c ? randDetaliu('Culoare <small>' + esc(c.ral) + '</small>', esc(c.nume)) : '';
      })() +
      randDetaliu('Acționare <small>' + esc(r.actionareNume) + '</small>', '+ ' + eur(r.actionare)) +
      r.accesorii.map(function (a) {
        return randDetaliu(esc(a.nume), '+ ' + eur(a.pret));
      }).join('') +
      randDetaliu('Subtotal', eur(r.subtotal), 'calc-pas--total') +
      randDetaliu('Reducere ' + r.procentReducere + ' %', '− ' + eur(r.valoareReducere), 'calc-pas--minus') +
      randDetaliu('După reducere', eur(r.dupaReducere), 'calc-pas--total') +
      randDetaliu('Montaj și transport', '+ ' + eur(r.adaos)) +
      randDetaliu('Preț final', eur(r.final), 'calc-pas--final');
  }

  /* --- Adăugarea în coș --------------------------------------------------- */

  /**
   * Se adaugă suma ÎN LEI, nu în euro.
   *
   * Coșul, finalizarea și magazinul lucrează în lei; o linie în euro ar trebui
   * reconvertită la fiecare afișare și s-ar schimba singură de la o zi la alta.
   * Clientul ar vedea alt total decât cel pe care l-a acceptat. Cursul folosit
   * merge odată cu rândul, ca diferența să poată fi explicată la nevoie.
   */
  if (btnCos) {
    btnCos.addEventListener('click', function () {
      if (!ultimul || !UG.cosAdaugăLaComandă) return;

      var bucati = Math.max(1, Number(campBuc && campBuc.value) || 1);
      var inLei = Math.round(ultimul.final * curs.eur);

      var c = culoareAleasa();
      var nume = 'Ușă de garaj la comandă, lamelă ' + ultimul.lamela + ' mm, ' +
        ultimul.folosit.l + ' × ' + ultimul.folosit.h + ' mm' +
        (c ? ', ' + c.nume : '');

      var detalii = 'Cotele cerute: ' + ultimul.cerut.l + ' × ' + ultimul.cerut.h + ' mm' +
        (ultimul.rotunjit ? ' (tarifat la ' + ultimul.folosit.l + ' × ' + ultimul.folosit.h + ' mm)' : '') +
        (c && c.ral ? ' · ' + c.ral : '') +
        ' · ' + ultimul.final + ' € la cursul ' + String(curs.eur).replace('.', ',') +
        (curs.data ? ' din ' + dataRo(curs.data) : '');

      btnCos.disabled = true;
      var textInitial = btnCos.textContent;

      UG.cosAdaugăLaComandă({
        nume: nume, detaliu: detalii, lei: inLei,
        eur: ultimul.final, curs: curs.eur, bucati: bucati
      }).then(function () {
        btnCos.textContent = 'Adăugat în coș';
        btnCos.classList.add('btn--ok');
        setTimeout(function () {
          btnCos.textContent = textInitial;
          btnCos.classList.remove('btn--ok');
          btnCos.disabled = false;
        }, 2000);
      }).catch(function () {
        btnCos.disabled = false;
      });
    });
  }

  gazda.addEventListener('input', deseneaza);
  gazda.addEventListener('change', deseneaza);
  deseneaza();
})(window.UG);
