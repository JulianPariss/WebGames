/* nodoPuntaje = document.querySelector('#puntuacion');

console.log(puntos); */
/* nodoPuntaje.innerText =`Tu puntuacion fue:${puntos}`; */

/* import {puntos} from './app'; */

const puntos =  localStorage.getItem('puntos');

nodoPuntaje = document.querySelector('#puntuacion');
nodoReintentar = document.querySelector('#reiniciar');

nodoPuntaje.innerText = `Tu puntuacion fue:${puntos}`;

nodoReintentar.addEventListener("click",reintentar);


function reintentar() {
    window.location.href = 'game.html';
}