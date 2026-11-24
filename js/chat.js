/* Punto de Vista — página de conversaciones
   Los mensajes se guardan en este navegador (localStorage).
   Para un chat entre personas distintas se necesita un servidor. */

var tema = 'Mundo blanco';
var lista = document.getElementById('mensajes');
var form = document.getElementById('form');
var inputNombre = document.getElementById('nombre');
var inputTexto = document.getElementById('texto');

/* Leer y guardar los mensajes de un tema */
function leer() {
  return JSON.parse(localStorage.getItem('chat-' + tema) || '[]');
}
function guardar(mensajes) {
  localStorage.setItem('chat-' + tema, JSON.stringify(mensajes));
}

/* Dibujar los mensajes en pantalla */
function mostrar() {
  var mensajes = leer();
  lista.innerHTML = '';

  if (mensajes.length === 0) {
    lista.innerHTML = '<p class="vacio">Aún no hay mensajes. ¡Escribe el primero!</p>';
    return;
  }

  mensajes.forEach(function (m) {
    var div = document.createElement('div');
    div.className = 'mensaje';

    var autor = document.createElement('strong');
    autor.textContent = m.nombre;
    var texto = document.createElement('p');
    texto.textContent = m.texto;   /* textContent evita código malicioso */

    div.appendChild(autor);
    div.appendChild(texto);
    lista.appendChild(div);
  });

  lista.scrollTop = lista.scrollHeight;  /* bajar al último mensaje */
}

/* Enviar mensaje */
form.onsubmit = function (e) {
  e.preventDefault();
  var mensajes = leer();
  mensajes.push({ nombre: inputNombre.value.trim(), texto: inputTexto.value.trim() });
  guardar(mensajes);
  inputTexto.value = '';
  mostrar();
};

/* Cambiar de tema */
var botones = document.querySelectorAll('#temas button');
botones.forEach(function (b) {
  b.onclick = function () {
    botones.forEach(function (x) { x.classList.remove('activo'); });
    b.classList.add('activo');
    tema = b.dataset.tema;
    document.getElementById('titulo-chat').textContent = tema;
    mostrar();
  };
});

mostrar();
