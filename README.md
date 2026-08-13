# Usa-garaj.ro — frontend nou

Reproiectarea interfeței pentru **ABBA CONFORT SOLUTIONS HOMES S.R.L.**
(CUI 40437439, J15/136/2019).

Site static, fără dependențe și fără pas de compilare: HTML, CSS și JavaScript
simplu. Se pune pe orice găzduire care servește fișiere.

**Se deschide cu dublu clic pe `index.html`.** Nu are nevoie de server.

Scripturile sunt încărcate ca **scripturi clasice**, nu ca module ES. Modulele
sunt blocate de browser peste `file://`, iar o primă versiune folosea module:
deschisă direct de pe disc, pagina se afișa aproape goală, fiindcă niciun
produs, desen sau buton nu apuca să fie randat. Este exact motivul pentru care
`index.html` include patru fișiere, în ordine, în loc de un singur `import`.

În plus, conținutul care apare la derulare este ascuns **numai** dacă
JavaScript-ul chiar rulează (clasa `js` pusă pe `<html>` de un script scurt din
`<head>`). Fără scripturi, pagina rămâne integral lizibilă, nu goală.

Pentru dezvoltare, dacă se preferă un server:

```bash
python -m http.server 5173
```

Adresele fișierelor CSS și JS poartă un `?v=2`. La orice modificare, numărul se
incrementează, altfel browserul servește versiunea veche din memoria proprie.

---

## Generarea site-ului

```bash
node build.js
```

Produce **39 de pagini** HTML plus `sitemap.xml` și `robots.txt`:

| ce | câte |
|---|---|
| prima pagină, magazin, tehnic, întrebări, contact, hartă site | 6 |
| pagini de categorie | 4 |
| pagini de produs | 21 |
| pagini de informare și legale | 8 |

`build.js` încarcă `assets/js/catalog.js` și `assets/js/door.js` printr-un shim
de `window`, deci desenele și prețurile scrise în HTML sunt produse de exact
același cod care rulează în browser. Nu există două surse de adevăr.

Cartelele de produs sunt **scrise în HTML la generare**, nu construite din
JavaScript la încărcare: pagina are conținut și fără scripturi, iar motoarele
de căutare văd cele 21 de produse cu prețuri și date structurate `Product`.

Textul paginilor legale **nu este scris de mine**. Este preluat la generare de
pe usa-garaj.ro, prin API-ul WordPress. Trei pagini — *metode de plată*,
*transport și retururi*, *soluționarea litigiilor* — **sunt goale și pe site-ul
existent**; paginile generate spun deschis acest lucru și trimit la telefon,
e-mail, ANPC și SOL, în loc să inventeze angajamente comerciale.

## Structura

```
index.html
assets/
  css/
    tokens.css       variabilele de culoare, tipografie, spațiere, mișcare
    base.css         resetare, tipografie, primitive de așezare
    door.css         stilurile desenului tehnic
    components.css   antet, catalog, fișă tehnică, contact, subsol
    switcher.css     suprapunerea „Comutator”
  js/
    catalog.js       datele celor 21 de produse
    door.js          generatorul de desene SVG
    switcher.js      interacțiunea „Comutator”
    app.js           punctul de intrare
  img/               fotografiile preluate de pe site-ul existent
```

Nicio valoare de culoare sau de spațiere nu este scrisă direct în
`components.css` sau în `switcher.css`; totul trece prin `tokens.css`.

---

## Comutatorul de produse

Interacțiunea principală, calchiată după comutatorul de aplicații al
sistemului de operare:

| tastă | efect |
|---|---|
| `⇧` ținut + `Tab` | deschide panoul și avansează selecția |
| `⇧` eliberat | confirmă produsul selectat |
| `←` `→` | navighează în ambele sensuri |
| `Enter` | confirmă |
| `Esc` | anulează, fără să schimbe nimic |

