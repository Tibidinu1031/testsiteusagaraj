<?php
/**
 * Plugin Name: NETOPIA — redirect direct și CORS pentru vitrina statică
 * Description: Trimite clientul din vitrină direct la NETOPIA, fără pagina intermediară WordPress, și deschide Store API pentru domeniul vitrinei.
 * Version:     1.0.0
 * Author:      integrare usa-garaj
 *
 * SE INSTALEAZĂ ÎN  wp-content/mu-plugins/  — nu în plugins/.
 * Directorul „mu” înseamnă must-use: se încarcă automat, nu poate fi dezactivat
 * din greșeală din panou, iar dacă cineva dezactivează pluginul NETOPIA oficial
 * acest fișier nu mai are ce filtra și pur și simplu nu face nimic.
 *
 * ---------------------------------------------------------------------------
 * DE CE EXISTĂ
 *
 * Pluginul oficial NETOPIA, în `process_payment()`, întoarce ca adresă de
 * redirectare pagina „order-pay” a WordPress-ului. Acolo se afișează un mesaj
 * („te redirectionam in pagina de plata NETOPIA payments”) și abia apoi un
 * formular auto-trimis duce clientul la procesator.
 *
 * Pentru un magazin clasic e în regulă. Pentru o vitrină găzduită separat
 * înseamnă că adresa WordPress-ului apare în bara de adrese, fie și o clipă.
 * Cerința proiectului este ca asta să nu se întâmple niciodată.
 *
 * Fișierul de față face un singur lucru la plată: cheamă el `/payment/card/start`
 * și întoarce direct `payment.paymentURL`. Clientul sare din vitrină la NETOPIA.
 *
 * CE NU FACE, DELIBERAT
 * Nu atinge IPN-ul. Notificarea de plată se validează prin JWT cu cheia publică
 * NETOPIA, în `v2/lib/ipn.php` al pluginului oficial, iar `notifyUrl` trimis de
 * aici este exact endpointul lor. O implementare proprie de verificare
 * criptografică ar fi locul cel mai prost ales pentru o greșeală: o eroare
 * acolo înseamnă comenzi marcate „plătit” pe baza unei notificări falsificate.
 * ---------------------------------------------------------------------------
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Domeniul vitrinei. Fără slash la final.
 *
 * Se folosește și la CORS, și la adresele de retur. O singură valoare, ca să nu
 * existe cazul în care CORS permite un domeniu iar returul duce în altul.
 */
if ( ! defined( 'UG_VITRINA' ) ) {
	define( 'UG_VITRINA', 'https://DOMENIUL-TAU.ro' );
}

/**
 * Sandbox sau producție. Se ia din setările pluginului oficial, ca să nu existe
 * două comutatoare care se pot contrazice.
 */
function ug_netopia_setari() {
	$s = get_option( 'woocommerce_netopiapayments_settings', array() );
	return is_array( $s ) ? $s : array();
}

function ug_netopia_e_live() {
	$s = ug_netopia_setari();
	$mediu = isset( $s['environment'] ) ? strtolower( trim( $s['environment'] ) ) : '';
	return ( 'live' === $mediu || 'production' === $mediu || 'yes' === $mediu );
}

function ug_netopia_api_key() {
	$s = ug_netopia_setari();
	$cheie = ug_netopia_e_live()
		? ( isset( $s['live_api_key'] ) ? $s['live_api_key'] : '' )
		: ( isset( $s['sandbox_api_key'] ) ? $s['sandbox_api_key'] : '' );
	return trim( (string) $cheie );
}

function ug_netopia_pos() {
	$s = ug_netopia_setari();
	return isset( $s['account_id'] ) ? trim( (string) $s['account_id'] ) : '';
}

function ug_netopia_url_start() {
	return ug_netopia_e_live()
		? 'https://secure.mobilpay.ro/pay/payment/card/start'
		: 'https://secure.sandbox.netopia-payments.com/payment/card/start';
}

/* ==========================================================================
   1. Redirectul direct la NETOPIA
   ========================================================================== */

/**
 * `woocommerce_payment_successful_result` primește exact tabloul întors de
 * `process_payment()`, chiar înainte ca Store API să-l trimită vitrinei.
 * Îi înlocuim doar câmpul `redirect`.
 *
 * Dacă orice pas eșuează, se lasă rezultatul original neatins: clientul ajunge
 * pe pagina WordPress intermediară, care funcționează. Adică cel mai rău caz e
 * comportamentul dinainte, nu o comandă pierdută.
 */
