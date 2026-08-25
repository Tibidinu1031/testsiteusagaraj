<?php
/**
 * Plugin Name: UG Vitrina - legatura cu site-ul static
 * Description: Doua lucruri de care depinde vitrina: deschide Store API catre domeniul ei (origini permise si antetul Cart-Token) si primeste comenzile pentru usile la comanda, pe care le trimite pe e-mail firmei.
 * Version: 1.1
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

/* ==========================================================================
   Comenzile pentru ușile la comandă
   ==========================================================================

   DE CE STAU AICI, ÎN ACELAȘI FIȘIER

   Ușile la comandă nu pot trece prin coș: WooCommerce adaugă în coș numai
   produse care există la el, iar un preț venit din browser n-ar fi de crezut —
   oricine poate schimba cifra înainte s-o trimită. Deci comanda nu se
   înregistrează în WooCommerce, ci ajunge pe e-mail la firmă, care o confirmă
   telefonic. Prețul din e-mail e cel calculat de site, marcat ca atare.

   Vitrina e un site static: nu are server care să trimită e-mail. WordPress-ul
   are, și a dovedit-o — de acolo pleacă deja confirmările de comandă. Endpointul
   de mai jos folosește `wp_mail()`, adică exact drumul care merge.

   Stă în acest fișier, deși e altă treabă decât CORS, dintr-un motiv practic:
   fișierul e deja instalat și funcționează. Un al doilea modul ar însemna încă
   o instalare, iar aceea a fost costisitoare. */

const UG_CERERI_CATRE = array('office@abbaconfort.ro', 'comenzi@abbaconfort.ro');

/* Cel mult atâtea cereri de la același IP într-o oră. Nu e o apărare serioasă
   împotriva cuiva hotărât, dar oprește un formular trimis din greșeală de zece
   ori și un robot leneș. */
const UG_CERERI_LIMITA = 5;

add_action('rest_api_init', function () {
    register_rest_route('ug/v1', '/cerere-oferta', array(
        'methods'             => 'POST',
        'permission_callback' => '__return_true',
        'callback'            => 'ug_cerere_oferta',
    ));
});

function ug_cerere_text($cerere, $cheie, $lungime = 200) {
    $v = $cerere->get_param($cheie);
    if (!is_scalar($v)) {
        return '';
    }
    /* `sanitize_text_field` scoate și marcajul, și rândurile noi — exact ce
       trebuie ca nimeni să nu strecoare anteturi într-un e-mail. */
    return mb_substr(sanitize_text_field((string) $v), 0, $lungime);
}

function ug_cerere_oferta(WP_REST_Request $cerere) {
    /* Câmpul-capcană: e ascuns în pagină, deci un om nu-l completează niciodată.
       Roboții care umplu tot ce găsesc se opresc aici, fără să afle de ce. */
    if (ug_cerere_text($cerere, 'website') !== '') {
        return new WP_REST_Response(array('ok' => true), 200);
    }

    $ip    = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '0';
    $cheie = 'ug_cereri_' . md5($ip);
    $cate  = (int) get_transient($cheie);
    if ($cate >= UG_CERERI_LIMITA) {
        return new WP_Error('ug_prea_multe', 'Prea multe cereri trimise. Încercați peste o oră sau sunați-ne.', array('status' => 429));
    }

    $nume    = ug_cerere_text($cerere, 'nume', 120);
    $email   = sanitize_email((string) $cerere->get_param('email'));
    $telefon = ug_cerere_text($cerere, 'telefon', 40);

    if ($nume === '' || $telefon === '' || !is_email($email)) {
        return new WP_Error('ug_date_lipsa', 'Completați numele, telefonul și o adresă de e-mail validă.', array('status' => 400));
    }

    $specificatii = array(
        'Lamelă'            => ug_cerere_text($cerere, 'lamela', 20),
        'Lățimea golului'   => ug_cerere_text($cerere, 'latime', 10),
        'Înălțimea golului' => ug_cerere_text($cerere, 'inaltime', 10),
        'Culoare'           => ug_cerere_text($cerere, 'culoare', 60),
        'Bucăți'            => ug_cerere_text($cerere, 'bucati', 5),
    );

    $adresa = array(
        ug_cerere_text($cerere, 'adresa', 200),
        ug_cerere_text($cerere, 'localitate', 80),
        ug_cerere_text($cerere, 'judet', 60),
    );

    $estimare = ug_cerere_text($cerere, 'estimare', 40);
    $mesaj    = ug_cerere_text($cerere, 'mesaj', 1500);

    $corp = ug_cerere_html($nume, $email, $telefon, $specificatii, $adresa, $estimare, $mesaj);

    $anteturi = array(
        'Content-Type: text/html; charset=UTF-8',
        /* Răspunsul pleacă direct la client, nu la site. Numele e curățat, deci
           nu poate purta rânduri noi în antet. */
        'Reply-To: ' . $nume . ' <' . $email . '>',
    );

    $trimis = wp_mail(
        UG_CERERI_CATRE,
        'Comanda noua - usa la comanda, de la ' . $nume,
        $corp,
        $anteturi
    );

    if (!$trimis) {
        return new WP_Error('ug_email_esuat', 'Cererea nu a putut fi trimisă. Sunați-ne la 0731 366 613.', array('status' => 500));
    }

    set_transient($cheie, $cate + 1, HOUR_IN_SECONDS);
    return new WP_REST_Response(array('ok' => true), 200);
}