Confirmarea închide panoul, aduce cartela produsului în cadru, o pune în
evidență și mută focalizarea pe titlul ei. Dacă produsul confirmat era ascuns
de un filtru activ, filtrele se golesc automat.

Pe ecranele tactile: butonul flotant din colț, glisare stânga/dreapta, sau
rotița mausului.

### De ce glisarea nu mergea pe telefon

Simptomul era exact invers decât te-ai aștepta: pe desktop, cu mausul,
funcționa; pe telefon, niciodată. Două cauze suprapuse, amândouă tăcute:

1. **Lipsea `touch-action` pe viewport.** Browserul mobil decide la primele
   pixele de mișcare cine primește gestul. Implicit îl ia el, pentru derulare,
   și trimite paginii un `pointercancel`. `pointerup` nu mai ajungea niciodată,
   deci codul care măsura distanța glisării nu se executa. Acum viewportul
   declară `touch-action: pan-y`: verticala rămâne a browserului, ca pagina să
   se deruleze normal, orizontala vine la noi.
2. **Degetul se ridică des în afara elementului pe care a început.** Fără
   `setPointerCapture`, `pointerup` se livrează altcuiva. Acum indicatorul e
   captat până la final.

Pe deasupra, o glisare se încheie și cu un `click` pe placa de sub deget — care
ar fi confirmat produsul, adică exact ce nu voiai când ai glisat. Clicul de după
o glisare este acum ignorat, iar selecția care urmărește cursorul rămâne doar
pentru maus (`pointerType === 'mouse'`); la atingere degetul ar fi schimbat
selecția la fiecare pixel al glisării.

Un gest predominant vertical este tratat ca derulare de pagină și ignorat.

### De ce nu `Alt+Tab` sau `Cmd+Tab`

Ambele sunt interceptate de sistemul de operare înainte să ajungă la browser.
O pagină web nu le poate prelua, indiferent de cod. `⇧+Tab` este cea mai
apropiată combinație pe care browserul chiar o predă paginii — și este exact
cea cerută.

### Accesibilitatea, tratată explicit

Interceptarea necondiționată a lui `⇧+Tab` ar distruge navigarea inversă cu
tastatura, adică exact publicul care depinde cel mai mult de ea. De aceea
scurtătura **se armează doar când focalizarea nu se află deja pe un element
interactiv**:

- cine parcurge pagina tastă cu tastă (focalizare pe un link, un buton, un
  câmp) își păstrează comportamentul normal al lui `⇧+Tab`;
- cine tocmai a deschis pagina (focalizare pe `body`) primește comutatorul;
- butonul din antet, cel din secțiunea dedicată și cel flotant funcționează
  întotdeauna, în ambele situații.

Panoul este o fereastră modală reală: `role="dialog"`, `aria-modal`,
focalizare captivă, `aria-activedescendant` pe șină, anunț `aria-live` la
fiecare schimbare de selecție, iar `Esc` redă focalizarea de unde a fost luată.

---

## Ciclul ușii din erou

Ușa din panoul eroului nu stă ridicată: rulează un ciclu continuu.

| fază | durată |
|---|---|
| urcare | 2,2 s |
| **stă deschisă** | **7,0 s** |
| coborâre | 2,2 s |
| stă închisă | 1,6 s |
| **ciclu complet** | **13,0 s** |

Duratele sunt declarate o singură dată, în obiectul `CICLU` din `app.js`, și
alimentează atât mișcarea tablierului, cât și afișajul de stare de lângă desen
(`Închisă` → `Se ridică` → `Deschisă` → `Se coboară`, plus banda de progres).
Nu au cum să se desincronizeze, fiindcă starea e recalculată la fiecare cadru
din `animation.currentTime`, nu numărată separat.

Mișcarea e condusă prin Web Animations API, nu prin `@keyframes`: altfel
procentele din CSS și duratele din JavaScript ar fi fost două surse de adevăr
care se contrazic la prima modificare.