add_filter( 'woocommerce_payment_successful_result', 'ug_netopia_redirect_direct', 20, 2 );

function ug_netopia_redirect_direct( $rezultat, $order_id ) {
	$order = wc_get_order( $order_id );
	if ( ! $order || 'netopiapayments' !== $order->get_payment_method() ) {
		return $rezultat;
	}

	$api_key = ug_netopia_api_key();
	$pos     = ug_netopia_pos();
	if ( '' === $api_key || '' === $pos ) {
		$order->add_order_note( 'Redirect direct NETOPIA: lipsesc cheia API sau POS-ul în setări. S-a folosit calea standard.' );
		return $rezultat;
	}

	/**
	 * FORMATUL `orderID` NU E LIBER.
	 *
	 * La primirea notificării, `v2/lib/ipn.php` face:
	 *     $trxSplit = explode("_", $objIpn->order->orderID);
	 *     $actualOrderId = $trxSplit[0];
	 *
	 * Deci partea dinaintea primului „_” trebuie să fie identificatorul cu care
	 * `new WC_Order(...)` regăsește comanda. Orice altă formă rupe legătura
	 * dintre plată și comandă: banii intră, comanda rămâne neplătită.
	 *
	 * Se folosește `get_order_number()`, ca pluginul oficial. Atenție dacă se
	 * instalează vreun plugin care prefixează numerele de comandă — atunci
	 * `explode` returnează un prefix, nu un ID, iar asta trebuie retestat.
	 */
	$order_ref = $order->get_order_number() . '_' . md5( uniqid( (string) wp_rand(), true ) );

	$corp = array(
		'config' => array(
			'emailTemplate' => '',
			'notifyUrl'     => WC()->api_request_url( 'netopiapayments' ),
			'redirectUrl'   => UG_VITRINA . '/comanda-confirmata.html?nr=' . rawurlencode( $order->get_order_number() ),
			'cancelUrl'     => UG_VITRINA . '/plata-esuata.html',
			'language'      => 'ro',
		),
		'payment' => array(
			'options' => array( 'installments' => 0, 'bonus' => 0 ),
			/* Fără `instrument`: nu atingem numărul cardului. NETOPIA găzduiește
			   formularul și ne întoarce `paymentURL`. Asta ține magazinul în
			   PCI-DSS SAQ-A, cel mai ușor regim posibil. */
			'data'    => array(
				'IP_ADDRESS' => $order->get_customer_ip_address(),
			),
		),
		'order' => array(
			'ntpID'        => '',
			'posSignature' => $pos,
			'dateTime'     => gmdate( 'c' ),
			'description'  => 'Comanda ' . $order->get_order_number() . ' — ' . get_bloginfo( 'name' ),
			'orderID'      => $order_ref,
			'amount'       => (float) $order->get_total(),
			'currency'     => $order->get_currency(),
			'billing'      => ug_netopia_adresa( $order, 'billing' ),
			'shipping'     => ug_netopia_adresa( $order, 'shipping' ),
			'products'     => ug_netopia_produse( $order ),
			'installments' => array( 'selected' => 0, 'available' => array( 0 ) ),
		),
	);

	$raspuns = wp_remote_post(
		ug_netopia_url_start(),
		array(
			'timeout' => 30,
			'headers' => array(
				'Content-Type'  => 'application/json',
				'Authorization' => $api_key,
			),
			'body'    => wp_json_encode( $corp ),
		)
	);

	if ( is_wp_error( $raspuns ) ) {
		$order->add_order_note( 'Redirect direct NETOPIA a eșuat: ' . $raspuns->get_error_message() . '. S-a folosit calea standard.' );
		return $rezultat;
	}

	$date = json_decode( wp_remote_retrieve_body( $raspuns ), true );

	if ( ! empty( $date['payment']['paymentURL'] ) ) {
		$order->update_meta_data( '_ug_netopia_order_ref', $order_ref );
		if ( ! empty( $date['payment']['ntpID'] ) ) {
			$order->update_meta_data( '_ug_netopia_ntpid', sanitize_text_field( $date['payment']['ntpID'] ) );
		}
		$order->save();

		$rezultat['redirect'] = $date['payment']['paymentURL'];
		return $rezultat;
	}

	/* Status 15 = autentificare 3-D Secure cerută. NETOPIA dă atunci o adresă de
	   ACS plus câmpuri care trebuie trimise prin POST — un redirect simplu nu
	   ajunge. Nu improvizăm: lăsăm pluginul oficial, care are formularul gata
	   făcut, să ducă treaba la capăt. */
	if ( ! empty( $date['customerAction']['url'] ) ) {
		$order->add_order_note( 'NETOPIA cere autentificare 3-D Secure; s-a folosit pagina standard, care trimite formularul către banca emitentă.' );
		return $rezultat;
	}

	$mesaj = isset( $date['error']['message'] ) ? $date['error']['message'] : 'răspuns neașteptat de la NETOPIA';
	$order->add_order_note( 'Redirect direct NETOPIA nereușit: ' . wp_strip_all_tags( $mesaj ) . '. S-a folosit calea standard.' );
	return $rezultat;
}

