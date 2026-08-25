<?php
/**
 * Plugin Name: UG Vitrina - acces la Store API
 * Description: Permite vitrinei gazduite pe alt domeniu sa vorbeasca cu Store API: adauga originea in lista permisa si expune antetul Cart-Token.
 * Version: 1.0
 * Author: ABBA CONFORT DELIVERY SRL
 *
 * Antetul e scris FARA diacritice dinadins. Restul fisierului le pastreaza:
 * doar liniile de aici sunt citite de WordPress cu get_file_data() ca sa
 * construiasca lista de module, iar o despachetare care strica encodarea
 * exact acolo lasa modulul listat, dar negasibil la activare.
 *
 * ---------------------------------------------------------------------------
 * DE CE EXISTĂ
 *
 * Vitrina (paginile de produs, coșul, finalizarea) stă pe alt domeniu decât
 * WordPress-ul. Coșul vorbește cu magazinul prin `fetch()` către
 * `/wp-json/wc/store/v1/…`, adică cereri de la o origine către alta. Browserul
 * le lasă să plece, dar CITEȘTE răspunsul numai dacă serverul îi dă voie
 * explicit. WordPress dă voie, implicit, doar propriei origini.
 *
 * Simptomul, măsurat pe 17 august 2026:
 *
 *   OPTIONS /wp-json/wc/store/v1/checkout   → Access-Control-Allow-Origin: <vitrina>
 *   GET     /wp-json/wc/store/v1/cart       → (niciun Access-Control-Allow-Origin)
 *
 * Adică verificarea prealabilă trecea, iar răspunsul adevărat era blocat.
 * Clientul vedea „NetworkError when attempting to fetch resource” — un mesaj
 * care nu spune nimănui ce s-a întâmplat.
 *
 * ---------------------------------------------------------------------------
 * A DOUA PROBLEMĂ, LA FEL DE GRAVĂ
 *
 * Store API ține sesiunea coșului într-un antet, `Cart-Token`, nu într-un
 * cookie. Vitrina îl citește din răspuns și îl trimite înapoi la cererea
 * următoare. Dar un răspuns de la altă origine își arată doar antetele
 * enumerate în `Access-Control-Expose-Headers`, iar acolo WordPress trimitea
 * numai `X-WP-Total, X-WP-TotalPages, Link`.
 *
 * Consecința: chiar și cu originile reparate, `Cart-Token` ar fi fost invizibil.
 * Fiecare cerere ar fi pornit un coș nou și gol, iar comanda ar fi picat cu
 * „coșul este gol” — după ce clientul completase tot formularul.
 *
 * De aceea fișierul rezolvă amândouă. Una fără cealaltă nu ajunge.
 *
 * ---------------------------------------------------------------------------
 * INSTALARE
 *
 * Se urcă în `wp-content/mu-plugins/`. Dosarul „mu” înseamnă „must-use”:
 * extensiile de acolo sunt active din start și nu pot fi dezactivate din
 * greșeală de la butonul de administrare — potrivit pentru ceva de care depinde
 * plasarea comenzilor. Dacă dosarul nu există, se creează.
 *
 * Verificare, după urcare:
 *
 *   curl -s -D - -o /dev/null https://usa-garaj.ro/wp-json/wc/store/v1/cart \
 *        -H "Origin: https://usa-garaj.pages.dev" \
 *        | grep -i "access-control-allow-origin\|expose"
 *
 * Trebuie să apară AMBELE: originea vitrinei și `Cart-Token` în lista expusă.
 *
 * ---------------------------------------------------------------------------
 * CÂND SE POATE ȘTERGE
 *
 * În ziua în care vitrina ajunge pe același domeniu cu WordPress-ul. Atunci nu
 * mai există două origini, deci nu mai are ce permite.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Originile vitrinei.
 *
 * Se trec ca schemă + gazdă, fără cale și fără bară la final: browserul asta
 * trimite în antetul `Origin`, iar comparația se face pe șir exact.
 *
 * Se adaugă un rând când vitrina se mută pe alt domeniu. Nu se pune niciodată
 * `*`: cu `Access-Control-Allow-Credentials: true`, pe care WordPress îl
 * trimite deja, steluța e respinsă de browser — și, oricum, ar deschide
 * magazinul către orice site.
 */
