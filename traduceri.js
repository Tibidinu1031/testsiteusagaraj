'use strict';

/* Dicționarul englez și maghiar al site-ului.
   ------------------------------------------------------------------------
   Cheia e textul românesc exact, așa cum apare în pagina generată. Nu sunt
   identificatori inventați („btn.add_to_cart”), ci chiar propoziția: dacă
   româna se schimbă, traducerea veche nu se mai potrivește și expresia apare
   în traduceri-lipsa.json la următorul build. E exact ce vrem — o traducere
   rămasă agățată de o formulare care nu mai există e mai rea decât una care
   lipsește vizibil.

   Ce nu intră aici: numele firmei, CUI-ul, numărul de la registrul comerțului,
   adresa sediului și codurile RAL. Sunt aceleași în orice limbă, iar
   traducerea lor ar rupe legătura cu factura și cu catalogul furnizorului.
   Prețurile la fel — vezi comentariul de la NETRADUS din build-limbi.js.

   Textele juridice sunt traduse ca să fie înțelese. Versiunea românească
   rămâne cea care produce efecte juridice; asta o spune explicit rândul pus
   în capul paginilor traduse de termeni, confidențialitate și cookie-uri. */

/* Numele comutatorului, în limba în care e citit de cititorul de ecran. */
const numeComutator = {
  ro: 'Limba site-ului',
  en: 'Site language',
  hu: 'A webhely nyelve'
};

/* --------------------------------------------------------------- engleză */

