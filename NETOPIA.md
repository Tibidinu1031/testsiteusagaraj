# Plata cu cardul prin NETOPIA Payments

Procedura de activare pentru magazinul propriu: vitrina statică din acest repo
plus WooCommerce ca motor invizibil.

> **Cerința care dictează arhitectura:** clientul nu vede vechiul domeniu și
> nicio pagină WordPress, nici măcar o clipă. Cumpără de la început până la
> sfârșit pe domeniul nou. Singurul domeniu străin din tot fluxul este pagina
> NETOPIA, unde se introduc datele cardului — și acolo redirectarea nu e un
> neajuns, ci exact cerința PCI-DSS care ține numărul de card departe de
> serverele noastre.
>
> ```
> domeniulnou.ro/magazin        răsfoire, „Adaugă în coș”
> domeniulnou.ro/cos.html       coș, cantități
> domeniulnou.ro/finalizare     date de facturare și livrare
>         ↓  Store API, în fundal
> secure.mobilpay.ro            plata propriu-zisă
>         ↓
> domeniulnou.ro/comanda-confirmata.html
> ```

Toate cifrele de mai jos sunt verificate pe 12 august 2026, nu reproduse din
memorie: versiunile pluginului din API-ul wordpress.org, contractul API din
specificația OpenAPI oficială (`https://secure.sandbox.netopia-payments.com/spec`),
starea magazinului din `/wp-json/wc/store/v1/cart`.

---

## Ce am constatat înainte de orice

| ce | valoare | de unde |
|---|---|---|
| gateway-uri active azi | **doar `cod`** (ramburs) | `/wp-json/wc/store/v1/cart` → `payment_methods` |
| WordPress | 7.0.3 | `<meta name="generator">` |
| WooCommerce | **9.3.3** | `<meta name="generator">` |
| server | LiteSpeed | antetul `Server` |
| HTTPS | funcțional, certificat valid | cerere de test |

Magazinul **nu acceptă azi niciun fel de card**. Nu e o configurare stricată de
reparat, e un gateway care lipsește cu totul.

> **De rezolvat înainte de a lua bani cu cardul.** WooCommerce 9.3.3 a apărut în
> toamna lui 2024 — sunt aproape doi ani de actualizări de securitate
> neaplicate. Un magazin care procesează plăți cu cardul intră sub PCI-DSS
> SAQ-A, iar SAQ-A cere explicit ca platforma să fie ținută la zi. Actualizarea
> WooCommerce **înainte** de activarea plăților nu e o curățenie opțională; e o
> condiție. Se face pe o copie de test, nu direct în producție.

---

## De ce plugin și nu integrare scrisă de mână

API-ul v2 al NETOPIA cere un server: cheia se trimite în antetul
`Authorization`, iar `notifyUrl` trebuie să fie un endpoint care primește POST.
Ambele există deja în WooCommerce. Scrisă de mână, integrarea ar fi însemnat un
al doilea sistem de comenzi, paralel cu cel care ține azi stocul, facturile și
retururile — plus **RO e-Factura B2C**, obligatorie, cu penalități aplicate
strict din iulie 2026.

Pluginul oficial rezolvă și partea pe care o uită toată lumea: **IPN-ul**.
Confirmarea plății nu vine pe redirectul clientului, ci într-o cerere separată,
server-la-server, validată prin JWT cu cheia publică NETOPIA. Dacă clientul
închide fila după ce a plătit, doar IPN-ul mai poate marca comanda ca plătită.

## Piesa care lipsea: `wordpress/netopia-direct-redirect.php`

Pluginul oficial, în `process_payment()`, nu trimite clientul la NETOPIA, ci la
**pagina „order-pay” a WordPress-ului**, care afișează un mesaj și abia apoi
face saltul (verificat în `v2/wc-netopiapayments-gateway.php:473-504` și
`receipt_page()`). Adică exact hopul pe care îl vrem eliminat.

Mu-plugin-ul din `wordpress/` face patru lucruri:

1. **Redirect direct.** Prinde `woocommerce_payment_successful_result`, cheamă el
   `POST /payment/card/start` și înlocuiește adresa cu `payment.paymentURL`.
2. **Retur în vitrină.** `woocommerce_get_return_url` duce pe
   `comanda-confirmata.html`, ca plasă de siguranță.
3. **CORS pentru Store API**, cu `Cart-Token` expus — fără el coșul apare gol la
   fiecare cerere, fiindcă cookie-urile nu trec între domenii. Se permite **un
   singur** domeniu, niciodată `*`.
4. **Subdomeniul nu servește pagini publice** — orice vizitator e trimis în
   vitrină; adminul și `/wp-json/` rămân neatinse.

Ce **nu** face, deliberat: nu atinge IPN-ul. `notifyUrl` trimis rămâne
endpointul pluginului oficial. Verificarea criptografică a notificării e ultimul
loc unde merită scris cod propriu — o greșeală acolo înseamnă comenzi marcate
„plătit” pe baza unei notificări falsificate.