const UG_VITRINA_ORIGINI = [
    'https://usa-garaj.pages.dev',      // vitrina, gazduita pe Cloudflare Pages
    'https://tibidinu1031.github.io',   // versiunea de proba, pe GitHub Pages
    'https://usa-garaj.ro',
    'https://www.usa-garaj.ro',
];

/**
 * Pasul 1 — originea intră în lista permisă de WordPress.
 *
 * `allowed_http_origins` e filtrul canonic: din el se hrănește
 * `is_allowed_http_origin()`, pe care o consultă `rest_send_cors_headers()`
 * înainte să trimită `Access-Control-Allow-Origin`. Nu se scrie antetul de mână
 * aici, tocmai ca să rămână o singură sursă de adevăr.
 */
add_filter('allowed_http_origins', function ($origini) {
    foreach (UG_VITRINA_ORIGINI as $o) {
        if (!in_array($o, $origini, true)) {
            $origini[] = $o;
        }
    }
    return $origini;
});

/**
 * Pasul 2 — `Cart-Token` devine vizibil pentru vitrină.
 *
 * Lista implicită a WordPress-ului e „X-WP-Total, X-WP-TotalPages, Link”, iar
 * `Cart-Token` nu apare în ea: Store API a fost gândit pentru un magazin servit
 * de pe aceeași origine, unde antetele se citesc oricum.
 *
 * Se folosesc DOUĂ căi, deliberat:
 *
 *   1. `rest_exposed_cors_headers` — filtrul din nucleul WordPress (5.5+),
 *      calea corectă. O primă variantă scria antetul în obiectul răspunsului,
 *      prin `rest_post_dispatch`; nucleul îl trimite însă cu `header()`,
 *      direct, deci acea variantă n-ar fi avut niciun efect.
 *
 *   2. `rest_pre_serve_request`, la prioritate mare, care rescrie antetul cu
 *      `header(..., true)`. Rulează după ce nucleul și WooCommerce și-au trimis
 *      antetele, deci prinde și cazul în care versiunea instalată nu trece prin
 *      filtrul de mai sus. `true` înseamnă „înlocuiește”, deci nu se dublează.
 *
 * A doua e o plasă de siguranță, nu o soluție paralelă: dacă prima funcționează,
 * a doua scrie exact aceeași valoare.
 */
function ug_vitrina_antete_expuse($expuse = array()) {
    foreach (array('Cart-Token', 'Nonce', 'X-WP-Total', 'X-WP-TotalPages', 'Link') as $antet) {
        if (!in_array($antet, $expuse, true)) {
            $expuse[] = $antet;
        }
    }
    return $expuse;
}

/* Se intervine NUMAI când cererea vine de la o origine din listă. Pentru restul
   lumii, magazinul răspunde exact ca înainte. */
function ug_vitrina_origine_cunoscuta() {
    $origine = get_http_origin();
    return $origine && in_array($origine, UG_VITRINA_ORIGINI, true);
}

add_filter('rest_exposed_cors_headers', function ($expuse) {
    return ug_vitrina_origine_cunoscuta() ? ug_vitrina_antete_expuse($expuse) : $expuse;
});

add_filter('rest_pre_serve_request', function ($servit, $raspuns, $cerere) {
    if (!headers_sent()
        && ug_vitrina_origine_cunoscuta()
        && is_a($cerere, 'WP_REST_Request')
        && strpos($cerere->get_route(), '/wc/store/') === 0) {
        header('Access-Control-Expose-Headers: ' . implode(', ', ug_vitrina_antete_expuse()), true);
    }
    return $servit;
}, 100, 3);