const en = {
  /* interfață, navigare, subsol */
  'Adaugă în coș': 'Add to cart',
  'Produsele noastre': 'Our products',
  'Produse': 'Products',
  'Transport gratuit': 'Free delivery',
  'Răsfoiește': 'Browse',
  'Răsfoiește produsele noastre': 'Browse our products',
  'Magazin': 'Shop',
  'Promoții': 'Offers',
  'Produse noi': 'New products',
  'Tehnic': 'Technical',
  'Contact': 'Contact',
  'Întrebări': 'FAQ',
  'Întrebări frecvente': 'Frequently asked questions',
  'Uși Rulou 55 mm': 'Roller Doors 55 mm',
  'Uși Rulou 77 mm': 'Roller Doors 77 mm',
  'Uși garaj rulou 55 mm': 'Roller garage doors 55 mm',
  'Uși garaj rulou 77 mm': 'Roller garage doors 77 mm',
  'Sari la conținutul principal': 'Skip to main content',
  'Usa-garaj.ro — prima pagină': 'Usa-garaj.ro — home page',
  'Navigare principală': 'Main navigation',
  'Coșul de cumpărături': 'Shopping cart',
  'Coșul meu': 'My cart',
  'Coș': 'Cart',
  'Comandă': 'Checkout',
  'Comenzi': 'Orders',
  'Acasă': 'Home',
  'Firimituri': 'Breadcrumb',
  'Parte a Grupului Abba Confort': 'Part of the Abba Confort Group',
  'Urmăriți-ne': 'Follow us',
  'Informații utile': 'Useful information',
  'Asistență': 'Support',
  'Contactează-ne': 'Contact us',
  'Toate drepturile rezervate ©': 'All rights reserved ©',
  '· uși de garaj rulou': '· roller garage doors',
  'Produse disponibile': 'Products available',
  'Catalogul nostru': 'Our catalogue',
  'Deschide produsele noastre': 'Open our products',
  'Vizualizare rapidă': 'Quick view',
  'vizualizare rapidă': 'quick view',
  'Vezi pagina produsului': 'View product page',
  'Toate': 'All',
  'Ofertă': 'On offer',
  'Doar prețuri reduse': 'Reduced prices only',
  'Categorie': 'Category',
  'Document': 'Document',
  'Harta site': 'Site map',

  /* taste, în legenda comutatorului de produse */
  'înainte': 'forward',
  'navighezi': 'navigate',
  'confirmi': 'confirm',
  'anulezi': 'cancel',

  /* date de identificare */
  'CUI': 'Tax ID',
  'Nr. Reg. Com.': 'Reg. No.',
  'Date de identificare': 'Company details',
  '· verificabile la ONRC': '· verifiable at the Romanian Trade Register',
  'Denumire': 'Name',
  'Sediu social': 'Registered office',
  'Telefon': 'Phone',
  'Sună la 0731 366 613': 'Call 0731 366 613',
  'Secretariat și informații': 'Office and information',
  'Comenzi și oferte': 'Orders and quotes',
  'Sediu · vezi în Google Maps': 'Office · view on Google Maps',
  'Comandă online': 'Order online',
  'Vezi catalogul și comandă': 'Browse the catalogue and order',
  'Stăm de vorbă': 'Let us talk',
  'Contact și date de identificare': 'Contact and company details',

  /* pagini de conținut, titluri */
  'Uși de garaj tip rulou ABBA — lamele de 55 mm și 77 mm':
    'ABBA roller garage doors — 55 mm and 77 mm slats',
  'Comandă confirmată': 'Order confirmed',
  'Termeni și condiții': 'Terms and conditions',
  'Confidențialitate': 'Privacy',
  'Politica de cookie-uri': 'Cookie policy',
  'Cum cumpăr': 'How to buy',
  'Metode de plată': 'Payment methods',
  'Transport și retururi': 'Shipping and returns',
  'Soluționarea litigiilor': 'Dispute resolution',
  'Anulare tranzacție': 'Transaction cancelled',
  'Finalizarea comenzii': 'Checkout',
  'Înainte să comandați': 'Before you order',
  'Ramburs la livrare': 'Cash on delivery',
  'și': 'and',

  /* social */
  'Uși de garaj ABBA Confort': 'ABBA Confort garage doors',
  'ABBA Confort': 'ABBA Confort',
  'Uși de garaj ABBA Confort pe Facebook, se deschide într-o filă nouă':
    'ABBA Confort garage doors on Facebook, opens in a new tab',
  'ABBA Confort pe TikTok, se deschide într-o filă nouă':
    'ABBA Confort on TikTok, opens in a new tab',
  'ABBA CONFORT — problema ta, soluția noastră':
    'ABBA CONFORT — your problem, our solution',
  'Uși de garaj tip rulou cu lamele de aluminiu, acționate cu telecomandă.\n          Proiectare, montaj și service.':
    'Roller garage doors with aluminium slats, operated by remote control.\n          Design, installation and servicing.',

  /* produs: culori, specificații */
  'Culoare': 'Colour',
  'Cantitate': 'Quantity',
  'Maro': 'Brown',
  'Gri antracit': 'Anthracite grey',
  'Maro deschis / Maro închis': 'Light brown / Dark brown',
  'Maro închis / Maro deschis': 'Dark brown / Light brown',
  'lamelă 55 mm': '55 mm slat',
  'lamelă 77 mm': '77 mm slat',
  'mm lamelă': 'mm slat',
  'lamelă 55 mm · casetă 250 mm': '55 mm slat · 250 mm box',
  'lamelă 77 mm · casetă 300 mm': '77 mm slat · 300 mm box',
  'În stoc · transport gratuit · montaj asigurat':
    'In stock · free delivery · installation included',
  'Specificații': 'Specifications',
  'Dimensiune totală (L × H)': 'Overall size (W × H)',
  'Pasul lamelei': 'Slat pitch',
  'Grosime lamele': 'Slat thickness',
  'Greutate lamele': 'Slat weight',
  'Lamele': 'Slats',
  'Lamelă': 'Slat',
  'Lamelă finală': 'Bottom slat',
  'Lamele din aluminiu cu spumă poliuretanică':
    'Aluminium slats with polyurethane foam',
  'Spațiu util de trecere': 'Clear passage opening',
  'Casetă aluminiu': 'Aluminium box',
  'Casetă din aluminiu': 'Aluminium box',
  'Casetă și capace laterale': 'Box and side covers',
  'Capace laterale din aluminiu': 'Aluminium side covers',
  'Ghidaje': 'Guide rails',
  'Ghidaje aluminiu': 'Aluminium guide rails',
  'Ghidaje din aluminiu': 'Aluminium guide rails',
  'Ax metalic zincat': 'Galvanised steel shaft',
  'Rulmenți': 'Bearings',
  'oțel': 'steel',
  'Acționare': 'Operation',
  'Acționare de rezervă': 'Backup operation',
  'legătură cardanică + manivelă': 'universal joint + crank handle',
  'manivelă': 'crank handle',
  'centrală de comandă': 'control unit',
  '2 telecomenzi': '2 remote controls',
  'cheiță deblocare motor': 'motor release key',
  'ușă rulou': 'roller door',
  'Conținut colet': 'Package contents',
  'Timp deschidere/închidere': 'Opening/closing time',
  'Timp închidere/deschidere': 'Closing/opening time',
  'Timp de deschidere/închidere': 'Opening/closing time',
  '10 secunde': '10 seconds',
  '25 secunde': '25 seconds',
  '14 mm grosime': '14 mm thick',
  '55 mm, grosime 14 mm': '55 mm, 14 mm thick',
  '250 mm, grosime 0,95 mm': '250 mm, 0.95 mm thick',
  '300 sau 350 mm, grosime 0,95 mm': '300 or 350 mm, 0.95 mm thick',
  'Alte variante': 'Other versions',
  'Produse înrudite': 'Related products',
  'Prețul include TVA. Transportul se calculează la finalizarea comenzii.':
    'Price includes VAT. Shipping is calculated at checkout.',
  'Specificațiile de mai sus sunt cele declarate de magazin pentru acest produs.':
    'The specifications above are those declared by the shop for this product.',

  /* argumentele de sub erou */
  'Preț competitiv': 'Competitive price',
  'Calitate garantată': 'Guaranteed quality',
  'Transport inclus': 'Delivery included',
  'Montaj asigurat': 'Installation included',

  /* text alternativ al fotografiilor */
  'Fotografie ușă maro': 'Photograph of a brown door',
  'Fotografie ușă gri antracit': 'Photograph of an anthracite grey door',
  'Fotografie ușă de garaj maro': 'Photograph of a brown garage door',
  'Fotografie ușă de garaj gri antracit':
    'Photograph of an anthracite grey garage door',
  '3 fotografii din magazin · Gri antracit':
    '3 photographs from the shop · Anthracite grey',
  '5 fotografii din magazin · Maro deschis / Maro închis':
    '5 photographs from the shop · Light brown / Dark brown',
  '4 fotografii din magazin · Maro deschis / Maro închis':
    '4 photographs from the shop · Light brown / Dark brown',
  '3 fotografii din magazin · Maro închis / Maro deschis':
    '3 photographs from the shop · Dark brown / Light brown',

  /* denumiri comerciale rămase, care nu urmează un tipar */
  'Ușă garaj tip rulou automată, perfectă pentru orice garaj!':
    'Automatic roller garage door, perfect for any garage!',
  'Ușă garaj tip rulou, potrivită pentru orice construcție!':
    'Roller garage door, suitable for any building!',
  'Ușă garaj automată ABBA 55MM, 3000 × 2500, lamele 55 mm, maro':
    'Automatic garage door ABBA 55 mm, 3000 × 2500, 55 mm slats, brown',
  'Nicio ușă nu corespunde acestor filtre. Încercați o altă combinație.':
    'No door matches these filters. Try a different combination.',

  /* specificații tehnice rămase */
  'motor tubular + centrală de comandă + 2 telecomenzi':
    'tubular motor + control unit + 2 remote controls',
  'Lamela terminală': 'Bottom slat',
  'aluminiu extrudat': 'extruded aluminium',
  'Rulmenți / ax acționare': 'Bearings / drive shaft',
  'Rulmenți oțel / ax acționare': 'Steel bearings / drive shaft',
  'Ax metalic': 'Steel shaft',
  'Ghidaje ușă': 'Door guide rails',
  'Ghidaje ușă din aluminiu': 'Aluminium door guide rails',
  'Ghidaje (picioare) ușă din aluminiu': 'Aluminium door guide rails (legs)',
  'Casetă de aluminiu': 'Aluminium box',
  'grosime 14 mm': '14 mm thick',
  '4 kg/mp': '4 kg/m²',
  '60 mm, oțel zincat': '60 mm, galvanised steel',
  'din aluminiu': 'aluminium',
  'Greutate covor lamentă': 'Curtain weight',
  'Greutate covor lamelă': 'Slat curtain weight',
  'Prețurile competitive au poziționat ușile de garaj rulou în topul vânzărilor.':
    'Competitive prices have made roller garage doors our best sellers.',

  /* pagini de stare */
  'Comanda a fost înregistrată.': 'Your order has been recorded.',
  'Vă mulțumim pentru comandă': 'Thank you for your order',
  'Comanda a fost înregistrată și veți primi confirmarea pe e-mail.':
    'Your order has been recorded and you will receive confirmation by e-mail.',
  'Înapoi la prima pagină': 'Back to the home page',
  'Vezi catalogul': 'View the catalogue',
  'Plata nu a fost finalizată.': 'The payment was not completed.',
  'Anulare Tranzactie': 'Transaction cancelled',
  'Produsele alese și totalul comenzii.':
    'The products you chose and the order total.',
  'Datele de facturare și livrare, apoi plata.':
    'Billing and delivery details, then payment.',
  'Toate paginile site-ului Usa-garaj.ro.': 'Every page on Usa-garaj.ro.',
  'Intrate recent': 'Recently added',
  'Produsele aflate în categoria „PRODUSE NOI” a magazinului.':
    'The products in the shop’s “NEW PRODUCTS” category.',
  'Preț redus': 'Reduced price',

  /* coș și finalizare */
  'Coșul dumneavoastră': 'Your cart',
  'Se încarcă coșul…': 'Loading the cart…',
  'Se încarcă…': 'Loading…',
  'Date de facturare și livrare': 'Billing and delivery details',
  'Prenume': 'First name',
  'Nume': 'Last name',
  'E-mail': 'E-mail',
  'Adresă (stradă, număr)': 'Address (street, number)',
  'Bloc, scară, apartament': 'Building, entrance, flat',
  '(opțional)': '(optional)',
  'Localitate': 'Town or city',
  'Județ': 'County',
  'Cod poștal': 'Postcode',
  'Metoda de plată': 'Payment method',
  'Plătiți curierului, în numerar, la primirea coletului.':
    'Pay the courier in cash when the parcel arrives.',
  'Rezumatul comenzii': 'Order summary',
  'Înapoi la coș': 'Back to the cart',
  'Plasează comanda': 'Place the order',
  'Prin plasarea comenzii confirmați că ați citit':
    'By placing the order you confirm that you have read the',
  'Termenii și condițiile': 'Terms and conditions',
  'Politica de confidențialitate': 'Privacy policy',
  '.\n        Aveți drept de retragere în 14 zile, conform OUG 34/2014.':
    '.\n        You have a 14-day right of withdrawal under Romanian Emergency Ordinance 34/2014.',

  /* prima pagină */
  'Cuprins': 'Contents',
  'Catalog': 'Catalogue',
  'Magazin — toate cele 21 de produse': 'Shop — all 21 products',
  'Informații': 'Information',
  'Partenerul vostru pentru proiectarea și montarea ușilor de garaj de tip rulou':
    'Your partner for the design and installation of roller garage doors',
  'Calculator': 'Calculator',
  'Calculator de preț': 'Price calculator',
  'Preț estimativ': 'Estimated price',
  'Lățimea golului': 'Opening width',
  'configurații în catalog': 'configurations in the catalogue',
  'produse la preț redus': 'products at a reduced price',
  'lei': 'lei',
  'cel mai accesibil preț': 'lowest price',
  'interval de lățimi': 'width range',
  'Stare': 'Status',
  'Închisă': 'Closed',
  'Cotă': 'Dimension',
  'Preț': 'Price',
  'De ce noi?': 'Why us?',
  'Mod de răsfoire': 'Browsing mode',
  'Douăzeci și una de uși nu se compară derulând o pagină. Țineți apăsată\n          tasta':
    'Twenty-one doors cannot be compared by scrolling. Hold down the',
  'și apăsați': 'key and press',
  'deschide și avansează': 'opens and moves forward',
  'navighează în ambele sensuri': 'moves in both directions',
  'confirmă selecția': 'confirms the selection',
  'anulează, fără să schimbe nimic': 'cancels, changing nothing',
  'Selecție din catalog': 'A selection from the catalogue',
  'Fiecare ușă, desenată la cotele ei': 'Every door, drawn to its own dimensions',
  'Vezi toate cele 21 de produse': 'See all 21 products',
  'De ce ne poți contacta?': 'What you can contact us about',
  'Uși de garaj de tip rulou, acționate prin telecomandă':
    'Roller garage doors, operated by remote control',
  'Atenție la cote.': 'Mind the dimensions.',
  '150 mm pe lățime și 300 mm pe înălțime': '150 mm in width and 300 mm in height',
  'la ușile cu lamelă de 55 mm,\n    respectiv': 'for doors with 55 mm slats, and',
  '180 mm pe lățime și 377 mm pe înălțime': '180 mm in width and 377 mm in height',
  'Toate detaliile tehnice': 'All the technical details',
  'Ce facem, de la măsurătoare la mentenanță':
    'What we do, from measuring to maintenance',
  'Serviciile noastre': 'Our services',
  'Proiectare și montaj': 'Design and installation',
  'Acționare cu telecomandă': 'Remote control operation',
  'Deschidere manuală': 'Manual opening',
  'Manivelă și legătură cardanică, pentru situațiile în care alimentarea cu energie electrică lipsește.':
    'A crank handle and universal joint, for when there is no mains power.',
  'Service și mentenanță': 'Servicing and maintenance',
  'Asigurăm mentenanța și service-ul tehnic al ușilor montate, pe toată durata de funcționare.':
    'We maintain and service the doors we install for their entire working life.',
  'Proiecte personalizate': 'Custom projects',
  'Pe lângă produsele standard, disponibile în stoc, executăm uși la dimensiunile cerute de dumneavoastră.':
    'Besides the standard products held in stock, we build doors to the dimensions you require.',
  'Transportul este inclus în prețul afișat, fără costuri adăugate la finalizarea comenzii.':
    'Delivery is included in the price shown, with nothing added at checkout.',
  'Unde se potrivesc': 'Where they fit',
  'Despre ușile noastre': 'About our doors',
  'Căutați alte dimensiuni și design-uri?': 'Looking for other sizes and designs?',
  'Vă vom contacta curând pentru a vă prezenta\n        oferta noastră.':
    'We will contact you shortly with our quote.',
  'Solicitați o ofertă': 'Request a quote',
  'calculați singur prețul, mai jos': 'work out the price yourself, below',

  /* pagini juridice, titluri interioare */
  'Confidentialitate': 'Privacy',
  'Datele solicitate': 'The data we ask for',
  'De ce avem nevoie de date': 'Why we need the data',
  'Ce vom face cu datele': 'What we will do with the data',
  'Cat timp pastram datele': 'How long we keep the data',
  'Care sunt drepturile dvs.': 'What your rights are',
  'Cum cumpar?': 'How do I buy?',
  'Selectarea produselor dorite': 'Selecting the products you want',
  'Informatii pentru expediere': 'Shipping information',
  'Finalizare': 'Completion',
  'Cookie-uri esentiale': 'Essential cookies',
  'Cookie-uri de performanta': 'Performance cookies',
  'Cookie-uri de Social media si publicitate':
    'Social media and advertising cookies',
  'Pentru prelucrarea comenzii si furnizarea produselor si serviciilor dorite;':
    'To process the order and supply the products and services requested;',
  'Pentru evaluarea produselor si serviciilor pe care vi le furnizam;':
    'To evaluate the products and services we supply to you;',
  'Pentru a va oferi acces la functionalitatile site-ului in calitate de utilizator inregistrat;':
    'To give you access to the site’s features as a registered user;',
  'Pentru administrarea site-ului': 'To administer the site',
  'Pentru a va oferi posibilitatea de a participa la concursuri, promotii;':
    'To let you take part in competitions and promotions;',
  'telefon': 'telephone',
  'e-mail': 'e-mail',
  'Pentru reclamații și soluționarea alternativă a litigiilor puteți folosi\n     și platforma europeană':
    'For complaints and alternative dispute resolution you may also use the European platform',

  /* întrebări frecvente */
  'Ce tipuri de uși de garaj comercializați?':
    'What types of garage door do you sell?',
  'Ușile de garaj rulou sunt potrivite pentru orice garaj?':
    'Are roller garage doors suitable for any garage?',
  'Ce diferență este între lamelele de 55 mm și cele de 77 mm?':
    'What is the difference between 55 mm and 77 mm slats?',
  'Ușa de garaj poate fi automatizată?': 'Can the garage door be automated?',
  'Pot deschide ușa de garaj și manual dacă se întrerupe curentul?':
    'Can I open the garage door by hand if the power goes out?',
  'Ce culori sunt disponibile pentru ușile de garaj?':
    'What colours are available for the garage doors?',
  'Cum aflu ce dimensiune de ușă de garaj îmi trebuie?':
    'How do I find out what size of garage door I need?',
  'Oferiți și montaj pentru ușile de garaj?':
    'Do you also install the garage doors?',
  'Cât durează montajul unei uși de garaj rulou?':
    'How long does it take to install a roller garage door?',
  'Ușile de garaj rulou oferă protecție împotriva intemperiilor?':
    'Do roller garage doors protect against the weather?',
  'Pot comanda o ușă de garaj făcută pe dimensiunea golului meu?':
    'Can I order a garage door made to the size of my opening?',
  'Pot folosi ușa de garaj pentru un spațiu comercial sau industrial?':
    'Can I use the garage door for a commercial or industrial space?',
  'Ce întreținere necesită o ușă de garaj rulou?':
    'What maintenance does a roller garage door need?',
  'Oferiți garanție pentru ușile de garaj?':
    'Do you offer a warranty on the garage doors?',
  'Cum pot primi o ofertă pentru o ușă de garaj?':
    'How can I get a quote for a garage door?',
  'De ce este recomandată măsurarea înainte de comandă?':
    'Why is measuring before ordering recommended?',
  'Ușa de garaj rulou economisește spațiu?':
    'Does a roller garage door save space?',
  'De ce să aleg o ușă de garaj rulou din aluminiu?':
    'Why choose an aluminium roller garage door?',
  'Montajul este disponibil doar în Dâmbovița?':
    'Is installation available only in Dâmbovița county?',
  'Pot solicita o ofertă dacă nu cunosc dimensiunile exacte?':
    'Can I request a quote if I do not know the exact dimensions?',

  /* calculator, magazin, plată */
  'Înălțimea golului': 'Opening height',
  'Estimare, nu ofertă fermă.': 'An estimate, not a firm quote.',
  'scrieți-ne cotele exacte': 'send us the exact dimensions',
  'Catalog complet': 'Full catalogue',
  'Toate cele 21 de uși': 'All 21 doors',
  'Comanda se finalizează aici, pe site. Adăugați produsele în':
    'The order is completed here, on the site. Add the products to the',
  'coș': 'cart',
  'Metode disponibile': 'Available methods',
  '— Plătiți curierului, în numerar, în momentul livrării. Metodă disponibilă pentru toate produsele din catalog.':
    '— Pay the courier in cash on delivery. Available for every product in the catalogue.',
  'Plata cu cardul': 'Card payment',
  'Facturare': 'Invoicing',
  'Retur și restituirea banilor': 'Returns and refunds',
  'și în': 'and at',
  'Pentru reclamații puteți folosi': 'For complaints you may use',
  'și platforma\n      europeană': 'and the European platform',
  'Plata nu a fost finalizată': 'The payment was not completed',
  'Nu s-a reținut nicio sumă de pe card.': 'No amount was charged to the card.',
  '—\n      preluăm comanda și telefonic.':
    '— we can also take the order by telephone.',
  'Reia plata': 'Retry the payment',
  'Vezi coșul': 'View the cart',
  'fișa tehnică': 'technical data sheet',
  'Fișă tehnică': 'Technical data sheet',

  /* produs, descrieri scurte */
  'Include accesoriile necesare, legătură cardanică, manivelă, motorul tubular, cu centrală de comandă și 2 telecomenzi.':
    'Includes the necessary accessories: universal joint, crank handle, tubular motor with control unit and 2 remote controls.',
  'Culorile standard disponibile sunt: alb, nuanțe de maro, argintiu, gri, nuc, stejar, wenghe, mahon.':
    'The standard colours available are: white, shades of brown, silver, grey, walnut, oak, wenge and mahogany.',
  'Soluție rezidențială și comercială, la preț accesibil.':
    'A residential and commercial solution at an affordable price.',
  'Timp de deschidere/închidere totală: 10 secunde, cu sistem silențios.':
    'Total opening/closing time: 10 seconds, with a quiet system.',
  'Timp de deschidere/închidere totală: 25 secunde, cu sistem silențios.':
    'Total opening/closing time: 25 seconds, with a quiet system.',
  'O astfel de ușă va completa perfect fațada oricărei case, având un design elegant.':
    'A door like this completes the façade of any house perfectly, with its elegant design.',
  'Dispuneți de toate accesoriile necesare, inclusiv de telecomandă pentru o eficientizare a timpului.':
    'You get every accessory you need, including a remote control to save time.',
  'Produse noi: 16 produse în catalogul Usa-garaj.ro. Produsele aflate în categoria „PRODUSE NOI” a magazinului.':
    'New products: 16 products in the Usa-garaj.ro catalogue. The products in the shop’s “NEW PRODUCTS” category.',
  'Grosime lamele cu spumă poliuretanică': 'Slat thickness with polyurethane foam',
  'Capace laterale': 'Side covers',
  '30 secunde': '30 seconds',
  '55 mm injectate cu spumă poliuretanică, 14 mm grosime':
    '55 mm injected with polyurethane foam, 14 mm thick',
  '77 mm injectate cu spumă poliuretanică, 20 mm grosime':
    '77 mm injected with polyurethane foam, 20 mm thick',
  'aluminiu, 250 mm': 'aluminium, 250 mm',
  'aluminiu, 300 / 350 mm': 'aluminium, 300 / 350 mm',
  'oțel; ax 60 mm, oțel zincat': 'steel; 60 mm shaft, galvanised steel',
  'oțel; ax 70 mm, oțel zincat': 'steel; 70 mm shaft, galvanised steel',
  '300 mm, grosime 0,95 mm': '300 mm, 0.95 mm thick',
  '250 × 250 mm, grosime 0,95 mm': '250 × 250 mm, 0.95 mm thick',
  '300 sau 350 mm': '300 or 350 mm',
  '77 mm, grosime 20 mm': '77 mm, 20 mm thick',
  '4 kg/m²': '4 kg/m²',
  '6 kg/m²': '6 kg/m²',

  /* pagina tehnică */
  'Uși de garaj tip rulou': 'Roller garage doors',
  'Cum se citesc dimensiunile': 'How to read the dimensions',
  'Dimensiunile listate pe site sunt': 'The dimensions listed on the site are',
  'AAAA × BBBB': 'WWWW × HHHH',
  ', unde': ', where',
  'AAAA = lățimea': 'WWWW = the width',
  ', iar': ', and',
  'BBBB = înălțimea': 'HHHH = the height',
  'Aceste cote reprezintă dimensiunile de execuție ale ușilor de garaj și\n          includ':
    'These are the manufacturing dimensions of the garage doors and they include',
  'ghidajele pe lățime': 'the guide rails in the width',
  'caseta pe înălțime': 'the box in the height',
  'Spațiul util de trecere': 'The clear passage opening',
  'se află scăzând din cotele de execuție:':
    'is obtained by subtracting from the manufacturing dimensions:',
  'Uși rulou 55 mm': 'Roller doors 55 mm',
  'Uși rulou 77 mm': 'Roller doors 77 mm',
  'AAAA − 150 mm și BBBB − 300 mm': 'WWWW − 150 mm and HHHH − 300 mm',
  'AAAA − 180 mm și BBBB − 377 mm': 'WWWW − 180 mm and HHHH − 377 mm',
  'Acolo unde producătorul declară explicit spațiul de trecere, acesta\n          este afișat pe pagina produsului.':
    'Where the manufacturer states the passage opening explicitly, it is shown on the product page.',
  'De ce o ușă tip rulou': 'Why a roller door',
  'sau': 'or',
  'Profil P55 și profil PA77, comparate': 'Profile P55 and profile PA77, compared',
  'Secțiune prin lamela de 55 mm, cu grosimea de 14 mm și umplutura de spumă poliuretanică.':
    'Cross-section of the 55 mm slat, 14 mm thick and filled with polyurethane foam.',
  'Lamela de 55 mm, în secțiune': 'The 55 mm slat, in cross-section',
  'Specificații tehnice': 'Technical specifications',
  'Uși tip rulou cu lamelă de 55 mm': 'Roller doors with 55 mm slats',
  'Uși tip rulou cu lamelă de 77 mm': 'Roller doors with 77 mm slats',
  'Casetă din tablă de aluminiu': 'Box in sheet aluminium',
  'Ce cuprinde livrarea unei uși automate':
    'What the delivery of an automatic door includes',
  'motor tubular cu centrală de comandă': 'tubular motor with control unit',
  'Telecomenzi': 'Remote controls',
  '2 bucăți': '2 units',
  'manivelă și legătură cardanică': 'crank handle and universal joint',
  'Timp de deschidere / închidere': 'Opening / closing time',
  'circa 10 secunde, în funcție de model': 'about 10 seconds, depending on the model',
  'din aluminiu, inclusă': 'aluminium, included',
  '75 mm × 30 mm': '75 mm × 30 mm',
  '90 mm × 35 mm': '90 mm × 35 mm',

  /* pagini juridice, titluri de secțiune */
  'Termeni si conditii': 'Terms and conditions',
  'Continutul site-ului si drepturile de proprietate intelectuala':
    'Site content and intellectual property rights',
  'Dreptul consumatorilor de denuntare unilaterala a contractului':
    'The consumer’s right to withdraw from the contract',
  'Frauda': 'Fraud',
  'Drept aplicabil': 'Governing law',
  'Disponibilitatea serviciului si termene de livrare':
    'Service availability and delivery times',
  'Politica cookie': 'Cookie policy',
  'Site-ul usa-garaj.ro utilizeaza cookie-uri.': 'The usa-garaj.ro site uses cookies.',
  'Va rugam sa cititi cu atentie informatiile care urmeaza:':
    'Please read the following information carefully:',
  'Imbunatatesc eficienta publicitatii online.':
    'They improve the effectiveness of online advertising.',
  'Ce este un Cookie?': 'What is a cookie?',
  'Exista 2 categorii mari de cookie-uri:': 'There are 2 broad categories of cookie:',
  'Care sunt avantajele cookie-urilor?': 'What are the advantages of cookies?',
  'Care este durata de viata a unui cookie?': 'How long does a cookie last?',
  'Ce sunt cookie-urile plasate de terti?': 'What are third-party cookies?',
  'Cum sunt folosite cookie-urile de catre acest site':
    'How this site uses cookies',
  'O vizita pe acest site poate plasa urmatoarele tipuri de cookie-uri:':
    'A visit to this site may place the following types of cookie:',
  'Ce tip de informatii sunt stocate si accesate prin intermediul cookie-urilor?':
    'What kind of information is stored and accessed through cookies?',
  'De ce sunt cookie-urile importante pentru Internet?':
    'Why are cookies important for the internet?',
  'Exemple de intrebuintari importante ale cookieurilor (care nu necesita autentificarea unui utilizator prin intermediul unui cont):':
    'Examples of important uses of cookies (which do not require the user to sign in to an account):',
  'Furnizarea de publicitate mai relevanta pentru utilizator.':
    'Delivering advertising that is more relevant to the user.',
  'Securitate si probleme legate de confidentialitate':
    'Security and privacy matters',
  'Sfaturi pentru o navigare sigura si responsabila, bazata pe cookies':
    'Advice for safe and responsible browsing with cookies',
  'Instalati-va aplicatii antispyware si updatati-le in mod constant.':
    'Install anti-spyware software and keep it up to date.',
  'Cum pot opri cookie-urile?': 'How can I turn cookies off?',
  'Linkuri utile': 'Useful links',
  'All About Cookies': 'All About Cookies',
  'Pentru analiza si imbunatatirea site-ului, a ofertei comerciale si a publicitatii pe care o desfasuram;':
    'To analyse and improve the site, our commercial offering and the advertising we run;'
};