/** Adresa, în forma cerută de API. 642 este codul ISO numeric al României. */
function ug_netopia_adresa( $order, $tip ) {
	$get = function ( $camp ) use ( $order, $tip ) {
		$metoda = 'get_' . $tip . '_' . $camp;
		return method_exists( $order, $metoda ) ? (string) $order->$metoda() : '';
	};

	$prenume = $get( 'first_name' );
	$nume    = $get( 'last_name' );

	/* Livrarea e adesea necompletată când coincide cu facturarea. Trimiterea
	   unui bloc gol face NETOPIA să respingă cererea, așa că se cade pe
	   facturare. */
	if ( 'shipping' === $tip && '' === $prenume ) {
		return ug_netopia_adresa( $order, 'billing' );
	}

	/* WooCommerce nu are e-mail și telefon pe adresa de livrare; sunt doar pe
	   facturare. Se trimit aceleași în ambele blocuri, ca NETOPIA să aibă unde
	   notifica indiferent de bloc. */
	return array(
		'email'       => $order->get_billing_email(),
		'phone'       => $order->get_billing_phone(),
		'firstName'   => $prenume,
		'lastName'    => $nume,
		'city'        => $get( 'city' ),
		'country'     => 642,
		'countryName' => 'Romania',
		'state'       => $get( 'state' ),
		'postalCode'  => $get( 'postcode' ),
		'details'     => trim( $get( 'address_1' ) . ' ' . $get( 'address_2' ) ),
	);
}

/** Liniile comenzii. TVA-ul se ia de pe produs, nu se presupune 19 %. */
function ug_netopia_produse( $order ) {
	$linii = array();

	foreach ( $order->get_items() as $item ) {
		$produs = $item->get_product();
		$linii[] = array(
			'name'     => $item->get_name(),
			'code'     => $produs ? ( $produs->get_sku() ? $produs->get_sku() : (string) $produs->get_id() ) : '',
			'category' => 'usi-garaj',
			'price'    => (float) $order->get_item_subtotal( $item, false ),
			'vat'      => (float) ug_netopia_cota_tva( $item ),
		);
	}

	/* Transportul e o linie de comandă pentru procesator, altfel suma
	   produselor nu dă totalul trimis și cererea poate fi respinsă. */
	$transport = (float) $order->get_shipping_total();
	if ( $transport > 0 ) {
		$linii[] = array(
			'name'     => 'Transport',
			'code'     => 'TRANSPORT',
			'category' => 'transport',
			'price'    => $transport,
			'vat'      => 0,
		);
	}

	return $linii;
}

function ug_netopia_cota_tva( $item ) {
	$net = (float) $item->get_total();
	$tva = (float) $item->get_total_tax();
	if ( $net <= 0 ) {
		return 0;
	}
	return round( $tva / $net * 100, 2 );
}

/* ==========================================================================
   2. Returul, ca plasă de siguranță
   ========================================================================== */

/**
 * Orice cale care ar scăpa pe lângă filtrul de mai sus — un plugin terț, o
 * eroare, o plată reluată din adminul WooCommerce — trebuie totuși să aducă
 * clientul înapoi în vitrină, nu pe o pagină WordPress.
 */
