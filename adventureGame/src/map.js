let celda = {
    nodo:"",
    top:"",
    left:"", 
    right:"", 
    bottom:"", 
    haveCoin: false,
    randomIntFromInterval: function() { 
        return Math.floor(Math.random() * (10 - 0 + 1) + 0)
    },
    Celda :function(nodo){
        this.nodo = nodo;
    }
}

function masMonedas() {
    for (let i = 0; i < arrayCeldas.length; i++) {
        const random = celda.randomIntFromInterval();
        if (random === 1) {
            arrayCeldas[i].haveCoin = true;
            monedasActuales++;
        } else {arrayCeldas[i].haveCoin = false;}
    }
}

function cargarMap() {
    for (let i = 0; i < cuadricula.length; i++) {
        arrayCeldas[i] = new celda.Celda(cuadricula[i]);
        asignarColiders();
        const random = celda.randomIntFromInterval(); 
        if (random === 1) {
            arrayCeldas[i].haveCoin = true;
            monedasActuales++;
        } else {arrayCeldas[i].haveCoin = false;}
        
    }
}
function asignarColiders() {
    for (let i = 0; i < arrayCeldas.length; i++) {
        if (cuadricula[i].classList.contains("topC")) {
            arrayCeldas[i].top = false;
        } else arrayCeldas[i].top = true;

        if (cuadricula[i].classList.contains("leftC")) {
            arrayCeldas[i].left = false;
        } else arrayCeldas[i].left = true;

        if (cuadricula[i].classList.contains("rightC")) {
            arrayCeldas[i].right = false;
        } else arrayCeldas[i].right = true;

        if (cuadricula[i].classList.contains("bottomC")) {
            arrayCeldas[i].bottom = false;
        } else arrayCeldas[i].bottom = true;
    }
    
}