/* --------------------------------------------------------------- maghiară */

const hu = {
  /* interfață, navigare, subsol */
  'Adaugă în coș': 'Kosárba',
  'Produsele noastre': 'Termékeink',
  'Produse': 'Termékek',
  'Transport gratuit': 'Ingyenes szállítás',
  'Răsfoiește': 'Böngészés',
  'Răsfoiește produsele noastre': 'Böngéssze termékeinket',
  'Magazin': 'Üzlet',
  'Promoții': 'Akciók',
  'Produse noi': 'Új termékek',
  'Tehnic': 'Műszaki',
  'Contact': 'Kapcsolat',
  'Întrebări': 'Kérdések',
  'Întrebări frecvente': 'Gyakori kérdések',
  'Uși Rulou 55 mm': 'Redőnykapu 55 mm',
  'Uși Rulou 77 mm': 'Redőnykapu 77 mm',
  'Uși garaj rulou 55 mm': 'Redőnyös garázskapu 55 mm',
  'Uși garaj rulou 77 mm': 'Redőnyös garázskapu 77 mm',
  'Sari la conținutul principal': 'Ugrás a fő tartalomra',
  'Usa-garaj.ro — prima pagină': 'Usa-garaj.ro — főoldal',
  'Navigare principală': 'Főmenü',
  'Coșul de cumpărături': 'Bevásárlókosár',
  'Coșul meu': 'Kosaram',
  'Coș': 'Kosár',
  'Comandă': 'Megrendelés',
  'Comenzi': 'Rendelések',
  'Acasă': 'Főoldal',
  'Firimituri': 'Morzsamenü',
  'Parte a Grupului Abba Confort': 'Az Abba Confort csoport tagja',
  'Urmăriți-ne': 'Kövessen minket',
  'Informații utile': 'Hasznos tudnivalók',
  'Asistență': 'Ügyfélszolgálat',
  'Contactează-ne': 'Vegye fel a kapcsolatot',
  'Toate drepturile rezervate ©': 'Minden jog fenntartva ©',
  '· uși de garaj rulou': '· redőnyös garázskapuk',
  'Produse disponibile': 'Elérhető termékek',
  'Catalogul nostru': 'Katalógusunk',
  'Deschide produsele noastre': 'Termékeink megnyitása',
  'Vizualizare rapidă': 'Gyorsnézet',
  'vizualizare rapidă': 'gyorsnézet',
  'Vezi pagina produsului': 'Termékoldal megtekintése',
  'Toate': 'Összes',
  'Ofertă': 'Akciós',
  'Doar prețuri reduse': 'Csak akciós árak',
  'Categorie': 'Kategória',
  'Document': 'Dokumentum',
  'Harta site': 'Oldaltérkép',

  /* taste */
  'înainte': 'előre',
  'navighezi': 'navigálás',
  'confirmi': 'megerősítés',
  'anulezi': 'mégse',

  /* date de identificare */
  'CUI': 'Adószám',
  'Nr. Reg. Com.': 'Cégjegyzék',
  'Date de identificare': 'Cégadatok',
  '· verificabile la ONRC': '· a román cégbíróságnál ellenőrizhető',
  'Denumire': 'Cégnév',
  'Sediu social': 'Székhely',
  'Telefon': 'Telefon',
  'Sună la 0731 366 613': 'Hívja a 0731 366 613 számot',
  'Secretariat și informații': 'Titkárság és tájékoztatás',
  'Comenzi și oferte': 'Rendelések és árajánlatok',
  'Sediu · vezi în Google Maps': 'Székhely · megtekintés a Google Térképen',
  'Comandă online': 'Online rendelés',
  'Vezi catalogul și comandă': 'Nézze meg a katalógust és rendeljen',
  'Stăm de vorbă': 'Beszéljünk',
  'Contact și date de identificare': 'Kapcsolat és cégadatok',

  /* pagini de conținut, titluri */
  'Uși de garaj tip rulou ABBA — lamele de 55 mm și 77 mm':
    'ABBA redőnyös garázskapuk — 55 és 77 mm-es lamellák',
  'Comandă confirmată': 'Rendelés visszaigazolva',
  'Termeni și condiții': 'Általános szerződési feltételek',
  'Confidențialitate': 'Adatvédelem',
  'Politica de cookie-uri': 'Sütikezelési tájékoztató',
  'Cum cumpăr': 'Hogyan vásárolhatok',
  'Metode de plată': 'Fizetési módok',
  'Transport și retururi': 'Szállítás és visszaküldés',
  'Soluționarea litigiilor': 'Vitarendezés',
  'Anulare tranzacție': 'Tranzakció megszakítva',
  'Finalizarea comenzii': 'Megrendelés véglegesítése',
  'Înainte să comandați': 'Mielőtt rendelne',
  'Ramburs la livrare': 'Utánvét',
  'și': 'és',

  /* social */
  'Uși de garaj ABBA Confort': 'ABBA Confort garázskapuk',
  'ABBA Confort': 'ABBA Confort',
  'Uși de garaj ABBA Confort pe Facebook, se deschide într-o filă nouă':
    'ABBA Confort garázskapuk a Facebookon, új lapon nyílik meg',
  'ABBA Confort pe TikTok, se deschide într-o filă nouă':
    'ABBA Confort a TikTokon, új lapon nyílik meg',
  'ABBA CONFORT — problema ta, soluția noastră':
    'ABBA CONFORT — az Ön gondja, a mi megoldásunk',
  'Uși de garaj tip rulou cu lamele de aluminiu, acționate cu telecomandă.\n          Proiectare, montaj și service.':
    'Redőnyös garázskapuk alumínium lamellákkal, távirányítós működtetéssel.\n          Tervezés, beszerelés és szerviz.',

  /* produs: culori, specificații */
  'Culoare': 'Szín',
  'Cantitate': 'Mennyiség',
  'Maro': 'Barna',
  'Gri antracit': 'Antracitszürke',
  'Maro deschis / Maro închis': 'Világosbarna / Sötétbarna',
  'Maro închis / Maro deschis': 'Sötétbarna / Világosbarna',
  'lamelă 55 mm': '55 mm-es lamella',
  'lamelă 77 mm': '77 mm-es lamella',
  'mm lamelă': 'mm-es lamella',
  'lamelă 55 mm · casetă 250 mm': '55 mm-es lamella · 250 mm-es tok',
  'lamelă 77 mm · casetă 300 mm': '77 mm-es lamella · 300 mm-es tok',
  'În stoc · transport gratuit · montaj asigurat':
    'Raktáron · ingyenes szállítás · beszereléssel',
  'Specificații': 'Műszaki adatok',
  'Dimensiune totală (L × H)': 'Teljes méret (Sz × M)',
  'Pasul lamelei': 'Lamellaosztás',
  'Grosime lamele': 'Lamellavastagság',
  'Greutate lamele': 'Lamellatömeg',
  'Lamele': 'Lamellák',
  'Lamelă': 'Lamella',
  'Lamelă finală': 'Záró lamella',
  'Lamele din aluminiu cu spumă poliuretanică':
    'Alumínium lamellák poliuretán habbal',
  'Spațiu util de trecere': 'Szabad átjárási méret',
  'Casetă aluminiu': 'Alumínium tok',
  'Casetă din aluminiu': 'Alumínium tok',
  'Casetă și capace laterale': 'Tok és oldalsó fedelek',
  'Capace laterale din aluminiu': 'Alumínium oldalfedelek',
  'Ghidaje': 'Vezetősínek',
  'Ghidaje aluminiu': 'Alumínium vezetősínek',
  'Ghidaje din aluminiu': 'Alumínium vezetősínek',
  'Ax metalic zincat': 'Horganyzott acéltengely',
  'Rulmenți': 'Csapágyak',
  'oțel': 'acél',
  'Acționare': 'Működtetés',
  'Acționare de rezervă': 'Tartalék működtetés',
  'legătură cardanică + manivelă': 'kardáncsatlakozó + kurbli',
  'manivelă': 'kurbli',
  'centrală de comandă': 'vezérlőegység',
  '2 telecomenzi': '2 távirányító',
  'cheiță deblocare motor': 'motorkioldó kulcs',
  'ușă rulou': 'redőnykapu',
  'Conținut colet': 'A csomag tartalma',
  'Timp deschidere/închidere': 'Nyitási/zárási idő',
  'Timp închidere/deschidere': 'Zárási/nyitási idő',
  'Timp de deschidere/închidere': 'Nyitási/zárási idő',
  '10 secunde': '10 másodperc',
  '25 secunde': '25 másodperc',
  '14 mm grosime': '14 mm vastag',
  '55 mm, grosime 14 mm': '55 mm, 14 mm vastag',
  '250 mm, grosime 0,95 mm': '250 mm, 0,95 mm vastag',
  '300 sau 350 mm, grosime 0,95 mm': '300 vagy 350 mm, 0,95 mm vastag',
  'Alte variante': 'További változatok',
  'Produse înrudite': 'Kapcsolódó termékek',
  'Prețul include TVA. Transportul se calculează la finalizarea comenzii.':
    'Az ár tartalmazza az áfát. A szállítási díj a megrendelés véglegesítésekor kerül kiszámításra.',
  'Specificațiile de mai sus sunt cele declarate de magazin pentru acest produs.':
    'A fenti műszaki adatokat az üzlet adta meg erre a termékre.',

  /* argumentele de sub erou */
  'Preț competitiv': 'Versenyképes ár',
  'Calitate garantată': 'Garantált minőség',
  'Transport inclus': 'Szállítással',
  'Montaj asigurat': 'Beszereléssel',

  /* text alternativ al fotografiilor */
  'Fotografie ușă maro': 'Fénykép barna kapuról',
  'Fotografie ușă gri antracit': 'Fénykép antracitszürke kapuról',
  'Fotografie ușă de garaj maro': 'Fénykép barna garázskapuról',
  'Fotografie ușă de garaj gri antracit':
    'Fénykép antracitszürke garázskapuról',
  '3 fotografii din magazin · Gri antracit':
    '3 fénykép az üzletből · Antracitszürke',
  '5 fotografii din magazin · Maro deschis / Maro închis':
    '5 fénykép az üzletből · Világosbarna / Sötétbarna',
  '4 fotografii din magazin · Maro deschis / Maro închis':
    '4 fénykép az üzletből · Világosbarna / Sötétbarna',
  '3 fotografii din magazin · Maro închis / Maro deschis':
    '3 fénykép az üzletből · Sötétbarna / Világosbarna',

  /* denumiri comerciale rămase */
  'Ușă garaj tip rulou automată, perfectă pentru orice garaj!':
    'Automata redőnyös garázskapu, minden garázshoz tökéletes!',
  'Ușă garaj tip rulou, potrivită pentru orice construcție!':
    'Redőnyös garázskapu, bármilyen épülethez illik!',
  'Ușă garaj automată ABBA 55MM, 3000 × 2500, lamele 55 mm, maro':
    'Automata garázskapu ABBA 55 mm, 3000 × 2500, 55 mm-es lamellák, barna',
  'Nicio ușă nu corespunde acestor filtre. Încercați o altă combinație.':
    'Egyetlen kapu sem felel meg ezeknek a szűrőknek. Próbáljon másik kombinációt.',

  /* specificații tehnice rămase */
  'motor tubular + centrală de comandă + 2 telecomenzi':
    'csőmotor + vezérlőegység + 2 távirányító',
  'Lamela terminală': 'Záró lamella',
  'aluminiu extrudat': 'extrudált alumínium',
  'Rulmenți / ax acționare': 'Csapágyak / hajtótengely',
  'Rulmenți oțel / ax acționare': 'Acélcsapágyak / hajtótengely',
  'Ax metalic': 'Acéltengely',
  'Ghidaje ușă': 'Kapuvezető sínek',
  'Ghidaje ușă din aluminiu': 'Alumínium kapuvezető sínek',
  'Ghidaje (picioare) ușă din aluminiu': 'Alumínium kapuvezető sínek (lábak)',
  'Casetă de aluminiu': 'Alumínium tok',
  'grosime 14 mm': '14 mm vastag',
  '4 kg/mp': '4 kg/m²',
  '60 mm, oțel zincat': '60 mm, horganyzott acél',
  'din aluminiu': 'alumínium',
  'Greutate covor lamelă': 'Lamellapáncél tömege',
  'Prețurile competitive au poziționat ușile de garaj rulou în topul vânzărilor.':
    'A versenyképes áraknak köszönhetően a redőnyös garázskapuk a legkelendőbbek.',

  /* pagini de stare */
  'Comanda a fost înregistrată.': 'A rendelést rögzítettük.',
  'Vă mulțumim pentru comandă': 'Köszönjük a rendelését',
  'Comanda a fost înregistrată și veți primi confirmarea pe e-mail.':
    'A rendelést rögzítettük, a visszaigazolást e-mailben küldjük.',
  'Înapoi la prima pagină': 'Vissza a főoldalra',
  'Vezi catalogul': 'Katalógus megtekintése',
  'Plata nu a fost finalizată.': 'A fizetés nem fejeződött be.',
  'Anulare Tranzactie': 'Tranzakció megszakítva',
  'Produsele alese și totalul comenzii.':
    'A kiválasztott termékek és a rendelés végösszege.',
  'Datele de facturare și livrare, apoi plata.':
    'Számlázási és szállítási adatok, majd fizetés.',
  'Toate paginile site-ului Usa-garaj.ro.': 'A Usa-garaj.ro összes oldala.',
  'Intrate recent': 'Nemrég érkezett',
  'Produsele aflate în categoria „PRODUSE NOI” a magazinului.':
    'Az üzlet „ÚJ TERMÉKEK” kategóriájában szereplő termékek.',
  'Preț redus': 'Akciós ár',

  /* coș și finalizare */
  'Coșul dumneavoastră': 'Az Ön kosara',
  'Se încarcă coșul…': 'A kosár betöltése…',
  'Se încarcă…': 'Betöltés…',
  'Date de facturare și livrare': 'Számlázási és szállítási adatok',
  'Prenume': 'Keresztnév',
  'Nume': 'Vezetéknév',
  'E-mail': 'E-mail',
  'Adresă (stradă, număr)': 'Cím (utca, házszám)',
  'Bloc, scară, apartament': 'Épület, lépcsőház, lakás',
  '(opțional)': '(nem kötelező)',
  'Localitate': 'Település',
  'Județ': 'Megye',
  'Cod poștal': 'Irányítószám',
  'Metoda de plată': 'Fizetési mód',
  'Plătiți curierului, în numerar, la primirea coletului.':
    'A futárnak fizet készpénzben, a csomag átvételekor.',
  'Rezumatul comenzii': 'A rendelés összegzése',
  'Înapoi la coș': 'Vissza a kosárhoz',
  'Plasează comanda': 'Megrendelés elküldése',
  'Prin plasarea comenzii confirmați că ați citit':
    'A megrendelés elküldésével megerősíti, hogy elolvasta:',
  'Termenii și condițiile': 'Általános szerződési feltételek',
  'Politica de confidențialitate': 'Adatvédelmi tájékoztató',
  '.\n        Aveți drept de retragere în 14 zile, conform OUG 34/2014.':
    '.\n        A 34/2014. sz. román sürgősségi rendelet szerint 14 napon belül elállhat a vásárlástól.',

  /* prima pagină */
  'Cuprins': 'Tartalom',
  'Catalog': 'Katalógus',
  'Magazin — toate cele 21 de produse': 'Üzlet — mind a 21 termék',
  'Informații': 'Tudnivalók',
  'Partenerul vostru pentru proiectarea și montarea ușilor de garaj de tip rulou':
    'Partnerük a redőnyös garázskapuk tervezésében és beszerelésében',
  'Calculator': 'Árkalkulátor',
  'Calculator de preț': 'Árkalkulátor',
  'Preț estimativ': 'Becsült ár',
  'Lățimea golului': 'A nyílás szélessége',
  'configurații în catalog': 'változat a katalógusban',
  'produse la preț redus': 'akciós termék',
  'lei': 'lej',
  'cel mai accesibil preț': 'legkedvezőbb ár',
  'interval de lățimi': 'szélességi tartomány',
  'Stare': 'Állapot',
  'Închisă': 'Zárva',
  'Cotă': 'Méret',
  'Preț': 'Ár',
  'De ce noi?': 'Miért minket válasszon?',
  'Mod de răsfoire': 'Böngészési mód',
  'Douăzeci și una de uși nu se compară derulând o pagină. Țineți apăsată\n          tasta':
    'Huszonegy kaput nem lehet görgetéssel összehasonlítani. Tartsa lenyomva a',
  'și apăsați': 'billentyűt, és nyomja meg:',
  'deschide și avansează': 'megnyitja és továbblép',
  'navighează în ambele sensuri': 'mindkét irányba lépteti',
  'confirmă selecția': 'megerősíti a választást',
  'anulează, fără să schimbe nimic': 'kilép, változtatás nélkül',
  'Selecție din catalog': 'Válogatás a katalógusból',
  'Fiecare ușă, desenată la cotele ei': 'Minden kapu a saját méretei szerint rajzolva',
  'Vezi toate cele 21 de produse': 'Mind a 21 termék megtekintése',
  'De ce ne poți contacta?': 'Miben segíthetünk?',
  'Uși de garaj de tip rulou, acționate prin telecomandă':
    'Redőnyös garázskapuk, távirányítós működtetéssel',
  'Atenție la cote.': 'Figyeljen a méretekre.',
  '150 mm pe lățime și 300 mm pe înălțime': '150 mm szélességben és 300 mm magasságban',
  'la ușile cu lamelă de 55 mm,\n    respectiv': 'az 55 mm-es lamellás kapuknál, illetve',
  '180 mm pe lățime și 377 mm pe înălțime': '180 mm szélességben és 377 mm magasságban',
  'Toate detaliile tehnice': 'Minden műszaki részlet',
  'Ce facem, de la măsurătoare la mentenanță':
    'Amit vállalunk, a felméréstől a karbantartásig',
  'Serviciile noastre': 'Szolgáltatásaink',
  'Proiectare și montaj': 'Tervezés és beszerelés',
  'Acționare cu telecomandă': 'Távirányítós működtetés',
  'Deschidere manuală': 'Kézi nyitás',
  'Manivelă și legătură cardanică, pentru situațiile în care alimentarea cu energie electrică lipsește.':
    'Kurbli és kardáncsatlakozó arra az esetre, ha nincs áramellátás.',
  'Service și mentenanță': 'Szerviz és karbantartás',
  'Asigurăm mentenanța și service-ul tehnic al ușilor montate, pe toată durata de funcționare.':
    'Az általunk beszerelt kapuk karbantartását és műszaki szervizét a teljes élettartam alatt biztosítjuk.',
  'Proiecte personalizate': 'Egyedi projektek',
  'Pe lângă produsele standard, disponibile în stoc, executăm uși la dimensiunile cerute de dumneavoastră.':
    'A raktáron lévő standard termékek mellett az Ön által kért méretben is gyártunk kapukat.',
  'Transportul este inclus în prețul afișat, fără costuri adăugate la finalizarea comenzii.':
    'A szállítás benne van a feltüntetett árban, a megrendelés véglegesítésekor nem jön rá semmi.',
  'Unde se potrivesc': 'Hová illenek',
  'Despre ușile noastre': 'A kapuinkról',
  'Căutați alte dimensiuni și design-uri?': 'Más méretet vagy kivitelt keres?',
  'Vă vom contacta curând pentru a vă prezenta\n        oferta noastră.':
    'Hamarosan felvesszük Önnel a kapcsolatot az ajánlatunkkal.',
  'Solicitați o ofertă': 'Kérjen ajánlatot',
  'calculați singur prețul, mai jos': 'számolja ki maga az árat, lentebb',

  /* pagini juridice, titluri interioare */
  'Confidentialitate': 'Adatvédelem',
  'Datele solicitate': 'A kért adatok',
  'De ce avem nevoie de date': 'Miért van szükségünk az adatokra',
  'Ce vom face cu datele': 'Mit teszünk az adatokkal',
  'Cat timp pastram datele': 'Meddig őrizzük az adatokat',
  'Care sunt drepturile dvs.': 'Milyen jogai vannak',
  'Cum cumpar?': 'Hogyan vásárolhatok?',
  'Selectarea produselor dorite': 'A kívánt termékek kiválasztása',
  'Informatii pentru expediere': 'Szállítási adatok',
  'Finalizare': 'Véglegesítés',
  'Cookie-uri esentiale': 'Alapvető sütik',
  'Cookie-uri de performanta': 'Teljesítménysütik',
  'Cookie-uri de Social media si publicitate':
    'Közösségi média- és hirdetési sütik',
  'Pentru prelucrarea comenzii si furnizarea produselor si serviciilor dorite;':
    'A rendelés feldolgozásához és a kért termékek, szolgáltatások nyújtásához;',
  'Pentru evaluarea produselor si serviciilor pe care vi le furnizam;':
    'Az Önnek nyújtott termékek és szolgáltatások értékeléséhez;',
  'Pentru a va oferi acces la functionalitatile site-ului in calitate de utilizator inregistrat;':
    'Hogy regisztrált felhasználóként hozzáférjen a webhely funkcióihoz;',
  'Pentru administrarea site-ului': 'A webhely üzemeltetéséhez',
  'Pentru a va oferi posibilitatea de a participa la concursuri, promotii;':
    'Hogy részt vehessen nyereményjátékokon és akciókban;',
  'telefon': 'telefon',
  'e-mail': 'e-mail',
  'Pentru reclamații și soluționarea alternativă a litigiilor puteți folosi\n     și platforma europeană':
    'Panasz esetén és alternatív vitarendezéshez az európai platformot is igénybe veheti',

  /* întrebări frecvente */
  'Ce tipuri de uși de garaj comercializați?':
    'Milyen típusú garázskapukat forgalmaznak?',
  'Ușile de garaj rulou sunt potrivite pentru orice garaj?':
    'Minden garázshoz megfelelnek a redőnyös garázskapuk?',
  'Ce diferență este între lamelele de 55 mm și cele de 77 mm?':
    'Mi a különbség az 55 mm-es és a 77 mm-es lamellák között?',
  'Ușa de garaj poate fi automatizată?': 'Automatizálható a garázskapu?',
  'Pot deschide ușa de garaj și manual dacă se întrerupe curentul?':
    'Kinyitható kézzel a garázskapu, ha nincs áram?',
  'Ce culori sunt disponibile pentru ușile de garaj?':
    'Milyen színekben kaphatók a garázskapuk?',
  'Cum aflu ce dimensiune de ușă de garaj îmi trebuie?':
    'Hogyan tudom meg, milyen méretű garázskapura van szükségem?',
  'Oferiți și montaj pentru ușile de garaj?':
    'A garázskapuk beszerelését is vállalják?',
  'Cât durează montajul unei uși de garaj rulou?':
    'Mennyi ideig tart egy redőnyös garázskapu beszerelése?',
  'Ușile de garaj rulou oferă protecție împotriva intemperiilor?':
    'Védenek a redőnyös garázskapuk az időjárás ellen?',
  'Pot comanda o ușă de garaj făcută pe dimensiunea golului meu?':
    'Rendelhetek a saját nyílásom méretére készült garázskaput?',
  'Pot folosi ușa de garaj pentru un spațiu comercial sau industrial?':
    'Használható a garázskapu üzlethelyiséghez vagy ipari térhez?',
  'Ce întreținere necesită o ușă de garaj rulou?':
    'Milyen karbantartást igényel egy redőnyös garázskapu?',
  'Oferiți garanție pentru ușile de garaj?': 'Vállalnak garanciát a garázskapukra?',
  'Cum pot primi o ofertă pentru o ușă de garaj?':
    'Hogyan kérhetek árajánlatot garázskapura?',
  'De ce este recomandată măsurarea înainte de comandă?':
    'Miért ajánlott a felmérés a rendelés előtt?',
  'Ușa de garaj rulou economisește spațiu?':
    'Helytakarékos a redőnyös garázskapu?',
  'De ce să aleg o ușă de garaj rulou din aluminiu?':
    'Miért alumínium redőnyös garázskaput válasszak?',
  'Montajul este disponibil doar în Dâmbovița?':
    'Csak Dâmbovița megyében vállalnak beszerelést?',
  'Pot solicita o ofertă dacă nu cunosc dimensiunile exacte?':
    'Kérhetek ajánlatot, ha nem tudom a pontos méreteket?',

  /* calculator, magazin, plată */
  'Înălțimea golului': 'A nyílás magassága',
  'Estimare, nu ofertă fermă.': 'Becslés, nem kötelező érvényű ajánlat.',
  'scrieți-ne cotele exacte': 'írja meg nekünk a pontos méreteket',
  'Catalog complet': 'Teljes katalógus',
  'Toate cele 21 de uși': 'Mind a 21 kapu',
  'Comanda se finalizează aici, pe site. Adăugați produsele în':
    'A rendelés itt, a webhelyen véglegesíthető. Tegye a termékeket a',
  'coș': 'kosárba',
  'Metode disponibile': 'Elérhető módok',
  '— Plătiți curierului, în numerar, în momentul livrării. Metodă disponibilă pentru toate produsele din catalog.':
    '— A futárnak fizet készpénzben, az átvételkor. A katalógus minden termékéhez elérhető.',
  'Plata cu cardul': 'Bankkártyás fizetés',
  'Facturare': 'Számlázás',
  'Retur și restituirea banilor': 'Visszaküldés és pénzvisszatérítés',
  'și în': 'és itt:',
  'Pentru reclamații puteți folosi': 'Panasz esetén használhatja:',
  'și platforma\n      europeană': 'és az európai platformot',
  'Plata nu a fost finalizată': 'A fizetés nem fejeződött be',
  'Nu s-a reținut nicio sumă de pe card.': 'A kártyáról nem történt terhelés.',
  '—\n      preluăm comanda și telefonic.':
    '— telefonon is felvesszük a rendelést.',
  'Reia plata': 'Fizetés újrakezdése',
  'Vezi coșul': 'Kosár megtekintése',
  'fișa tehnică': 'műszaki adatlap',
  'Fișă tehnică': 'Műszaki adatlap',

  /* produs, descrieri scurte */
  'Include accesoriile necesare, legătură cardanică, manivelă, motorul tubular, cu centrală de comandă și 2 telecomenzi.':
    'Tartalmazza a szükséges tartozékokat: kardáncsatlakozó, kurbli, csőmotor vezérlőegységgel és 2 távirányító.',
  'Culorile standard disponibile sunt: alb, nuanțe de maro, argintiu, gri, nuc, stejar, wenghe, mahon.':
    'A választható standard színek: fehér, barna árnyalatok, ezüst, szürke, dió, tölgy, wenge és mahagóni.',
  'Soluție rezidențială și comercială, la preț accesibil.':
    'Lakossági és üzleti megoldás, elérhető áron.',
  'Timp de deschidere/închidere totală: 10 secunde, cu sistem silențios.':
    'Teljes nyitási/zárási idő: 10 másodperc, halk rendszerrel.',
  'Timp de deschidere/închidere totală: 25 secunde, cu sistem silențios.':
    'Teljes nyitási/zárási idő: 25 másodperc, halk rendszerrel.',
  'O astfel de ușă va completa perfect fațada oricărei case, având un design elegant.':
    'Egy ilyen kapu elegáns kialakításával bármely ház homlokzatát tökéletesen kiegészíti.',
  'Dispuneți de toate accesoriile necesare, inclusiv de telecomandă pentru o eficientizare a timpului.':
    'Minden szükséges tartozék rendelkezésre áll, a távirányítót is beleértve, az időmegtakarítás érdekében.',
  'Produse noi: 16 produse în catalogul Usa-garaj.ro. Produsele aflate în categoria „PRODUSE NOI” a magazinului.':
    'Új termékek: 16 termék a Usa-garaj.ro katalógusában. Az üzlet „ÚJ TERMÉKEK” kategóriájában szereplő termékek.',
  'Grosime lamele cu spumă poliuretanică': 'Lamellavastagság poliuretán habbal',
  'Capace laterale': 'Oldalsó fedelek',
  '30 secunde': '30 másodperc',
  '55 mm injectate cu spumă poliuretanică, 14 mm grosime':
    '55 mm, poliuretán habbal töltve, 14 mm vastag',
  '77 mm injectate cu spumă poliuretanică, 20 mm grosime':
    '77 mm, poliuretán habbal töltve, 20 mm vastag',
  'aluminiu, 250 mm': 'alumínium, 250 mm',
  'aluminiu, 300 / 350 mm': 'alumínium, 300 / 350 mm',
  'oțel; ax 60 mm, oțel zincat': 'acél; 60 mm-es tengely, horganyzott acél',
  'oțel; ax 70 mm, oțel zincat': 'acél; 70 mm-es tengely, horganyzott acél',
  '300 mm, grosime 0,95 mm': '300 mm, 0,95 mm vastag',
  '250 × 250 mm, grosime 0,95 mm': '250 × 250 mm, 0,95 mm vastag',
  '300 sau 350 mm': '300 vagy 350 mm',
  '77 mm, grosime 20 mm': '77 mm, 20 mm vastag',
  '4 kg/m²': '4 kg/m²',
  '6 kg/m²': '6 kg/m²',

  /* pagina tehnică */
  'Uși de garaj tip rulou': 'Redőnyös garázskapuk',
  'Cum se citesc dimensiunile': 'Hogyan kell olvasni a méreteket',
  'Dimensiunile listate pe site sunt': 'A webhelyen feltüntetett méretek:',
  'AAAA × BBBB': 'SSSS × MMMM',
  ', unde': ', ahol',
  'AAAA = lățimea': 'SSSS = a szélesség',
  ', iar': ', és',
  'BBBB = înălțimea': 'MMMM = a magasság',
  'Aceste cote reprezintă dimensiunile de execuție ale ușilor de garaj și\n          includ':
    'Ezek a garázskapuk gyártási méretei, és tartalmazzák',
  'ghidajele pe lățime': 'a vezetősíneket a szélességben',
  'caseta pe înălțime': 'a tokot a magasságban',
  'Spațiul util de trecere': 'A szabad átjárási méret',
  'se află scăzând din cotele de execuție:':
    'a gyártási méretekből levonva adódik:',
  'Uși rulou 55 mm': 'Redőnykapu 55 mm',
  'Uși rulou 77 mm': 'Redőnykapu 77 mm',
  'AAAA − 150 mm și BBBB − 300 mm': 'SSSS − 150 mm és MMMM − 300 mm',
  'AAAA − 180 mm și BBBB − 377 mm': 'SSSS − 180 mm és MMMM − 377 mm',
  'Acolo unde producătorul declară explicit spațiul de trecere, acesta\n          este afișat pe pagina produsului.':
    'Ahol a gyártó kifejezetten megadja az átjárási méretet, azt a termékoldalon feltüntetjük.',
  'De ce o ușă tip rulou': 'Miért redőnykapu',
  'sau': 'vagy',
  'Profil P55 și profil PA77, comparate': 'A P55 és a PA77 profil összehasonlítva',
  'Secțiune prin lamela de 55 mm, cu grosimea de 14 mm și umplutura de spumă poliuretanică.':
    'Metszet az 55 mm-es lamellán, 14 mm vastagsággal és poliuretán habtöltéssel.',
  'Lamela de 55 mm, în secțiune': 'Az 55 mm-es lamella metszetben',
  'Specificații tehnice': 'Műszaki adatok',
  'Uși tip rulou cu lamelă de 55 mm': 'Redőnykapuk 55 mm-es lamellával',
  'Uși tip rulou cu lamelă de 77 mm': 'Redőnykapuk 77 mm-es lamellával',
  'Casetă din tablă de aluminiu': 'Alumíniumlemez tok',
  'Ce cuprinde livrarea unei uși automate':
    'Mit tartalmaz egy automata kapu szállítása',
  'motor tubular cu centrală de comandă': 'csőmotor vezérlőegységgel',
  'Telecomenzi': 'Távirányítók',
  '2 bucăți': '2 darab',
  'manivelă și legătură cardanică': 'kurbli és kardáncsatlakozó',
  'Timp de deschidere / închidere': 'Nyitási / zárási idő',
  'circa 10 secunde, în funcție de model': 'körülbelül 10 másodperc, modelltől függően',
  'din aluminiu, inclusă': 'alumínium, tartozék',
  '75 mm × 30 mm': '75 mm × 30 mm',
  '90 mm × 35 mm': '90 mm × 35 mm',

  /* pagini juridice, titluri de secțiune */
  'Termeni si conditii': 'Általános szerződési feltételek',
  'Continutul site-ului si drepturile de proprietate intelectuala':
    'A webhely tartalma és a szellemi tulajdonjogok',
  'Dreptul consumatorilor de denuntare unilaterala a contractului':
    'A fogyasztó elállási joga',
  'Frauda': 'Csalás',
  'Drept aplicabil': 'Alkalmazandó jog',
  'Disponibilitatea serviciului si termene de livrare':
    'A szolgáltatás elérhetősége és a szállítási határidők',
  'Politica cookie': 'Sütikezelési tájékoztató',
  'Site-ul usa-garaj.ro utilizeaza cookie-uri.':
    'A usa-garaj.ro webhely sütiket használ.',
  'Va rugam sa cititi cu atentie informatiile care urmeaza:':
    'Kérjük, figyelmesen olvassa el az alábbi tájékoztatást:',
  'Imbunatatesc eficienta publicitatii online.':
    'Növelik az online hirdetések hatékonyságát.',
  'Ce este un Cookie?': 'Mi az a süti?',
  'Exista 2 categorii mari de cookie-uri:': 'A sütiknek 2 nagy csoportja van:',
  'Care sunt avantajele cookie-urilor?': 'Milyen előnyei vannak a sütiknek?',
  'Care este durata de viata a unui cookie?': 'Meddig él egy süti?',
  'Ce sunt cookie-urile plasate de terti?': 'Mik a harmadik féltől származó sütik?',
  'Cum sunt folosite cookie-urile de catre acest site':
    'Hogyan használja ez a webhely a sütiket',
  'O vizita pe acest site poate plasa urmatoarele tipuri de cookie-uri:':
    'A webhely meglátogatásakor a következő típusú sütik kerülhetnek elhelyezésre:',
  'Ce tip de informatii sunt stocate si accesate prin intermediul cookie-urilor?':
    'Milyen adatokat tárolnak és érnek el a sütik?',
  'De ce sunt cookie-urile importante pentru Internet?':
    'Miért fontosak a sütik az internet számára?',
  'Exemple de intrebuintari importante ale cookieurilor (care nu necesita autentificarea unui utilizator prin intermediul unui cont):':
    'Példák a sütik fontos felhasználási módjaira (amelyekhez nem szükséges fiókkal bejelentkezni):',
  'Furnizarea de publicitate mai relevanta pentru utilizator.':
    'A felhasználó számára relevánsabb hirdetések megjelenítése.',
  'Securitate si probleme legate de confidentialitate':
    'Biztonsági és adatvédelmi kérdések',
  'Sfaturi pentru o navigare sigura si responsabila, bazata pe cookies':
    'Tanácsok a biztonságos és felelős, sütikre épülő böngészéshez',
  'Instalati-va aplicatii antispyware si updatati-le in mod constant.':
    'Telepítsen kémprogram-elhárító alkalmazásokat, és tartsa őket naprakészen.',
  'Cum pot opri cookie-urile?': 'Hogyan tilthatom le a sütiket?',
  'Linkuri utile': 'Hasznos hivatkozások',
  'All About Cookies': 'All About Cookies',
  'Pentru analiza si imbunatatirea site-ului, a ofertei comerciale si a publicitatii pe care o desfasuram;':
    'A webhely, a kereskedelmi kínálat és a hirdetéseink elemzéséhez és fejlesztéséhez;'
};

