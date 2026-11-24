/* Punto de Vista — página de inicio */

/* ---------- Reflexiones: cambian solas cada 5 segundos ---------- */
var slides = document.querySelectorAll('.slide');
var actual = 0;

setInterval(function () {
  slides[actual].classList.remove('activa');
  actual = (actual + 1) % slides.length;
  slides[actual].classList.add('activa');
}, 5000); /* 5000 ms = 5 segundos */

/* ---------- Conversaciones: Expandir / Contraer ---------- */
var boton = document.getElementById('btn-chats');
var chats = document.getElementById('chats');

boton.onclick = function () {
  var abierto = chats.classList.toggle('expandido');
  boton.setAttribute('aria-expanded', abierto);
  boton.textContent = abierto ? 'Contraer' : 'Expandir';
};