Animația și bucla de redesenare se opresc când eroul iese din cadru, prin
`IntersectionObserver`. La `prefers-reduced-motion`, ciclul nu pornește deloc —
ușa rămâne ridicată, iar starea afișată este `Deschisă`.

## Ușa din erou — ciclul de 13 secunde

Ciclul e condus din `app.js`, prin Web Animations API, ca duratele să aibă o
singură sursă de adevăr: aceleași valori alimentează și mișcarea tablierului,
și afișajul de stare de lângă desen.

| fază | durată |
|---|---|
| se ridică | 2,2 s |
| **stă deschisă** | **7 s** |
| se coboară | 2,2 s |
| stă închisă | 1,6 s |

Cursa de ridicare este **100 %**: tablierul se strânge complet în casetă, ca la
o ușă rulou adevărată.

A trecut prin trei valori. La 82 % arăta aproape complet deschisă. A fost
coborâtă apoi la 58 %, ca tablierul cu lamele — adică produsul vândut — să
rămână vizibil cele 7 secunde cât ușa stă sus. Argumentul era comercial, dar
rezultatul arăta ca o ușă blocată la jumătate, iar o ușă de garaj care nu se
deschide complet ridică exact întrebarea greșită. Ciclul revine oricum la închis
după 7 secunde, deci lamelele se văd la loc; nu se pierde nimic din prezentare.

Interiorul văzut prin deschidere a fost refăcut din maro cald în gri foarte
închis, ca să arate ca un gol în care privești, nu ca un panou colorat.

Animația și bucla de redesenare se opresc când eroul iese din cadru, iar la
`prefers-reduced-motion` nu pornesc deloc — ușa rămâne pur și simplu ridicată.

## Culoare și fundal

Accentul este **verde industrial**, nu chihlimbar. Valorile diferă între teme
pentru că textul mic de 12 px — supratitluri, etichetele CUI și Nr. Reg. Com. —
trebuie să treacă pragul WCAG AA pe fundalul pe care chiar stă:

| rol | temă întunecată | temă luminoasă |
|---|---|---|
| `--acc` | `#4fb783` | `#1a6b47` |
| `--acc-ink` | `#06180f` | `#f4fbf6` |

Fundalul paginii are trei straturi, fixate la derulare:

1. **tablier de rulou** — linii orizontale la pasul real al lamelei (55 mm);
2. **unelte de construcții** — dubiță de livrare, bormașină, boloboc și
   șurubelniță, desenate în contur, ca dală de 560 px;
3. o aură verde care coboară din antet.

Fiecare unealtă pornește dintr-o casetă de 24 × 24 și este mărită de cinci ori,
deci ocupă circa 110 px — de aproximativ 2,5 ori mai mult decât în varianta
inițială. Grosimea conturului este dată la 0,4, ca după scalare să rămână în
jur de 2 px; altfel liniile s-ar fi îngroșat odată cu desenul. Verificat că
niciuna nu iese din dală, deci nu apar unelte tăiate la îmbinarea dalelor.

Dala a fost strânsă de la 560 la 420 px: uneltele rămân la aceeași mărime, dar
se repetă mai des, deci acoperirea urcă de la circa 11 % la **17 %**. Cu 560 px
era mai mult gol decât desen, iar fundalul nu se citea.

| unealtă | mărime în dală |
|---|---|
| dubiță | 107 × 68 px |
| bormașină | 113 × 97 px |
| boloboc | 109 × 46 px |
| șurubelniță | 61 × 103 px |

Șurubelnița a fost redesenată de două ori. În prima variantă mânerul era lat și
tija scurtă, iar desenul ieșea a spatulă; acum tija plus vârful măsoară de 1,38
ori mânerul, iar silueta este înaltă și îngustă — proporția face diferența, nu
detaliul. Vârful a trecut prin trei forme greșite — dreptunghi, triunghi care
se îngusta, triunghi inversat — toate trei fiind forme închise. Greșeala era
chiar aceasta: sub inelul metalic nu trebuie să existe nicio suprafață.