/* ------------------------------------------------------ derivate mecanic */

/* Reducerile apar cu procentul lipit de cuvânt, iar procentele sunt multe.
   Le derivăm din tiparul românesc, în loc să scriem douăzeci de rânduri
   aproape identice care s-ar desincroniza la prima cotă nouă. */
for (let p = 1; p <= 90; p++) {
  en['Reducere −' + p + '%'] = 'Save −' + p + '%';
  hu['Reducere −' + p + '%'] = 'Kedvezmény −' + p + '%';
}

/* ------------------------------------------------------------------ reguli */

/* Denumirile de produs și cotele urmează câteva tipare fixe, cu cifrele
   schimbate. Scrise una câte una ar fi patruzeci de rânduri aproape identice,
   care s-ar desincroniza la primul produs nou din catalog. Regulile se aplică
   numai dacă expresia nu s-a găsit în dicționar, deci o denumire scrisă
   explicit mai sus are întâietate.

   Cifrele, codurile RAL (8014, 8019) și „ABBA” trec prin ele neatinse: sunt
   aceleași pe factură, în catalogul furnizorului și pe eticheta de pe colet. */
const reguli = [
  [/^Spațiu util de trecere L(\d+) H(\d+)$/,
    'Clear passage opening W$1 H$2',
    'Szabad átjárási méret Sz$1 M$2'],

  [/^Ușă garaj automată (\d+) × (\d+), lamele ABBA (\d+) mm, maro 8014, maro 8019$/,
    'Automatic garage door $1 × $2, ABBA $3 mm slats, brown 8014, brown 8019',
    'Automata garázskapu $1 × $2, ABBA $3 mm-es lamellák, barna 8014, barna 8019'],

  [/^Ușă garaj automată ABBA (\d+)MM, 8014\/8019, (\d+) × (\d+), lamele (\d+) mm, maro$/,
    'Automatic garage door ABBA $1 mm, 8014/8019, $2 × $3, $4 mm slats, brown',
    'Automata garázskapu ABBA $1 mm, 8014/8019, $2 × $3, $4 mm-es lamellák, barna'],

  [/^Ușă garaj automată lamele ABBA (\d+)mm L(\d+) H(\d+), GRI ANTRACIT$/,
    'Automatic garage door, ABBA $1 mm slats, W$2 H$3, ANTHRACITE GREY',
    'Automata garázskapu, ABBA $1 mm-es lamellák, Sz$2 M$3, ANTRACITSZÜRKE'],

  [/^Ușă garaj automată lamele ABBA (\d+)mm L(\d+) × H(\d+), GRI ANTRACIT$/,
    'Automatic garage door, ABBA $1 mm slats, W$2 × H$3, ANTHRACITE GREY',
    'Automata garázskapu, ABBA $1 mm-es lamellák, Sz$2 × M$3, ANTRACITSZÜRKE'],

  [/^Ușă garaj automată lamele ABBA (\d+)mm L (\d+) × (\d+) H, GRI ANTRACIT$/,
    'Automatic garage door, ABBA $1 mm slats, W $2 × $3 H, ANTHRACITE GREY',
    'Automata garázskapu, ABBA $1 mm-es lamellák, Sz $2 × $3 M, ANTRACITSZÜRKE'],

  [/^Ușă garaj automată lamele ABBA (\d+)mm L(\d+) × H(\d+), maro închis 8019, maro deschis 8014$/,
    'Automatic garage door, ABBA $1 mm slats, W$2 × H$3, dark brown 8019, light brown 8014',
    'Automata garázskapu, ABBA $1 mm-es lamellák, Sz$2 × M$3, sötétbarna 8019, világosbarna 8014'],

  [/^Ușă garaj automată lamele ABBA (\d+)mm L (\d+) × (\d+) H, maro închis 8019, maro deschis 8014$/,
    'Automatic garage door, ABBA $1 mm slats, W $2 × $3 H, dark brown 8019, light brown 8014',
    'Automata garázskapu, ABBA $1 mm-es lamellák, Sz $2 × $3 M, sötétbarna 8019, világosbarna 8014'],

  /* Denumirea plus culoarea, cum apare în textul alternativ al fotografiilor.
     Recursivă prin construcție: coada e tăiată, capul trece iar prin reguli. */
  [/^(.+), (Maro|Gri antracit)$/, '$1, $2', '$1, $2'],

  [/^din (\d+) produse$/, 'of $1 products', '$1 termékből'],
  [/^— ([\d.,]+ lei)$/, '— $1', '— $1'],
  /* Titlul filei fiecărei pagini de produs: denumirea, apoi prețul. */
  [/^(.+) — ([\d.,]+ lei)$/, '$1 — $2', '$1 — $2'],
  [/^L (\d+) × H (\d+)$/, 'W $1 × H $2', 'Sz $1 × M $2'],

  /* Textul alternativ al galeriei: aceeași denumire, cu un prefix numerotat.
     Denumirea din grupul $2 se întoarce prin traducere, deci se rezolvă cu
     regulile de denumire de mai sus. */
  [/^Detaliu (\d+) — (.+)$/, 'Detail $1 — $2', '$1. részlet — $2'],
  [/^(.+)\. Desen la scară cu cote\.$/,
    '$1. Scale drawing with dimensions.',
    '$1. Méretarányos rajz méretekkel.'],
  [/^(\d+) fotografii din magazin · (.+)$/,
    '$1 photographs from the shop · $2',
    '$1 fénykép az üzletből · $2'],

  /* Descrierea meta a fiecărui produs, construită după același calapod în
     build-pagini.js. Denumirea și culoarea din grupuri se traduc; prețurile
     și cotele rămân cifre. */
  [/^(.+)\. ([\d.,]+ lei), redus de la ([\d.,]+ lei)\. Lamelă (\d+) mm, ([\d ×]+mm), (.+)\. Transport gratuit\.$/,
    '$1. $2, reduced from $3. $4 mm slat, $5, $6. Free delivery.',
    '$1. $2, korábban $3. $4 mm-es lamella, $5, $6. Ingyenes szállítás.'],
  [/^(.+)\. ([\d.,]+ lei)\. Lamelă (\d+) mm, ([\d ×]+mm), (.+)\. Transport gratuit\.$/,
    '$1. $2. $3 mm slat, $4, $5. Free delivery.',
    '$1. $2. $3 mm-es lamella, $4, $5. Ingyenes szállítás.'],

  /* Titlurile de filă și descrierile au toate aceeași coadă. Traducem capul,
     coada rămâne: numele domeniului și datele de firmă nu se traduc. */
  [/^(.+) \| Usa-garaj\.ro$/, '$1 | Usa-garaj.ro', '$1 | Usa-garaj.ro'],
  [/^(.+) — (\d+) produse$/, '$1 — $2 products', '$1 — $2 termék'],
  [/^(.+) — ABBA CONFORT DELIVERY SRL, CUI (\d+), (J\d+)\.$/,
    '$1 — ABBA CONFORT DELIVERY SRL, Tax ID $2, Reg. No. $3.',
    '$1 — ABBA CONFORT DELIVERY SRL, adószám $2, cégjegyzékszám $3.'],
  [/^(.+) — ABBA CONFORT DELIVERY SRL, CUI (\d+), (J\d+)$/,
    '$1 — ABBA CONFORT DELIVERY SRL, Tax ID $2, Reg. No. $3',
    '$1 — ABBA CONFORT DELIVERY SRL, adószám $2, cégjegyzékszám $3'],
  [/^Magazin — toate cele (\d+) de uși de garaj rulou$/,
    'Shop — all $1 roller garage doors',
    'Üzlet — mind a $1 redőnyös garázskapu'],
  [/^Întrebări frecvente — uși de garaj rulou$/,
    'Frequently asked questions — roller garage doors',
    'Gyakori kérdések — redőnyös garázskapuk'],
  [/^Tehnic — uși de garaj tip rulou, lamelă 55 și 77 mm$/,
    'Technical — roller garage doors, 55 and 77 mm slats',
    'Műszaki — redőnyös garázskapuk, 55 és 77 mm-es lamella']
];

/* Aplică prima regulă care se potrivește. `dict` e dat ca să putem trece
   bucățile rezultate din nou prin traducere — de exemplu capul unei denumiri
   urmate de culoare. */
function aplicaReguli(text, limba, tradu) {
  for (const [tipar, formaEn, formaHu] of reguli) {
    const m = text.match(tipar);
    if (!m) continue;
    const forma = limba === 'en' ? formaEn : formaHu;
    return forma.replace(/\$(\d)/g, (tot, n) => tradu(m[Number(n)]));
  }
  return null;
}

/* Textele lungi — descrieri de produs, întrebări frecvente, pagini juridice —
   stau în fișierul alăturat, ca dicționarul de interfață de mai sus să rămână
   citibil dintr-o privire. Se adaugă peste, deci un text scris aici are
   întâietate față de unul din traduceri-texte.js. */
const TEXTE = require('./traduceri-texte.js');
for (const cheie of Object.keys(TEXTE.en)) if (!(cheie in en)) en[cheie] = TEXTE.en[cheie];
for (const cheie of Object.keys(TEXTE.hu)) if (!(cheie in hu)) hu[cheie] = TEXTE.hu[cheie];

module.exports = { en, hu, numeComutator, aplicaReguli };
