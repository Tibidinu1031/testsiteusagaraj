<?php
/**
 * Plugin Name: Vitrină statică — acces la Store API
 * Description: Permite vitrinei găzduite pe alt domeniu să vorbească cu Store API: adaugă originea în lista permisă și expune antetul „Cart-Token”. Fără el, comanda eșuează cu „NetworkError”.
 * Version: 1.0
 * Author: ABBA CONFORT SOLUTIONS HOMES S.R.L.
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
 *        -H "Origin: https://tibidinu1031.github.io" \
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
    'https://tibidinu1031.github.io',
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
 * Lista implicită a WordPress-ului nu-l conține, iar Store API nu-l adaugă:
 * a fost gândit pentru un magazin servit de pe aceeași origine, unde antetele
 * se citesc oricum.
 *
 * Se intervine numai pe rutele Store API și numai când cererea vine de la o
 * origine cunoscută — restul REST-ului rămâne exact cum era.
 */
add_filter('rest_post_dispatch', function ($raspuns, $server, $cerere) {
    if (!($raspuns instanceof WP_REST_Response)) {
        return $raspuns;
    }

    if (strpos($cerere->get_route(), '/wc/store/') !== 0) {
        return $raspuns;
    }

    $origine = get_http_origin();
    if (!$origine || !in_array($origine, UG_VITRINA_ORIGINI, true)) {
        return $raspuns;
    }

    /* Se păstrează ce era deja expus și se adaugă ce lipsește, ca să nu se
       piardă antete pe care le-ar aștepta alt cod. */
    $expuse = $raspuns->get_headers()['Access-Control-Expose-Headers'] ?? '';
    $lista  = array_filter(array_map('trim', explode(',', $expuse)));

    foreach (['Cart-Token', 'Nonce', 'X-WP-Total', 'X-WP-TotalPages', 'Link'] as $antet) {
        if (!in_array($antet, $lista, true)) {
            $lista[] = $antet;
        }
    }

    $raspuns->header('Access-Control-Expose-Headers', implode(', ', $lista), true);

    return $raspuns;
}, 20, 3);