Acum, ca în fotografia de referință: tija și vârful sunt **două segmente
verticale în prelungire**, pe aceeași axă (x = 12), vârful pornind exact de unde
se termină tija. Nu-și schimbă direcția — singura diferență este grosimea
conturului, 2 px la tijă și 5 px la vârf, cât să se citească lama.

Verificat pe geometrie: dreptunghiul de încadrare are lățimea 0 la ambele, deci
sunt segmente verticale pure, iar sub inelul metalic nu există niciun segment
orizontal și nicio formă închisă. Singura suprafață închisă rămâne mânerul, care
chiar este un corp plin.

Primele două straturi sunt derivate din culoarea cernelii sau dintr-un gri
neutru, deci funcționează la fel pe ambele teme.

## Denumirea funcției de răsfoire

Peste tot în interfață se numește **„Produsele noastre”**: butonul din antet,
butonul flotant, titlul secțiunii, bara panoului. Butonul mare din erou este
„Răsfoiește produsele noastre”, iar cel mic de pe fiecare cartelă, „Răsfoiește”.

În cod, clasele și identificatorii au rămas `switcher` / `switch-*`, fiindcă
descriu mecanismul, nu eticheta afișată. Schimbarea numelui comercial nu
trebuie să ceară redenumirea unui modul întreg.

## Desenele de produs

Fotografiile primite au între 255 și 510 px pe latura mare. Mărite la
dimensiunea unei cartele s-ar fi văzut imediat că sunt întinse — de aceea nu
sunt folosite ca imagine principală, ci păstrate la mărimea lor reală, în
galerie.

În locul lor, fiecare ușă este **desenată la scară**. Unitatea sistemului de
coordonate SVG este milimetrul, deci lățimea, înălțimea, pasul lamelei, caseta
și ghidajele respectă cotele reale din pagina „Tehnic” a magazinului.

Rezultatul util: două uși cu aceeași dimensiune exterioară, dar cu lamelă
diferită, arată vizibil diferit, pentru că au numărul real de lamele.

| produs | dimensiune | lamelă | lamele desenate |
|---|---|---|---|
| Ușă … L3000 × H2500, gri antracit | 3000 × 2500 | 55 mm | 41 |
| Ușă … L3000 × H2500, gri antracit | 3000 × 2500 | 77 mm | 29 |

Redarea folosește 8 modele SVG partajate (4 culori × 2 pași), nu câteva sute
de dreptunghiuri per pagină. Cele 48 de desene din pagină referă aceleași
definiții.

### Desenul trebuie să dea cu fotografia

La trecerea cursorului, cartela înlocuiește desenul cu fotografia reală. Dacă
cele două nu au aceeași culoare, schimbul se citește ca „nu ăsta e produsul”.

Culoarea desenului se lua din `raluri[0]`, adică din **ordinea în care
magazinul enumeră codurile în denumire** — iar ordinea diferă de la un produs
la altul: „maro inchis 8019, maro deschis 8014” la 401/400/399, „maro 8014,
maro 8019” la 387/386. Aceleași uși, aceeași fotografie, două culori desenate.

Mai rău, RAL 8019 este `#3d3635`: măsurat, un gri. Fotografia ușilor maro are
media `#4a3b33`, un maro cald. Cele trei uși de 77 mm se desenau practic gri și
deveneau maro la hover.

Culoarea desenului vine acum din **familie**, nu din ordinea codurilor:
`UG.ralDesen()` dă `8014` pentru maro și `7016` pentru antracit. Codurile RAL
declarate rămân afișate toate, în ordinea din magazin — se schimbă ce se
desenează, nu ce se declară.

Verificat pe cele 82 de perechi desen/fotografie din site: 0 nepotriviri.

---

## De unde vin datele — și de ce sunt 21, nu 16

Sursa este WooCommerce Store API de pe chiar site-ul clientului:

