/* Punto de Vista — comportamiento de la página de inicio */
(function () {
  'use strict';

  /* ---------- Carrusel "Para reflexionar" ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var puntos = document.getElementById('puntos');
  var actual = 0;

  function mostrar(n) {
    if (!slides.length) return;
    actual = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('activa', i === actual); });
    if (puntos) {
      Array.prototype.forEach.call(puntos.children, function (p, i) {
        if (i === actual) p.setAttribute('aria-current', 'true');
        else p.removeAttribute('aria-current');
      });
    }
  }

  if (slides.length && puntos) {
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'punto';
      b.setAttribute('aria-label', 'Reflexión ' + (i + 1) + ' de ' + slides.length);
      b.addEventListener('click', function () { mostrar(i); });
      puntos.appendChild(b);
    });
    document.getElementById('prev').addEventListener('click', function () { mostrar(actual - 1); });
    document.getElementById('next').addEventListener('click', function () { mostrar(actual + 1); });
    mostrar(0);

    /* Deslizar con el dedo en celular y tablet */
    var carrusel = document.getElementById('carrusel');
    var x0 = null;
    carrusel.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    carrusel.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) mostrar(actual + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }



  /* ---------- Conversaciones: Expandir / Contraer ---------- */
  var btn = document.getElementById('btn-chats');
  var panel = document.getElementById('chats');
  if (btn && panel) {
    btn.addEventListener('click', function () {
      var abierto = panel.classList.toggle('expandido');
      btn.setAttribute('aria-expanded', String(abierto));
      btn.textContent = abierto ? 'Contraer' : 'Expandir';
    });
  }
})();
