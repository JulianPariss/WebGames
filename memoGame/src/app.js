
//Variables de datos
let puntos = 0;
let puntosLocales = 0;
let arregloPatron = [];
//------------------

// Variables condicionales
let game = true;
let comenzarAJugar = false;
//------------------------


// Variables velocidad de juego y dificultad
const time = 1000;
let dificultad = 0;
//------------------------------------------

//Lista de nodos
let nodoCubos = document.querySelectorAll(".cubo");
//--------------



// Cargar jugadas
function randomIntFromInterval() {
  return Math.floor(Math.random() * (7 - 0 + 1) + 0);
}

function cargarPatron() {
  for (let i = 0; i < dificultad; i++) {
    arregloPatron.push(randomIntFromInterval());
  }
}
//---------------

//Iluminar secuencia

function removerAnimacion(i) {
  nodoCubos[arregloPatron[i]].classList.remove("anim");
}

function iluminarCuadrante(i) {
  if (i < dificultad) {
    nodoCubos[arregloPatron[i]].classList.add("anim");
    setTimeout(removerAnimacion, time - 500, i);
    i++;
    setTimeout(iluminarCuadrante, time, i);
  }
}
function iluminarSecuencia() {
  let i = 0;
  setTimeout(iluminarCuadrante, time, i);
}

//-----------------

// Iluminar aciertos
function resetearCubos() {
  nodoCubos[valor].style.border = "";
  //nodeTitulo.innerText = "Correcto!"
}

function iluminarCorrectos() {
    nodoCubos[valor].style.border = "thick solid #fff";
    setTimeout(resetearCubos, 200);
}
//-----------------


// Boton de inicio de juego

nodoComenzarJuego = document.querySelector('#boton');
nodoFondo = document.querySelector('#fondo');
nodoComenzarJuego.addEventListener('click',function() {
    nodoFondo.style.display = "none";
    juego();
});

//-------------------------

// Protector de pantalla

nodoProtector = document.querySelector('#protector');

nodeTitulo = document.querySelector('.titulo');

//----------------------



function juego() {
  nodeTitulo.innerText = "Memoriza!"
  nodoProtector.style.display = "block";
  comenzarAJugar = false;
  puntosLocales = 0;
  dificultad++;
  cargarPatron();
  iluminarSecuencia();
  setTimeout(function(){comenzarAJugar = true; nodoProtector.style.display = "none"; nodeTitulo.innerText = "Demuestralo!"}, time * dificultad + 1000);
}


function compararValores() {
  if (game) {
    if (comenzarAJugar) {
      if (valor === arregloPatron[0]) {
        iluminarCorrectos();
        puntos++;
        puntosLocales++;
        document.getElementById("puntuacion").innerText = "PTS: " + puntos;
        arregloPatron.shift();
        if (puntosLocales === dificultad) {
          setTimeout(juego,500);
        }
      } else {
        game = false;
        localStorage.setItem('puntos', puntos);
        window.location.href = "perdiste.html";
      }
    } else {
      alert("Todavia no comenzo el juego!");
    }
  }
}



// ----------------------- Listeners -----------------//

let valor;
nodoCubos[0].addEventListener("click", () => {
  valor = 0;
  compararValores();
});
nodoCubos[1].addEventListener("click", () => {
  valor = 1;
  compararValores();
});
nodoCubos[2].addEventListener("click", () => {
  valor = 2;
  compararValores();
});
nodoCubos[3].addEventListener("click", () => {
  valor = 3;
  compararValores();
});
nodoCubos[4].addEventListener("click", () => {
  valor = 4;
  compararValores();
});
nodoCubos[5].addEventListener("click", () => {
  valor = 5;
  compararValores();
});
nodoCubos[6].addEventListener("click", () => {
  valor = 6;
  compararValores();
});
nodoCubos[7].addEventListener("click", () => {
  valor = 7;
  compararValores();
});
// ----------------------- Listeners -----------------//