```
/wp-json/wc/store/v1/products?per_page=100   → 21 de produse
/wp-json/wc/store/v1/products/categories     → 55 MM: 15 · 77 MM: 6 · PROMOȚII: 16 · PRODUSE NOI: 16
```

Catalogul întreg are **21** de produse: 15 cu lamelă de 55 mm și 6 cu lamelă de
77 mm. Numărul **16** aparține categoriilor „PROMOȚII” și „PRODUSE NOI”, nu
magazinului. Ambele cifre sunt raportate de magazin, nu calculate de mine.

Prețul întreg, prețul curent și starea de promoție sunt copiate întocmai.
Două produse **nu** sunt la promoție și nu au preț tăiat nicăieri în site:

| produs | preț | promoție |
|---|---|---|
| ABBA 55MM 2300 × 2200 maro | 3.350,00 lei | nu |
| ABBA 55MM 3000 × 2500 maro | 3.700,00 lei | nu |

`id` este chiar identificatorul WooCommerce, ca fiecare rând din
`assets/js/catalog.js` să poată fi verificat direct în magazin.

## Datele produselor

Preluate întocmai de pe usa-garaj.ro: **21 de produse**, cu denumirile,
dimensiunile, culorile și prețurile din magazin. Sursa este
`assets/js/catalog.js`.

Două intervenții, ambele deliberate — de verificat și confirmat:

1. **Diacritice în denumiri.** „Usa garaj automata …” → „Ușă garaj automată …”.
   Codurile, cotele, culorile și sumele sunt neatinse. Cerința de diacritice a
   fost aplicată și denumirilor comerciale, nu doar textului redacțional.

2. **Prețuri în convenția românească.** `4,050.00 lei` → `4.050,00 lei`.
   Valoarea este identică; se schimbă doar separatorii. Formatarea se face în
   `catalog.js`, funcția `lei()` — dacă se preferă forma existentă, se schimbă
   într-un singur loc.

Câmpul `pasaj` (spațiul util de trecere) este completat **doar** acolo unde
magazinul îl declară explicit — la 12 din 21 de produse. Nu se calculează
nicăieri, ca să nu apară cote inventate. Regula generală de scădere este
prezentată separat, în fișa tehnică.

Cifrele din erou (număr de produse, câte sunt la promoție, prețul minim,
intervalul de lățimi) sunt calculate din catalog la încărcare, nu scrise de
mână — nu pot rămâne în urmă față de date.

### Fișa fiecărui produs, nu a familiei

Prima versiune completa tabelul de specificații din constantele familiei de
55/77 mm. Arăta plauzibil și era greșit: magazinul declară cote **pe produs**,
iar ele diferă în interiorul aceleiași familii.

| produs | ghidaje | timp | grosime lamelă |
|---|---|---|---|
| 401 — 77 mm, 3000 × 2500 | 90 × 35 mm | 25 s | 19 mm |
| 400 — 77 mm, 3200 × 2500 | 75 × 30 mm | 25 s | 19 mm |
| 399 — 77 mm, 3000 × 3000 | nedeclarate | 10 s | 19 mm |

Tabelul generic dădea, pentru toate trei, „90 × 35 mm · circa 10 secunde ·
18,5 mm”. Acum fiecare pagină afișează rândurile declarate de magazin pentru
acel produs, în câmpul `spec` din `catalog.js`, plus blocul „Conținut colet”.

La **387** magazinul nu publică nicio specificație. Pagina spune asta pe față
și trimite la fișa tehnică, în loc să treacă cotele familiei drept cote de
produs.

Cele 5 produse cărora magazinul le lasă `short_description` gol — 393, 391,
387, 386, 374 — nu mai apar cu cartelă fără text: rezumatul coboară pe primul
paragraf al descrierii lungi și, în ultimă instanță, pe spațiul util de
trecere. Tot valori ale magazinului.

### Corecturi față de textul magazinului

Niciuna nu atinge vreo valoare. **De confirmat de client:**