add_filter( 'woocommerce_get_return_url', 'ug_netopia_retur_in_vitrina', 20, 2 );

function ug_netopia_retur_in_vitrina( $url, $order ) {
	if ( ! $order ) {
		return $url;
	}
	return UG_VITRINA . '/comanda-confirmata.html?nr=' . rawurlencode( $order->get_order_number() );
}

/* ==========================================================================
   3. CORS pentru Store API
   ========================================================================== */

/**
 * Vitrina și WordPress-ul stau pe origini diferite, deci browserul cere
 * permisiune explicită.
 *
 * `Cart-Token` trebuie expus, altfel JavaScript-ul din vitrină nu-l poate citi
 * din răspuns — și fără el coșul apare gol la fiecare cerere, pentru că
 * cookie-urile de sesiune nu trec între domenii.
 *
 * Se permite un singur domeniu, cel al vitrinei. Nu `*`: cu `*` orice site de pe
 * internet ar putea manipula coșuri și plasa comenzi în numele vizitatorilor.
 */
add_action( 'rest_api_init', 'ug_cors_store_api', 15 );

function ug_cors_store_api() {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

	add_filter( 'rest_pre_serve_request', function ( $servit ) {
		$origine = isset( $_SERVER['HTTP_ORIGIN'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_ORIGIN'] ) ) : '';

		if ( untrailingslashit( $origine ) === untrailingslashit( UG_VITRINA ) ) {
			header( 'Access-Control-Allow-Origin: ' . untrailingslashit( UG_VITRINA ) );
			header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
			header( 'Access-Control-Allow-Headers: Content-Type, Cart-Token, Nonce, X-WC-Store-API-Nonce' );
			header( 'Access-Control-Expose-Headers: Cart-Token, Nonce, X-WC-Store-API-Nonce, Link' );
			header( 'Access-Control-Max-Age: 600' );
			header( 'Vary: Origin' );
		}

		return $servit;
	} );
}

/**
 * Cererea preflight `OPTIONS` trebuie să primească răspuns înainte ca
 * WooCommerce să ceară autentificare. Fără asta, browserul oprește cererea
 * reală și coșul nu funcționează deloc.
 */
add_action( 'init', function () {
	if ( isset( $_SERVER['REQUEST_METHOD'] ) && 'OPTIONS' === $_SERVER['REQUEST_METHOD']
		&& isset( $_SERVER['REQUEST_URI'] ) && false !== strpos( $_SERVER['REQUEST_URI'], '/wp-json/wc/store/' ) ) {

		$origine = isset( $_SERVER['HTTP_ORIGIN'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_ORIGIN'] ) ) : '';
		if ( untrailingslashit( $origine ) === untrailingslashit( UG_VITRINA ) ) {
			header( 'Access-Control-Allow-Origin: ' . untrailingslashit( UG_VITRINA ) );
			header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
			header( 'Access-Control-Allow-Headers: Content-Type, Cart-Token, Nonce, X-WC-Store-API-Nonce' );
			header( 'Access-Control-Expose-Headers: Cart-Token, Nonce, X-WC-Store-API-Nonce, Link' );
			header( 'Access-Control-Max-Age: 600' );
			header( 'Vary: Origin' );
			status_header( 204 );
			exit;
		}
	}
}, 1 );

/* ==========================================================================
   4. Subdomeniul nu servește pagini publice
   ========================================================================== */

/**
 * Vizitatorul care nimerește direct pe subdomeniul WordPress este trimis în
 * vitrină. Adminul, `/wp-json/`, `/wp-login.php` și cererile de plată rămân
 * neatinse — altfel nu s-ar mai putea administra magazinul.
 */
add_action( 'template_redirect', function () {
	if ( is_admin() || wp_doing_ajax() || wp_doing_cron() ) {
		return;
	}
	if ( is_user_logged_in() && current_user_can( 'manage_woocommerce' ) ) {
		return;
	}

	$cale = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '';
	foreach ( array( '/wp-json', '/wp-admin', '/wp-login', '/wc-api', '?wc-api' ) as $exceptie ) {
		if ( false !== strpos( $cale, $exceptie ) ) {
			return;
		}
	}

	wp_redirect( UG_VITRINA, 301 );
	exit;
}, 1 );