> **Cuplajul de care depinde totul.** La primirea notificării, `v2/lib/ipn.php`
> face `explode("_", $orderID)` și ia prima bucată drept identificator de
> comandă. Mu-plugin-ul trimite `orderID` exact în forma
> `{numar_comanda}_{aleator}`. Dacă se instalează vreun plugin care prefixează
> numerele de comandă, legătura plată↔comandă se rupe: banii intră, comanda
> rămâne neplătită. **De retestat la fiecare actualizare a pluginului NETOPIA.**

---

## Pluginul

| | |
|---|---|
| nume | NETOPIA Payments Payment Gateway |
| autor | `netopiapayments` — cont oficial |
| versiune | **1.4.4** |
| actualizat | 24 martie 2026 |
| testat până la | WordPress 6.9.6 |
| sursă | <https://wordpress.org/plugins/netopia-payments-payment-gateway/> |
| cod sursă | <https://github.com/netopiapayments/WooCommerce> |

Notă onestă: are 66 % din 8 voturi pe wordpress.org. Puține voturi, deci cifra
nu spune mare lucru statistic — dar merită știută. Este totuși pluginul oficial
al procesatorului, singurul pe care NETOPIA îl susține.

**Nu instalați variante de pe alte site-uri.** Un plugin de plăți din sursă
neoficială vede fiecare comandă și fiecare client.

---

## Pașii

### 1. Contul de comerciant

Trebuie deschis de firmă, cu contract semnat: <https://netopia-payments.com>.
Cere CUI, act de identitate al administratorului, extras ONRC și IBAN-ul în care
se fac decontările. Durează câteva zile lucrătoare — se începe cu asta.

Din cont rezultă două lucruri, ambele disponibile atât pe **sandbox** cât și pe
**live**:

- un **POS** (punctul de vânzare) cu semnătura lui — `posSignature`;
- o **cheie API**, din *Profil → Securitate*.

Se creează un POS separat, dedicat WordPress-ului.

> Cheia API și semnătura POS sunt credențiale de încasare. Nu mi le trimiteți și
> nu le puneți în chat, în e-mail sau în repo. Pluginul le ia singur, la pasul 3.

### 2. Instalarea

În WP admin → *Plugins → Adaugă nou* → căutare `netopia` → **Instalează** →
**Activează**.

Cerințe: PHP 7 sau mai nou, cu extensiile `openssl` și `dom`. Pe LiteSpeed sunt
de regulă active; se verifică în *Unelte → Sănătatea site-ului → Info → Server*.

### 3. Configurarea

*WooCommerce → Setări → Plăți* → **NETOPIA Payments** → **Manage**.

Pluginul are un buton **`Configuration!`**: vă autentificați cu contul NETOPIA
chiar în acea fereastră, alegeți POS-ul și cheia API din listă (Live sau
Sandbox) și apăsați **Confirm**. Datele se scriu singure.

Aceasta este calea recomandată — nimeni nu copiază chei prin clipboard și nu
rămân credențiale prin fișiere de configurare.

Câmpurile rămase, de completat manual:

| câmp | valoare recomandată |
|---|---|
| Enable/Disable | bifat, **doar după testul din pasul 4** |
| Title | `Card bancar (Visa / Mastercard)` |
| Description | `Plata se face pe pagina securizată NETOPIA. Datele cardului nu ajung pe site-ul nostru.` |
| Default Order Status | `processing` — „în procesare”; **nu** `completed` |
| Payment Methods | doar `Card`; Oney și Paypo se lasă nebifate cât timp nu sunt contractate |

`Default Order Status` contează mai mult decât pare: pe `completed` WooCommerce
consideră comanda expediată în clipa plății și trimite clientului e-mailul de
finalizare pentru o ușă care n-a plecat încă din depozit.

### 3b. Domeniile și mu-plugin-ul

Nu se migrează nimic și nu se atinge baza de date. Se face doar:

1. **DNS:** un subdomeniu al domeniului nou (ex. `api.domeniulnou.ro`) pointat
   spre găzduirea LiteSpeed actuală.
2. **WordPress:** `siteurl` și `home` schimbate pe acel subdomeniu.
3. **Mu-plugin:** se copiază `wordpress/netopia-direct-redirect.php` în
   `wp-content/mu-plugins/` (directorul se creează dacă nu există). Se editează
   o singură linie, constanta din cap:

   ```php
   define( 'UG_VITRINA', 'https://domeniulnou.ro' );
   ```

   Fără slash la final. Aceeași valoare servește și la CORS, și la adresele de
   retur — de aceea e o singură constantă, ca să nu poată ajunge să se
   contrazică.