| unde | în magazin | pe site | de ce |
|---|---|---|---|
| 393, 391, 396, 394 | `Culoare: maro` | `Gri Antracit` | produsele se numesc GRI ANTRACIT și au fotografia antracit; rândul contrazicea propria denumire |
| 180, 181, 179, 396, 374 | `2200 x 2100 cm` | `2200 × 2100 mm` | cotele sunt în milimetri peste tot în magazin; `cm` ar da o ușă de 22 de metri |
| 394 | `Dimensiune: L300 H3000` | `L3000 H3000` | lipsea o cifră față de denumire și de preț |
| 161 | `lamele de 5 mm` | `lamele de 55 mm` | produsul e din familia de 55 mm |
| 397 | `Spatiu uti de trecere` | `Spațiu util de trecere` | literă lipsă |
| 386, 388 | `sant`, `industrial`, `commercial` | `sunt`, `industrială`, `comercial` | ortografie |

---

## Datele de identificare

Afișate în trei locuri, la vedere:

- bara de sus, prezentă pe fiecare ecran;
- „cartea de identitate” din secțiunea de contact, cu CUI și numărul din
  Registrul Comerțului pe rânduri evidențiate;
- subsolul.

Sunt incluse și în datele structurate `schema.org` din `<head>`, ca `taxID` și
ca `PropertyValue`, ceea ce le face citibile de motoarele de căutare.

**Proveniență:** `J15/136/2019` și sediul social apar în pagina „Termeni și
condiții” a site-ului existent. CUI-ul `40437439` nu este publicat pe site; a
fost preluat din registrele publice de firme, unde apare asociat aceleiași
denumiri și aceluiași număr de ordine. **De confirmat de client înainte de
publicare** — este singurul câmp care nu vine de pe site-ul propriu.

Nu am declarat `vatID` și nici prefix `RO`, pentru că nu am putut confirma
calitatea de plătitor de TVA. Dacă firma este înregistrată în scopuri de TVA,
se adaugă în blocul JSON-LD din `index.html`.

---

## Vizibilitate în căutări

- `<html lang="ro">`, titlu și descriere cu cuvintele-cheie reale
- Open Graph și Twitter Card
- `<link rel="canonical">`
- date structurate `schema.org`: `Organization` + `HomeAndConstructionBusiness`,
  `WebSite`, `FAQPage` cu 6 întrebări
- un singur `h1`, ierarhie de titluri fără salturi de nivel
- text alternativ în română pentru toate imaginile și desenele

Conținutul secțiunilor „Servicii”, „Tehnic” și „Întrebări frecvente” provine
exclusiv din afirmațiile site-ului ABBA. Nu am preluat nimic de la concurență —
termene de execuție, număr de rate sau zone de montaj — pentru că sunt
angajamente comerciale pe care doar clientul le poate asuma.

---

## Densitatea paginii

Două lucruri făceau pagina să pară goală și au fost corectate:

- **Titlul eroului** ajungea la 85 px și se rupea pe 7 rânduri, ocupând 620 px
  — tot primul ecran al unui laptop, cu desenul ușii împins sub pliu. Plafonul
  scării tipografice a fost coborât la 4,5 rem, iar titlul a fost scurtat: acum
  are 213 px și desenul încape complet în primul ecran.
- **Scena eroului** era o cutie în picioare (4 : 4,4) care conținea un desen
  culcat (≈ 1,24 : 1), deci încadra desenul cu benzi goale. Proporția cutiei o
  urmează acum pe cea a desenului, care o umple 100 %.

Ritmul vertical al secțiunilor a fost strâns de la maximum 9 rem la 5,5 rem.
Măsurat pe pagina întreagă, spațiul fără conținut (benzi continue de peste
160 px) este acum **2,8 %**.

## Limbajul vizual

Ce ține pagina departe de aspectul generat automat nu e un efect, ci coerența
unui singur motiv: **planșa de desen tehnic**.

