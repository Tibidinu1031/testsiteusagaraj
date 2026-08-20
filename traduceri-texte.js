'use strict';

/* Textele lungi: descrieri de produs, întrebări frecvente, pagini juridice.
   ------------------------------------------------------------------------
   Stau separat de traduceri.js ca dicționarul de interfață — butoane,
   etichete, denumiri — să rămână citibil dintr-o privire. Aceleași reguli:
   cheia e româna exactă, iar ce nu se potrivește rămâne în română și apare
   în traduceri-lipsa.json.

   Textele juridice sunt traduse ca să fie înțelese de un cumpărător care nu
   citește românește. Versiunea românească rămâne cea care produce efecte —
   e formularea pe care a scris-o firma și pe care o recunoaște ANPC-ul. */

const en = {
  /* --- descrieri de produs ---------------------------------------------- */

  'Ușa de garaj automată de 55MM de tip rulou este exact ceea ce ai nevoie pentru garajul casei sau pentru spațiul de depozitare. Oferă un aspect plăcut și nu ocupă mult spațiu și în același timp oferă siguranța că nu poate fi deschisă de oricine. Pentru un confort sporit această ușă de garaj poate fi acționată electric prin telecomandă, dar și manual la nevoie.':
    'The 55 mm automatic roller garage door is exactly what you need for the garage of your house or for a storage space. It looks good and takes up little room, while making sure it cannot be opened by just anyone. For added convenience this garage door can be operated electrically by remote control, and by hand when needed.',

  'O ușă de garaj de tip rulou vă menține obiectele pe care le dețineți în siguranță, oferind în același timp izolare fonică și termică. Ușa este confecționată din aluminiu, lamelele de 77 mm sunt umplute cu spumă poliuretanică. Sistemul electric încorporat permite deschiderea și închiderea ușii la o apăsare de buton, fiecare în doar 10 secunde. Datorită faptului că lamelele se strâng într-o casetă, se face economie de spațiu și accesibilitatea este sporită. Ușa este vopsită prin procedee speciale electrochimice, ceea ce îi oferă o rezistență îndelungată. Ușa de garaj de tip rulou este fiabilă și generează un zgomot redus. Întreținerea acesteia este extrem de ușoară.':
    'A roller garage door keeps your belongings safe while providing both sound and thermal insulation. The door is made of aluminium and the 77 mm slats are filled with polyurethane foam. The built-in electrical system opens and closes the door at the touch of a button, each in only 10 seconds. Because the slats roll up into a box, space is saved and access is improved. The door is painted by a special electrochemical process, which gives it lasting durability. The roller garage door is reliable and runs quietly. Maintaining it is extremely easy.',

  'Ușa de tip rulou cu lamele de 77 mm este o variantă economică și fiabilă pentru închiderea garajului, cu o durată îndelungată de viață. Ușa garajului trebuie să facă față intemperiilor și altor factori externi și deschiderilor/închiderilor multiple. Vopseaua este aplicată în câmp electrostatic, motiv pentru care este și rezistentă. Ușa este confecționată din aluminiu de înaltă calitate, iar lamelele sunt umplute cu spumă poliuretanică, oferind izolare termică și fonică. Deschiderea se face în sistem electric cu ajutorul telecomenzii sau de la butonul centralei cu receptor. Totuși, acționarea ușii este permisă chiar și în cazul în care nu există curent, fiind prevăzută și cu acționare manuală.':
    'The roller door with 77 mm slats is an economical and reliable way to close a garage, with a long service life. A garage door has to cope with the weather, with other outside conditions and with being opened and closed many times over. The paint is applied electrostatically, which is why it is so hard-wearing. The door is made of high-quality aluminium and the slats are filled with polyurethane foam, providing thermal and sound insulation. It opens electrically using the remote control or the button on the receiver unit. The door can still be operated when there is no power, as manual operation is also provided.',

  'Ușă de garaj de tip rulou, realizată din lamele de 55 mm, umplute cu spumă poliuretanică. Cu sistem automat de deschidere/închidere. Lamelele se strâng, rulate pe verticală. Optime pentru a salva din spațiul disponibil. Izolează fonic și termic, creează un grad ridicat de siguranță, sunt o soluție optimă antiefracție.':
    'A roller garage door made of 55 mm slats filled with polyurethane foam, with an automatic opening and closing system. The slats roll up vertically, which is ideal for saving the space you have. They insulate against noise and heat, provide a high level of security and are an excellent anti-burglary solution.',

  'Ușa de garaj tip rulou este rezistentă în timp și nu se degradează din cauza utilizărilor repetate. Poate fi acționată foarte ușor în mod electric sau chiar manual, în funcție de nevoie. Este disponibilă într-o nuanță plăcută de maro, care poate completa frumos designul în spațiul în care este montată.':
    'The roller garage door lasts well and does not deteriorate through repeated use. It is very easy to operate electrically, or by hand when required. It comes in an attractive shade of brown that complements the design of the space it is fitted in.',

  'Ușă de garaj, de tip rulou, din aluminiu este ideală pentru garajul dumneavoastră, sistem de acces potrivit pentru spații rezidențiale, dar și comerciale sau industriale. Creată din lamele de 55 mm umplute cu spumă, acestea realizează închiderea perfectă. Țin hoții la distanță, izolează fonic și termic și vă asigură condiții optime pentru depozitarea diverselor bunuri.':
    'An aluminium roller garage door is ideal for your garage — an access system suited to residential spaces as well as commercial and industrial ones. Built from 55 mm foam-filled slats, it closes perfectly. It keeps burglars out, insulates against noise and heat, and gives you the right conditions for storing all kinds of goods.',

  'Ușă de garaj de tip rulou, ideală pentru închiderea garajului sau a altor spații rezidențiale sau comerciale, cu rol de depozitare mai ales. Au sistem de închidere automat, prevăzut cu telecomandă, dar poate fi acționat și manual în lipsa alimentării cu curent electric.':
    'A roller garage door, ideal for closing a garage or other residential or commercial spaces, particularly those used for storage. It has an automatic closing system with remote control, and can also be operated by hand when there is no mains power.',

  'Ușa de garaj tip rulou este fiabilă și silențioasă și poate fi acționată atât electric, cât și manual. Perfectă pentru închiderea unui spațiu construit pentru autovehicul sau pentru un spațiu de depozitare. Este rezistentă la intemperii datorită procesului electrochimic prin care a fost vopsită. Spațiul de acces este suficient de mare, nu necesită foarte mult loc pentru că închiderea și deschiderea ușii constă în strângerea lamelelor în casetă.':
    'The roller garage door is reliable and quiet, and can be operated both electrically and by hand. It is perfect for closing a space built for a vehicle or used for storage. It withstands the weather thanks to the electrochemical process used to paint it. The access opening is generously sized and needs little room, because opening and closing the door simply rolls the slats up into the box.',

  'Ușă de garaj cu sistem automat, de tip rulou, din lamele de 55 mm. Deschidere printr-o simplă apăsare de buton, dar la nevoie, poate fi acționată și manual.':
    'An automatic roller garage door made of 55 mm slats. It opens at the touch of a button, and can be operated by hand when needed.',

  'Ușă de garaj de tip rulou, din aluminiu. Lamelele sunt de 55 mm, umplute cu spumă poliuretanică, ceea ce înseamnă că acest panou de lamele va crea și izolare fonică și termică optimă. Ideală pentru spații înguste, datorită sistemului de închidere/deschidere pe verticală.':
    'An aluminium roller garage door. The slats are 55 mm and filled with polyurethane foam, which means this slat curtain also provides excellent sound and thermal insulation. Ideal for tight spaces, thanks to the vertical opening and closing system.',

  /* --- descrieri de categorie ------------------------------------------- */

  'Uși garaj rulou 55 mm: 15 produse în catalogul Usa-garaj.ro. Lamelă de 55 mm, 14 mm grosime, masă a tabliei de 4 kg/m², ax de Ø60 mm și ghidaje de 75 × 30 mm. Varianta potrivită pentru garaje de locuință.':
    'Roller garage doors 55 mm: 15 products in the Usa-garaj.ro catalogue. A 55 mm slat, 14 mm thick, a curtain weight of 4 kg/m², a Ø60 mm shaft and 75 × 30 mm guide rails. The right choice for domestic garages.',

  'Uși garaj rulou 77 mm: 6 produse în catalogul Usa-garaj.ro. Lamelă de 77 mm, 20 mm grosime, masă a tabliei de 6 kg/m², ax de Ø70 mm și ghidaje de 90 × 35 mm. Pentru deschideri mari și utilizare intensă.':
    'Roller garage doors 77 mm: 6 products in the Usa-garaj.ro catalogue. A 77 mm slat, 20 mm thick, a curtain weight of 6 kg/m², a Ø70 mm shaft and 90 × 35 mm guide rails. For large openings and heavy use.',

  'Uși de garaj tip rulou ABBA, cu lamele de 55 mm și 77 mm, acționare automată cu telecomandă. 21 de configurații, de la 3.250,00 lei, transport gratuit și montaj asigurat. ABBA CONFORT DELIVERY SRL, CUI 49968876, J2024000637154.':
    'ABBA roller garage doors with 55 mm and 77 mm slats, automatic remote-control operation. 21 configurations from 3.250,00 lei, free delivery and installation included. ABBA CONFORT DELIVERY SRL, Tax ID 49968876, Reg. No. J2024000637154.',

  /* --- întrebări frecvente, răspunsuri ---------------------------------- */

  'Oferim uși de garaj tip rulou din aluminiu, disponibile în mai multe dimensiuni, culori și configurații. Ușile pot fi acționate manual sau automat, în funcție de necesitățile fiecărui garaj.':
    'We supply aluminium roller garage doors in a range of sizes, colours and configurations. The doors can be operated manually or automatically, depending on what each garage needs.',

  'În majoritatea cazurilor, da. Ușile tip rulou pot fi montate atât la garaje rezidențiale, cât și la spații comerciale sau industriale. Înainte de comandă recomandăm verificarea și măsurarea spațiului de montaj.':
    'In most cases, yes. Roller doors can be fitted to domestic garages as well as to commercial and industrial spaces. Before ordering we recommend checking and measuring the installation space.',

  'Diferența principală este dimensiunea lamelei și nivelul de rezistență. Lamelele de 77 mm sunt o variantă mai robustă, recomandată în special pentru goluri mai mari și utilizare intensă.':
    'The main difference is the size of the slat and how much it can take. The 77 mm slats are the sturdier option, recommended in particular for larger openings and heavy use.',

  'Dimensiunea se stabilește în funcție de golul existent și de spațiul disponibil pentru montaj. Pentru o ofertă corectă, este recomandată măsurarea golului și verificarea condițiilor de montaj.':
    'The size is determined by the existing opening and the space available for installation. For an accurate quote we recommend measuring the opening and checking the installation conditions.',

  'Durata montajului depinde de dimensiunea ușii, tipul de acționare și condițiile existente la garaj. În cazul unei instalații pregătite corespunzător, montajul se poate realiza într-un timp scurt.':
    'How long installation takes depends on the size of the door, the type of operation and the conditions at the garage. Where the opening has been properly prepared, installation can be completed quickly.',

  'Da. Ușile de garaj pot fi configurate în funcție de dimensiunile golului și de condițiile de montaj. Pentru o ofertă exactă, este important să avem dimensiunile corecte.':
    'Yes. Garage doors can be configured to the dimensions of the opening and to the installation conditions. For an accurate quote it is important that we have the correct dimensions.',

  'Pentru funcționare corectă și o durată de viață cât mai mare, recomandăm verificarea periodică a componentelor mecanice, a sistemului de acționare și curățarea lamelelor și a elementelor accesibile.':
    'For correct operation and the longest possible service life, we recommend checking the mechanical parts and the drive system regularly, and cleaning the slats and the parts you can reach.',

  'Ne puteți contacta cu dimensiunile aproximative ale golului, localitatea și tipul de ușă dorit. Pe baza acestor informații vă putem orienta către soluția potrivită și vă putem pregăti o ofertă personalizată.':
    'Contact us with the approximate dimensions of the opening, your town and the type of door you want. With that information we can point you to the right solution and prepare a quote for you.',

  'Da. Unul dintre avantajele importante ale sistemului rulou este faptul că ușa se ridică vertical și se rulează într-o casetă, fără să ocupe spațiul din tavan necesar altor tipuri de uși.':
    'Yes. One of the main advantages of the roller system is that the door lifts vertically and rolls into a box, without taking up the ceiling space other types of door need.',

  'Ușile din aluminiu oferă un raport foarte bun între greutate, rezistență și funcționalitate. Sistemul rulou este practic, ocupă puțin spațiu și poate fi configurat cu acționare manuală sau electrică.':
    'Aluminium doors offer a very good balance of weight, strength and function. The roller system is practical, takes up little space and can be configured with manual or electric operation.',

  'Nu. În funcție de lucrare și de locație, putem realiza montajul și în alte localități din țară. Pentru confirmarea disponibilității, contactați-ne și transmiteți localitatea și dimensiunile aproximative ale ușii.':
    'No. Depending on the job and the location, we can install in other parts of the country as well. To confirm availability, contact us with your town and the approximate dimensions of the door.',

  'Catalogul complet: 21 de uși de garaj tip rulou cu lamele de 55 mm și 77 mm, de la 3.250,00 lei. Prețuri și disponibilitate întocmai ca în magazin.':
    'The full catalogue: 21 roller garage doors with 55 mm and 77 mm slats, from 3.250,00 lei. Prices and availability exactly as in the shop.',

  'Include sistem automat, acționat prin telecomandă, dar poate fi utilizată și manual, în cazul în care este nevoie. Închidere practică și compactă, practic ușa se rulează în caseta din aluminiu, explorând astfel spațiul pe verticală. Nu veți fi condiționați de spațiu, ca în cazul ușilor clasice, cu deschidere în laterală.':
    'It comes with an automatic system operated by remote control, and can also be used by hand when needed. The closing is practical and compact: the door rolls into the aluminium box, using the space vertically. You are not constrained by space, as you would be with conventional side-opening doors.',

  'Sistemele de acționare mixte din componența ușii de garaj tip rulou permit utilizarea acesteia chiar și în lipsa curentului, fiind prevăzută cu acționare manuală. Acționarea ușilor de garaj se realizează prin intermediul sistemului de utilizare electric, fiind necesară doar o apăsare pe butonul telecomenzii sau al centralei cu receptor.':
    'The combined drive systems built into the roller garage door mean it can be used even when there is no power, since manual operation is provided. The garage doors are normally operated electrically, needing no more than a press of the button on the remote control or on the receiver unit.',

  'Ușa de garaj tip rulou are atât rolul de a izola termic, cât și fonic, fiind realizată din aluminiu și având lamelele umplute cu spumă poliuretanică. Acestea pot fi utilizate în multiple contexte, întrebuințările pornind de la clasica ușă de garaj, până la cea de ușă pentru o hală industrială sau pentru un spațiu comercial.':
    'The roller garage door insulates against both heat and noise, being made of aluminium with slats filled with polyurethane foam. These doors can be used in many settings, from the conventional garage door to a door for an industrial hall or a commercial space.',

  'Lamelele de 55 mm acționează ca o barieră eficientă și contribuie la izolarea fonică și termică a spațiului închis cu o astfel de ușă. În plus, optimizați spațiul disponibil în interior, datorită sistemului compact, de tip rulou, cu închidere pe verticală.':
    'The 55 mm slats act as an effective barrier and help insulate the enclosed space against noise and heat. You also make the most of the space inside, thanks to the compact roller system that closes vertically.',

  'Între lamele se află spumă poliuretanică ce ajută la o mai bună izolare fonică și termică. Ușile de garaj tip rulou sunt mult mai utile decât cele secționale și le puteți achiziționa la un preț avantajos. Aluminiul din care este confecționată o astfel de ușă îi conferă rezistență în timp.':
    'Between the slats there is polyurethane foam, which improves sound and thermal insulation. Roller garage doors are far more useful than sectional ones, and you can buy them at a good price. The aluminium such a door is made from gives it lasting durability.',

  'Între lamelele ușilor se află spumă poliuretanică, motiv pentru care izolează foarte bine fonic și termic, ceea ce aduce un plus și mai mult decât atât, nu produce zgomot atunci când este acționată.':
    'There is polyurethane foam between the slats, which is why these doors insulate so well against noise and heat — and more than that, they make no noise when operated.',

  'O astfel de ușă este soluția perfectă pentru închiderea unui garaj sau a unui spațiu de depozitare, având toate caracteristicile necesare, alături de un aspect elegant și simplu.':
    'A door like this is the perfect way to close a garage or a storage space: it has everything you need, along with a simple, elegant appearance.',

  'Fișa tehnică a ușilor de garaj tip rulou: cum se citesc dimensiunile, calculul spațiului util de trecere, specificațiile complete pentru lamela de 55 mm și cea de 77 mm.':
    'The technical data sheet for roller garage doors: how to read the dimensions, how to work out the clear passage opening, and the full specifications for the 55 mm and 77 mm slats.',

  'Lamelă de 55 mm, 14 mm grosime, masă a tabliei de 4 kg/m², ax de Ø60 mm și ghidaje de 75 × 30 mm. Varianta potrivită pentru garaje de locuință.':
    'A 55 mm slat, 14 mm thick, a curtain weight of 4 kg/m², a Ø60 mm shaft and 75 × 30 mm guide rails. The right choice for domestic garages.',

  'Lamelă de 77 mm, 20 mm grosime, masă a tabliei de 6 kg/m², ax de Ø70 mm și ghidaje de 90 × 35 mm. Pentru deschideri mari și utilizare intensă.':
    'A 77 mm slat, 20 mm thick, a curtain weight of 6 kg/m², a Ø70 mm shaft and 90 × 35 mm guide rails. For large openings and heavy use.',

  /* --- pagini juridice --------------------------------------------------- */

  'Anularea tranzactiei procesate prin card online se poate face in maxim 24 ore , iar banca emitenta va debloca suma blocata in contul clientului in termen de 1-30 de zile, in functie de politica fiecarei banci.':
    'A transaction processed by card online can be cancelled within 24 hours at most, and the issuing bank will release the amount held on the customer’s account within 1–30 days, depending on each bank’s policy.',

  'Daca comanda dvs. a intrat in productie in acest interval de timp de 24 ore, se va retine o taxa de debitare materiale de 450 lei.':
    'If your order has entered production within that 24-hour period, a materials charge of 450 lei will be withheld.',

  'Conform cerintelor Regulamentului General pentru Protectia Datelor (GDPR &#8211; General Data Protection Regulation (EU) 2016/679 pentru prelucrarea datelor cu caracter personal si privind libera circulatie a acestor date, Usa Garaj (usa-garaj.ro) are obligatia de a administra in conditii de siguranta si numai pentru scopurile specificate, datele personale pe care ni le furnizati.':
    'Under the requirements of the General Data Protection Regulation (GDPR &#8211; Regulation (EU) 2016/679 on the processing of personal data and on the free movement of such data), Usa Garaj (usa-garaj.ro) is obliged to administer the personal data you provide to us securely and only for the purposes specified.',

  'Pentru a va transmite oferte, promotii, mesaje publicitare si de marketing privind activitatea Usi Garaj Online (usa-garaj.ro), in cazul in care v-ati exprimat acordul in acest sens.':
    'To send you offers, promotions and advertising or marketing messages about the activity of Usi Garaj Online (usa-garaj.ro), where you have given your consent to this.',

  'Putem furniza datele dvs. cu caracter personal altor companii cu care ne aflam in relatii de parteneriat, dar numai in temeiul unui angajament de confidentialitate din partea acestora si numai in scopurile mentionate in acest document. Informatiile solicitate in cazul platilor online intra sub incidenta conditiilor de utilizare a procesatorilor de plati, iar Usi Garaj Online (usa-garaj.ro) nu va solicita si nu va stoca niciun detaliu referitor la cardul dumneavoastra.':
    'We may provide your personal data to other companies we work with as partners, but only on the basis of a confidentiality undertaking from them and only for the purposes stated in this document. Information requested for online payments falls under the terms of use of the payment processors, and Usi Garaj Online (usa-garaj.ro) will not request or store any detail relating to your card.',

  'Vom dezvalui informatii daca acest lucru este justificat in scopul de a ne proteja impotriva fraudelor, a ne apara drepturile sau proprietatea. De asemenea, este posibil sa fie necesar sa dezvaluim informatiile dvs. pentru a ne conforma obligatiei legale de a raspunde la cererile legale ale autoritatilor. Datele dvs. cu caracter personal vor fi comunicate doar atunci cand consideram, cu buna credinta, ca avem obligatia de a face acest lucru in conformitate cu legea.':
    'We will disclose information where this is justified in order to protect ourselves against fraud or to defend our rights or property. It may also be necessary to disclose your information in order to comply with our legal obligation to respond to lawful requests from the authorities. Your personal data will be disclosed only when we consider, in good faith, that we are obliged to do so under the law.',

  'Vom stoca informatiile dvs. atat timp cat ni se cere prin lege. Daca nu exista nicio cerinta legala, le vom stoca doar atat timp cat este necesar pentru a va putea oferi serviciile noastre. Pe baza unei solicitari trimise catre Usi Garaj Online (usa-garaj.ro) prin email la adresa Office@abbaconfort.ro sau utilizand optiunile disponibile in contul de utilizator de pe site, ne puteti solicita anularea contului de utilizator si stergerea sau anonimizarea datelor.':
    'We will store your information for as long as the law requires us to. Where there is no legal requirement, we will store it only for as long as is necessary to provide you with our services. By sending a request to Usi Garaj Online (usa-garaj.ro) by e-mail at Office@abbaconfort.ro, or using the options available in your user account on the site, you can ask us to close your user account and to delete or anonymise your data.',

  'Site-ul Usa Garaj (usa-garaj.ro) este operat de societatea ABBA CONFORT DELIVERY SRL, cu sediul in Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște, inscrisa in Registrul Comertului cu numarul J2024000637154.':
    'The Usa Garaj site (usa-garaj.ro) is operated by ABBA CONFORT DELIVERY SRL, with its registered office at Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște, entered in the Trade Register under number J2024000637154.',

  'Orice date cu caracter personal pe care le detinem in scop de marketing le vom pastra pana in momentul in care ne anuntati ca nu mai doriti sa primiti aceste informari.':
    'Any personal data we hold for marketing purposes will be kept until you tell us that you no longer wish to receive such communications.',

  'In cazul in care considerati ca orice date cu caracter personal ale dvs. pe care noi le detinem sunt incorecte sau incomplete, aveti posibilitatea sa solicitati consultarea, rectificarea sau stergerea acestor informatii. Ne puteti contacta in acest sens prin email la adresa Office@abbaconfort.ro.':
    'If you believe that any personal data of yours that we hold is inaccurate or incomplete, you may ask to see, correct or delete that information. You can contact us about this by e-mail at Office@abbaconfort.ro.',

  'In cazul in care doriti sa reclamati modul in care am gestionat datele dvs., va rugam sa ne contactati pe email la adresa Office@abbaconfort.ro. Vom analiza reclamatia dvs. si vom colabora cu dvs. pentru rezolvarea problemei.':
    'If you wish to complain about the way we have handled your data, please contact us by e-mail at Office@abbaconfort.ro. We will examine your complaint and work with you to resolve the matter.',

  'In momentul in care ati gasit un produs pe care doriti sa il achizitionati, apasati pe butonul Adauga in cos. Veti fi apoi directionat automat catre pagina de vizualizare a Cosului de cumparaturi, unde aveti optiunea sa vizualizati lista de produse existente in cos, sa modificati cantitatile pe care doriti sa le achizitionati sau sa renuntati la unul, mai multe sau toate produsele introduse in cos. Pentru a va intoarce din nou la site si a adauga alte produse in cos, actionati butonul Continua cumparaturile.':
    'Once you have found a product you wish to buy, press the Add to cart button. You will then be taken automatically to the Shopping cart page, where you can see the list of products in the cart, change the quantities you wish to buy, or remove one, several or all of the products you have added. To return to the site and add other products to the cart, use the Continue shopping button.',

  'Pentru a finaliza comanda, apasati pe butonul Trimite comanda. In cazul in care sunteti client nou, va trebui sa va creati mai intai un cont de utilizator, completand formularul de inregistrare prezent in pagina. Acest proces nu va va rapi mai mult de 1-2 minute, dupa care veti putea finaliza comanda. In cazul in care informatiile pentru plata sunt diferite de informatiile pentru expediere, selectati optiunea Completeaza o noua adresa pentru plata si introduceti informatiile dorite.':
    'To complete the order, press the Send order button. If you are a new customer, you will first need to create a user account by filling in the registration form on the page. This takes no more than a minute or two, after which you can complete the order. If your billing details differ from your delivery details, choose the Enter a new billing address option and fill in the details you want.',

  'Pentru a plasa comanda, selectati metoda de plata pe care o preferati si folositi campul Comentarii comanda, care va permite sa trimiteti eventuale informatii suplimentare. Dupa ce v-ati asigurat ca sunteti de acord cu Termenii si Conditiile practicate, apasati butonul Trimite comanda pentru a trece la pasul urmator.':
    'To place the order, choose the payment method you prefer and use the Order comments field, which lets you send any additional information. Once you have satisfied yourself that you agree to the Terms and Conditions that apply, press the Send order button to move to the next step.',

  'In functie de caracteristicile comenzii Dvs. si de optiunile disponibile, este posibil sa vi se solicite apoi alegerea unei anumite metode de livrare, careia ii pot fi asociate anumite costuri de transport. Veti putea vizualiza valoarea costurilor de livrare inainte de finalizarea comenzii.':
    'Depending on the details of your order and the options available, you may then be asked to choose a particular delivery method, which may carry certain shipping costs. You will be able to see the delivery costs before the order is completed.',

  /* --- prima pagină, texte de secțiune ---------------------------------- */

  'Desenele nu sunt ilustrații decorative: lățimea, înălțimea, pasul lamelei, caseta și ghidajele sunt redate la scară, din specificația fiecărui produs. Treceți cu cursorul peste o cartelă ca să vedeți fotografia reală.':
    'The drawings are not decorative illustrations: the width, the height, the slat pitch, the box and the guide rails are all drawn to scale from each product’s specification. Hover over a card to see the actual photograph.',

  'Dacă aveți nevoie de o ușă de garaj nouă, fie că este prima alegere, fie că o înlocuiți pe cea veche, noi suntem soluția. Producem și montăm uși de garaj cu design personalizat și în dimensiuni diverse.':
    'If you need a new garage door — whether it is your first or a replacement for an old one — we are the answer. We manufacture and install garage doors in custom designs and a range of sizes.',

  'Ușile de garaj sunt mai mult decât un portal de acces spre garaj. Sunt\n        asigurarea dumneavoastră că bunurile vă sunt protejate. Iar noi le\n        proiectăm și montăm pe cele potrivite, atât pentru spații rezidențiale,\n        cât și comerciale.':
    'A garage door is more than a way into the garage. It is your assurance that\n        what you own is protected. And we design and install the right ones, for\n        residential spaces as well as commercial ones.',

  'Realizate din aluminiu, astfel de uși de garaj sunt soluția pentru un\n        plus de siguranță și intimitate. Sunt durabile și au marele avantaj de a\n        putea fi montate chiar și în spații înguste. Datorită sistemului de\n        închidere, respectiv deschidere, nu vor ocupa spațiu inutil ca în cazul\n        ușilor clasice.':
    'Made of aluminium, garage doors like these are the answer for added security\n        and privacy. They are durable and have the great advantage of fitting even\n        in tight spaces. Thanks to the way they open and close, they take up none of\n        the wasted room that conventional doors do.',

  'Cu noi veți câștiga un partener pe termen lung. Proiectăm și montăm uși\n      de garaj de tip rulou, acționate prin telecomandă sau cu deschidere\n      clasică, manuală. Serviciile noastre sunt extinse și includ mentenanța,\n      service-ul, precum și proiecte personalizate de uși de garaj.':
    'With us you gain a partner for the long term. We design and install roller\n      garage doors, operated by remote control or opened the conventional way, by\n      hand. Our services go further and include maintenance, servicing and custom\n      garage door projects.',

  'Ușile de garaj de tip rulou sunt versatile și se potrivesc în orice\n        spațiu. Sunt o soluție practică pentru siguranța garajului, atât pentru\n        spații comerciale, cât și rezidențiale. Este una dintre alegerile\n        populare, cu mecanism simplu și practic. Funcționează silențios, vă\n        scutesc de efort la închidere și deschidere și vin într-o varietate de\n        culori și dimensiuni.':
    'Roller garage doors are versatile and fit any space. They are a practical way\n        to keep a garage secure, in commercial as well as residential settings. They\n        are one of the popular choices, with a simple, practical mechanism. They run\n        quietly, spare you the effort of opening and closing, and come in a variety\n        of colours and sizes.',

  'Un avantaj major al ușilor de garaj de tip rulou este salvarea\n        spațiului. Chiar și când nu dispuneți de un garaj generos ca suprafață, o\n        ușă de acces de tip rulou vă avantajează. Cu închidere și deschidere pe\n        verticală, interiorul îl veți exploata la maximum.':
    'A major advantage of roller garage doors is the space they save. Even when\n        your garage is not generous in floor area, a roller door works in your\n        favour. Opening and closing vertically, it lets you make the most of the\n        inside.',

  'Sunt o alegere potrivită fie că locuiți la apartament și dețineți un\n        garaj în zona special amenajată pentru astfel de spații de depozitare,\n        fie că locuiți la casă și ați proiectat și garajul ca parte din curtea\n        dumneavoastră.':
    'They are a good choice whether you live in a flat and have a garage in an area\n        set aside for such storage, or live in a house and designed the garage as\n        part of your own yard.',

  'Astfel de uși de tip rulou vor deservi și celor care au hale sau alte\n        tipuri de spații comerciale, depozite. Proiectăm personalizat, în funcție\n        de dimensiunile dorite, în culoarea dorită!':
    'Roller doors like these also serve those with industrial halls or other kinds\n        of commercial premises and warehouses. We design to order, to the dimensions\n        you want, in the colour you want.',

  'Știm, nu suntem toți la fel, iar despre gusturi nu discutăm. Ne place\n        să creăm, să ne distingem prin ofertele personalizate. Solicitați acum\n        serviciile noastre, ușile dorite, după caracteristicile dorite. Pentru\n        noi va fi o provocare pe care o acceptăm numaidecât!':
    'We know we are not all alike, and there is no arguing about taste. We enjoy\n        creating, and we set ourselves apart through bespoke offers. Ask for our\n        services now — the doors you want, to the specification you want. For us it\n        is a challenge we will take on without hesitation.',

  'Cifrele pornesc din lista de prețuri a\n        producătorului și sunt în euro. Prețul final depinde de culoare, de\n        condițiile de montaj și de cursul valutar din ziua comenzii. Pentru o\n        ofertă fermă,':
    'The figures start from the manufacturer’s price list and are in euros. The\n        final price depends on the colour, on the installation conditions and on the\n        exchange rate on the day of the order. For a firm quote,',

  'Catalogul întreg, cu prețurile și reducerile din magazin. Filtrele de mai jos lucrează pe aceeași listă: 15 de uși cu lamelă de 55 mm și 6 cu lamelă de 77 mm.':
    'The whole catalogue, with the shop’s prices and discounts. The filters below work on the same list: 15 doors with 55 mm slats and 6 with 77 mm slats.',

  'Plata online cu cardul nu este deocamdată activă în magazin. Până la\n      activarea ei, comenzile se achită ramburs la livrare sau prin transfer\n      bancar. Pentru orice nelămurire ne puteți suna la':
    'Online card payment is not yet active in the shop. Until it is, orders are\n      paid cash on delivery or by bank transfer. If anything is unclear you can call\n      us on',

  'Aveți dreptul de a vă retrage din contract în termen de 14 zile de la\n      livrare, conform OUG 34/2014. Sumele se restituie în maximum 14 zile de la data la care am fost informați de decizia de retragere.\n      Condițiile complete sunt în':
    'You have the right to withdraw from the contract within 14 days of delivery,\n      under Romanian Emergency Ordinance 34/2014. Amounts are refunded within 14 days at most of the date we were informed of the decision to withdraw.\n      The full conditions are in the',

  'Acest website poate folosi cookie-uri atat proprii, cat si provenind de la terti, pentru a furniza vizitatorilor o experienta mult mai buna de navigare si servicii adaptate nevoilor si interesului fiecaruia.':
    'This website may use both its own cookies and third-party cookies, in order to give visitors a much better browsing experience and services suited to the needs and interests of each.',

  'Personalizarea anumitor setari precum: limba in care este vizualizat un site, moneda in care se exprima anumite preturi sau tarife, pastrarea optiunilor pentru diverse produse (masuri, alte detalii etc) in cosul de cumparaturi (si memorarea acestor optiuni), salvarea anumitor preferinte in vederea reutilizarii viitoare.':
    'Personalising certain settings, such as: the language a site is viewed in, the currency certain prices or rates are expressed in, keeping the options for various products (measurements, other details and so on) in the shopping cart (and remembering those options), and saving certain preferences for future use.',

  'Cookie-urile ofera detinatorilor de site-uri un feedback valoros asupra modului cum sunt utilizate site-urile lor de catre utilizatori, astfel incat sa le poata face si mai eficiente si mai usor accesibile.':
    'Cookies give site owners valuable feedback on how their sites are used, so that they can make them still more effective and easier to reach.',

  'Permit aplicatiilor multimedia sau de alt tip de pe alte site-uri sa fie incluse intr-un anumit site pentru a crea o experienta de navigare mai valoroasa, mai utila si mai placuta.':
    'They allow multimedia or other applications from other sites to be embedded in a given site, to create a browsing experience that is more valuable, more useful and more pleasant.',

  'Un Cookie este un fisier de mici dimensiuni, format din litere si numere, care va fi stocat pe computerul, terminalul mobil sau alte echipamente ale unui utilizator de pe care se acceseaza Internetul.':
    'A cookie is a small file made up of letters and numbers, which is stored on the computer, mobile device or other equipment a user accesses the internet from.',

  'Cookie-ul este instalat prin solicitara emisa de catre un web-server unui browser (ex: Chrome, Firefox) si este complet “pasiv” (nu contine programe software, virusi sau spyware si nu poate accesa informatiile de pe hard drive-ul utilizatorului).':
    'The cookie is installed at the request of a web server to a browser (for example Chrome or Firefox) and is entirely “passive” (it contains no software, viruses or spyware and cannot access the information on the user’s hard drive).',

  'Un cookie este format din 2 parti: numele si continutul sau valoarea cookie-ului. Mai mult, durata de existenta a unui cookie este determinata; tehnic, doar webserverul care a trimis cookie-ul il poate accesa din nou in momentul in care un utilizator se intoarce pe website-ul asociat webserverului respectiv.':
    'A cookie has 2 parts: the name, and the content or value of the cookie. Its lifetime is also fixed; technically, only the web server that sent the cookie can read it again when a user returns to the website associated with that server.',

  'Cookie-urile in sine nu solicita informatii cu caracter personal pentru a putea fi utilizate si, in cele mai multe cazuri, nu identifica personal utilizatorii de internet.':
    'Cookies themselves do not require personal information in order to work and, in most cases, do not personally identify internet users.',

  'Cookie-uri de sesiune &#8211; acestea sunt stocate temporar in dosarul de cookie-uri al browserului web pentru ca acesta sa le memoreze pana cand utilizatorul inchide fereastra browserului sau se delogheaza de pe site-ul respectiv.':
    'Session cookies &#8211; these are stored temporarily in the web browser’s cookie folder, so that the browser keeps them until the user closes the browser window or signs out of the site.',

  'Cookie-uri Persistente &#8211; Acestea sunt stocate pe hard-drive-ul unui computer sau echipament (si in general depinde de durata de viata prestabilita pentru cookie). Cookie-urile persistente le includ si pe cele plasate de un alt website decat cel pe care il viziteaza utilizatorul la momentul respectiv &#8211; cunoscute sub numele de &#8216;third party cookies’ (cookieuri plasate de terti) &#8211; care pot fi folosite in mod anonim pentru a memora preferintele unui utilizator.':
    'Persistent cookies &#8211; these are stored on the hard drive of a computer or device (and generally depend on the lifetime set for the cookie). Persistent cookies also include those placed by a website other than the one the user is visiting at the time &#8211; known as &#8216;third party cookies’ &#8211; which can be used anonymously to remember a user’s preferences.',

  'Un cookie contine informatii care fac legatura intre un web-browser (utilizatorul) si un web-server anume (website-ul). Daca un browser acceseaza acel web-server din nou, acesta poate citi informatia deja stocata si reactiona in consecinta. Cookie-urile asigura userilor o experienta placuta de navigare si sustin eforturile multor websiteuri pentru a oferi servicii confortabile utilizatorillor: ex &#8211; preferintele in materie de confidentialitate online, optiunile privind limba site-ului, cosuri de cumparaturi sau publicitate relevanta.':
    'A cookie contains information linking a web browser (the user) to a particular web server (the website). If a browser reaches that web server again, the server can read the information already stored and respond accordingly. Cookies give users a pleasant browsing experience and support the efforts of many websites to offer convenient services: for example &#8211; online privacy preferences, site language options, shopping carts or relevant advertising.',

  'Cookie-urile sunt administrate de webservere. Durata de viata a unui cookie poate varia semnificativ, depinzand de scopul pentru care este plasat. Unele cookie-uri sunt folosite exclusive pentru o singura sesiune (cookie-uri de sesiune) si nu mai sunt retinute odata de utilizatorul a parasit website-ul si unele cookie-uri sunt retinute si refolosite de fiecare data cand utilizatorul revine pe acel website (cookie-uri permanente). Cu toate aceste, cookie-urile pot fi sterse de un utilizator in orice moment prin intermediul setarilor browserului.':
    'Cookies are managed by web servers. A cookie’s lifetime can vary a great deal, depending on the purpose it was placed for. Some cookies are used only for a single session (session cookies) and are no longer kept once the user has left the website, while others are kept and reused each time the user returns to that website (permanent cookies). Even so, cookies can be deleted by a user at any time through the browser settings.',

  'Anumite sectiuni de continut de pe unele site-uri pot fi furnizate prin intermediul unor terte parti/ furnizori (ex: un video, o reclama, o aplicatie de chat, etc). Aceste terte parti pot plasa de asemenea cookieuri prin intermediul site-ului si ele se numesc “third party cookies” pentru ca nu sunt plasate de proprietarul website-ului respectiv. Furnizorii terti trebuie sa respecte de asemenea legea in vigoare si politicile de confidentialitate ale detinatorului site-ului.':
    'Certain sections of content on some sites may be supplied by third parties or providers (for example a video, an advertisement or a chat application). These third parties may also place cookies through the site, and they are called “third party cookies” because they are not placed by the owner of that website. Third-party providers must also comply with the law in force and with the site owner’s privacy policies.',

  'Cookie-urile asigura utilizatorilor o experienta placuta de navigare si sustin eforturile noastre pentru a oferi servicii confortabile utilizatorilor prin functionalitati precum preferintele in materie de confidentialitate online, cosul de cumparaturi sau publicitate relevanta. De asemenea, sunt utilizate in pregatirea unor statistici anonime agregate care ne ajuta sa intelegem cum un utilizator beneficiaza de paginile noastre web, permitandu-ne imbunatatirea structurii si continutului lor, excluzand indentificarea personala a utilizatorului.':
    'Cookies give users a pleasant browsing experience and support our efforts to offer convenient services through features such as online privacy preferences, the shopping cart or relevant advertising. They are also used to prepare anonymous aggregate statistics that help us understand how a user makes use of our web pages, allowing us to improve their structure and content, without identifying the user personally.',

  'Cookie-urile de inregistrare sunt generate atunci cand un utilizator se inregistreaza pe acest site, cu scopul de a ne informa ulterior daca acesta este inregistrat sau nu. Serverele noastre folosesc aceste cookie-uri pentru a ne arata contul cu care esti inregistrat si pentru a-ti oferi o experienta mai facila de interactiune cu site-ul.':
    'Registration cookies are created when a user registers on this site, so as to tell us later whether they are registered or not. Our servers use these cookies to show us which account you are registered with and to make your interaction with the site easier.',

  'Alte cookie-uri pe care le plasam pentru a-ti permite utilizarea optima a site-ului sunt cookie-urile corespunzatoare cosului de cumparaturi si listelor de Favorite (cu rolul de a salva informatiile aferente produselor pe care le-ai adaugat in cos sau ca Favorite), cookie-urile de localizare (utilizate pentru a stabili locatia ta in functie de IP, cu scopul de a precompleta anumite campuri necesare la inregistrare sau plasarea de comenzi), cookie-urile de sesiune generate la accesare si sterse automat la inchiderea browser-ului (necesare pentru functionarea protocolului HTTP, completarea anumitor formulare, interactiunea cu anumite elemente din site etc.), cookie-urile care recunosc tipul de terminal folosit &#8211; desktop sau mobile, cookie-uri ale aplicatiilor de chat care permit discutii in timp real cu serviciul de relatii cu clientii.':
    'Other cookies we place so that you can use the site to best effect are: cookies for the shopping cart and Favourites lists (which save the details of products you have added to the cart or marked as Favourites); location cookies (used to establish your location from your IP address, in order to pre-fill certain fields needed for registration or for placing orders); session cookies created when you arrive and deleted automatically when the browser closes (needed for the HTTP protocol to work, for filling in certain forms, for interacting with certain elements of the site and so on); cookies that recognise the type of device used &#8211; desktop or mobile; and cookies belonging to chat applications that allow real-time conversations with customer service.',

  'Cookie-urile de analiza a traficului permit masurarea in mod agregat a traficul site-ului, identificarea surselelor de trafic, ofera informatii despre cele mai vizitate sau cele mai putin accesate pagini, precum si despre modul in care utilizatorii interactioneaza cu site-ul. Informatiile enumerate sunt colectate in mod agregat si implicit complet anonim. Aceste cookie-uri pot proveni din partea unor terti precum servicii de Web Analytics (Ex: Google Analytics).':
    'Traffic analysis cookies allow site traffic to be measured in aggregate and traffic sources to be identified; they provide information about the most and least visited pages, and about how users interact with the site. The information listed is collected in aggregate and therefore entirely anonymously. These cookies may come from third parties such as web analytics services (for example Google Analytics).',

  'Acest tip de cookie-uri poate fi folosit de catre aceste servicii pentru a determina un anumit profil al vizitatorilor si pentru a-ti afisa mesaje publicitare relevante pe alte site-uri pe care le vizitezi.':
    'This type of cookie can be used by such services to build a profile of visitors and to show you relevant advertising on other sites you visit.',

  'Datorita modului de utilizare, acest site nu poate accesa aceste cookie-uri provenite de la terti, la fel cum tertele parti nu pot accesa cookie-urile detinute de acest site. De exemplu, cand distribuiti un articol folosind butonul pentru retelele sociale aflat pe acest site, acea retea sociala va inregistra activitatea dvs.':
    'Because of the way they work, this site cannot access these third-party cookies, just as third parties cannot access the cookies held by this site. For example, when you share an article using the social network button on this site, that social network will record your activity.',

  'Cookie-urile pastreaza informatii intr-un fisier text de mici dimensiuni care permit unui website sa recunoasca un browser. Webserverul va recunoaste browserul pana cand cookie-ul expira sau este sters. Cookie-ul stocheaza informatii importante care imbunatatesc experienta de navigare pe Internet ( ex: pastrarea unui user logat in contul sau de utilizator; pastrarea produselor in cosul de cumparaturi; pastrarea produselor in lista de Favorite).':
    'Cookies keep information in a small text file that lets a website recognise a browser. The web server will recognise the browser until the cookie expires or is deleted. The cookie stores important information that improves the experience of browsing the internet (for example: keeping a user signed in to their account; keeping products in the shopping cart; keeping products in the Favourites list).',

  'Cookie-urile reprezinta punctul central al functionarii eficiente a Internetului, ajutand la generarea unei experiente de navigare prietenoase si adaptata preferintelor si intereselor fiecarui utilizator. Refuzarea sau dezactivarea cookieurilor poate ingreuna utilizarea unui site.':
    'Cookies are central to the internet working efficiently, helping to produce a browsing experience that is friendly and suited to each user’s preferences and interests. Refusing or disabling cookies can make a site harder to use.',

  'Refuzarea sau dezactivarea cookie-urilor nu inseamna ca nu veti mai primi publicitate online &#8211; ci doar ca aceasta nu va mai putea tine cont de preferintele si interesele dvs, evidentiate prin comportamentul de navigare.':
    'Refusing or disabling cookies does not mean you will no longer receive online advertising &#8211; only that it will no longer be able to take account of your preferences and interests as shown by your browsing behaviour.',

  'Masurarea, optimizare si caracteristicile de analytics &#8211; cum ar fi confirmarea unui anumit nivel de trafic pe un website, ce tip de continut este vizualizat si modul cum un utilizator ajunge pe un website (ex prin motoare de cautare, direct, din alte website-uri etc). Website-urile deruleaza aceste analize a utilizarii lor pentru a imbunatati site-urile in beneficiul userilor.':
    'Measurement, optimisation and analytics features &#8211; such as confirming a given level of traffic on a website, what kind of content is viewed, and how a user arrives at a website (for example through search engines, directly, or from other websites). Websites carry out these analyses of how they are used in order to improve the sites for the benefit of users.',

  'Cookie-urile folosesc formate tip plain text. Nu sunt alcatuite din bucati de cod asa ca nu pot fi executate nici nu pot auto-rula. In consecinta, nu se pot duplica sau replica pe alte retele pentru a se rula sau replica din nou. Cookie-urile pot fi totusi folosite pentru scopuri negative. Deoarece stocheaza informatii despre preferintele si istoricul de navigare al utilizatorilor, atat pe un anume site cat si pe mai multe alte siteuri, cookieurile pot fi folosite ca o forma de Spyware. Multe produse anti-spyware sunt constiente de acest fapt si in mod constant marcheaza cookie-urile pentru a fi sterse in cadrul procedurilor de stergere/scanare anti-virus/anti-spyware.':
    'Cookies use plain text formats. They are not made up of pieces of code, so they cannot be executed and cannot run by themselves. Consequently they cannot duplicate or replicate themselves onto other networks in order to run or replicate again. Cookies can nevertheless be put to bad use. Because they store information about users’ preferences and browsing history, both on one particular site and across several others, cookies can be used as a form of spyware. Many anti-spyware products are aware of this and routinely mark cookies for deletion during anti-virus and anti-spyware scanning and removal procedures.',

  'In general browserele au integrate setari de confidentialitate care furnizeaza diferite nivele de acceptare a cookie-urilor, perioada de valabilitate si stergere automata dupa ce utilizatorul a vizitat un anumit site. Alte aspecte de securitate legate de cookie-uri':
    'Browsers generally have built-in privacy settings that provide different levels of cookie acceptance, different validity periods, and automatic deletion after the user has visited a given site. Other security matters relating to cookies',

  'Deoarece protectia identitatii este foarte valoroasa si reprezinta dreptul fiecarui utilizator de internet, este indicat sa se stie ce eventuale probleme pot crea cookie-urile. Pentru ca prin intermediul lor se transmit in mod constant in ambele sensuri informatii intre browser si website, daca un atacator sau persoana neautorizata intervine in parcursul de transmitere a datelor, informatiile continute de cookie pot fi interceptate. Desi foarte rar, acest lucru se poate intampla daca browserul se conecteaza la server folosind o retea necriptata (ex: o retea WiFi nesecurizata).':
    'Since protecting one’s identity is highly valuable and is the right of every internet user, it is worth knowing what problems cookies may create. Because information travels constantly in both directions between the browser and the website through them, the information a cookie contains can be intercepted if an attacker or unauthorised person interferes with the transmission. Although very rare, this can happen if the browser connects to the server over an unencrypted network (for example an unsecured Wi-Fi network).',

  'Alte atacuri bazate pe cookie implica setari gresite ale cookieurilor pe servere. Daca un website nu solicita browserului sa foloseasca doar canale criptate, atacatorii pot folosi aceasta vulnerabilitate pentru a pacali browserele in a trimite informatii prin intermediul canalelor nesecurizate. Atacatorii utilizeaza apoi informatiile in scopuri de a accesa neautorizat anumite site-uri. Este foarte important sa fiti atenti in alegerea metodei celei mai potrivite de protectie a informatiilor personale.':
    'Other cookie-based attacks involve cookies being configured wrongly on servers. If a website does not require the browser to use encrypted channels only, attackers can exploit this weakness to trick browsers into sending information over unsecured channels. The attackers then use that information to gain unauthorised access to certain sites. It is very important to take care in choosing the most suitable method of protecting your personal information.',

  'Datorita flexibilitatii lor si a faptului ca majoritatea dintre cele mai vizitate site-uri si cele mai mari folosesc cookieuri, acestea sunt aproape inevitabile. Dezactivarea cookie-urilor nu va permite accesul utilizatorului pe site-urile cele mai raspandite si utilizate printre care Youtube, Gmail, Facebook, Yahoo si altele. Iata cateva sfaturi care va pot asigura ca nevigati fara griji insa cu ajutorul cookieurilor:':
    'Because of how flexible they are, and because most of the largest and most visited sites use them, cookies are all but unavoidable. Disabling cookies will not let the user reach the most widespread and most used sites, among them YouTube, Gmail, Facebook and Yahoo. Here is some advice that can help you browse without worry, but still with the benefit of cookies:',

  'Daca nu va deranjeaza cookie-urile si sunteti singura persoana care utilizeaza computerul, puteti seta termene lungi de expirare pentru stocarea istoricului de navigare si al datelor personale de acces.':
    'If cookies do not bother you and you are the only person using the computer, you can set long expiry periods for storing your browsing history and personal sign-in details.',

  'Daca impartiti accesul la calculator, puteti lua in considerare setarea browserului pentru a sterge datele individuale de navigare de fiecare data cand inchideti browserul. Aceasta este o varianta de a accesa site-urile care plaseaza cookieuri si de a sterge orice informatie de vizitare la inchiderea sesiunii navigare.':
    'If you share the computer with others, you might consider setting the browser to delete individual browsing data each time you close it. This is one way of reaching sites that place cookies while deleting all record of the visit when the browsing session ends.',

  'Multe dintre aplicatiile de detectare si prevenire a spyware-ului includ detectarea atacurilor pe site-uri. Astfel, impiedica browserul de la a accesa website-uri care ar putea sa exploateze vulnerabilitatile browserului sau sa descarce software periculos. Asigurati-va ca aveti browserul mereu updatat. Multe dintre atacurile bazate pe cookies se realizeaza exploatand punctele slabe ale versiunilor vechi ale browserelor.':
    'Many spyware detection and prevention applications also detect attacks on sites. They stop the browser reaching websites that might exploit browser vulnerabilities or download dangerous software. Make sure your browser is always up to date. Many cookie-based attacks work by exploiting the weaknesses of older browser versions.',

  'Cookie-urile sunt pretutindeni si nu pot fi evitate daca doriti sa va bucurati de accesul la cele mai populare site-uri de pe Internet. Cu o intelegere clara a modului lor de operare si a beneficiilor pe care le aduc, puteti lua masurile necesare de securitate astel incat sa puteti naviga cu incredere pe internet.':
    'Cookies are everywhere and cannot be avoided if you want to enjoy access to the most popular sites on the internet. With a clear understanding of how they work and of the benefits they bring, you can take the security measures you need in order to browse the internet with confidence.',

  'Este posibila configurarea browserului pentru ca aceste cookie-uri sa nu mai fie acceptate sau poti configura browserul sa accepte cookie-uri doar de la un site anume.':
    'You can configure your browser so that these cookies are no longer accepted, or so that it accepts cookies only from a particular site.',

  'Toate browserele moderne ofera posibilitatea de a configura preferinte de stocare a cookie-urilor. Aceste setari se gasesc de regula in “optiuni” sau in meniul de “preferinte” al browserului tau. Pentru a intelege aceste setari, puteti folosi optiunea “ajutor” a browserului pentru mai multe detalii.':
    'All modern browsers let you configure your cookie storage preferences. These settings are usually found under “options” or in your browser’s “preferences” menu. To understand these settings, you can use the browser’s “help” option for more detail.',

  'Ușă garaj tip rulou cu lamele de 55 mm reprezintă o variantă economică și fiabilă pentru închiderea garajelor, spațiilor comerciale, magazine, chioșcuri, foișoare, pontoane barcă. Prin sistemul de rulare a covorului de lamele în caseta superioară, se poate monta cu ușurință oriunde.':
    'A roller garage door with 55 mm slats is an economical and reliable way to close garages, commercial premises, shops, kiosks, gazebos and boat pontoons. Because the slat curtain rolls up into the box above, it can be fitted easily almost anywhere.',

  'Ușă de garaj tip rulou cu lamele de 77 mm reprezintă o variantă economică și fiabilă pentru închiderea garajelor, spațiilor comerciale, magazine, chioșcuri, foișoare, pontoane barcă. Prin sistemul de rulare a covorului de lamele în caseta superioară, se poate monta cu ușurință oriunde.':
    'A roller garage door with 77 mm slats is an economical and reliable way to close garages, commercial premises, shops, kiosks, gazebos and boat pontoons. Because the slat curtain rolls up into the box above, it can be fitted easily almost anywhere.',

  'Componentele folosite la producția ușii sunt de cea mai bună calitate, fiind realizate din aluminiu (ghidaje laterale, casetă superioară și lamele injectate cu spumă poliuretanică). Vopseaua este aplicată prin vopsire în câmp electrostatic și are o bună rezistență în timp, durata de utilizare a produsului fiind mai mare de 10 ani.':
    'The components used to make the door are of the highest quality and are made of aluminium (side guide rails, top box and slats injected with polyurethane foam). The paint is applied electrostatically and holds up well over time, the product’s working life being more than 10 years.',

  'Gama variată de culori se încadrează perfect în arhitectura oricărei construcții, culorile standard fiind următoarele: alb, maro deschis, maro închis, argintiu, gri antracit, nuc, stejar auriu, wenghe, mahon. De asemenea, se poate vopsi în orice culoare din paletarul RAL, la un cost suplimentar.':
    'The wide range of colours fits perfectly into the architecture of any building. The standard colours are: white, light brown, dark brown, silver, anthracite grey, walnut, golden oak, wenge and mahogany. The door can also be painted in any colour from the RAL range, at extra cost.',

  'O alegere excelentă fie că vorbim de un garaj zilnic utilizat, aflat în perimetrul casei sau aproape orice tip de spațiu de depozitare. Securizează perimetrul, este antiefracție, dar are și un preț accesibil.':
    'An excellent choice whether for a garage in daily use within the grounds of the house, or for almost any kind of storage space. It secures the perimeter, resists break-ins, and is affordable too.',

  'Lamelele sunt umplute cu spumă poliuretanică, ceea ce le face mai rezistente și eficiente în ceea ce privește izolarea fonică și termică în interiorul spațiului. Durabile chiar și expuse diferențelor de temperaturi.':
    'The slats are filled with polyurethane foam, which makes them stronger and more effective at insulating the space against noise and heat. They last well even when exposed to swings in temperature.',

  'Materialele de calitate contribuie la o rezistență îndelungată. Ușa de garaj de tip rulou ABBA este din aluminiu, elementele sale componente sunt vopsite prin procedee speciale.':
    'Quality materials make for lasting durability. The ABBA roller garage door is made of aluminium, and its component parts are painted by special processes.',

  'Ușa de garaj de tip rulou, cu acționare automată, vă optimizează timpii de deschidere, vine cu extra confort pentru utilizator. Menține bunurile în siguranță, are sistem de acces facil, închidere și deschidere rapidă, silențioasă. Ușa de garaj este durabilă și potrivită pentru orice tip de spațiu, inclusiv pentru cei care au nevoie de ușă de acces la garajul integrat în proiectul casei.':
    'The automatic roller garage door shortens the time it takes to open and adds to the user’s comfort. It keeps your belongings safe, is easy to get through, and opens and closes quickly and quietly. The door is durable and suits any kind of space, including for those who need a way into a garage built as part of the house.',

  'Este utilă și nu ocupă foarte mult spațiu pentru că lamelele se strâng într-o casetă, oferind în același timp un spațiu de acces foarte mare. Este o ușă perfectă pentru un spațiu de depozitare sau chiar pentru garajul pentru mașină. Este silențioasă și se deschide/închide în doar 10 secunde.':
    'It is useful and takes up little room, because the slats roll up into a box while still leaving a very large opening to pass through. It is a perfect door for a storage space, or indeed for the garage where the car is kept. It runs quietly and opens or closes in only 10 seconds.',

  'Datorită materialelor din care este confecționată și procesului electrochimic prin care este vopsită, ușa va rezista în aceleași condiții în timp. De asemenea izolează fonic și termic spațiul interior.':
    'Thanks to the materials it is made from and the electrochemical process used to paint it, the door will stay in the same condition over the years. It also insulates the space inside against noise and heat.',

  /* --- restul paginilor de produs și de listă --------------------------- */

  'Promoții: 16 produse în catalogul Usa-garaj.ro. Produsele aflate în categoria „PROMOȚII” a magazinului. Prețul tăiat și cel curent sunt cele din magazin, neschimbate.':
    'Offers: 16 products in the Usa-garaj.ro catalogue. The products in the shop’s “OFFERS” category. The struck-through price and the current one are the shop’s own, unchanged.',
  'Produsele aflate în categoria „PROMOȚII” a magazinului. Prețul tăiat și cel curent sunt cele din magazin, neschimbate.':
    'The products in the shop’s “OFFERS” category. The struck-through price and the current one are the shop’s own, unchanged.',
  'Contact Usa-garaj.ro: telefon 0731 366 613, e-mail Office@abbaconfort.ro. ABBA CONFORT DELIVERY SRL, CUI 49968876, J2024000637154, Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște.':
    'Contact Usa-garaj.ro: telephone 0731 366 613, e-mail Office@abbaconfort.ro. ABBA CONFORT DELIVERY SRL, Tax ID 49968876, Reg. No. J2024000637154, Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște.',
  'Spuneți-ne dimensiunile golului și culoarea dorită, iar noi vă răspundem cu varianta potrivită din catalog sau cu o ofertă la comandă.':
    'Tell us the dimensions of the opening and the colour you want, and we will come back to you with the right option from the catalogue or a made-to-order quote.',
  'Pentru o ofertă corectă, trimiteți-ne lățimea și înălțimea golului măsurate\n      la zid, precum și spațiul disponibil deasupra golului, necesar pentru\n      montarea casetei.':
    'For an accurate quote, send us the width and height of the opening measured\n      at the wall, along with the space available above the opening, which is needed\n      to fit the box.',
  'Răspunsuri la întrebările frecvente despre ușile de garaj tip rulou: acționare fără curent, conținutul livrării, cote, diferența dintre lamela de 55 și 77 mm.':
    'Answers to the questions we are most often asked about roller garage doors: operating without power, what the delivery contains, dimensions, and the difference between the 55 and 77 mm slats.',
  'Metode de plată acceptate de Usa-garaj.ro: ramburs la livrare și transfer bancar. Factură fiscală pentru fiecare comandă.':
    'Payment methods accepted by Usa-garaj.ro: cash on delivery and bank transfer. A tax invoice for every order.',

  'Da. Ușile de garaj tip rulou pot fi echipate cu motor electric și telecomandă, pentru deschidere și închidere rapidă și confortabilă.':
    'Yes. Roller garage doors can be fitted with an electric motor and remote control, for quick and convenient opening and closing.',
  'Da. În funcție de sistemul de acționare ales, ușa poate fi prevăzută cu sistem de deblocare pentru utilizarea manuală în cazul unei pene de curent.':
    'Yes. Depending on the drive system chosen, the door can be fitted with a release mechanism for manual use in the event of a power cut.',
  'Ușile sunt disponibile în mai multe culori și finisaje, inclusiv variante moderne precum gri antracit, alb, maro și alte nuanțe disponibile în funcție de model.':
    'The doors come in several colours and finishes, including contemporary options such as anthracite grey, white, brown and other shades available depending on the model.',
  'Da. Oferim servicii de montaj pentru ușile de garaj, iar echipa noastră poate verifica înainte de instalare condițiile existente și soluția potrivită pentru fiecare lucrare.':
    'Yes. We provide installation for the garage doors, and our team can check the existing conditions and the right solution for each job before fitting.',
  'Da. Lamelele din aluminiu și sistemul de închidere contribuie la protejarea garajului împotriva vântului, ploii, zăpezii și prafului, în limitele caracteristicilor tehnice ale modelului ales.':
    'Yes. The aluminium slats and the closing system help protect the garage from wind, rain, snow and dust, within the technical characteristics of the model chosen.',
  'Da. Pentru spațiile comerciale și industriale se pot alege configurații mai robuste, în funcție de dimensiunea golului și frecvența de utilizare.':
    'Yes. For commercial and industrial spaces, sturdier configurations can be chosen, depending on the size of the opening and how often it is used.',
  'Da. Produsele și lucrările beneficiază de garanție conform condițiilor aplicabile. Perioada și condițiile de garanție sunt prezentate la momentul achiziției.':
    'Yes. The products and the work carry a warranty under the applicable conditions. The warranty period and conditions are set out at the time of purchase.',
  'Măsurarea corectă este foarte importantă pentru alegerea dimensiunii ușii, a casetei și a sistemului de montaj. O măsurătoare corectă reduce riscul apariției problemelor la instalare.':
    'Measuring correctly matters a great deal when choosing the size of the door, the box and the mounting system. An accurate measurement reduces the risk of problems during installation.',
  'Da. Ne puteți trimite fotografii ale garajului și dimensiunile aproximative, iar echipa noastră vă poate indica informațiile necesare pentru stabilirea soluției potrivite.':
    'Yes. You can send us photographs of the garage and the approximate dimensions, and our team can tell you what information is needed to settle on the right solution.',

  'O astfel de ușă de garaj este o soluție ideală pentru a închide orice fel de spațiu, chiar și unul industrial.':
    'A garage door like this is an ideal way to close any kind of space, even an industrial one.',
  'Ușa de garaj de tip rulou este potrivită și pentru spații de depozitare, zone comerciale. Montajul este rapid, întreținere minimă pe termen lung.':
    'The roller garage door also suits storage spaces and commercial areas. Installation is quick and long-term maintenance is minimal.',
  'Această pagină nu are încă text publicat pe site-ul magazinului.\n      Până la completarea ei, vă stăm la dispoziție direct:':
    'This page does not yet have text published on the shop’s site.\n      Until it does, you can reach us directly:',
  'Pentru reclamații și soluționarea alternativă a litigiilor puteți folosi':
    'For complaints and alternative dispute resolution you may use',
  'și platforma europeană': 'and the European platform',
  'Vă contactăm telefonic pentru stabilirea datei de livrare și a montajului.\n      Dacă aveți întrebări între timp, sunați la':
    'We will call you to arrange the delivery and installation date.\n      If you have any questions in the meantime, call',
  'Proiectăm și montăm uși de garaj tip rulou, adaptate golului existent. Montajul este asigurat de echipa noastră.':
    'We design and install roller garage doors to fit the existing opening. Installation is carried out by our own team.',
  'Motor tubular, centrală de comandă și două telecomenzi, livrate împreună cu ușa. Deschiderea durează circa 10 secunde.':
    'A tubular motor, a control unit and two remote controls, delivered with the door. Opening takes about 10 seconds.',
  'Pentru ușile de garaj standard, în stoc disponibil, puteți comanda\n      imediat în funcție de dimensiuni și culoare.':
    'For standard garage doors held in stock, you can order straight away by size\n      and colour.',
  'Introduceți cotele golului și alegeți lamela.\n          Estimarea include ușa, motorul cu telecomandă, accesoriile de\n          deblocare, montajul și transportul.':
    'Enter the dimensions of the opening and choose the slat. The estimate covers\n          the door, the motor with remote control, the release accessories,\n          installation and delivery.',
  ', completați datele de livrare și alegeți una\n      dintre metodele de mai jos. Prețurile afișate sunt cele finale, în lei.':
    ', fill in the delivery details and choose one of the methods below. The prices\n      shown are the final ones, in lei.',
  'Pentru fiecare comandă emitem factură fiscală, transmisă pe e-mail.\n      Persoanele juridice pot solicita factură proformă înainte de plată, la':
    'We issue a tax invoice for every order, sent by e-mail.\n      Companies can request a proforma invoice before payment, at',
  'Produsele au rămas în coș. Puteți relua plata, puteți alege ramburs la\n      livrare sau ne puteți suna la':
    'The products are still in your cart. You can retry the payment, choose cash on\n      delivery, or call us on',
  'Magazinul nu publică o fișă de specificații pentru acest produs. Cotele constructive ale familiei de 55 mm sunt în':
    'The shop does not publish a specification sheet for this product. The construction dimensions of the 55 mm family are in the',
  'Dimensiuni standard, ușa de garaj de 2200 × 2100 mm poate fi comandată imediat, în stoc disponibil, cu accesorii incluse.':
    'A standard size: the 2200 × 2100 mm garage door can be ordered straight away from stock, accessories included.',
  'Ușa de garaj și componentele sale sunt din aluminiu, se comportă excelent în timp și la uzură și sunt vopsite prin procedeu special, electrochimic.':
    'The garage door and its components are made of aluminium, stand up excellently to time and wear, and are painted by a special electrochemical process.',
  'Sistemul este unul silențios la acționare și dispune de telecomandă, pentru o mai rapidă și ușoară utilizare, de la distanță.':
    'The system runs quietly and comes with a remote control, for quicker and easier operation from a distance.',
  'Ușa de garaj comandată vine la pachet cu accesoriile necesare. Opțional, puteți solicita centrala cu acționare prin telecomandă, senzor infraroșu și avertizor optic.':
    'The garage door you order comes with the accessories needed. As an option, you can ask for the control unit with remote operation, an infrared sensor and a warning light.',
  'Componentele folosite la producția ușii sunt de cea mai bună calitate, fiind realizate din aluminiu (ghidaje laterale, casetă superioară și lamele injectate cu spumă poliuretanică). Vopseaua este aplicată prin vopsire în câmp electrostatic și are o bună rezistență în timp.':
    'The components used to make the door are of the highest quality and are made of aluminium (side guide rails, top box and slats injected with polyurethane foam). The paint is applied electrostatically and holds up well over time.',
  'Gama variată de culori se încadrează perfect în arhitectura oricărei construcții, culorile standard fiind următoarele: alb, maro deschis, maro închis, argintiu, antracit, nuc, stejar auriu. Se poate vopsi în orice culoare din paletarul RAL, la un cost suplimentar.':
    'The wide range of colours fits perfectly into the architecture of any building. The standard colours are: white, light brown, dark brown, silver, anthracite, walnut and golden oak. It can be painted in any colour from the RAL range, at extra cost.',
  'Alegeți o astfel de ușă pentru siguranța bunurilor din garaj, dar și pentru design-ul elegant ce se va încadra perfect cu orice stil al casei.':
    'Choose a door like this for the safety of what you keep in the garage, and for the elegant design that will suit any style of house.',
  'Ușa de garaj tip rulou poate fi alegerea excelentă pentru dumneavoastră. Este realizată din aluminiu, având lamelele de 77 mm umplute cu spumă poliuretanică având și rolul de a izola fonic și termic. Este calitativă, are un design plăcut și se poate manevra atât electric cât și manual. Aceste uși sunt recunoscute pentru fiabilitatea și siguranța acestora, având de asemenea și rol estetic. Sistemul de închidere și deschidere se efectuează în aproximativ 10 secunde.':
    'The roller garage door may be an excellent choice for you. It is made of aluminium, with 77 mm slats filled with polyurethane foam which also insulate against noise and heat. It is well made, looks good, and can be operated both electrically and by hand. These doors are known for their reliability and security, and they play an aesthetic part too. Opening and closing take about 10 seconds.',
  'În plus, calitatea este reprezentată prin faptul că sunt vopsite prin procedee speciale, electrochimice, acest lucru ducând la o rezistență îndelungată.':
    'Their quality also shows in the fact that they are painted by special electrochemical processes, which makes them last.',
  'Confecționate din aluminiu, cu lamelele umplute cu spumă poliuretanică. Mai jos: cum se citesc cotele din denumirea produsului, cum se află spațiul util de trecere și specificațiile complete ale celor două familii de lamelă.':
    'Made of aluminium, with slats filled with polyurethane foam. Below: how to read the dimensions in the product name, how to work out the clear passage opening, and the full specifications of the two slat families.',
  'Secțiune comparativă prin profilul P55 și profilul PA77, cu cotele 55 / 12 mm și 77 / 21 mm.':
    'A comparative cross-section through the P55 and PA77 profiles, with dimensions of 55 / 12 mm and 77 / 21 mm.',

  'Ușa de garaj reprezintă un element foarte important în cadrul\n          amenajărilor exterioare de calitate, iar gama de culori vă permite\n          înviorarea peisajului casei dumneavoastră. Recunoscute pentru\n          fiabilitatea și siguranța lor, ușile tip rulou reprezintă alegerea\n          ideală în echiparea garajului dumneavoastră.':
    'The garage door is a very important part of well-made outdoor surroundings,\n          and the range of colours lets you brighten the look of your house. Known\n          for their reliability and security, roller doors are the ideal choice for\n          fitting out your garage.',
  'Confecționată din aluminiu, ușa de garaj rezidențială tip rulou\n          orizontal izolează termic și fonic, având lamelele umplute cu spumă\n          poliuretanică. Acestea pot fi utilizate în diverse contexte, de la\n          obișnuitul rol de ușă de garaj, până la cel de ușă pentru spațiu\n          comercial sau pentru o hală industrială.':
    'Made of aluminium, the domestic horizontal roller garage door insulates\n          against heat and noise, its slats being filled with polyurethane foam.\n          These doors can be used in many settings, from the ordinary role of a\n          garage door to that of a door for a commercial space or an industrial hall.',
  'Prin modalitatea de închidere-deschidere, spațiul ocupat de ușa de\n          garaj este foarte mic, iar accesibilitatea este sporită. Avantajul\n          ușilor de tip rulou față de cele secționale constă în faptul că toate\n          lamelele se strâng într-o casetă care necesită și ocupă un spațiu mult\n          mai mic.':
    'Because of the way it opens and closes, the garage door takes up very little\n          space and access is improved. The advantage of roller doors over sectional\n          ones is that all the slats roll up into a box that needs and occupies far\n          less room.',
  'Constructiv, ușile de garaj tip rulou sunt niște rulouri exterioare\n          de dimensiuni mai mari, care au lamelele umplute cu spumă poliuretanică\n          pentru izolare termică și rezistență. În funcție de mărimea ușii sau de\n          rezistența și izolarea termică cerute de proiect, lamelele au\n          dimensiunea de':
    'In construction, roller garage doors are larger external roller shutters whose\n          slats are filled with polyurethane foam for thermal insulation and\n          strength. Depending on the size of the door, or on the strength and\n          insulation the project calls for, the slats measure',
  ': catalogul se ridică peste\n          pagină, iar ușile trec una câte una prin fața dumneavoastră, la scară,\n          cu dimensiunea și prețul afișate dedesubt.':
    ': the catalogue rises above the page and the doors pass before you one by one,\n          to scale, with the size and price shown underneath.',
  'Dimensiunile scrise în denumirea produsului, sub forma\n    L × H, includ ghidajele și caseta. Pentru spațiul util de trecere se scad':
    'The dimensions written in the product name, in the form W × H, include the\n    guide rails and the box. For the clear passage opening, subtract',
  'la cele cu lamelă de\n    77 mm. Acolo unde producătorul declară explicit spațiul de trecere, acesta\n    este afișat pe pagina produsului.':
    'for those with 77 mm slats. Where the manufacturer states the passage opening\n    explicitly, it is shown on the product page.',

  /* --- confidențialitate și termeni, restul clauzelor -------------------- */

  'Usi Garaj Online (usa-garaj.ro) este un Operator al datelor cu caracter personal pe care dvs. (persoana vizata) ni le transmiteti.':
    'Usi Garaj Online (usa-garaj.ro) is a Controller of the personal data that you (the data subject) send us.',
  'Avem nevoie de datele dvs. cu caracter personal pentru a va putea furniza Serviciile, cu urmatoarele scopuri:':
    'We need your personal data in order to provide you with the Services, for the following purposes:',
  'Pentru a va transmite mesaje non-comerciale sau de tip administrativ (privind schimbari in site, contul de utilizator, etc);':
    'To send you non-commercial or administrative messages (about changes to the site, your user account and so on);',
  'Datele dvs. cu caracter personal sunt prelucrate la sediul societatii. Gazduirea si stocarea datelor dvs. au loc pe teritoriul Romaniei.':
    'Your personal data is processed at the company’s registered office. Your data is hosted and stored on Romanian territory.',
  'Informatiile prezentate in continuare au scopul de a aduce la cunostinta utilizatorului mai multe detalii despre plasarea, utilizarea si administrarea cookie-urilor utilizate de site-ul usa-garaj.ro.':
    'The information that follows is intended to tell the user more about how the cookies used by the usa-garaj.ro site are placed, used and managed.',
  'In cazul in care aveti nevoie de mai multe informatii, si ele nu se regasesc mai jos, ne puteti contacta la adresa de email Office@abbaconfort.ro.':
    'If you need more information and it is not set out below, you can contact us at the e-mail address Office@abbaconfort.ro.',
  'Deoarece va respectam dreptul la confidentialitate, puteti opta pentru blocarea anumitor tipuri de cookie-uri provenite de la acest site.':
    'Because we respect your right to privacy, you can choose to block certain types of cookie coming from this site.',
  'Cookie-urile joaca un rol important in facilitarea accesului si livrarii multiplelor servicii de care utilizatorul se bucura pe internet, cum ar fi:':
    'Cookies play an important part in making it easier to reach and deliver the many services a user enjoys on the internet, such as:',
  'Anumite cookie-uri, precum cele de performanta sau cele de Social media si publicitate, pot proveni de la terti.':
    'Certain cookies, such as performance cookies or social media and advertising cookies, may come from third parties.',
  'Aceste cookie-uri permit atat salvarea preferintelor cu privire la celelalte tipuri de cookie-uri folosite, cat si accesarea functionalitatilor de baza ale acestui site.':
    'These cookies make it possible both to save your preferences about the other types of cookie used and to reach the basic features of this site.',
  'Ele retin preferintele utilizatorului pe acest site, asa incat nu mai este nevoie de setarea lor la fiecare vizitare a site-ului.':
    'They remember the user’s preferences on this site, so that they do not have to be set again on every visit.',
  'Ele includ atat cookie-urile provenite din partea serviciilor de analiza a traficului, precum si cookie-uri plasate de anumite servicii terte care ofera functionalitati complementare site-ului.':
    'They include both cookies from traffic analysis services and cookies placed by certain third-party services that add features to the site.',
  'Acestea pot fi plasate prin intermediul site-ului de catre serviciile de social media sau publicitate pe care le utilizam.':
    'These may be placed through the site by the social media or advertising services we use.',
  'Ele pot proveni din partea unor terti precum servicii de publicitate (Ex: AdSense, AdWords), platforme de tip social media (Ex: Facebook, Twitter), etc.':
    'They may come from third parties such as advertising services (for example AdSense, AdWords), social media platforms (for example Facebook, Twitter) and so on.',
  'Continut si servicii adaptate preferintelor utilizatorului &#8211; categorii de stiri, vreme, sport, harti, servicii publice si guvernamentale, site-uri de entertainment si servicii de travel.':
    'Content and services suited to the user’s preferences &#8211; news categories, weather, sport, maps, public and government services, entertainment sites and travel services.',
  'Oferte adaptate pe interesele utilizatorilor &#8211; retinerea parolelor, preferintele de limba ( Ex: afisarea rezultatelor cautarilor in limba Romana).':
    'Offers suited to users’ interests &#8211; remembering passwords, language preferences (for example showing search results in Romanian).',
  'Retinerea filtrelor de protectie a copiilor privind continutul pe Internet (optiuni family mode, functii de safe search).':
    'Remembering child protection filters for internet content (family mode options, safe search features).',
  'Limitarea frecventei de difuzare a reclamelor &#8211; limitarea numarului de afisari a unei reclame pentru un anumit utilizator pe un site.':
    'Limiting how often advertisements are shown &#8211; limiting the number of times an advertisement is displayed to a given user on a site.',
  'Particularizati-va setarile browserului in ceea ce priveste cookie-urile pentru a reflecta un nivel confortabil pentru voi al securitatii utilizarii cookie-urilor.':
    'Adjust your browser’s cookie settings to a level of cookie security you are comfortable with.',
  'Daca doriti sa afli mai multe informatii despre cookie-uri si la ce sunt utilizate, recomandam urmatoarele linkuri:':
    'If you would like to know more about cookies and what they are used for, we recommend the following links:',

  'Prezentul document prin continutul sau pune la dispozitia tertilor utilizatori Regulamentul privind termenii si conditiile de utilizare a site-ului Usa-Garaj.ro (usa-garaj.ro).':
    'This document sets out, for third-party users, the Rules on the terms and conditions of use of the Usa-Garaj.ro site (usa-garaj.ro).',
  'Site-ul Usa-Garaj.ro (usa-garaj.ro) este operat de societatea ABBA CONFORT DELIVERY SRL, cu sediul in Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște, inscrisa in Registrul Comertului cu numarul J2024000637154.':
    'The Usa-Garaj.ro site (usa-garaj.ro) is operated by ABBA CONFORT DELIVERY SRL, with its registered office at Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște, entered in the Trade Register under number J2024000637154.',
  'Utilizarea site-ului (incluzand accesul, navigarea si cumpararea produselor de pe acest site) constituie un acord implicit de respectare a termenilor si conditiilor enuntate in cuprinsul prezentului document cu toate efectele si consecintele ce decurg din aceasta.':
    'Use of the site (including accessing it, browsing it and buying products from it) constitutes implied agreement to observe the terms and conditions set out in this document, with all the effects and consequences that follow.',
  'Administratorul site-ului Usa-Garaj.ro (usa-garaj.ro) isi rezerva dreptul de a modifica in orice moment continutul acestui acord, fara notificarea prealabila a persoanelor care il utilizeaza, denumite in continuare &#8222;Utilizatori&#8221;. Utilizatorii vor avea acces permanent la termenii si conditiile de utilizare a serviciilor, pentru a le putea consulta in orice moment.':
    'The administrator of the Usa-Garaj.ro site (usa-garaj.ro) reserves the right to change the content of this agreement at any time, without prior notice to those who use it, referred to below as &#8222;Users&#8221;. Users will have permanent access to the terms and conditions of use of the services, so that they can consult them at any time.',
  'Continutul acestui site nu poate fi utilizat, reprodus, distribuit, transmis, expus, in alte scopuri decat cele expres si legal permise. Extragerea oricaror informatii urmata de orice utilizare in scop comercial care depaseste sfera copiei private reglementate de lege sau pentru vanzare ori licentiere si fara a avea in prealabil un consimtamant scris al titularilor drepturilor de proprietate constituie o incalcare a termenilor si conditiilor.':
    'The content of this site may not be used, reproduced, distributed, transmitted or displayed for purposes other than those expressly and lawfully permitted. Extracting any information followed by any commercial use going beyond the private copy allowed by law, or for sale or licensing, without the prior written consent of the rights holders, constitutes a breach of the terms and conditions.',
  'Sunteti de asemenea de acord sa nu afectati si interferati in vreun fel cu elementele de securitate ale site-ului, cu elementele care previn sau restrictioneaza utilizarea, copierea unui continut sau elemente care intaresc limitele de utilizare a siteului sau a continutului acestuia.':
    'You also agree not to affect or interfere in any way with the site’s security features, with the features that prevent or restrict use or copying of content, or with features that enforce the limits on use of the site or its content.',
  'Va rugam sa va asigurati ca ati verificat specificatiile produsului si compatibilitatea acestuia prin vizitarea paginii producatorului inainte de a-l cumpara. Raporturile comerciale dintre cumparator si Usa-Garaj.ro (usa-garaj.ro) sunt reglementate oficial de Ordonanta Guvernului 130/2000, privind protectia consumatorilor la incheierea si executarea contractelor la distanta.':
    'Please make sure you have checked the product’s specifications and its compatibility by visiting the manufacturer’s page before buying it. The commercial relationship between the buyer and Usa-Garaj.ro (usa-garaj.ro) is formally governed by Romanian Government Ordinance 130/2000 on consumer protection in the conclusion and performance of distance contracts.',
  'Consumatorul are dreptul sa notifice in scris comerciantului ca renunta la cumparare, in termen de 10 zile lucratoare de la primirea produsului sau, in cazul prestarilor de servicii, de la incheierea contractului.':
    'The consumer has the right to notify the trader in writing that they are withdrawing from the purchase, within 10 working days of receiving the product or, in the case of services, of the contract being concluded.',
  'Deoarece produsele vandute in cadrul acestui site se realizeaza si customizeaza conform cerintelor clientului, se va achita o taxa de customizare de 450 lei, iar plata taxelor de curierat in cuantum de 250 lei va fi retinuta din suma care va fi rambursata clientului.':
    'Because the products sold on this site are made and customised to the customer’s requirements, a customisation charge of 450 lei is payable, and courier charges of 250 lei will be withheld from the amount refunded to the customer.',
  'Administratorul Usa-Garaj.ro (usa-garaj.ro) face eforturi permanente pentru a pastra acuratetea informatiilor de pe site, insa uneori acestea pot contine inadvertente (specificatiile sau pretul produselor modificate de catre producator fara preaviz sau viciate de erori de operare). Atentie: fotografiiile au caracter informativ si pot contine accesorii care nu sunt incluse in pachetele standard.':
    'The administrator of Usa-Garaj.ro (usa-garaj.ro) makes continuous efforts to keep the information on the site accurate, but it may sometimes contain discrepancies (product specifications or prices changed by the manufacturer without notice, or affected by data entry errors). Please note: the photographs are for information only and may show accessories that are not included in the standard packages.',
  'In scopul accesarii si utilizarii anumitor sectiuni ale website-ului poate fi necesara crearea unui cont personal. Prin prezenta declarati ca va asumati integral responsabilitatea pentru toate si oricare dintre activitatile realizate prin intermediul contului pe care il deschideti pe website si, in consecinta, va sfatuim sa asigurati securitatea parolei contului sau a altor date de acces. In cazul in care securitatea contului pe care il detineti este compromisa, trebuie sa anuntati imediat administratorul site-ului. Usa-Garaj.ro (usa-garaj.ro) nu este responsabil pentru daunele care va sunt cauzate sau care sunt cauzate tertilor de orice fel, prin utilizarea neautorizata a contului.':
    'Creating a personal account may be necessary in order to reach and use certain sections of the website. You hereby declare that you take full responsibility for any and all activity carried out through the account you open on the website and, accordingly, we advise you to keep the account password and other access details secure. If the security of your account is compromised, you must inform the site administrator immediately. Usa-Garaj.ro (usa-garaj.ro) is not responsible for damage of any kind caused to you or to third parties through unauthorised use of the account.',
  'Prin folosirea site-ului Usa-Garaj.ro (usa-garaj.ro), utilizatorul se declara de acord asupra faptului ca legile romane vor guverna Termenii si conditiile de utilizare si orice disputa de orice fel care ar putea sa apara intre utilizatori si administratorii Usa-Garaj.ro (usa-garaj.ro) sau asociatii/partenerii/afiliatii acestuia. In cazul unor eventuale conflicte se va incerca mai intai rezolvarea acestora pe cale amiabila, iar daca rezolvarea pe cale amiabila nu va fi posibila, conflictul va fi solutionat in instanta, in conformitate cu legile romane in vigoare.':
    'By using the Usa-Garaj.ro site (usa-garaj.ro), the user agrees that Romanian law governs the Terms and conditions of use and any dispute of any kind that may arise between users and the administrators of Usa-Garaj.ro (usa-garaj.ro) or its associates, partners or affiliates. In the event of any conflict, an amicable settlement will be attempted first; if an amicable settlement is not possible, the conflict will be resolved in court, in accordance with the Romanian law in force.',
  'Termenul de livrare standard este de 3-5 zile lucratoare de la confirmarea comenzii. Acest termen poate fi marit in cazul comenzilor atipice sau aparitiei unor situatii de forta majora. De asemenea, in anumite situatii si la solicitarea expresa a clientului, comanda poate fi executata in regim de urgenta si livrata in termen de maxim 24 ore. La preluarea oricarei comenzi, clientul va primi notificare si/sau confirmare pe email si/sau telefonic.':
    'The standard delivery time is 3–5 working days from confirmation of the order. This period may be extended for unusual orders or where circumstances of force majeure arise. In certain cases, and at the customer’s express request, an order may also be handled as urgent and delivered within 24 hours at most. When any order is taken, the customer will receive notification and/or confirmation by e-mail and/or by telephone.',
  'Administratorul Usa-Garaj.ro (usa-garaj.ro) isi rezerva dreptul de a modifica structura si interfata oricarei pagini sau subpagini a site-ului Usa-Garaj.ro (usa-garaj.ro) in orice moment si la orice interval de timp liber ales, avand dreptul de a intrerupe temporar sau permanent, partial sau in totalitate serviciile puse la dispozitia publicului prin intermediul acestui website fara vreo notificare prealabila individuala sau generala.':
    'The administrator of Usa-Garaj.ro (usa-garaj.ro) reserves the right to change the structure and interface of any page or sub-page of the Usa-Garaj.ro site (usa-garaj.ro) at any time and at any interval of its choosing, and has the right to suspend, temporarily or permanently, in part or in full, the services made available to the public through this website, without any prior individual or general notice.',
  'Daca aveti intrebari sau nelamuriri in legatura cu acesti termeni de utilizare, nu ezitati sa ne contactati prin intermediul formularului dedicat de contact sau la adresa de email Office@abbaconfort.ro':
    'If you have questions or anything is unclear about these terms of use, do not hesitate to contact us through the dedicated contact form or at the e-mail address Office@abbaconfort.ro'
};

