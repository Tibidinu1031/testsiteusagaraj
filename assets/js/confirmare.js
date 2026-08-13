/**
 * confirmare.js — pagina de după plată.
 *
 * Aici ajung două categorii de clienți: cei care au plătit ramburs (veniți din
 * `checkout.js`) și cei care s-au întors de la NETOPIA după plata cu cardul.
 *
 * CE NU DECLARĂ PAGINA
 * Nu spune „plata a reușit”. Întoarcerea de la procesator înseamnă doar că
 * omul a terminat de completat formularul, nu că banca a autorizat.
 * Confirmarea reală vine prin IPN, server-la-server, și schimbă starea comenzii
 * în magazin. De aceea textul spune „comanda a fost înregistrată”.
 *
 * Și nici atât nu se afirmă fără dovadă: dacă adresa nu poartă un număr de
 * comandă, pagina a fost deschisă direct, nu în urma unei comenzi. Prima
 * variantă mulțumea pentru comandă oricui nimerea pe ea — un fals pe care un
 * cumpărător îl descoperă abia când nu-i vine niciun colet.
 */

window.UG = window.UG || {};

(function (UG) {
  'use strict';

  var cauta = new URLSearchParams(window.location.search);
  var numar = cauta.get('nr') || cauta.get('order') || cauta.get('order_id') || '';

  var el = document.getElementById('cod-comanda');

  if (numar) {
    if (el) {
      el.textContent = 'Comanda nr. ' + numar;
      el.hidden = false;
    }

    /* Comanda există în magazin: coșul și-a terminat rolul. */
    if (UG.cosUitaJeton) UG.cosUitaJeton();
    if (UG.checkoutUitaDate) UG.checkoutUitaDate();
    if (UG.cosGolește) UG.cosGolește();
    return;
  }

  /* Fără număr de comandă nu se confirmă nimic — și, mai important, NU se
     golește coșul: dacă omul a ajuns aici greșit, produsele trebuie să-l
     aștepte acolo unde le-a lăsat. */
  var gazda = document.querySelector('.rezultat');
  if (!gazda) return;

  gazda.innerHTML =
    '<div class="rezultat__semn" aria-hidden="true">?</div>' +
    '<h1>Nu găsim comanda</h1>' +
    '<p class="lede">Această pagină se deschide după plasarea unei comenzi, ' +
    'iar adresa nu conține niciun număr de comandă.</p>' +
    '<p>Dacă tocmai ați plătit și ați ajuns aici, comanda poate fi totuși ' +
    'înregistrată — sunați-ne la <a href="tel:+40731366613">0731 366 613</a> ' +
    'și verificăm împreună, ca să nu plătiți de două ori.</p>' +
    '<div class="cos-actiuni" style="justify-content:center">' +
      '<a class="btn btn--primary" href="cos.html">Vezi coșul</a>' +
      '<a class="btn btn--ghost" href="magazin.html">Înapoi la catalog</a>' +
    '</div>';
})(window.UG);