- **Caroiaj milimetric** în spatele fiecărui desen — la erou și pe toate cele
  21 de cartele. Ușa nu plutește pe un chenar gol, stă pe o planșă. La trecerea
  cursorului, caroiajul cartelei se colorează discret în chihlimbar.
- **Repere de încadrare** în colțurile planșei eroului, ca semnele de registru
  de pe un plan de execuție.
- **Panoul eroului** este o singură piesă: planșa sus, afișajul de stare jos,
  cu bulină de stare și bandă de progres — un aparat, nu o imagine cu o
  etichetă lipită peste.
- **Numerotarea rubricilor** (01 … 07) în supratitluri: pagina se citește ca un
  document cu cuprins, nu ca un teanc de blocuri identice.
- **Linie subțire deasupra fiecărei rubrici**, care leagă secțiunile la aceeași
  grilă verticală.
- **Axa de lățime a fontului**: Archivo e o variabilă, iar titlurile sunt ușor
  extinse (`wdth` 108–112) față de textul curent. Contrastul dintre cele două
  lățimi e ceea ce dă senzația de tipar tehnic; e și motivul pentru care fontul
  a fost încărcat cu axa `wdth`, nu doar cu greutăți.
- **Cifrele tehnice** — cote, prețuri, coduri RAL, CUI, J — sunt toate în
  monospațiat cu cifre tabulare, deci se aliniază pe coloană oriunde apar.

## Verificat

Testat la 404 px, 1280 px și 1440 px lățime:

- pagina randează complet și fără server, deschisă direct de pe disc
- 21 de cartele, 21 de plăci în comutator, 48 de desene, 8 modele partajate,
  22 de planșe caroiate, 7 numere de rubrică
- ciclul ușii măsurat pas cu pas: 0 % la pornire, 100 % la 2,2 s, încă 100 % la
  9,2 s, 0 % la 11,4 s — adică **exact 7,0 s** de stat deschisă, la nesfârșit
- toate cele 5 declanșatoare ale comutatorului funcționează: butonul din antet,
  cel din secțiune, miniatura, butonul flotant și butonul de pe fiecare cartelă
- centrarea plăcii selectate: eroare 0 px pe toate cele 21 de poziții
- garda de accesibilitate: `⇧+Tab` nu se activează când focalizarea e pe un
  link sau pe un buton
- ciclare corectă la capete, confirmare, anulare, blocarea și deblocarea
  derulării
- filtre combinate și golirea lor automată la confirmarea unui produs ascuns
- fără derulare orizontală a paginii la nicio lățime
- contrast **WCAG AA** trecut pe 29 de puncte de text, în ambele teme, fiecare
  temă măsurată pe o pagină încărcată direct în ea (comutarea temei din consolă
  dă recalculări parțiale de stil și, implicit, cifre false)
- ierarhie de titluri fără salturi; toate imaginile cu `alt`; toate butoanele
  cu nume accesibil
- `prefers-reduced-motion` oprește ridicarea ușii, banda de rulare, apariția la
  derulare și tranzițiile comutatorului
- diacritice: 455 de caractere, toate cu virgulă dedesubt (`ș` U+0219,
  `ț` U+021B), niciunul cu sedilă

## Magazin propriu și plata cu cardul

Procedura completă este în **[NETOPIA.md](NETOPIA.md)**.

Site-ul nu mai trimite clientul în altă parte ca să cumpere. Coșul, finalizarea
și plata se petrec pe domeniul propriu; WooCommerce rămâne motorul — stoc,
comenzi, facturi, e-Factura — dar pe un subdomeniu, fără pagini publice.
Clientul nu-l vede niciodată.

```
domeniulnou.ro/magazin      răsfoire, „Adaugă în coș”
domeniulnou.ro/cos.html     coș, cantități
domeniulnou.ro/finalizare   date de facturare și livrare
        ↓  Store API, în fundal
secure.mobilpay.ro          plata — singurul domeniu extern, cerut de PCI-DSS
        ↓
domeniulnou.ro/comanda-confirmata.html
```

