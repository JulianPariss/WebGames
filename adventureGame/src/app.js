const cuadricula = document.querySelectorAll('.cuadrante');
let arrayCeldas = [];

const cuerpo = document.querySelector('.personaje');
cuerpo.style.width = cuadricula[0].offsetHeight-5+'px';
cuerpo.style.height = cuadricula[0].offsetHeight+4+'px';

const cabeza = document.querySelector('.cabeza');
cabeza.style.width = cuadricula[0].offsetHeight-15+'px';
cabeza.style.height = cuadricula[0].offsetHeight-21+'px';

const pelo = document.querySelector('.pelo');
pelo.style.width = cuadricula[0].offsetHeight-20+'px';
pelo.style.height = cuadricula[0].offsetHeight-22+'px';

let posicionActual = 0;
let monedasActuales = 0;
let monedasTotales = 0;
let cuentaPasos = 0;
let nodoPasos = document.querySelector(".contadorSteps");
let nodoMonedas = document.querySelector(".contadorCoins");

cargarMap();
renderizarMonedas();


function renderizarMonedas () {
  console.log(arrayCeldas);
  for (let i = 0; i < arrayCeldas.length; i++) {
    console.log(i);
    if (arrayCeldas[i].haveCoin){
      const nodoMoneda = document.createElement('div');
      nodoMoneda.classList.add('moneda');
      arrayCeldas[i].nodo.appendChild(nodoMoneda);
    }
  } 
}








function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
   
        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }

  window.addEventListener("scroll", updatePosition, false);
  window.addEventListener("resize", updatePosition, false);
  function updatePosition() {
    position = getPosition(cuerpo);
  } 





/*   function moverPersonaje(x_pos, y_pos) {
    cuerpo.style.left = x_pos+'px';
    cuerpo.style.top = y_pos-8+'px';
  } */
/* moverPersonaje(obj.x,obj.y+6); */
/* let obj = getPosition(cuadricula[0]); */

function renderizarContadorSteps() {
  nodoPasos.innerText = " "+cuentaPasos;
}

function renderizarPuntajeMonedas() {
    nodoMonedas.innerText = " "+monedasTotales;
}

function removerMoneda() {
    arrayCeldas[posicionActual].nodo.removeChild(arrayCeldas[posicionActual].nodo.firstChild);
    arrayCeldas[posicionActual].haveCoin = false;
}

function hayMoneda() {
  if (arrayCeldas[posicionActual].haveCoin) {
    monedasTotales++;
    monedasActuales--;
    renderizarPuntajeMonedas();
    removerMoneda();
    if(monedasActuales === 0){
      masMonedas();
      renderizarMonedas();
    }
  }
}


let inicio = getPosition(arrayCeldas[0].nodo);
cuerpo.style.left = inicio.x+"px";
cuerpo.style.top = inicio.y-2+'px';

function cambiarPosicion(obj) {
  cuerpo.style.left = obj.x+"px";
  cuerpo.style.top = obj.y-2+'px';
  testCollides();
  hayMoneda();
}

function rotacionPersonaje(direccion) {
  cuerpo.style.transform = "rotate"+direccion;
}


function moverAbajo() {
  posicionActual += 8;
  cambiarPosicion(getPosition(arrayCeldas[posicionActual].nodo));
  rotacionPersonaje("(90deg)");
  cuentaPasos++;
  renderizarContadorSteps();
}

function moverArriba() {
  posicionActual -= 8;
  cambiarPosicion(getPosition(arrayCeldas[posicionActual].nodo));
  rotacionPersonaje("(-90deg)");
  cuentaPasos++;
  renderizarContadorSteps();
}

function moverDerecha () {
  posicionActual++;
  cambiarPosicion(getPosition(arrayCeldas[posicionActual].nodo));
  rotacionPersonaje("(0deg)");
  cuentaPasos++;
  renderizarContadorSteps();
}

function moverIzquierda() {
  posicionActual--;
  cambiarPosicion(getPosition(arrayCeldas[posicionActual].nodo));
  rotacionPersonaje("(180deg)");
  cuentaPasos++;
  renderizarContadorSteps();
}


// COLIDES
function testCollides() {
  if (!arrayCeldas[posicionActual].top){
  flechaArriba.removeEventListener('click',moverArriba);
  } else flechaArriba.addEventListener('click',moverArriba);

  if (!arrayCeldas[posicionActual].bottom){
    flechaAbajo.removeEventListener('click',moverAbajo);
    } else flechaAbajo.addEventListener('click',moverAbajo);

  if (!arrayCeldas[posicionActual].left){
    flechaIzquierda.removeEventListener('click',moverIzquierda);
    } else flechaIzquierda.addEventListener('click',moverIzquierda);  
  
  if (!arrayCeldas[posicionActual].right){
    flechaDerecha.removeEventListener('click',moverDerecha);
    } else flechaDerecha.addEventListener('click',moverDerecha);
}



    const flechaAbajo = document.querySelector('.abajo');
    flechaAbajo.addEventListener('click',moverAbajo);

    const flechaArriba = document.querySelector('.arriba');
    flechaArriba.addEventListener('click',moverArriba);

    const flechaIzquierda = document.querySelector('.izquierda');
    flechaIzquierda.addEventListener('click',moverIzquierda);

    const flechaDerecha = document.querySelector('.derecha');
    flechaDerecha.addEventListener('click',moverDerecha);

    testCollides();