/**
 * E-mailul, așezat ca cel de comandă nouă din WooCommerce.
 *
 * Aceeași bară colorată sus, același tabel, aceleași cutii de date dedesubt.
 * Motivul nu e estetic: cine deschide căsuța firmei vede zilnic e-mailul de
 * comandă din magazin, iar una venită din calculator, care arată la fel, se
 * citește din prima, fără să caute unde e informația.
 *
 * Totul e scris cu stiluri în linie, nu într-o foaie: clienții de e-mail
 * ignoră `<style>` sau îl taie.
 */
function ug_cerere_html($nume, $email, $telefon, $specificatii, $adresa, $estimare, $mesaj) {
    $celula = 'padding:12px 14px;border:1px solid #e5e5e5;';

    $randuri = '';
    foreach ($specificatii as $eticheta => $valoare) {
        if ($valoare === '') {
            continue;
        }
        $randuri .= '<tr><td style="' . $celula . '">' . esc_html($eticheta) . '</td>'
            . '<td style="' . $celula . 'text-align:right;"><b>' . esc_html($valoare) . '</b></td></tr>';
    }

    if ($estimare !== '') {
        $randuri .= '<tr><td style="' . $celula . '">Preț calculat pe site'
            . '<br><span style="color:#666;font-size:13px;">calculată de calculatorul de pe site</span></td>'
            . '<td style="' . $celula . 'text-align:right;"><b>' . esc_html($estimare) . '</b></td></tr>';
    }

    $liniiAdresa = '';
    foreach ($adresa as $linie) {
        if ($linie !== '') {
            $liniiAdresa .= esc_html($linie) . '<br>';
        }
    }

    $blocMesaj = '';
    if ($mesaj !== '') {
        $blocMesaj = '<h3 style="color:#0d5c4e;margin:26px 0 8px;">Ce a scris clientul</h3>'
            . '<div style="padding:14px;border:1px solid #e5e5e5;white-space:pre-wrap;">'
            . esc_html($mesaj) . '</div>';
    }

    return '<div style="font-family:Helvetica,Arial,sans-serif;color:#222;max-width:640px;margin:0 auto;">'
        . '<div style="background:#0d5c4e;color:#fff;padding:28px 32px;">'
        . '<h1 style="margin:0;font-size:25px;font-weight:600;">Comandă nouă &mdash; ușă la comandă</h1>'
        . '</div>'
        . '<div style="padding:28px 32px;background:#fff;">'
        . '<p>Ați primit o comandă de la <b>' . esc_html($nume) . '</b>, '
        . 'trimisă din vitrină pe ' . esc_html(date_i18n('d/m/Y, H:i')) . '.</p>'
        . '<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:15px;">'
        . '<tr><th style="' . $celula . 'text-align:left;background:#fafafa;">Ușa cerută</th>'
        . '<th style="' . $celula . 'text-align:right;background:#fafafa;">Valoare</th></tr>'
        . $randuri
        . '</table>'
        . '<h3 style="color:#0d5c4e;margin:26px 0 8px;">Datele clientului</h3>'
        . '<div style="padding:14px;border:1px solid #e5e5e5;line-height:1.7;">'
        . '<b>' . esc_html($nume) . '</b><br>'
        . $liniiAdresa
        . '<a href="tel:' . esc_attr($telefon) . '">' . esc_html($telefon) . '</a><br>'
        . '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>'
        . '</div>'
        . $blocMesaj
        . '<p style="margin-top:26px;color:#666;font-size:13px;">'
        . 'Răspunzând la acest mesaj, răspunsul pleacă direct la client.</p>'
        . '</div>'
        . '<div style="padding:16px 32px;background:#fafafa;color:#666;font-size:12px;text-align:center;">'
        . 'Usa-garaj.ro &mdash; comandă trimisă din vitrină</div>'
        . '</div>';
}