Piesele: [cos.js](assets/js/cos.js), [cos-ui.js](assets/js/cos-ui.js),
[checkout.js](assets/js/checkout.js) și
[wordpress/netopia-direct-redirect.php](wordpress/netopia-direct-redirect.php),
care elimină pagina WordPress intermediară dintre finalizare și NETOPIA.

### Coșul este local

Adăugarea, cantitățile și totalurile se fac **în browser**, din `catalog.js`,
fără nicio cerere de rețea. Prima variantă mergea prin Store API la fiecare
clic; a fost o greșeală, din trei motive:

1. Site-ul se deschide și direct de pe disc, prin `file://`. De acolo browserul
   blochează orice `fetch()` extern — originea este `null` și niciun server nu o
   poate accepta. Coșul murea cu „NetworkError” înainte să afișeze ceva.
2. Chiar servit prin HTTP, fiecare adăugare depindea de un WordPress cu CORS
   configurat. Un catalog perfect funcțional devenea inutilizabil din cauza unui
   backend încă nepregătit.
3. Nici nu era nevoie: prețurile și cotele sunt deja în pagină, generate din
   același `catalog.js`.

Serverul intră în joc **într-un singur moment**: la „Plasează comanda”, unde
`checkout.js` urcă coșul local în magazin și cere totalul oficial. Până atunci,
totul merge fără rețea.

Totalul afișat în coș este informativ; suma finală o confirmă magazinul la
finalizare, iar pagina spune asta explicit.

### De ce coșul se scrie în două locuri

Firefox dă fiecărui fișier deschis prin `file://` **o origine proprie**
(`privacy.file_unique_origin`, activ implicit). Consecința arată exact ca un coș
stricat: adaugi un produs din `produs/x.html`, insigna din antet urcă, dar
`cos.html` — altă origine, alt sertar — raportează sincer că nu are nimic. Două
adevăruri, două `localStorage`-uri.

De aceea coșul se scrie și în `window.name`, care supraviețuiește navigării în
aceeași filă indiferent de origine. Pe `http://` și `https://` localStorage
rămâne sursa principală; `window.name` e doar plasa de dedesubt. Se păstrează
doar identificatori de produs și cantități, nimic personal.

Golirea coșului șterge ambele locuri, deci un coș golit nu poate reînvia.

Plata cu cardul: magazinul are azi un singur gateway activ, `cod` — ramburs.
Cardul se activează prin pluginul oficial NETOPIA pentru WooCommerce, nu prin
cod scris de la zero: API-ul v2 cere un server care ține cheia și primește
IPN-ul, iar WooCommerce are deja și una și alta.

Ce spune site-ul despre plată vine dintr-un singur loc, obiectul `PLATI` din
`build.js`. Comutatorul `card` este o **declarație de adevăr**, nu o opțiune de
aspect:

| `PLATI.card` | „Metode de plată” | Întrebări frecvente |
|---|---|---|
| `false` (acum) | ramburs și transfer bancar; spune deschis că plata cu cardul nu e activă | idem |
| `true` | procesator, carduri acceptate, 3-D Secure, restituire pe același card | răspuns complet despre plată |

Se trece pe `true` **numai după** ce plata live funcționează în magazin —
verificabil cu `curl -s https://usa-garaj.ro/wp-json/wc/store/v1/cart`, care
trebuie să conțină `netopiapayments` în `payment_methods`. Un site care promite
o metodă de plată inexistentă este o problemă de protecția consumatorului, nu o
inexactitate de text.

## Rămas de făcut la integrare

Pagina este un frontend complet, nu un magazin. Butoanele „Comută” și
titlurile cartelelor duc la paginile de produs din WooCommerce-ul existent.
La integrarea în WordPress:

- adresele produselor devin relative (`urlProdus()` din `catalog.js`);
- catalogul se poate genera din WooCommerce în loc să fie scris în
  `catalog.js`, păstrând aceleași câmpuri;
- coșul și finalizarea comenzii rămân cele actuale.