4. **Vitrina:** în [build.js](build.js), obiectul `MAGAZIN`:

   ```js
   const MAGAZIN = {
     sit: 'https://domeniulnou.ro',
     api: 'https://api.domeniulnou.ro',
   ```

   apoi `node build.js`. Coșul, finalizarea și paginile de rezultat apar abia
   acum: cât timp câmpurile sunt goale nu se generează deloc, ca să nu existe un
   coș care arată bine dar nu poate adăuga nimic.

### 4. Testul în sandbox — obligatoriu

Se configurează întâi cu POS-ul și cheia de **sandbox** și se trec toate cele
patru cazuri. Nu doar primul.

| caz | ce trebuie să se întâmple |
|---|---|
| plată reușită | comanda trece în `processing`, stocul scade, clientul primește e-mail |
| plată respinsă | comanda rămâne `pending`, stocul **nu** scade, coșul se păstrează |
| abandon pe pagina NETOPIA | comanda rămâne `pending`, fără efecte |
| fila închisă imediat după plată | comanda ajunge tot în `processing` — **acesta verifică IPN-ul** |
| card care cere 3-D Secure | autentificare, apoi confirmare |
| **bara de adrese, tot parcursul** | **niciodată domeniul vechi, nicio pagină WordPress** |

Penultimul e cel care prinde configurările greșite. Dacă acolo comanda rămâne
`pending`, `notifyUrl` nu ajunge la site: se verifică regulile LiteSpeed, un
eventual firewall și dacă `/?wc-api=` este accesibil din exterior.

Ultimul se verifică cu **înregistrare de ecran**, nu din memorie — un hop de
200 ms nu se reține corect după fapt.

Verificarea că CORS chiar funcționează, înainte de orice test de plată:

```bash
curl -s -i -X OPTIONS "https://api.domeniulnou.ro/wp-json/wc/store/v1/cart" -H "Origin: https://domeniulnou.ro" -H "Access-Control-Request-Method: POST"
```

Răspunsul trebuie să conțină `Access-Control-Allow-Origin` cu domeniul vitrinei
și `Cart-Token` în `Access-Control-Expose-Headers`. Dacă lipsesc, coșul va
apărea gol la fiecare cerere și niciun test de plată nu are sens.

Statusurile pe care le întoarce API-ul, din specificația oficială:

| cod | înseamnă |
|---|---|
| 3 | plătit |
| 5 | confirmat |
| 12 | respins |
| 15 | necesită autentificare 3-D Secure |

### 5. Trecerea pe live

Se reia pasul 3 cu POS-ul și cheia **live**, apoi o comandă reală de valoare
mică, plătită cu un card propriu, urmată de rambursare din WooCommerce ca să se
verifice și returul. Abia apoi se bifează *Enable*.

### 6. Comutatorul de adevăr

După ce plata live funcționează, în [build.js](build.js) se trece:

```js
const PLATI = { card: true, ... }
```

și se rulează:

```bash
node build.js
```

Pagina „Metode de plată” și întrebările frecvente se rescriu singure cu textul
despre card. Cât timp comutatorul e pe `false`, site-ul **nu** promite plata cu
cardul nicăieri — o promisiune comercială neacoperită este exact genul de lucru
pentru care ANPC dă amendă.

Verificarea că gateway-ul chiar e activ:

```bash
curl -s https://api.domeniulnou.ro/wp-json/wc/store/v1/cart
```

Când `payment_methods` conține `netopiapayments`, comutatorul poate trece pe
`true`.

---

## Obligații legale, o dată activat

Nu sunt opționale și nu țin de plugin:

- **Logourile Visa și Mastercard** vizibile în subsol și în pagina de checkout.
- **Politica de retur**, cu termenul de 14 zile din OUG 34/2014 — există deja în
  „Metode de plată”, generată din `PLATI`.
- **Prețuri finale, cu TVA**, fără costuri adăugate după introducerea cardului.
- **ANPC și SOL** — linkuri prezente deja în subsol și în paginile legale.
- Pe magazin, paginile *Transport și retururi* și *Soluționarea litigiilor*
  **sunt goale**. Cu ramburs treceau neobservate; cu plata online devin material
  obligatoriu. Trebuie scrise de firmă — sunt angajamente comerciale, nu text
  redacțional.

---

## Ce nu pot face eu

- Să deschid contul de comerciant sau să semnez contractul.
- Să introduc cheia API, semnătura POS sau parole — nici în plugin, nici în
  fișiere. Pasul 3 le rezolvă fără ca ele să treacă prin mâna cuiva.
- Să instalez pluginul în WordPress: nu am acces la admin și nu manevrez
  credențiale de autentificare.
- Să fac o plată de test cu un card real.

Restul — configurarea corectă, interpretarea rezultatelor din sandbox, textele
site-ului, verificarea IPN-ului — se poate face împreună, pe măsură ce parcurgeți
pașii.