const hu = {
  /* --- descrieri de produs ---------------------------------------------- */

  'Ușa de garaj automată de 55MM de tip rulou este exact ceea ce ai nevoie pentru garajul casei sau pentru spațiul de depozitare. Oferă un aspect plăcut și nu ocupă mult spațiu și în același timp oferă siguranța că nu poate fi deschisă de oricine. Pentru un confort sporit această ușă de garaj poate fi acționată electric prin telecomandă, dar și manual la nevoie.':
    'Az 55 mm-es automata redőnyös garázskapu pontosan az, amire a ház garázsához vagy a tárolóhelyiséghez szüksége van. Szép megjelenésű, kevés helyet foglal, és biztosítja, hogy ne nyithassa ki bárki. A nagyobb kényelem érdekében ez a garázskapu távirányítóval, elektromosan működtethető, szükség esetén pedig kézzel is.',

  'O ușă de garaj de tip rulou vă menține obiectele pe care le dețineți în siguranță, oferind în același timp izolare fonică și termică. Ușa este confecționată din aluminiu, lamelele de 77 mm sunt umplute cu spumă poliuretanică. Sistemul electric încorporat permite deschiderea și închiderea ușii la o apăsare de buton, fiecare în doar 10 secunde. Datorită faptului că lamelele se strâng într-o casetă, se face economie de spațiu și accesibilitatea este sporită. Ușa este vopsită prin procedee speciale electrochimice, ceea ce îi oferă o rezistență îndelungată. Ușa de garaj de tip rulou este fiabilă și generează un zgomot redus. Întreținerea acesteia este extrem de ușoară.':
    'A redőnyös garázskapu biztonságban tartja a tárgyait, egyúttal hang- és hőszigetelést is nyújt. A kapu alumíniumból készül, a 77 mm-es lamellák poliuretán habbal töltöttek. A beépített elektromos rendszer gombnyomásra nyitja és zárja a kaput, mindkettőt mindössze 10 másodperc alatt. Mivel a lamellák a tokba tekerednek fel, helyet takarít meg, és javul a hozzáférés. A kaput különleges elektrokémiai eljárással festik, ami tartós ellenállóságot ad neki. A redőnyös garázskapu megbízható és halk. Karbantartása rendkívül egyszerű.',

  'Ușa de tip rulou cu lamele de 77 mm este o variantă economică și fiabilă pentru închiderea garajului, cu o durată îndelungată de viață. Ușa garajului trebuie să facă față intemperiilor și altor factori externi și deschiderilor/închiderilor multiple. Vopseaua este aplicată în câmp electrostatic, motiv pentru care este și rezistentă. Ușa este confecționată din aluminiu de înaltă calitate, iar lamelele sunt umplute cu spumă poliuretanică, oferind izolare termică și fonică. Deschiderea se face în sistem electric cu ajutorul telecomenzii sau de la butonul centralei cu receptor. Totuși, acționarea ușii este permisă chiar și în cazul în care nu există curent, fiind prevăzută și cu acționare manuală.':
    'A 77 mm-es lamellás redőnykapu gazdaságos és megbízható megoldás a garázs lezárására, hosszú élettartammal. A garázskapunak meg kell birkóznia az időjárással, egyéb külső hatásokkal és a sok nyitással-zárással. A festést elektrosztatikus térben viszik fel, ezért is ellenálló. A kapu kiváló minőségű alumíniumból készül, a lamellák poliuretán habbal töltöttek, így hő- és hangszigetelést nyújtanak. A nyitás elektromosan történik, távirányítóval vagy a vevőegység gombjával. A kapu áramkimaradás esetén is működtethető, mivel kézi működtetéssel is el van látva.',

  'Ușă de garaj de tip rulou, realizată din lamele de 55 mm, umplute cu spumă poliuretanică. Cu sistem automat de deschidere/închidere. Lamelele se strâng, rulate pe verticală. Optime pentru a salva din spațiul disponibil. Izolează fonic și termic, creează un grad ridicat de siguranță, sunt o soluție optimă antiefracție.':
    'Redőnyös garázskapu 55 mm-es, poliuretán habbal töltött lamellákból, automata nyitó- és zárórendszerrel. A lamellák függőlegesen tekerednek fel, ami kiválóan takarékoskodik a rendelkezésre álló hellyel. Hang- és hőszigetelnek, magas fokú biztonságot adnak, és kiváló betörésgátló megoldást jelentenek.',

  'Ușa de garaj tip rulou este rezistentă în timp și nu se degradează din cauza utilizărilor repetate. Poate fi acționată foarte ușor în mod electric sau chiar manual, în funcție de nevoie. Este disponibilă într-o nuanță plăcută de maro, care poate completa frumos designul în spațiul în care este montată.':
    'A redőnyös garázskapu időtálló, és a gyakori használattól sem megy tönkre. Nagyon könnyen működtethető elektromosan, szükség esetén akár kézzel is. Kellemes barna árnyalatban kapható, amely szépen illeszkedik annak a térnek a kialakításához, ahová beszerelik.',

  'Ușă de garaj, de tip rulou, din aluminiu este ideală pentru garajul dumneavoastră, sistem de acces potrivit pentru spații rezidențiale, dar și comerciale sau industriale. Creată din lamele de 55 mm umplute cu spumă, acestea realizează închiderea perfectă. Țin hoții la distanță, izolează fonic și termic și vă asigură condiții optime pentru depozitarea diverselor bunuri.':
    'Az alumínium redőnyös garázskapu ideális az Ön garázsához: olyan beléptetési megoldás, amely lakó-, üzleti és ipari terekhez egyaránt illik. Az 55 mm-es, habbal töltött lamellákból épül fel, amelyek tökéletesen zárnak. Távol tartják a betörőket, hang- és hőszigetelnek, és megfelelő körülményeket biztosítanak a legkülönfélébb javak tárolásához.',

  'Ușă de garaj de tip rulou, ideală pentru închiderea garajului sau a altor spații rezidențiale sau comerciale, cu rol de depozitare mai ales. Au sistem de închidere automat, prevăzut cu telecomandă, dar poate fi acționat și manual în lipsa alimentării cu curent electric.':
    'Redőnyös garázskapu, amely ideális a garázs vagy más lakó-, illetve üzleti terek — különösen tárolóhelyiségek — lezárására. Automata zárórendszerrel és távirányítóval készül, de áramkimaradás esetén kézzel is működtethető.',

  'Ușa de garaj tip rulou este fiabilă și silențioasă și poate fi acționată atât electric, cât și manual. Perfectă pentru închiderea unui spațiu construit pentru autovehicul sau pentru un spațiu de depozitare. Este rezistentă la intemperii datorită procesului electrochimic prin care a fost vopsită. Spațiul de acces este suficient de mare, nu necesită foarte mult loc pentru că închiderea și deschiderea ușii constă în strângerea lamelelor în casetă.':
    'A redőnyös garázskapu megbízható és halk, elektromosan és kézzel is működtethető. Tökéletes gépjárműnek épített vagy tárolásra használt tér lezárására. Az elektrokémiai festési eljárásnak köszönhetően ellenáll az időjárásnak. A bejárati nyílás bőven elegendő, és kevés helyet igényel, mert a kapu nyitása és zárása a lamellák tokba tekerésével történik.',

  'Ușă de garaj cu sistem automat, de tip rulou, din lamele de 55 mm. Deschidere printr-o simplă apăsare de buton, dar la nevoie, poate fi acționată și manual.':
    'Automata redőnyös garázskapu 55 mm-es lamellákból. Egyszerű gombnyomásra nyílik, szükség esetén pedig kézzel is működtethető.',

  'Ușă de garaj de tip rulou, din aluminiu. Lamelele sunt de 55 mm, umplute cu spumă poliuretanică, ceea ce înseamnă că acest panou de lamele va crea și izolare fonică și termică optimă. Ideală pentru spații înguste, datorită sistemului de închidere/deschidere pe verticală.':
    'Alumínium redőnyös garázskapu. A lamellák 55 mm-esek, poliuretán habbal töltve, így ez a lamellapáncél kiváló hang- és hőszigetelést is ad. A függőleges nyitó- és zárórendszernek köszönhetően szűk terekhez is ideális.',

  /* --- descrieri de categorie ------------------------------------------- */

  'Uși garaj rulou 55 mm: 15 produse în catalogul Usa-garaj.ro. Lamelă de 55 mm, 14 mm grosime, masă a tabliei de 4 kg/m², ax de Ø60 mm și ghidaje de 75 × 30 mm. Varianta potrivită pentru garaje de locuință.':
    'Redőnyös garázskapuk 55 mm: 15 termék a Usa-garaj.ro katalógusában. 55 mm-es lamella, 14 mm vastag, 4 kg/m² páncéltömeg, Ø60 mm-es tengely és 75 × 30 mm-es vezetősínek. A lakógarázsokhoz illő változat.',

  'Uși garaj rulou 77 mm: 6 produse în catalogul Usa-garaj.ro. Lamelă de 77 mm, 20 mm grosime, masă a tabliei de 6 kg/m², ax de Ø70 mm și ghidaje de 90 × 35 mm. Pentru deschideri mari și utilizare intensă.':
    'Redőnyös garázskapuk 77 mm: 6 termék a Usa-garaj.ro katalógusában. 77 mm-es lamella, 20 mm vastag, 6 kg/m² páncéltömeg, Ø70 mm-es tengely és 90 × 35 mm-es vezetősínek. Nagy nyílásokhoz és intenzív használathoz.',

  'Uși de garaj tip rulou ABBA, cu lamele de 55 mm și 77 mm, acționare automată cu telecomandă. 21 de configurații, de la 3.250,00 lei, transport gratuit și montaj asigurat. ABBA CONFORT DELIVERY SRL, CUI 49968876, J2024000637154.':
    'ABBA redőnyös garázskapuk 55 és 77 mm-es lamellákkal, automata, távirányítós működtetéssel. 21 változat, 3.250,00 lejtől, ingyenes szállítással és beszereléssel. ABBA CONFORT DELIVERY SRL, adószám 49968876, cégjegyzékszám J2024000637154.',

  /* --- întrebări frecvente, răspunsuri ---------------------------------- */

  'Oferim uși de garaj tip rulou din aluminiu, disponibile în mai multe dimensiuni, culori și configurații. Ușile pot fi acționate manual sau automat, în funcție de necesitățile fiecărui garaj.':
    'Alumínium redőnyös garázskapukat kínálunk, több méretben, színben és kivitelben. A kapuk kézzel vagy automatikusan működtethetők, az adott garázs igényei szerint.',

  'În majoritatea cazurilor, da. Ușile tip rulou pot fi montate atât la garaje rezidențiale, cât și la spații comerciale sau industriale. Înainte de comandă recomandăm verificarea și măsurarea spațiului de montaj.':
    'A legtöbb esetben igen. A redőnykapuk lakógarázsokba éppúgy beszerelhetők, mint üzleti vagy ipari terekbe. Rendelés előtt javasoljuk a beépítési hely ellenőrzését és felmérését.',

  'Diferența principală este dimensiunea lamelei și nivelul de rezistență. Lamelele de 77 mm sunt o variantă mai robustă, recomandată în special pentru goluri mai mari și utilizare intensă.':
    'A fő különbség a lamella mérete és a teherbírás. A 77 mm-es lamellák a robusztusabb változat, amelyet elsősorban nagyobb nyílásokhoz és intenzív használathoz ajánlunk.',

  'Dimensiunea se stabilește în funcție de golul existent și de spațiul disponibil pentru montaj. Pentru o ofertă corectă, este recomandată măsurarea golului și verificarea condițiilor de montaj.':
    'A méretet a meglévő nyílás és a beszereléshez rendelkezésre álló hely határozza meg. A pontos ajánlathoz javasoljuk a nyílás felmérését és a beépítési körülmények ellenőrzését.',

  'Durata montajului depinde de dimensiunea ușii, tipul de acționare și condițiile existente la garaj. În cazul unei instalații pregătite corespunzător, montajul se poate realiza într-un timp scurt.':
    'A beszerelés időtartama a kapu méretétől, a működtetés típusától és a garázsnál adott körülményektől függ. Megfelelően előkészített nyílás esetén a beszerelés rövid idő alatt elvégezhető.',

  'Da. Ușile de garaj pot fi configurate în funcție de dimensiunile golului și de condițiile de montaj. Pentru o ofertă exactă, este important să avem dimensiunile corecte.':
    'Igen. A garázskapuk a nyílás méreteihez és a beépítési körülményekhez igazíthatók. A pontos ajánlathoz fontos, hogy a helyes méretek a rendelkezésünkre álljanak.',

  'Pentru funcționare corectă și o durată de viață cât mai mare, recomandăm verificarea periodică a componentelor mecanice, a sistemului de acționare și curățarea lamelelor și a elementelor accesibile.':
    'A helyes működés és a minél hosszabb élettartam érdekében javasoljuk a mechanikus alkatrészek és a hajtórendszer rendszeres ellenőrzését, valamint a lamellák és a hozzáférhető elemek tisztítását.',

  'Ne puteți contacta cu dimensiunile aproximative ale golului, localitatea și tipul de ușă dorit. Pe baza acestor informații vă putem orienta către soluția potrivită și vă putem pregăti o ofertă personalizată.':
    'Keressen minket a nyílás hozzávetőleges méreteivel, a településsel és a kívánt kaputípussal. Ezek alapján a megfelelő megoldás felé tudjuk irányítani, és egyedi ajánlatot készíthetünk Önnek.',

  'Da. Unul dintre avantajele importante ale sistemului rulou este faptul că ușa se ridică vertical și se rulează într-o casetă, fără să ocupe spațiul din tavan necesar altor tipuri de uși.':
    'Igen. A redőnyrendszer egyik fontos előnye, hogy a kapu függőlegesen emelkedik és tokba tekeredik, így nem foglalja el azt a mennyezeti helyet, amelyre más kaputípusoknak szükségük van.',

  'Ușile din aluminiu oferă un raport foarte bun între greutate, rezistență și funcționalitate. Sistemul rulou este practic, ocupă puțin spațiu și poate fi configurat cu acționare manuală sau electrică.':
    'Az alumíniumkapuk igen jó arányt kínálnak a tömeg, a szilárdság és a használhatóság között. A redőnyrendszer praktikus, kevés helyet foglal, és kézi vagy elektromos működtetéssel is kialakítható.',

  'Nu. În funcție de lucrare și de locație, putem realiza montajul și în alte localități din țară. Pentru confirmarea disponibilității, contactați-ne și transmiteți localitatea și dimensiunile aproximative ale ușii.':
    'Nem. A munkától és a helyszíntől függően az ország más településein is vállalunk beszerelést. Az elérhetőség megerősítéséhez keressen minket, és adja meg a települést és a kapu hozzávetőleges méreteit.',

  'Catalogul complet: 21 de uși de garaj tip rulou cu lamele de 55 mm și 77 mm, de la 3.250,00 lei. Prețuri și disponibilitate întocmai ca în magazin.':
    'A teljes katalógus: 21 redőnyös garázskapu 55 és 77 mm-es lamellákkal, 3.250,00 lejtől. Az árak és az elérhetőség pontosan olyanok, mint az üzletben.',

  'Include sistem automat, acționat prin telecomandă, dar poate fi utilizată și manual, în cazul în care este nevoie. Închidere practică și compactă, practic ușa se rulează în caseta din aluminiu, explorând astfel spațiul pe verticală. Nu veți fi condiționați de spațiu, ca în cazul ușilor clasice, cu deschidere în laterală.':
    'Automata, távirányítós rendszerrel készül, de szükség esetén kézzel is használható. A zárás praktikus és helytakarékos: a kapu az alumínium tokba tekeredik, függőlegesen használva ki a teret. Nem köti meg a hely, mint a hagyományos, oldalra nyíló kapuknál.',

  'Sistemele de acționare mixte din componența ușii de garaj tip rulou permit utilizarea acesteia chiar și în lipsa curentului, fiind prevăzută cu acționare manuală. Acționarea ușilor de garaj se realizează prin intermediul sistemului de utilizare electric, fiind necesară doar o apăsare pe butonul telecomenzii sau al centralei cu receptor.':
    'A redőnyös garázskapuba épített kettős működtetési rendszer révén a kapu áramkimaradás esetén is használható, mivel kézi működtetéssel is el van látva. Rendes körülmények között a garázskapuk elektromosan működnek, mindössze a távirányító vagy a vevőegység gombját kell megnyomni.',

  'Ușa de garaj tip rulou are atât rolul de a izola termic, cât și fonic, fiind realizată din aluminiu și având lamelele umplute cu spumă poliuretanică. Acestea pot fi utilizate în multiple contexte, întrebuințările pornind de la clasica ușă de garaj, până la cea de ușă pentru o hală industrială sau pentru un spațiu comercial.':
    'A redőnyös garázskapu hő- és hangszigetelő szerepet is betölt, mivel alumíniumból készül, lamellái pedig poliuretán habbal töltöttek. Sokféle helyzetben használható: a hagyományos garázskaputól az ipari csarnok vagy üzlethelyiség kapujáig.',

  'Lamelele de 55 mm acționează ca o barieră eficientă și contribuie la izolarea fonică și termică a spațiului închis cu o astfel de ușă. În plus, optimizați spațiul disponibil în interior, datorită sistemului compact, de tip rulou, cu închidere pe verticală.':
    'Az 55 mm-es lamellák hatékony akadályt képeznek, és hozzájárulnak az ilyen kapuval lezárt tér hang- és hőszigeteléséhez. Ráadásul a függőlegesen záró, kompakt redőnyrendszernek köszönhetően a belső teret is jobban kihasználja.',

  'Între lamele se află spumă poliuretanică ce ajută la o mai bună izolare fonică și termică. Ușile de garaj tip rulou sunt mult mai utile decât cele secționale și le puteți achiziționa la un preț avantajos. Aluminiul din care este confecționată o astfel de ușă îi conferă rezistență în timp.':
    'A lamellák között poliuretán hab van, amely javítja a hang- és hőszigetelést. A redőnyös garázskapuk sokkal használhatóbbak a szekcionált kapuknál, és kedvező áron beszerezhetők. Az alumínium, amelyből az ilyen kapu készül, tartós ellenállóságot ad neki.',

  'Între lamelele ușilor se află spumă poliuretanică, motiv pentru care izolează foarte bine fonic și termic, ceea ce aduce un plus și mai mult decât atât, nu produce zgomot atunci când este acționată.':
    'A kapu lamellái között poliuretán hab található, ezért kiválóan szigetel hang és hő ellen — sőt, működtetéskor egyáltalán nem zajos.',

  'O astfel de ușă este soluția perfectă pentru închiderea unui garaj sau a unui spațiu de depozitare, având toate caracteristicile necesare, alături de un aspect elegant și simplu.':
    'Egy ilyen kapu tökéletes megoldás garázs vagy tárolóhelyiség lezárására: minden szükséges tulajdonsággal rendelkezik, ráadásul egyszerű, elegáns megjelenésű.',

  'Fișa tehnică a ușilor de garaj tip rulou: cum se citesc dimensiunile, calculul spațiului util de trecere, specificațiile complete pentru lamela de 55 mm și cea de 77 mm.':
    'A redőnyös garázskapuk műszaki adatlapja: hogyan kell olvasni a méreteket, hogyan számítható ki a szabad átjárási méret, valamint az 55 és a 77 mm-es lamella teljes műszaki adatai.',

  'Lamelă de 55 mm, 14 mm grosime, masă a tabliei de 4 kg/m², ax de Ø60 mm și ghidaje de 75 × 30 mm. Varianta potrivită pentru garaje de locuință.':
    '55 mm-es lamella, 14 mm vastag, 4 kg/m² páncéltömeg, Ø60 mm-es tengely és 75 × 30 mm-es vezetősínek. A lakógarázsokhoz illő változat.',

  'Lamelă de 77 mm, 20 mm grosime, masă a tabliei de 6 kg/m², ax de Ø70 mm și ghidaje de 90 × 35 mm. Pentru deschideri mari și utilizare intensă.':
    '77 mm-es lamella, 20 mm vastag, 6 kg/m² páncéltömeg, Ø70 mm-es tengely és 90 × 35 mm-es vezetősínek. Nagy nyílásokhoz és intenzív használathoz.',

  /* --- pagini juridice --------------------------------------------------- */

  'Anularea tranzactiei procesate prin card online se poate face in maxim 24 ore , iar banca emitenta va debloca suma blocata in contul clientului in termen de 1-30 de zile, in functie de politica fiecarei banci.':
    'Az online kártyás tranzakció legfeljebb 24 órán belül vonható vissza, a kibocsátó bank pedig 1–30 napon belül feloldja az ügyfél számláján zárolt összeget, az egyes bankok gyakorlatától függően.',

  'Daca comanda dvs. a intrat in productie in acest interval de timp de 24 ore, se va retine o taxa de debitare materiale de 450 lei.':
    'Ha a rendelése ezen a 24 órás időszakon belül gyártásba került, 450 lej anyagköltséget vonunk le.',

  'Conform cerintelor Regulamentului General pentru Protectia Datelor (GDPR &#8211; General Data Protection Regulation (EU) 2016/679 pentru prelucrarea datelor cu caracter personal si privind libera circulatie a acestor date, Usa Garaj (usa-garaj.ro) are obligatia de a administra in conditii de siguranta si numai pentru scopurile specificate, datele personale pe care ni le furnizati.':
    'Az általános adatvédelmi rendelet (GDPR &#8211; az (EU) 2016/679 rendelet a személyes adatok kezeléséről és azok szabad áramlásáról) előírásainak megfelelően a Usa Garaj (usa-garaj.ro) köteles az Ön által megadott személyes adatokat biztonságos körülmények között és kizárólag a megjelölt célokra kezelni.',

  'Pentru a va transmite oferte, promotii, mesaje publicitare si de marketing privind activitatea Usi Garaj Online (usa-garaj.ro), in cazul in care v-ati exprimat acordul in acest sens.':
    'Hogy ajánlatokat, akciókat, hirdetési és marketingüzeneteket küldjünk Önnek a Usi Garaj Online (usa-garaj.ro) tevékenységéről, amennyiben ehhez hozzájárult.',

  'Putem furniza datele dvs. cu caracter personal altor companii cu care ne aflam in relatii de parteneriat, dar numai in temeiul unui angajament de confidentialitate din partea acestora si numai in scopurile mentionate in acest document. Informatiile solicitate in cazul platilor online intra sub incidenta conditiilor de utilizare a procesatorilor de plati, iar Usi Garaj Online (usa-garaj.ro) nu va solicita si nu va stoca niciun detaliu referitor la cardul dumneavoastra.':
    'Személyes adatait átadhatjuk olyan más cégeknek, amelyekkel partneri kapcsolatban állunk, de kizárólag az ő titoktartási kötelezettségvállalásuk alapján és kizárólag az ebben a dokumentumban megjelölt célokra. Az online fizetéseknél kért adatokra a fizetési szolgáltatók felhasználási feltételei vonatkoznak, a Usi Garaj Online (usa-garaj.ro) pedig nem kér és nem tárol semmilyen, a bankkártyájára vonatkozó adatot.',

  'Vom dezvalui informatii daca acest lucru este justificat in scopul de a ne proteja impotriva fraudelor, a ne apara drepturile sau proprietatea. De asemenea, este posibil sa fie necesar sa dezvaluim informatiile dvs. pentru a ne conforma obligatiei legale de a raspunde la cererile legale ale autoritatilor. Datele dvs. cu caracter personal vor fi comunicate doar atunci cand consideram, cu buna credinta, ca avem obligatia de a face acest lucru in conformitate cu legea.':
    'Adatokat akkor adunk ki, ha ez a csalás elleni védekezés, illetve jogaink vagy tulajdonunk megóvása érdekében indokolt. Szükség lehet adatainak kiadására azért is, hogy eleget tegyünk a hatóságok jogszerű megkereséseire való válaszadási kötelezettségünknek. Személyes adatait csak akkor közöljük, ha jóhiszeműen úgy ítéljük meg, hogy erre a törvény alapján kötelesek vagyunk.',

  'Vom stoca informatiile dvs. atat timp cat ni se cere prin lege. Daca nu exista nicio cerinta legala, le vom stoca doar atat timp cat este necesar pentru a va putea oferi serviciile noastre. Pe baza unei solicitari trimise catre Usi Garaj Online (usa-garaj.ro) prin email la adresa Office@abbaconfort.ro sau utilizand optiunile disponibile in contul de utilizator de pe site, ne puteti solicita anularea contului de utilizator si stergerea sau anonimizarea datelor.':
    'Adatait addig őrizzük, ameddig a törvény ezt előírja. Ha nincs ilyen jogszabályi előírás, csak addig tároljuk, ameddig szolgáltatásaink nyújtásához szükséges. A Usi Garaj Online (usa-garaj.ro) címére az Office@abbaconfort.ro e-mail-címen küldött kéréssel, vagy a webhelyen a felhasználói fiókban elérhető beállításokkal kérheti felhasználói fiókja törlését, valamint adatai törlését vagy anonimizálását.',

  'Site-ul Usa Garaj (usa-garaj.ro) este operat de societatea ABBA CONFORT DELIVERY SRL, cu sediul in Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște, inscrisa in Registrul Comertului cu numarul J2024000637154.':
    'A Usa Garaj webhelyet (usa-garaj.ro) az ABBA CONFORT DELIVERY SRL üzemelteti, székhelye: Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște, cégjegyzékszáma: J2024000637154.',

  'Orice date cu caracter personal pe care le detinem in scop de marketing le vom pastra pana in momentul in care ne anuntati ca nu mai doriti sa primiti aceste informari.':
    'A marketingcélból tárolt személyes adatokat addig őrizzük, amíg Ön nem jelzi, hogy a továbbiakban nem kíván ilyen tájékoztatást kapni.',

  'In cazul in care considerati ca orice date cu caracter personal ale dvs. pe care noi le detinem sunt incorecte sau incomplete, aveti posibilitatea sa solicitati consultarea, rectificarea sau stergerea acestor informatii. Ne puteti contacta in acest sens prin email la adresa Office@abbaconfort.ro.':
    'Ha úgy véli, hogy az általunk tárolt személyes adatai pontatlanok vagy hiányosak, kérheti ezek megtekintését, helyesbítését vagy törlését. Ez ügyben az Office@abbaconfort.ro e-mail-címen veheti fel velünk a kapcsolatot.',

  'In cazul in care doriti sa reclamati modul in care am gestionat datele dvs., va rugam sa ne contactati pe email la adresa Office@abbaconfort.ro. Vom analiza reclamatia dvs. si vom colabora cu dvs. pentru rezolvarea problemei.':
    'Ha panasszal kíván élni azzal kapcsolatban, ahogyan az adatait kezeltük, kérjük, írjon nekünk az Office@abbaconfort.ro címre. Megvizsgáljuk a panaszát, és Önnel együttműködve rendezzük az ügyet.',

  'In momentul in care ati gasit un produs pe care doriti sa il achizitionati, apasati pe butonul Adauga in cos. Veti fi apoi directionat automat catre pagina de vizualizare a Cosului de cumparaturi, unde aveti optiunea sa vizualizati lista de produse existente in cos, sa modificati cantitatile pe care doriti sa le achizitionati sau sa renuntati la unul, mai multe sau toate produsele introduse in cos. Pentru a va intoarce din nou la site si a adauga alte produse in cos, actionati butonul Continua cumparaturile.':
    'Amint megtalálta a megvásárolni kívánt terméket, nyomja meg a Kosárba gombot. Ezután automatikusan a Bevásárlókosár oldalra kerül, ahol megtekintheti a kosárban lévő termékek listáját, módosíthatja a megvásárolni kívánt mennyiségeket, illetve eltávolíthat egy, több vagy az összes kosárba tett terméket. Ha vissza szeretne térni a webhelyre és további termékeket tenne a kosárba, használja a Vásárlás folytatása gombot.',

  'Pentru a finaliza comanda, apasati pe butonul Trimite comanda. In cazul in care sunteti client nou, va trebui sa va creati mai intai un cont de utilizator, completand formularul de inregistrare prezent in pagina. Acest proces nu va va rapi mai mult de 1-2 minute, dupa care veti putea finaliza comanda. In cazul in care informatiile pentru plata sunt diferite de informatiile pentru expediere, selectati optiunea Completeaza o noua adresa pentru plata si introduceti informatiile dorite.':
    'A rendelés véglegesítéséhez nyomja meg a Rendelés elküldése gombot. Ha új vásárló, először létre kell hoznia egy felhasználói fiókot az oldalon található regisztrációs űrlap kitöltésével. Ez legfeljebb 1–2 percet vesz igénybe, ezután véglegesítheti a rendelést. Ha a számlázási adatok eltérnek a szállítási adatoktól, válassza az Új számlázási cím megadása lehetőséget, és írja be a kívánt adatokat.',

  'Pentru a plasa comanda, selectati metoda de plata pe care o preferati si folositi campul Comentarii comanda, care va permite sa trimiteti eventuale informatii suplimentare. Dupa ce v-ati asigurat ca sunteti de acord cu Termenii si Conditiile practicate, apasati butonul Trimite comanda pentru a trece la pasul urmator.':
    'A rendelés leadásához válassza ki a kívánt fizetési módot, és használja a Megjegyzés a rendeléshez mezőt, amelyben további információt küldhet. Miután meggyőződött arról, hogy elfogadja az alkalmazandó Általános szerződési feltételeket, nyomja meg a Rendelés elküldése gombot a következő lépéshez.',

  'In functie de caracteristicile comenzii Dvs. si de optiunile disponibile, este posibil sa vi se solicite apoi alegerea unei anumite metode de livrare, careia ii pot fi asociate anumite costuri de transport. Veti putea vizualiza valoarea costurilor de livrare inainte de finalizarea comenzii.':
    'A rendelése jellemzőitől és az elérhető lehetőségektől függően ezután előfordulhat, hogy ki kell választania egy adott szállítási módot, amelyhez szállítási költség társulhat. A szállítási költség összegét a rendelés véglegesítése előtt megtekintheti.',

  /* --- prima pagină, texte de secțiune ---------------------------------- */

  'Desenele nu sunt ilustrații decorative: lățimea, înălțimea, pasul lamelei, caseta și ghidajele sunt redate la scară, din specificația fiecărui produs. Treceți cu cursorul peste o cartelă ca să vedeți fotografia reală.':
    'A rajzok nem díszítő illusztrációk: a szélesség, a magasság, a lamellaosztás, a tok és a vezetősínek mind méretarányosan, az egyes termékek műszaki adatai alapján készültek. Vigye az egérmutatót egy kártya fölé a valódi fénykép megtekintéséhez.',

  'Dacă aveți nevoie de o ușă de garaj nouă, fie că este prima alegere, fie că o înlocuiți pe cea veche, noi suntem soluția. Producem și montăm uși de garaj cu design personalizat și în dimensiuni diverse.':
    'Ha új garázskapura van szüksége — akár az elsőre, akár a régi cseréjére —, nálunk jó helyen jár. Egyedi kivitelben és sokféle méretben gyártunk és szerelünk be garázskapukat.',

  'Ușile de garaj sunt mai mult decât un portal de acces spre garaj. Sunt\n        asigurarea dumneavoastră că bunurile vă sunt protejate. Iar noi le\n        proiectăm și montăm pe cele potrivite, atât pentru spații rezidențiale,\n        cât și comerciale.':
    'A garázskapu több, mint bejárat a garázsba. Ez a biztosíték arra, hogy amije\n        van, védve marad. Mi pedig a megfelelőt tervezzük meg és szereljük be,\n        lakó- és üzleti terekhez egyaránt.',

  'Realizate din aluminiu, astfel de uși de garaj sunt soluția pentru un\n        plus de siguranță și intimitate. Sunt durabile și au marele avantaj de a\n        putea fi montate chiar și în spații înguste. Datorită sistemului de\n        închidere, respectiv deschidere, nu vor ocupa spațiu inutil ca în cazul\n        ușilor clasice.':
    'Az alumíniumból készült garázskapuk a nagyobb biztonság és nyugalom\n        megoldását jelentik. Tartósak, és nagy előnyük, hogy szűk helyre is\n        beszerelhetők. A nyitó- és zárórendszernek köszönhetően nem foglalnak el\n        fölösleges helyet, mint a hagyományos kapuk.',

  'Cu noi veți câștiga un partener pe termen lung. Proiectăm și montăm uși\n      de garaj de tip rulou, acționate prin telecomandă sau cu deschidere\n      clasică, manuală. Serviciile noastre sunt extinse și includ mentenanța,\n      service-ul, precum și proiecte personalizate de uși de garaj.':
    'Nálunk hosszú távú partnerre talál. Redőnyös garázskapukat tervezünk és\n      szerelünk be, távirányítós vagy hagyományos, kézi nyitással. Szolgáltatásaink\n      ennél tovább mennek: karbantartást, szervizt és egyedi garázskapu-projekteket\n      is vállalunk.',

  'Ușile de garaj de tip rulou sunt versatile și se potrivesc în orice\n        spațiu. Sunt o soluție practică pentru siguranța garajului, atât pentru\n        spații comerciale, cât și rezidențiale. Este una dintre alegerile\n        populare, cu mecanism simplu și practic. Funcționează silențios, vă\n        scutesc de efort la închidere și deschidere și vin într-o varietate de\n        culori și dimensiuni.':
    'A redőnyös garázskapuk sokoldalúak, és bármely térbe illenek. Praktikus\n        megoldást jelentenek a garázs biztonságára, üzleti és lakókörnyezetben\n        egyaránt. A népszerű választások közé tartoznak, egyszerű és praktikus\n        szerkezettel. Halkan működnek, megkímélik Önt a nyitás és zárás\n        fáradságától, és sokféle színben és méretben kaphatók.',

  'Un avantaj major al ușilor de garaj de tip rulou este salvarea\n        spațiului. Chiar și când nu dispuneți de un garaj generos ca suprafață, o\n        ușă de acces de tip rulou vă avantajează. Cu închidere și deschidere pe\n        verticală, interiorul îl veți exploata la maximum.':
    'A redőnyös garázskapuk egyik nagy előnye a helytakarékosság. Még akkor is\n        az Ön javára válik egy redőnyös kapu, ha a garázs alapterülete nem bőséges.\n        A függőleges nyitásnak és zárásnak köszönhetően a belső teret a lehető\n        legjobban kihasználhatja.',

  'Sunt o alegere potrivită fie că locuiți la apartament și dețineți un\n        garaj în zona special amenajată pentru astfel de spații de depozitare,\n        fie că locuiți la casă și ați proiectat și garajul ca parte din curtea\n        dumneavoastră.':
    'Jó választás akkor is, ha lakásban él, és a tárolásra kijelölt területen van\n        garázsa, és akkor is, ha házban lakik, és a garázst az udvara részeként\n        tervezte meg.',

  'Astfel de uși de tip rulou vor deservi și celor care au hale sau alte\n        tipuri de spații comerciale, depozite. Proiectăm personalizat, în funcție\n        de dimensiunile dorite, în culoarea dorită!':
    'Az ilyen redőnykapuk azoknak is megfelelnek, akiknek csarnokuk vagy más\n        üzlethelyiségük, raktáruk van. Egyedileg tervezünk, az Ön által kívánt\n        méretben és színben!',

  'Știm, nu suntem toți la fel, iar despre gusturi nu discutăm. Ne place\n        să creăm, să ne distingem prin ofertele personalizate. Solicitați acum\n        serviciile noastre, ușile dorite, după caracteristicile dorite. Pentru\n        noi va fi o provocare pe care o acceptăm numaidecât!':
    'Tudjuk, nem vagyunk egyformák, és ízlésekről nem vitatkozunk. Szeretünk\n        alkotni, és az egyedi ajánlatokkal tűnünk ki. Kérje most szolgáltatásainkat:\n        a kívánt kaput, a kívánt jellemzőkkel. Nekünk ez olyan kihívás, amelyet\n        habozás nélkül elfogadunk!',

  'Cifrele pornesc din lista de prețuri a\n        producătorului și sunt în euro. Prețul final depinde de culoare, de\n        condițiile de montaj și de cursul valutar din ziua comenzii. Pentru o\n        ofertă fermă,':
    'A számok a gyártó árlistájából indulnak, és euróban értendők. A végleges ár\n        a színtől, a beépítési körülményektől és a rendelés napján érvényes\n        árfolyamtól függ. Kötelező érvényű ajánlatért',

  'Catalogul întreg, cu prețurile și reducerile din magazin. Filtrele de mai jos lucrează pe aceeași listă: 15 de uși cu lamelă de 55 mm și 6 cu lamelă de 77 mm.':
    'A teljes katalógus, az üzlet áraival és kedvezményeivel. Az alábbi szűrők ugyanezen a listán dolgoznak: 15 kapu 55 mm-es lamellával és 6 kapu 77 mm-es lamellával.',

  'Plata online cu cardul nu este deocamdată activă în magazin. Până la\n      activarea ei, comenzile se achită ramburs la livrare sau prin transfer\n      bancar. Pentru orice nelămurire ne puteți suna la':
    'Az online bankkártyás fizetés az üzletben egyelőre nem aktív. Amíg nem lesz\n      az, a rendelések utánvéttel vagy banki átutalással fizethetők. Bármilyen\n      kérdés esetén hívjon minket:',

  'Aveți dreptul de a vă retrage din contract în termen de 14 zile de la\n      livrare, conform OUG 34/2014. Sumele se restituie în maximum 14 zile de la data la care am fost informați de decizia de retragere.\n      Condițiile complete sunt în':
    'A 34/2014. sz. román sürgősségi rendelet szerint a szállítástól számított 14\n      napon belül elállhat a szerződéstől. Az összegeket legfeljebb 14 napon belül térítjük vissza attól a naptól számítva, amikor az elállási döntésről értesültünk.\n      A teljes feltételek itt olvashatók:',

  'Acest website poate folosi cookie-uri atat proprii, cat si provenind de la terti, pentru a furniza vizitatorilor o experienta mult mai buna de navigare si servicii adaptate nevoilor si interesului fiecaruia.':
    'Ez a webhely saját és harmadik féltől származó sütiket is használhat annak érdekében, hogy a látogatóknak sokkal jobb böngészési élményt és az egyéni igényekhez, érdeklődéshez igazított szolgáltatásokat nyújtson.',

  'Personalizarea anumitor setari precum: limba in care este vizualizat un site, moneda in care se exprima anumite preturi sau tarife, pastrarea optiunilor pentru diverse produse (masuri, alte detalii etc) in cosul de cumparaturi (si memorarea acestor optiuni), salvarea anumitor preferinte in vederea reutilizarii viitoare.':
    'Bizonyos beállítások személyre szabása, például: milyen nyelven jelenik meg a webhely, milyen pénznemben szerepelnek egyes árak vagy díjak, a különféle termékekhez tartozó beállítások (méretek, egyéb részletek stb.) megőrzése a bevásárlókosárban (és e beállítások megjegyzése), valamint egyes preferenciák mentése későbbi felhasználásra.',

  'Cookie-urile ofera detinatorilor de site-uri un feedback valoros asupra modului cum sunt utilizate site-urile lor de catre utilizatori, astfel incat sa le poata face si mai eficiente si mai usor accesibile.':
    'A sütik értékes visszajelzést adnak a webhelytulajdonosoknak arról, hogyan használják a látogatók a webhelyüket, így azt még hatékonyabbá és könnyebben elérhetővé tehetik.',

  'Permit aplicatiilor multimedia sau de alt tip de pe alte site-uri sa fie incluse intr-un anumit site pentru a crea o experienta de navigare mai valoroasa, mai utila si mai placuta.':
    'Lehetővé teszik, hogy más webhelyek multimédiás vagy egyéb alkalmazásai beépüljenek egy adott webhelybe, értékesebb, hasznosabb és kellemesebb böngészési élményt teremtve.',

  'Un Cookie este un fisier de mici dimensiuni, format din litere si numere, care va fi stocat pe computerul, terminalul mobil sau alte echipamente ale unui utilizator de pe care se acceseaza Internetul.':
    'A süti egy kisméretű, betűkből és számokból álló fájl, amely a felhasználó számítógépén, mobileszközén vagy más, internetezésre használt eszközén tárolódik.',

  'Cookie-ul este instalat prin solicitara emisa de catre un web-server unui browser (ex: Chrome, Firefox) si este complet “pasiv” (nu contine programe software, virusi sau spyware si nu poate accesa informatiile de pe hard drive-ul utilizatorului).':
    'A sütit a webkiszolgáló kérésére telepíti a böngésző (például Chrome, Firefox), és teljesen „passzív” (nem tartalmaz szoftvert, vírust vagy kémprogramot, és nem fér hozzá a felhasználó merevlemezén lévő adatokhoz).',

  'Un cookie este format din 2 parti: numele si continutul sau valoarea cookie-ului. Mai mult, durata de existenta a unui cookie este determinata; tehnic, doar webserverul care a trimis cookie-ul il poate accesa din nou in momentul in care un utilizator se intoarce pe website-ul asociat webserverului respectiv.':
    'A süti 2 részből áll: a névből, valamint a süti tartalmából vagy értékéből. Élettartama ugyancsak meghatározott; műszakilag csak az a webkiszolgáló olvashatja el újra, amelyik küldte, amikor a felhasználó visszatér az adott kiszolgálóhoz tartozó webhelyre.',

  'Cookie-urile in sine nu solicita informatii cu caracter personal pentru a putea fi utilizate si, in cele mai multe cazuri, nu identifica personal utilizatorii de internet.':
    'Maguk a sütik nem igényelnek személyes adatokat a működésükhöz, és a legtöbb esetben nem azonosítják személy szerint az internethasználókat.',

  'Cookie-uri de sesiune &#8211; acestea sunt stocate temporar in dosarul de cookie-uri al browserului web pentru ca acesta sa le memoreze pana cand utilizatorul inchide fereastra browserului sau se delogheaza de pe site-ul respectiv.':
    'Munkamenet-sütik &#8211; ezek ideiglenesen a böngésző sütimappájában tárolódnak, hogy a böngésző megőrizze őket, amíg a felhasználó be nem zárja a böngészőablakot, vagy ki nem jelentkezik az adott webhelyről.',

  'Cookie-uri Persistente &#8211; Acestea sunt stocate pe hard-drive-ul unui computer sau echipament (si in general depinde de durata de viata prestabilita pentru cookie). Cookie-urile persistente le includ si pe cele plasate de un alt website decat cel pe care il viziteaza utilizatorul la momentul respectiv &#8211; cunoscute sub numele de &#8216;third party cookies’ (cookieuri plasate de terti) &#8211; care pot fi folosite in mod anonim pentru a memora preferintele unui utilizator.':
    'Állandó sütik &#8211; ezek a számítógép vagy eszköz merevlemezén tárolódnak (és általában a sütihez beállított élettartamtól függenek). Az állandó sütik közé tartoznak azok is, amelyeket nem az éppen látogatott webhely helyez el &#8211; ezeket „harmadik féltől származó sütiknek” nevezzük &#8211;, és névtelenül használhatók a felhasználó beállításainak megjegyzésére.',

  'Un cookie contine informatii care fac legatura intre un web-browser (utilizatorul) si un web-server anume (website-ul). Daca un browser acceseaza acel web-server din nou, acesta poate citi informatia deja stocata si reactiona in consecinta. Cookie-urile asigura userilor o experienta placuta de navigare si sustin eforturile multor websiteuri pentru a oferi servicii confortabile utilizatorillor: ex &#8211; preferintele in materie de confidentialitate online, optiunile privind limba site-ului, cosuri de cumparaturi sau publicitate relevanta.':
    'A süti olyan adatokat tartalmaz, amelyek összekötik a böngészőt (a felhasználót) egy adott webkiszolgálóval (a webhellyel). Ha a böngésző ismét eléri azt a kiszolgálót, az elolvashatja a már tárolt adatot, és ennek megfelelően reagálhat. A sütik kellemes böngészési élményt adnak, és számos webhely törekvését segítik abban, hogy kényelmes szolgáltatásokat nyújtsanak: például &#8211; online adatvédelmi beállítások, a webhely nyelvének megválasztása, bevásárlókosarak vagy releváns hirdetések.',

  'Cookie-urile sunt administrate de webservere. Durata de viata a unui cookie poate varia semnificativ, depinzand de scopul pentru care este plasat. Unele cookie-uri sunt folosite exclusive pentru o singura sesiune (cookie-uri de sesiune) si nu mai sunt retinute odata de utilizatorul a parasit website-ul si unele cookie-uri sunt retinute si refolosite de fiecare data cand utilizatorul revine pe acel website (cookie-uri permanente). Cu toate aceste, cookie-urile pot fi sterse de un utilizator in orice moment prin intermediul setarilor browserului.':
    'A sütiket a webkiszolgálók kezelik. Egy süti élettartama jelentősen változhat attól függően, milyen célból helyezték el. Egyes sütiket kizárólag egyetlen munkamenethez használnak (munkamenet-sütik), és a webhely elhagyása után már nem őrzi meg őket a böngésző; más sütik megmaradnak, és minden visszatéréskor újra felhasználásra kerülnek (állandó sütik). A sütik ugyanakkor a böngésző beállításain keresztül bármikor törölhetők.',

  'Anumite sectiuni de continut de pe unele site-uri pot fi furnizate prin intermediul unor terte parti/ furnizori (ex: un video, o reclama, o aplicatie de chat, etc). Aceste terte parti pot plasa de asemenea cookieuri prin intermediul site-ului si ele se numesc “third party cookies” pentru ca nu sunt plasate de proprietarul website-ului respectiv. Furnizorii terti trebuie sa respecte de asemenea legea in vigoare si politicile de confidentialitate ale detinatorului site-ului.':
    'Egyes webhelyeken bizonyos tartalmi részeket harmadik felek vagy szolgáltatók biztosíthatnak (például videó, hirdetés, csevegőalkalmazás). Ezek a harmadik felek szintén elhelyezhetnek sütiket a webhelyen keresztül; ezeket „harmadik féltől származó sütiknek” nevezzük, mert nem az adott webhely tulajdonosa helyezi el őket. A külső szolgáltatóknak szintén be kell tartaniuk a hatályos jogszabályokat és a webhelytulajdonos adatvédelmi szabályzatát.',

  'Cookie-urile asigura utilizatorilor o experienta placuta de navigare si sustin eforturile noastre pentru a oferi servicii confortabile utilizatorilor prin functionalitati precum preferintele in materie de confidentialitate online, cosul de cumparaturi sau publicitate relevanta. De asemenea, sunt utilizate in pregatirea unor statistici anonime agregate care ne ajuta sa intelegem cum un utilizator beneficiaza de paginile noastre web, permitandu-ne imbunatatirea structurii si continutului lor, excluzand indentificarea personala a utilizatorului.':
    'A sütik kellemes böngészési élményt biztosítanak, és segítik törekvésünket, hogy kényelmes szolgáltatásokat nyújtsunk olyan funkciókkal, mint az online adatvédelmi beállítások, a bevásárlókosár vagy a releváns hirdetések. Névtelen, összesített statisztikák készítéséhez is használjuk őket, amelyekből megérthetjük, hogyan használják látogatóink az oldalainkat, így javíthatjuk azok felépítését és tartalmát — a felhasználó személyes azonosítása nélkül.',

  'Cookie-urile de inregistrare sunt generate atunci cand un utilizator se inregistreaza pe acest site, cu scopul de a ne informa ulterior daca acesta este inregistrat sau nu. Serverele noastre folosesc aceste cookie-uri pentru a ne arata contul cu care esti inregistrat si pentru a-ti oferi o experienta mai facila de interactiune cu site-ul.':
    'A regisztrációs sütik akkor jönnek létre, amikor a felhasználó regisztrál ezen a webhelyen, és arról tájékoztatnak minket később, hogy regisztrált-e. Kiszolgálóink ezekből a sütikből tudják, melyik fiókkal van bejelentkezve, és ezek teszik egyszerűbbé a webhellyel való interakciót.',

  'Alte cookie-uri pe care le plasam pentru a-ti permite utilizarea optima a site-ului sunt cookie-urile corespunzatoare cosului de cumparaturi si listelor de Favorite (cu rolul de a salva informatiile aferente produselor pe care le-ai adaugat in cos sau ca Favorite), cookie-urile de localizare (utilizate pentru a stabili locatia ta in functie de IP, cu scopul de a precompleta anumite campuri necesare la inregistrare sau plasarea de comenzi), cookie-urile de sesiune generate la accesare si sterse automat la inchiderea browser-ului (necesare pentru functionarea protocolului HTTP, completarea anumitor formulare, interactiunea cu anumite elemente din site etc.), cookie-urile care recunosc tipul de terminal folosit &#8211; desktop sau mobile, cookie-uri ale aplicatiilor de chat care permit discutii in timp real cu serviciul de relatii cu clientii.':
    'További sütik, amelyeket a webhely optimális használata érdekében helyezünk el: a bevásárlókosárhoz és a Kedvencek listákhoz tartozó sütik (amelyek a kosárba tett vagy Kedvencekhez adott termékek adatait őrzik meg); helymeghatározó sütik (amelyek az IP-cím alapján állapítják meg a tartózkodási helyet, hogy előre kitölthessenek bizonyos, a regisztrációhoz vagy a rendelés leadásához szükséges mezőket); munkamenet-sütik, amelyek a belépéskor jönnek létre és a böngésző bezárásakor automatikusan törlődnek (ezek szükségesek a HTTP protokoll működéséhez, egyes űrlapok kitöltéséhez, a webhely bizonyos elemeivel való interakcióhoz stb.); a használt eszköz típusát &#8211; asztali vagy mobil &#8211; felismerő sütik; valamint a csevegőalkalmazások sütijei, amelyek valós idejű beszélgetést tesznek lehetővé az ügyfélszolgálattal.',

  'Cookie-urile de analiza a traficului permit masurarea in mod agregat a traficul site-ului, identificarea surselelor de trafic, ofera informatii despre cele mai vizitate sau cele mai putin accesate pagini, precum si despre modul in care utilizatorii interactioneaza cu site-ul. Informatiile enumerate sunt colectate in mod agregat si implicit complet anonim. Aceste cookie-uri pot proveni din partea unor terti precum servicii de Web Analytics (Ex: Google Analytics).':
    'A forgalomelemző sütik lehetővé teszik a webhely forgalmának összesített mérését és a forgalom forrásainak azonosítását; tájékoztatnak a leglátogatottabb és a legkevésbé látogatott oldalakról, valamint arról, hogyan lépnek kapcsolatba a felhasználók a webhellyel. A felsorolt adatok összesítve, és így teljesen névtelenül gyűlnek. Ezek a sütik harmadik felektől, például webanalitikai szolgáltatásoktól is származhatnak (például Google Analytics).',

  'Acest tip de cookie-uri poate fi folosit de catre aceste servicii pentru a determina un anumit profil al vizitatorilor si pentru a-ti afisa mesaje publicitare relevante pe alte site-uri pe care le vizitezi.':
    'Az ilyen típusú sütiket ezek a szolgáltatások arra használhatják, hogy profilt alkossanak a látogatókról, és releváns hirdetéseket jelenítsenek meg Önnek más, meglátogatott webhelyeken.',

  'Datorita modului de utilizare, acest site nu poate accesa aceste cookie-uri provenite de la terti, la fel cum tertele parti nu pot accesa cookie-urile detinute de acest site. De exemplu, cand distribuiti un articol folosind butonul pentru retelele sociale aflat pe acest site, acea retea sociala va inregistra activitatea dvs.':
    'Működésükből adódóan ez a webhely nem fér hozzá a harmadik felektől származó sütikhez, ahogyan a harmadik felek sem férnek hozzá a webhely saját sütijeihez. Ha például megoszt egy cikket a webhelyen található közösségimédia-gombbal, az adott közösségi hálózat rögzíti az Ön tevékenységét.',

  'Cookie-urile pastreaza informatii intr-un fisier text de mici dimensiuni care permit unui website sa recunoasca un browser. Webserverul va recunoaste browserul pana cand cookie-ul expira sau este sters. Cookie-ul stocheaza informatii importante care imbunatatesc experienta de navigare pe Internet ( ex: pastrarea unui user logat in contul sau de utilizator; pastrarea produselor in cosul de cumparaturi; pastrarea produselor in lista de Favorite).':
    'A sütik egy kisméretű szövegfájlban őrzik meg azokat az adatokat, amelyek alapján a webhely felismer egy böngészőt. A webkiszolgáló addig ismeri fel a böngészőt, amíg a süti le nem jár vagy törlésre nem kerül. A süti olyan fontos adatokat tárol, amelyek javítják az internetes böngészés élményét (például: a felhasználó bejelentkezve tartása a fiókjában; a termékek megőrzése a bevásárlókosárban; a termékek megőrzése a Kedvencek listán).',

  'Cookie-urile reprezinta punctul central al functionarii eficiente a Internetului, ajutand la generarea unei experiente de navigare prietenoase si adaptata preferintelor si intereselor fiecarui utilizator. Refuzarea sau dezactivarea cookieurilor poate ingreuna utilizarea unui site.':
    'A sütik az internet hatékony működésének központi elemei: barátságos, az egyes felhasználók igényeihez és érdeklődéséhez igazított böngészési élményt segítenek létrehozni. A sütik elutasítása vagy letiltása megnehezítheti egy webhely használatát.',

  'Refuzarea sau dezactivarea cookie-urilor nu inseamna ca nu veti mai primi publicitate online &#8211; ci doar ca aceasta nu va mai putea tine cont de preferintele si interesele dvs, evidentiate prin comportamentul de navigare.':
    'A sütik elutasítása vagy letiltása nem jelenti azt, hogy többé nem kap online hirdetéseket &#8211; csupán azt, hogy azok nem tudják majd figyelembe venni a böngészési szokásaiból kirajzolódó igényeit és érdeklődését.',

  'Masurarea, optimizare si caracteristicile de analytics &#8211; cum ar fi confirmarea unui anumit nivel de trafic pe un website, ce tip de continut este vizualizat si modul cum un utilizator ajunge pe un website (ex prin motoare de cautare, direct, din alte website-uri etc). Website-urile deruleaza aceste analize a utilizarii lor pentru a imbunatati site-urile in beneficiul userilor.':
    'Mérési, optimalizálási és analitikai funkciók &#8211; például egy adott forgalmi szint megerősítése egy webhelyen, hogy milyen tartalmat néznek meg, és hogyan jut el a felhasználó a webhelyre (például keresőmotorokon át, közvetlenül, más webhelyekről stb.). A webhelyek azért végzik el ezeket a használati elemzéseket, hogy a felhasználók javára fejlesszék az oldalaikat.',

  'Cookie-urile folosesc formate tip plain text. Nu sunt alcatuite din bucati de cod asa ca nu pot fi executate nici nu pot auto-rula. In consecinta, nu se pot duplica sau replica pe alte retele pentru a se rula sau replica din nou. Cookie-urile pot fi totusi folosite pentru scopuri negative. Deoarece stocheaza informatii despre preferintele si istoricul de navigare al utilizatorilor, atat pe un anume site cat si pe mai multe alte siteuri, cookieurile pot fi folosite ca o forma de Spyware. Multe produse anti-spyware sunt constiente de acest fapt si in mod constant marcheaza cookie-urile pentru a fi sterse in cadrul procedurilor de stergere/scanare anti-virus/anti-spyware.':
    'A sütik egyszerű szöveges formátumot használnak. Nem kódrészletekből állnak, így nem futtathatók és nem indulnak el maguktól. Ebből következően nem képesek megsokszorozódni vagy más hálózatokra átmásolódni, hogy ott újra lefussanak. A sütik ugyanakkor rossz célra is felhasználhatók. Mivel adatokat tárolnak a felhasználók beállításairól és böngészési előzményeiről — egy adott webhelyen és több más webhelyen egyaránt —, a sütik a kémprogramok egy formájaként is használhatók. Számos kémprogram-elhárító termék tisztában van ezzel, és a víruskeresési, illetve kémprogram-eltávolítási eljárások során rendszeresen törlésre jelöli a sütiket.',

  'In general browserele au integrate setari de confidentialitate care furnizeaza diferite nivele de acceptare a cookie-urilor, perioada de valabilitate si stergere automata dupa ce utilizatorul a vizitat un anumit site. Alte aspecte de securitate legate de cookie-uri':
    'A böngészők általában beépített adatvédelmi beállításokat kínálnak, amelyek a sütik elfogadásának különböző szintjeit, eltérő érvényességi időt, valamint egy adott webhely meglátogatása utáni automatikus törlést tesznek lehetővé. A sütikkel kapcsolatos további biztonsági kérdések',

  'Deoarece protectia identitatii este foarte valoroasa si reprezinta dreptul fiecarui utilizator de internet, este indicat sa se stie ce eventuale probleme pot crea cookie-urile. Pentru ca prin intermediul lor se transmit in mod constant in ambele sensuri informatii intre browser si website, daca un atacator sau persoana neautorizata intervine in parcursul de transmitere a datelor, informatiile continute de cookie pot fi interceptate. Desi foarte rar, acest lucru se poate intampla daca browserul se conecteaza la server folosind o retea necriptata (ex: o retea WiFi nesecurizata).':
    'Mivel a személyazonosság védelme nagyon értékes, és minden internethasználó joga, érdemes tudni, milyen problémákat okozhatnak a sütik. Mivel rajtuk keresztül folyamatosan, mindkét irányban áramlanak adatok a böngésző és a webhely között, a süti tartalma lehallgathatóvá válik, ha egy támadó vagy illetéktelen személy beavatkozik az adatátvitelbe. Bár igen ritkán, ez előfordulhat, ha a böngésző titkosítatlan hálózaton keresztül csatlakozik a kiszolgálóhoz (például nem védett Wi-Fi-hálózaton).',

  'Alte atacuri bazate pe cookie implica setari gresite ale cookieurilor pe servere. Daca un website nu solicita browserului sa foloseasca doar canale criptate, atacatorii pot folosi aceasta vulnerabilitate pentru a pacali browserele in a trimite informatii prin intermediul canalelor nesecurizate. Atacatorii utilizeaza apoi informatiile in scopuri de a accesa neautorizat anumite site-uri. Este foarte important sa fiti atenti in alegerea metodei celei mai potrivite de protectie a informatiilor personale.':
    'Más, sütikre épülő támadások a sütik hibás kiszolgálóoldali beállításaiból erednek. Ha egy webhely nem követeli meg a böngészőtől, hogy kizárólag titkosított csatornákat használjon, a támadók kihasználhatják ezt a gyengeséget, és rávehetik a böngészőt, hogy nem védett csatornákon küldjön adatokat. Az így megszerzett adatokat azután bizonyos webhelyekhez való jogosulatlan hozzáférésre használják. Nagyon fontos, hogy körültekintően válassza meg a személyes adatai védelmének legmegfelelőbb módját.',

  'Datorita flexibilitatii lor si a faptului ca majoritatea dintre cele mai vizitate site-uri si cele mai mari folosesc cookieuri, acestea sunt aproape inevitabile. Dezactivarea cookie-urilor nu va permite accesul utilizatorului pe site-urile cele mai raspandite si utilizate printre care Youtube, Gmail, Facebook, Yahoo si altele. Iata cateva sfaturi care va pot asigura ca nevigati fara griji insa cu ajutorul cookieurilor:':
    'Rugalmasságuk miatt, és mivel a legnagyobb és leglátogatottabb webhelyek többsége használja őket, a sütik szinte elkerülhetetlenek. A sütik letiltásával a felhasználó nem érheti el a legelterjedtebb és leggyakrabban használt webhelyeket, köztük a YouTube-ot, a Gmailt, a Facebookot vagy a Yahoo-t. Íme néhány tanács, amellyel gondtalanul böngészhet, de a sütik előnyeit is élvezheti:',

  'Daca nu va deranjeaza cookie-urile si sunteti singura persoana care utilizeaza computerul, puteti seta termene lungi de expirare pentru stocarea istoricului de navigare si al datelor personale de acces.':
    'Ha a sütik nem zavarják, és egyedül használja a számítógépet, hosszú lejárati időt állíthat be a böngészési előzmények és a személyes belépési adatok tárolására.',

  'Daca impartiti accesul la calculator, puteti lua in considerare setarea browserului pentru a sterge datele individuale de navigare de fiecare data cand inchideti browserul. Aceasta este o varianta de a accesa site-urile care plaseaza cookieuri si de a sterge orice informatie de vizitare la inchiderea sesiunii navigare.':
    'Ha másokkal osztozik a számítógépen, érdemes lehet úgy beállítani a böngészőt, hogy minden bezáráskor törölje az egyéni böngészési adatokat. Így elérheti a sütiket elhelyező webhelyeket, a böngészési munkamenet végén viszont minden látogatási adat törlődik.',

  'Multe dintre aplicatiile de detectare si prevenire a spyware-ului includ detectarea atacurilor pe site-uri. Astfel, impiedica browserul de la a accesa website-uri care ar putea sa exploateze vulnerabilitatile browserului sau sa descarce software periculos. Asigurati-va ca aveti browserul mereu updatat. Multe dintre atacurile bazate pe cookies se realizeaza exploatand punctele slabe ale versiunilor vechi ale browserelor.':
    'A kémprogramok felderítésére és megelőzésére szolgáló alkalmazások közül sok a webhelyek elleni támadásokat is észleli. Így megakadályozzák, hogy a böngésző olyan webhelyeket érjen el, amelyek kihasználhatnák a böngésző sebezhetőségeit, vagy veszélyes szoftvert töltenének le. Gondoskodjon róla, hogy a böngészője mindig naprakész legyen. A sütikre épülő támadások közül sok a régi böngészőváltozatok gyenge pontjait használja ki.',

  'Cookie-urile sunt pretutindeni si nu pot fi evitate daca doriti sa va bucurati de accesul la cele mai populare site-uri de pe Internet. Cu o intelegere clara a modului lor de operare si a beneficiilor pe care le aduc, puteti lua masurile necesare de securitate astel incat sa puteti naviga cu incredere pe internet.':
    'A sütik mindenütt jelen vannak, és nem kerülhetők el, ha élvezni szeretné az internet legnépszerűbb webhelyeit. Ha világosan érti a működésüket és az előnyeiket, megteheti a szükséges biztonsági lépéseket, hogy nyugodtan böngésszen az interneten.',

  'Este posibila configurarea browserului pentru ca aceste cookie-uri sa nu mai fie acceptate sau poti configura browserul sa accepte cookie-uri doar de la un site anume.':
    'Beállíthatja úgy a böngészőt, hogy ezeket a sütiket ne fogadja el, vagy hogy csak egy adott webhelyről fogadjon el sütiket.',

  'Toate browserele moderne ofera posibilitatea de a configura preferinte de stocare a cookie-urilor. Aceste setari se gasesc de regula in “optiuni” sau in meniul de “preferinte” al browserului tau. Pentru a intelege aceste setari, puteti folosi optiunea “ajutor” a browserului pentru mai multe detalii.':
    'Minden korszerű böngésző lehetővé teszi a sütik tárolására vonatkozó beállítások megadását. Ezek a beállítások általában a böngésző „beállítások” menüjében találhatók. A beállítások megértéséhez a böngésző „súgó” funkciójában talál részletesebb tájékoztatást.',

  'Ușă garaj tip rulou cu lamele de 55 mm reprezintă o variantă economică și fiabilă pentru închiderea garajelor, spațiilor comerciale, magazine, chioșcuri, foișoare, pontoane barcă. Prin sistemul de rulare a covorului de lamele în caseta superioară, se poate monta cu ușurință oriunde.':
    'Az 55 mm-es lamellás redőnyös garázskapu gazdaságos és megbízható megoldás garázsok, üzlethelyiségek, boltok, pavilonok, filagóriák és csónakkikötők lezárására. Mivel a lamellapáncél a felső tokba tekeredik, szinte bárhová könnyen beszerelhető.',

  'Ușă de garaj tip rulou cu lamele de 77 mm reprezintă o variantă economică și fiabilă pentru închiderea garajelor, spațiilor comerciale, magazine, chioșcuri, foișoare, pontoane barcă. Prin sistemul de rulare a covorului de lamele în caseta superioară, se poate monta cu ușurință oriunde.':
    'A 77 mm-es lamellás redőnyös garázskapu gazdaságos és megbízható megoldás garázsok, üzlethelyiségek, boltok, pavilonok, filagóriák és csónakkikötők lezárására. Mivel a lamellapáncél a felső tokba tekeredik, szinte bárhová könnyen beszerelhető.',

  'Componentele folosite la producția ușii sunt de cea mai bună calitate, fiind realizate din aluminiu (ghidaje laterale, casetă superioară și lamele injectate cu spumă poliuretanică). Vopseaua este aplicată prin vopsire în câmp electrostatic și are o bună rezistență în timp, durata de utilizare a produsului fiind mai mare de 10 ani.':
    'A kapu gyártásához használt alkatrészek a legjobb minőségűek, alumíniumból készülnek (oldalsó vezetősínek, felső tok és poliuretán habbal töltött lamellák). A festést elektrosztatikus térben viszik fel, jól bírja az időt, a termék használati élettartama pedig meghaladja a 10 évet.',

  'Gama variată de culori se încadrează perfect în arhitectura oricărei construcții, culorile standard fiind următoarele: alb, maro deschis, maro închis, argintiu, gri antracit, nuc, stejar auriu, wenghe, mahon. De asemenea, se poate vopsi în orice culoare din paletarul RAL, la un cost suplimentar.':
    'A széles színválaszték tökéletesen illeszkedik bármely épület építészeti kialakításához. A standard színek: fehér, világosbarna, sötétbarna, ezüst, antracitszürke, dió, aranytölgy, wenge és mahagóni. Felár ellenében a RAL-paletta bármely színére festhető.',

  'O alegere excelentă fie că vorbim de un garaj zilnic utilizat, aflat în perimetrul casei sau aproape orice tip de spațiu de depozitare. Securizează perimetrul, este antiefracție, dar are și un preț accesibil.':
    'Kiváló választás akár a ház területén lévő, naponta használt garázshoz, akár szinte bármilyen tárolóhelyiséghez. Biztonságossá teszi a területet, betörésálló, ráadásul kedvező árú.',

  'Lamelele sunt umplute cu spumă poliuretanică, ceea ce le face mai rezistente și eficiente în ceea ce privește izolarea fonică și termică în interiorul spațiului. Durabile chiar și expuse diferențelor de temperaturi.':
    'A lamellák poliuretán habbal töltöttek, ettől erősebbek, és hatékonyabban szigetelik a teret hang és hő ellen. Tartósak akkor is, ha nagy hőmérséklet-ingadozásnak vannak kitéve.',

  'Materialele de calitate contribuie la o rezistență îndelungată. Ușa de garaj de tip rulou ABBA este din aluminiu, elementele sale componente sunt vopsite prin procedee speciale.':
    'A minőségi anyagok tartós ellenállóságot eredményeznek. Az ABBA redőnyös garázskapu alumíniumból készül, alkatrészeit különleges eljárásokkal festik.',

  'Ușa de garaj de tip rulou, cu acționare automată, vă optimizează timpii de deschidere, vine cu extra confort pentru utilizator. Menține bunurile în siguranță, are sistem de acces facil, închidere și deschidere rapidă, silențioasă. Ușa de garaj este durabilă și potrivită pentru orice tip de spațiu, inclusiv pentru cei care au nevoie de ușă de acces la garajul integrat în proiectul casei.':
    'Az automata redőnyös garázskapu lerövidíti a nyitási időt, és nagyobb kényelmet ad a használónak. Biztonságban tartja a javakat, könnyen járható, gyorsan és halkan nyílik és záródik. A kapu tartós, és bármilyen térhez illik, azoknak is, akiknek a ház tervébe épített garázshoz kell bejárat.',

  'Este utilă și nu ocupă foarte mult spațiu pentru că lamelele se strâng într-o casetă, oferind în același timp un spațiu de acces foarte mare. Este o ușă perfectă pentru un spațiu de depozitare sau chiar pentru garajul pentru mașină. Este silențioasă și se deschide/închide în doar 10 secunde.':
    'Hasznos, és kevés helyet foglal, mert a lamellák tokba tekerednek, miközben nagyon nagy szabad átjárást hagynak. Tökéletes kapu tárolóhelyiséghez, de a gépkocsi garázsához is. Halk, és mindössze 10 másodperc alatt nyílik, illetve záródik.',

  'Datorită materialelor din care este confecționată și procesului electrochimic prin care este vopsită, ușa va rezista în aceleași condiții în timp. De asemenea izolează fonic și termic spațiul interior.':
    'Az anyagoknak és az elektrokémiai festési eljárásnak köszönhetően a kapu az évek során is megőrzi állapotát. A belső teret ezenfelül hang és hő ellen is szigeteli.',

  /* --- restul paginilor de produs și de listă --------------------------- */

  'Promoții: 16 produse în catalogul Usa-garaj.ro. Produsele aflate în categoria „PROMOȚII” a magazinului. Prețul tăiat și cel curent sunt cele din magazin, neschimbate.':
    'Akciók: 16 termék a Usa-garaj.ro katalógusában. Az üzlet „AKCIÓK” kategóriájában szereplő termékek. Az áthúzott és az aktuális ár az üzletből származik, változatlanul.',
  'Produsele aflate în categoria „PROMOȚII” a magazinului. Prețul tăiat și cel curent sunt cele din magazin, neschimbate.':
    'Az üzlet „AKCIÓK” kategóriájában szereplő termékek. Az áthúzott és az aktuális ár az üzletből származik, változatlanul.',
  'Contact Usa-garaj.ro: telefon 0731 366 613, e-mail Office@abbaconfort.ro. ABBA CONFORT DELIVERY SRL, CUI 49968876, J2024000637154, Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște.':
    'Kapcsolat — Usa-garaj.ro: telefon 0731 366 613, e-mail Office@abbaconfort.ro. ABBA CONFORT DELIVERY SRL, adószám 49968876, cégjegyzékszám J2024000637154, Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște.',
  'Spuneți-ne dimensiunile golului și culoarea dorită, iar noi vă răspundem cu varianta potrivită din catalog sau cu o ofertă la comandă.':
    'Adja meg a nyílás méreteit és a kívánt színt, mi pedig a katalógus megfelelő változatával vagy egyedi ajánlattal válaszolunk.',
  'Pentru o ofertă corectă, trimiteți-ne lățimea și înălțimea golului măsurate\n      la zid, precum și spațiul disponibil deasupra golului, necesar pentru\n      montarea casetei.':
    'A pontos ajánlathoz küldje el a nyílás falnál mért szélességét és magasságát,\n      valamint a nyílás fölött rendelkezésre álló helyet, amely a tok\n      beszereléséhez szükséges.',
  'Răspunsuri la întrebările frecvente despre ușile de garaj tip rulou: acționare fără curent, conținutul livrării, cote, diferența dintre lamela de 55 și 77 mm.':
    'Válaszok a redőnyös garázskapukkal kapcsolatos gyakori kérdésekre: működtetés áram nélkül, a szállítás tartalma, méretek, az 55 és a 77 mm-es lamella közötti különbség.',
  'Metode de plată acceptate de Usa-garaj.ro: ramburs la livrare și transfer bancar. Factură fiscală pentru fiecare comandă.':
    'A Usa-garaj.ro által elfogadott fizetési módok: utánvét és banki átutalás. Minden rendeléshez számlát állítunk ki.',

  'Da. Ușile de garaj tip rulou pot fi echipate cu motor electric și telecomandă, pentru deschidere și închidere rapidă și confortabilă.':
    'Igen. A redőnyös garázskapuk elektromos motorral és távirányítóval szerelhetők fel, a gyors és kényelmes nyitás és zárás érdekében.',
  'Da. În funcție de sistemul de acționare ales, ușa poate fi prevăzută cu sistem de deblocare pentru utilizarea manuală în cazul unei pene de curent.':
    'Igen. A választott hajtásrendszertől függően a kapu kioldószerkezettel látható el a kézi működtetéshez áramkimaradás esetén.',
  'Ușile sunt disponibile în mai multe culori și finisaje, inclusiv variante moderne precum gri antracit, alb, maro și alte nuanțe disponibile în funcție de model.':
    'A kapuk többféle színben és felületkezeléssel kaphatók, köztük olyan korszerű változatokban, mint az antracitszürke, a fehér, a barna és a modelltől függően elérhető további árnyalatok.',
  'Da. Oferim servicii de montaj pentru ușile de garaj, iar echipa noastră poate verifica înainte de instalare condițiile existente și soluția potrivită pentru fiecare lucrare.':
    'Igen. Vállaljuk a garázskapuk beszerelését, és csapatunk a beszerelés előtt ellenőrizni tudja az adott körülményeket és az egyes munkákhoz illő megoldást.',
  'Da. Lamelele din aluminiu și sistemul de închidere contribuie la protejarea garajului împotriva vântului, ploii, zăpezii și prafului, în limitele caracteristicilor tehnice ale modelului ales.':
    'Igen. Az alumínium lamellák és a zárórendszer hozzájárulnak ahhoz, hogy a garázs védve legyen a széltől, esőtől, hótól és portól, a választott modell műszaki jellemzőinek keretei között.',
  'Da. Pentru spațiile comerciale și industriale se pot alege configurații mai robuste, în funcție de dimensiunea golului și frecvența de utilizare.':
    'Igen. Üzleti és ipari terekhez robusztusabb kivitel is választható, a nyílás méretétől és a használat gyakoriságától függően.',
  'Da. Produsele și lucrările beneficiază de garanție conform condițiilor aplicabile. Perioada și condițiile de garanție sunt prezentate la momentul achiziției.':
    'Igen. A termékekre és a munkákra a vonatkozó feltételek szerint garancia jár. A garancia idejét és feltételeit a vásárláskor ismertetjük.',
  'Măsurarea corectă este foarte importantă pentru alegerea dimensiunii ușii, a casetei și a sistemului de montaj. O măsurătoare corectă reduce riscul apariției problemelor la instalare.':
    'A pontos felmérés nagyon fontos a kapu, a tok és a rögzítési rendszer méretének megválasztásához. A helyes mérés csökkenti a beszerelés során felmerülő problémák kockázatát.',
  'Da. Ne puteți trimite fotografii ale garajului și dimensiunile aproximative, iar echipa noastră vă poate indica informațiile necesare pentru stabilirea soluției potrivite.':
    'Igen. Küldhet nekünk fényképeket a garázsról és a hozzávetőleges méreteket, csapatunk pedig megmondja, milyen adatokra van szükség a megfelelő megoldás kiválasztásához.',

  'O astfel de ușă de garaj este o soluție ideală pentru a închide orice fel de spațiu, chiar și unul industrial.':
    'Egy ilyen garázskapu ideális megoldás bármilyen tér lezárására, akár ipari térére is.',
  'Ușa de garaj de tip rulou este potrivită și pentru spații de depozitare, zone comerciale. Montajul este rapid, întreținere minimă pe termen lung.':
    'A redőnyös garázskapu tárolóhelyiségekhez és üzleti területekhez is megfelel. A beszerelés gyors, a hosszú távú karbantartás minimális.',
  'Această pagină nu are încă text publicat pe site-ul magazinului.\n      Până la completarea ei, vă stăm la dispoziție direct:':
    'Ennek az oldalnak még nincs közzétett szövege az üzlet webhelyén.\n      Amíg elkészül, közvetlenül állunk rendelkezésére:',
  'Pentru reclamații și soluționarea alternativă a litigiilor puteți folosi':
    'Panasz esetén és alternatív vitarendezéshez használhatja:',
  'și platforma europeană': 'és az európai platformot',
  'Vă contactăm telefonic pentru stabilirea datei de livrare și a montajului.\n      Dacă aveți întrebări între timp, sunați la':
    'Telefonon felvesszük Önnel a kapcsolatot a szállítás és a beszerelés\n      időpontjának egyeztetése végett. Ha addig kérdése merül fel, hívja a',
  'Proiectăm și montăm uși de garaj tip rulou, adaptate golului existent. Montajul este asigurat de echipa noastră.':
    'Redőnyös garázskapukat tervezünk és szerelünk be, a meglévő nyíláshoz igazítva. A beszerelést saját csapatunk végzi.',
  'Motor tubular, centrală de comandă și două telecomenzi, livrate împreună cu ușa. Deschiderea durează circa 10 secunde.':
    'Csőmotor, vezérlőegység és két távirányító, a kapuval együtt szállítva. A nyitás körülbelül 10 másodpercig tart.',
  'Pentru ușile de garaj standard, în stoc disponibil, puteți comanda\n      imediat în funcție de dimensiuni și culoare.':
    'A raktáron lévő standard garázskapukat méret és szín szerint azonnal\n      megrendelheti.',
  'Introduceți cotele golului și alegeți lamela.\n          Estimarea include ușa, motorul cu telecomandă, accesoriile de\n          deblocare, montajul și transportul.':
    'Adja meg a nyílás méreteit, és válassza ki a lamellát. A becslés tartalmazza\n          a kaput, a távirányítós motort, a kioldótartozékokat, a beszerelést és a\n          szállítást.',
  ', completați datele de livrare și alegeți una\n      dintre metodele de mai jos. Prețurile afișate sunt cele finale, în lei.':
    ', töltse ki a szállítási adatokat, és válasszon az alábbi módok közül.\n      A feltüntetett árak a végleges árak, lejben.',
  'Pentru fiecare comandă emitem factură fiscală, transmisă pe e-mail.\n      Persoanele juridice pot solicita factură proformă înainte de plată, la':
    'Minden rendeléshez számlát állítunk ki, amelyet e-mailben küldünk el.\n      A cégek fizetés előtt díjbekérőt kérhetnek itt:',
  'Produsele au rămas în coș. Puteți relua plata, puteți alege ramburs la\n      livrare sau ne puteți suna la':
    'A termékek a kosárban maradtak. Újrakezdheti a fizetést, választhatja az\n      utánvétet, vagy felhívhat minket:',
  'Magazinul nu publică o fișă de specificații pentru acest produs. Cotele constructive ale familiei de 55 mm sunt în':
    'Az üzlet nem tesz közzé műszaki adatlapot ehhez a termékhez. Az 55 mm-es család szerkezeti méretei itt találhatók:',
  'Dimensiuni standard, ușa de garaj de 2200 × 2100 mm poate fi comandată imediat, în stoc disponibil, cu accesorii incluse.':
    'Standard méret: a 2200 × 2100 mm-es garázskapu azonnal megrendelhető raktárról, tartozékokkal együtt.',
  'Ușa de garaj și componentele sale sunt din aluminiu, se comportă excelent în timp și la uzură și sunt vopsite prin procedeu special, electrochimic.':
    'A garázskapu és alkatrészei alumíniumból készülnek, kiválóan bírják az időt és a kopást, festésük különleges, elektrokémiai eljárással történik.',
  'Sistemul este unul silențios la acționare și dispune de telecomandă, pentru o mai rapidă și ușoară utilizare, de la distanță.':
    'A rendszer halkan működik, és távirányítóval van ellátva a gyorsabb és könnyebb, távolról történő használat érdekében.',
  'Ușa de garaj comandată vine la pachet cu accesoriile necesare. Opțional, puteți solicita centrala cu acționare prin telecomandă, senzor infraroșu și avertizor optic.':
    'A megrendelt garázskapu a szükséges tartozékokkal együtt érkezik. Külön kérhető a távirányítós vezérlőegység, az infravörös érzékelő és a fényjelző.',
  'Componentele folosite la producția ușii sunt de cea mai bună calitate, fiind realizate din aluminiu (ghidaje laterale, casetă superioară și lamele injectate cu spumă poliuretanică). Vopseaua este aplicată prin vopsire în câmp electrostatic și are o bună rezistență in timp.':
    'A kapu gyártásához használt alkatrészek a legjobb minőségűek, alumíniumból készülnek (oldalsó vezetősínek, felső tok és poliuretán habbal töltött lamellák). A festést elektrosztatikus térben viszik fel, és jól bírja az időt.',
  'Componentele folosite la producția ușii sunt de cea mai bună calitate, fiind realizate din aluminiu (ghidaje laterale, casetă superioară și lamele injectate cu spumă poliuretanică). Vopseaua este aplicată prin vopsire în câmp electrostatic și are o bună rezistență în timp.':
    'A kapu gyártásához használt alkatrészek a legjobb minőségűek, alumíniumból készülnek (oldalsó vezetősínek, felső tok és poliuretán habbal töltött lamellák). A festést elektrosztatikus térben viszik fel, és jól bírja az időt.',
  'Gama variată de culori se încadrează perfect în arhitectura oricărei construcții, culorile standard fiind următoarele: alb, maro deschis, maro închis, argintiu, antracit, nuc, stejar auriu. Se poate vopsi în orice culoare din paletarul RAL, la un cost suplimentar.':
    'A széles színválaszték tökéletesen illeszkedik bármely épület építészeti kialakításához. A standard színek: fehér, világosbarna, sötétbarna, ezüst, antracit, dió, aranytölgy. Felár ellenében a RAL-paletta bármely színére festhető.',
  'Alegeți o astfel de ușă pentru siguranța bunurilor din garaj, dar și pentru design-ul elegant ce se va încadra perfect cu orice stil al casei.':
    'Válasszon ilyen kaput a garázsban tárolt javak biztonságáért, és az elegáns kialakításért, amely bármilyen házstílushoz tökéletesen illik.',
  'Ușa de garaj tip rulou poate fi alegerea excelentă pentru dumneavoastră. Este realizată din aluminiu, având lamelele de 77 mm umplute cu spumă poliuretanică având și rolul de a izola fonic și termic. Este calitativă, are un design plăcut și se poate manevra atât electric cât și manual. Aceste uși sunt recunoscute pentru fiabilitatea și siguranța acestora, având de asemenea și rol estetic. Sistemul de închidere și deschidere se efectuează în aproximativ 10 secunde.':
    'A redőnyös garázskapu kiváló választás lehet az Ön számára. Alumíniumból készül, 77 mm-es lamellái poliuretán habbal töltöttek, amelyek egyúttal hang- és hőszigetelnek. Jó minőségű, tetszetős kialakítású, és elektromosan és kézzel is működtethető. Ezek a kapuk megbízhatóságukról és biztonságukról ismertek, emellett esztétikai szerepet is betöltenek. A nyitás és a zárás körülbelül 10 másodperc alatt megy végbe.',
  'În plus, calitatea este reprezentată prin faptul că sunt vopsite prin procedee speciale, electrochimice, acest lucru ducând la o rezistență îndelungată.':
    'Minőségüket az is mutatja, hogy különleges, elektrokémiai eljárással festik őket, ami tartós ellenállóságot eredményez.',
  'Confecționate din aluminiu, cu lamelele umplute cu spumă poliuretanică. Mai jos: cum se citesc cotele din denumirea produsului, cum se află spațiul util de trecere și specificațiile complete ale celor două familii de lamelă.':
    'Alumíniumból, poliuretán habbal töltött lamellákkal. Alább: hogyan kell olvasni a termék nevében szereplő méreteket, hogyan számítható ki a szabad átjárási méret, és mik a két lamellacsalád teljes műszaki adatai.',
  'Secțiune comparativă prin profilul P55 și profilul PA77, cu cotele 55 / 12 mm și 77 / 21 mm.':
    'Összehasonlító metszet a P55 és a PA77 profilon, 55 / 12 mm-es és 77 / 21 mm-es méretekkel.',

  'Ușa de garaj reprezintă un element foarte important în cadrul\n          amenajărilor exterioare de calitate, iar gama de culori vă permite\n          înviorarea peisajului casei dumneavoastră. Recunoscute pentru\n          fiabilitatea și siguranța lor, ușile tip rulou reprezintă alegerea\n          ideală în echiparea garajului dumneavoastră.':
    'A garázskapu az igényes külső kialakítás nagyon fontos eleme, a\n          színválaszték pedig lehetővé teszi, hogy felfrissítse háza megjelenését.\n          A megbízhatóságukról és biztonságukról ismert redőnykapuk ideális\n          választást jelentenek a garázs felszereléséhez.',
  'Confecționată din aluminiu, ușa de garaj rezidențială tip rulou\n          orizontal izolează termic și fonic, având lamelele umplute cu spumă\n          poliuretanică. Acestea pot fi utilizate în diverse contexte, de la\n          obișnuitul rol de ușă de garaj, până la cel de ușă pentru spațiu\n          comercial sau pentru o hală industrială.':
    'Az alumíniumból készült, vízszintes redőnyös lakossági garázskapu hő- és\n          hangszigetelő, lamellái poliuretán habbal töltöttek. Sokféle helyzetben\n          használható: a szokásos garázskapu-szereptől az üzlethelyiség vagy egy\n          ipari csarnok kapujáig.',
  'Prin modalitatea de închidere-deschidere, spațiul ocupat de ușa de\n          garaj este foarte mic, iar accesibilitatea este sporită. Avantajul\n          ușilor de tip rulou față de cele secționale constă în faptul că toate\n          lamelele se strâng într-o casetă care necesită și ocupă un spațiu mult\n          mai mic.':
    'A nyitás és zárás módja miatt a garázskapu nagyon kevés helyet foglal el, a\n          hozzáférés pedig javul. A redőnykapuk előnye a szekcionált kapukkal\n          szemben, hogy az összes lamella egy tokba tekeredik, amely sokkal kisebb\n          helyet igényel és foglal el.',
  'Constructiv, ușile de garaj tip rulou sunt niște rulouri exterioare\n          de dimensiuni mai mari, care au lamelele umplute cu spumă poliuretanică\n          pentru izolare termică și rezistență. În funcție de mărimea ușii sau de\n          rezistența și izolarea termică cerute de proiect, lamelele au\n          dimensiunea de':
    'Szerkezetileg a redőnyös garázskapuk nagyobb méretű külső redőnyök, amelyek\n          lamellái poliuretán habbal töltöttek a hőszigetelés és a szilárdság\n          érdekében. A kapu méretétől, illetve a projekt által megkívánt\n          szilárdságtól és hőszigeteléstől függően a lamellák mérete',
  ': catalogul se ridică peste\n          pagină, iar ușile trec una câte una prin fața dumneavoastră, la scară,\n          cu dimensiunea și prețul afișate dedesubt.':
    ': a katalógus az oldal fölé emelkedik, a kapuk pedig egyenként vonulnak el\n          Ön előtt, méretarányosan, alattuk a mérettel és az árral.',
  'Dimensiunile scrise în denumirea produsului, sub forma\n    L × H, includ ghidajele și caseta. Pentru spațiul util de trecere se scad':
    'A termék nevében szereplő méretek Sz × M formában tartalmazzák a\n    vezetősíneket és a tokot. A szabad átjárási mérethez le kell vonni',
  'la cele cu lamelă de\n    77 mm. Acolo unde producătorul declară explicit spațiul de trecere, acesta\n    este afișat pe pagina produsului.':
    'a 77 mm-es lamellásoknál. Ahol a gyártó kifejezetten megadja az átjárási\n    méretet, azt a termékoldalon feltüntetjük.',

  /* --- confidențialitate și termeni, restul clauzelor -------------------- */

  'Usi Garaj Online (usa-garaj.ro) este un Operator al datelor cu caracter personal pe care dvs. (persoana vizata) ni le transmiteti.':
    'A Usi Garaj Online (usa-garaj.ro) az Ön (az érintett) által megadott személyes adatok Adatkezelője.',
  'Avem nevoie de datele dvs. cu caracter personal pentru a va putea furniza Serviciile, cu urmatoarele scopuri:':
    'A Szolgáltatások nyújtásához a következő célokból van szükségünk a személyes adataira:',
  'Pentru a va transmite mesaje non-comerciale sau de tip administrativ (privind schimbari in site, contul de utilizator, etc);':
    'Hogy nem kereskedelmi vagy adminisztratív jellegű üzeneteket küldjünk Önnek (a webhely változásairól, a felhasználói fiókról stb.);',
  'Datele dvs. cu caracter personal sunt prelucrate la sediul societatii. Gazduirea si stocarea datelor dvs. au loc pe teritoriul Romaniei.':
    'Személyes adatait a társaság székhelyén kezeljük. Adatainak tárhelyszolgáltatása és tárolása Románia területén történik.',
  'Informatiile prezentate in continuare au scopul de a aduce la cunostinta utilizatorului mai multe detalii despre plasarea, utilizarea si administrarea cookie-urilor utilizate de site-ul usa-garaj.ro.':
    'Az alábbi tájékoztatás célja, hogy a felhasználó részletesebben megismerje a usa-garaj.ro webhely által használt sütik elhelyezését, használatát és kezelését.',
  'In cazul in care aveti nevoie de mai multe informatii, si ele nu se regasesc mai jos, ne puteti contacta la adresa de email Office@abbaconfort.ro.':
    'Ha további tájékoztatásra van szüksége, és az alább nem szerepel, írjon nekünk az Office@abbaconfort.ro e-mail-címre.',
  'Deoarece va respectam dreptul la confidentialitate, puteti opta pentru blocarea anumitor tipuri de cookie-uri provenite de la acest site.':
    'Mivel tiszteletben tartjuk az Ön magánélethez való jogát, dönthet úgy, hogy letiltja a webhelyről származó sütik bizonyos típusait.',
  'Cookie-urile joaca un rol important in facilitarea accesului si livrarii multiplelor servicii de care utilizatorul se bucura pe internet, cum ar fi:':
    'A sütik fontos szerepet játszanak abban, hogy a felhasználó könnyebben elérje és igénybe vegye az interneten kínált számos szolgáltatást, például:',
  'Anumite cookie-uri, precum cele de performanta sau cele de Social media si publicitate, pot proveni de la terti.':
    'Bizonyos sütik — például a teljesítménysütik, valamint a közösségimédia- és hirdetési sütik — harmadik felektől is származhatnak.',
  'Aceste cookie-uri permit atat salvarea preferintelor cu privire la celelalte tipuri de cookie-uri folosite, cat si accesarea functionalitatilor de baza ale acestui site.':
    'Ezek a sütik lehetővé teszik a többi használt sütitípusra vonatkozó beállítások mentését, valamint a webhely alapvető funkcióinak elérését.',
  'Ele retin preferintele utilizatorului pe acest site, asa incat nu mai este nevoie de setarea lor la fiecare vizitare a site-ului.':
    'Megjegyzik a felhasználó beállításait ezen a webhelyen, így azokat nem kell minden látogatáskor újra megadni.',
  'Ele includ atat cookie-urile provenite din partea serviciilor de analiza a traficului, precum si cookie-uri plasate de anumite servicii terte care ofera functionalitati complementare site-ului.':
    'Ide tartoznak a forgalomelemző szolgáltatások sütijei, valamint azok a sütik is, amelyeket a webhely funkcióit kiegészítő külső szolgáltatások helyeznek el.',
  'Acestea pot fi plasate prin intermediul site-ului de catre serviciile de social media sau publicitate pe care le utilizam.':
    'Ezeket az általunk használt közösségimédia- vagy hirdetési szolgáltatások helyezhetik el a webhelyen keresztül.',
  'Ele pot proveni din partea unor terti precum servicii de publicitate (Ex: AdSense, AdWords), platforme de tip social media (Ex: Facebook, Twitter), etc.':
    'Származhatnak harmadik felektől, például hirdetési szolgáltatásoktól (AdSense, AdWords), közösségimédia-platformoktól (Facebook, Twitter) stb.',
  'Continut si servicii adaptate preferintelor utilizatorului &#8211; categorii de stiri, vreme, sport, harti, servicii publice si guvernamentale, site-uri de entertainment si servicii de travel.':
    'A felhasználó igényeihez igazított tartalom és szolgáltatások &#8211; hírkategóriák, időjárás, sport, térképek, közszolgáltatások és kormányzati szolgáltatások, szórakoztató webhelyek és utazási szolgáltatások.',
  'Oferte adaptate pe interesele utilizatorilor &#8211; retinerea parolelor, preferintele de limba ( Ex: afisarea rezultatelor cautarilor in limba Romana).':
    'A felhasználók érdeklődéséhez igazított ajánlatok &#8211; jelszavak megjegyzése, nyelvi beállítások (például a találatok román nyelvű megjelenítése).',
  'Retinerea filtrelor de protectie a copiilor privind continutul pe Internet (optiuni family mode, functii de safe search).':
    'A gyermekvédelmi szűrők megjegyzése az internetes tartalmakra vonatkozóan (családi mód, biztonságos keresés).',
  'Limitarea frecventei de difuzare a reclamelor &#8211; limitarea numarului de afisari a unei reclame pentru un anumit utilizator pe un site.':
    'A hirdetések megjelenési gyakoriságának korlátozása &#8211; annak korlátozása, hányszor jelenik meg egy hirdetés egy adott felhasználónak egy webhelyen.',
  'Particularizati-va setarile browserului in ceea ce priveste cookie-urile pentru a reflecta un nivel confortabil pentru voi al securitatii utilizarii cookie-urilor.':
    'Szabja személyre a böngésző sütikre vonatkozó beállításait olyan biztonsági szintre, amely Önnek megfelel.',
  'Daca doriti sa afli mai multe informatii despre cookie-uri si la ce sunt utilizate, recomandam urmatoarele linkuri:':
    'Ha többet szeretne megtudni a sütikről és arról, mire használják őket, az alábbi hivatkozásokat ajánljuk:',

  'Prezentul document prin continutul sau pune la dispozitia tertilor utilizatori Regulamentul privind termenii si conditiile de utilizare a site-ului Usa-Garaj.ro (usa-garaj.ro).':
    'Ez a dokumentum tartalmával a külső felhasználók rendelkezésére bocsátja a Usa-Garaj.ro webhely (usa-garaj.ro) használatának általános szerződési feltételeit.',
  'Site-ul Usa-Garaj.ro (usa-garaj.ro) este operat de societatea ABBA CONFORT DELIVERY SRL, cu sediul in Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște, inscrisa in Registrul Comertului cu numarul J2024000637154.':
    'A Usa-Garaj.ro webhelyet (usa-garaj.ro) az ABBA CONFORT DELIVERY SRL üzemelteti, székhelye: Strada Radu de la Afumați 17, Sc G, 130150 Târgoviște, cégjegyzékszáma: J2024000637154.',
  'Utilizarea site-ului (incluzand accesul, navigarea si cumpararea produselor de pe acest site) constituie un acord implicit de respectare a termenilor si conditiilor enuntate in cuprinsul prezentului document cu toate efectele si consecintele ce decurg din aceasta.':
    'A webhely használata (ideértve a hozzáférést, a böngészést és a termékek megvásárlását) az ebben a dokumentumban foglalt feltételek betartására vonatkozó ráutaló magatartással tett elfogadásnak minősül, az ebből fakadó minden joghatással és következménnyel együtt.',
  'Administratorul site-ului Usa-Garaj.ro (usa-garaj.ro) isi rezerva dreptul de a modifica in orice moment continutul acestui acord, fara notificarea prealabila a persoanelor care il utilizeaza, denumite in continuare &#8222;Utilizatori&#8221;. Utilizatorii vor avea acces permanent la termenii si conditiile de utilizare a serviciilor, pentru a le putea consulta in orice moment.':
    'A Usa-Garaj.ro webhely (usa-garaj.ro) üzemeltetője fenntartja a jogot, hogy e megállapodás tartalmát bármikor módosítsa, az azt használó személyek — a továbbiakban: &#8222;Felhasználók&#8221; — előzetes értesítése nélkül. A Felhasználók folyamatosan hozzáférnek a szolgáltatások igénybevételének feltételeihez, így bármikor megtekinthetik azokat.',
  'Continutul acestui site nu poate fi utilizat, reprodus, distribuit, transmis, expus, in alte scopuri decat cele expres si legal permise. Extragerea oricaror informatii urmata de orice utilizare in scop comercial care depaseste sfera copiei private reglementate de lege sau pentru vanzare ori licentiere si fara a avea in prealabil un consimtamant scris al titularilor drepturilor de proprietate constituie o incalcare a termenilor si conditiilor.':
    'A webhely tartalma a kifejezetten és jogszerűen megengedetteken kívül más célra nem használható, nem többszörözhető, nem terjeszthető, nem továbbítható és nem jeleníthető meg. Bármely információ kinyerése, majd olyan kereskedelmi célú felhasználása, amely túllépi a törvényben szabályozott magáncélú másolat körét, illetve értékesítés vagy licencbe adás céljából, a jogtulajdonosok előzetes írásbeli hozzájárulása nélkül, a feltételek megsértésének minősül.',
  'Sunteti de asemenea de acord sa nu afectati si interferati in vreun fel cu elementele de securitate ale site-ului, cu elementele care previn sau restrictioneaza utilizarea, copierea unui continut sau elemente care intaresc limitele de utilizare a siteului sau a continutului acestuia.':
    'Egyúttal vállalja, hogy semmilyen módon nem befolyásolja és nem zavarja a webhely biztonsági elemeit, a tartalom használatát vagy másolását megakadályozó, illetve korlátozó elemeket, sem a webhely vagy tartalma használati korlátait érvényesítő elemeket.',
  'Va rugam sa va asigurati ca ati verificat specificatiile produsului si compatibilitatea acestuia prin vizitarea paginii producatorului inainte de a-l cumpara. Raporturile comerciale dintre cumparator si Usa-Garaj.ro (usa-garaj.ro) sunt reglementate oficial de Ordonanta Guvernului 130/2000, privind protectia consumatorilor la incheierea si executarea contractelor la distanta.':
    'Kérjük, vásárlás előtt győződjön meg arról, hogy a gyártó oldalán ellenőrizte a termék műszaki adatait és megfelelőségét. A vásárló és a Usa-Garaj.ro (usa-garaj.ro) közötti kereskedelmi viszonyt hivatalosan a távollevők között kötött szerződések esetén a fogyasztók védelméről szóló 130/2000. sz. román kormányrendelet szabályozza.',
  'Consumatorul are dreptul sa notifice in scris comerciantului ca renunta la cumparare, in termen de 10 zile lucratoare de la primirea produsului sau, in cazul prestarilor de servicii, de la incheierea contractului.':
    'A fogyasztónak joga van írásban értesíteni a kereskedőt arról, hogy eláll a vásárlástól, a termék átvételétől számított 10 munkanapon belül, szolgáltatás esetén pedig a szerződés megkötésétől számítva.',
  'Deoarece produsele vandute in cadrul acestui site se realizeaza si customizeaza conform cerintelor clientului, se va achita o taxa de customizare de 450 lei, iar plata taxelor de curierat in cuantum de 250 lei va fi retinuta din suma care va fi rambursata clientului.':
    'Mivel a webhelyen értékesített termékek a vásárló igényei szerint készülnek és egyediek, 450 lej egyedi gyártási díj fizetendő, a 250 lej összegű futárdíjat pedig levonjuk a vásárlónak visszatérítendő összegből.',
  'Administratorul Usa-Garaj.ro (usa-garaj.ro) face eforturi permanente pentru a pastra acuratetea informatiilor de pe site, insa uneori acestea pot contine inadvertente (specificatiile sau pretul produselor modificate de catre producator fara preaviz sau viciate de erori de operare). Atentie: fotografiiile au caracter informativ si pot contine accesorii care nu sunt incluse in pachetele standard.':
    'A Usa-Garaj.ro (usa-garaj.ro) üzemeltetője folyamatosan azon dolgozik, hogy a webhely adatai pontosak legyenek, ezek azonban olykor eltéréseket tartalmazhatnak (a gyártó által előzetes értesítés nélkül módosított műszaki adatok vagy árak, illetve adatrögzítési hibák). Figyelem: a fényképek tájékoztató jellegűek, és olyan tartozékokat is ábrázolhatnak, amelyek a standard csomagoknak nem részei.',
  'In scopul accesarii si utilizarii anumitor sectiuni ale website-ului poate fi necesara crearea unui cont personal. Prin prezenta declarati ca va asumati integral responsabilitatea pentru toate si oricare dintre activitatile realizate prin intermediul contului pe care il deschideti pe website si, in consecinta, va sfatuim sa asigurati securitatea parolei contului sau a altor date de acces. In cazul in care securitatea contului pe care il detineti este compromisa, trebuie sa anuntati imediat administratorul site-ului. Usa-Garaj.ro (usa-garaj.ro) nu este responsabil pentru daunele care va sunt cauzate sau care sunt cauzate tertilor de orice fel, prin utilizarea neautorizata a contului.':
    'A webhely egyes részeinek eléréséhez és használatához személyes fiók létrehozása lehet szükséges. Ezennel kijelenti, hogy teljes felelősséget vállal a webhelyen nyitott fiókján keresztül végzett minden tevékenységért, ezért azt tanácsoljuk, gondoskodjon a fiók jelszavának és egyéb belépési adatainak biztonságáról. Ha a fiókja biztonsága sérül, haladéktalanul értesítenie kell a webhely üzemeltetőjét. A Usa-Garaj.ro (usa-garaj.ro) nem felel azokért a károkért, amelyek Önnél vagy harmadik feleknél a fiók jogosulatlan használatából erednek.',
  'Prin folosirea site-ului Usa-Garaj.ro (usa-garaj.ro), utilizatorul se declara de acord asupra faptului ca legile romane vor guverna Termenii si conditiile de utilizare si orice disputa de orice fel care ar putea sa apara intre utilizatori si administratorii Usa-Garaj.ro (usa-garaj.ro) sau asociatii/partenerii/afiliatii acestuia. In cazul unor eventuale conflicte se va incerca mai intai rezolvarea acestora pe cale amiabila, iar daca rezolvarea pe cale amiabila nu va fi posibila, conflictul va fi solutionat in instanta, in conformitate cu legile romane in vigoare.':
    'A Usa-Garaj.ro webhely (usa-garaj.ro) használatával a felhasználó elfogadja, hogy a román jog az irányadó az Általános szerződési feltételekre, valamint bármely olyan vitára, amely a felhasználók és a Usa-Garaj.ro (usa-garaj.ro) üzemeltetői, illetve annak társult vállalkozásai, partnerei vagy kapcsolt vállalkozásai között felmerülhet. Esetleges vita esetén először békés rendezésre törekszünk; ha a békés rendezés nem lehetséges, a vitát bíróság dönti el, a hatályos román jogszabályok szerint.',
  'Termenul de livrare standard este de 3-5 zile lucratoare de la confirmarea comenzii. Acest termen poate fi marit in cazul comenzilor atipice sau aparitiei unor situatii de forta majora. De asemenea, in anumite situatii si la solicitarea expresa a clientului, comanda poate fi executata in regim de urgenta si livrata in termen de maxim 24 ore. La preluarea oricarei comenzi, clientul va primi notificare si/sau confirmare pe email si/sau telefonic.':
    'A szokásos szállítási határidő a rendelés visszaigazolásától számított 3–5 munkanap. Ez a határidő rendhagyó rendelések esetén, illetve vis maior helyzetek felmerülésekor meghosszabbodhat. Bizonyos esetekben, a vásárló kifejezett kérésére, a rendelés sürgősséggel is teljesíthető és legfeljebb 24 órán belül kiszállítható. Minden rendelés felvételekor a vásárló e-mailben és/vagy telefonon értesítést, illetve visszaigazolást kap.',
  'Administratorul Usa-Garaj.ro (usa-garaj.ro) isi rezerva dreptul de a modifica structura si interfata oricarei pagini sau subpagini a site-ului Usa-Garaj.ro (usa-garaj.ro) in orice moment si la orice interval de timp liber ales, avand dreptul de a intrerupe temporar sau permanent, partial sau in totalitate serviciile puse la dispozitia publicului prin intermediul acestui website fara vreo notificare prealabila individuala sau generala.':
    'A Usa-Garaj.ro (usa-garaj.ro) üzemeltetője fenntartja a jogot, hogy a Usa-Garaj.ro webhely (usa-garaj.ro) bármely oldalának vagy aloldalának felépítését és felületét bármikor és tetszőleges időközönként módosítsa, és jogosult a webhelyen keresztül a nyilvánosság számára elérhetővé tett szolgáltatásokat ideiglenesen vagy véglegesen, részben vagy egészben felfüggeszteni, előzetes egyedi vagy általános értesítés nélkül.',
  'Daca aveti intrebari sau nelamuriri in legatura cu acesti termeni de utilizare, nu ezitati sa ne contactati prin intermediul formularului dedicat de contact sau la adresa de email Office@abbaconfort.ro':
    'Ha kérdése vagy bizonytalansága merül fel ezekkel a felhasználási feltételekkel kapcsolatban, forduljon hozzánk bátran az erre szolgáló kapcsolatfelvételi űrlapon vagy az Office@abbaconfort.ro e-mail-címen'
};

module.exports = { en, hu };
