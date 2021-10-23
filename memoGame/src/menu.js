

let nodoInstruccion = document.querySelector('.Inst');

let nodoJugar = document.querySelector('.Play');


nodoInstruccion.addEventListener("click",cargarInstrucciones);
nodoJugar.addEventListener("click",comenzarJuego);


function cargarInstrucciones() {
    window.location.href = 'instrucciones.html';
}

function comenzarJuego() {
    window.location.href = 'game.html';
}