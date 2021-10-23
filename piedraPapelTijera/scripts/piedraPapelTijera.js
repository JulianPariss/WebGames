
let gameObject = {
     opciones : ["piedra", "papel", "tijera"],
     numeroRandom : 0,
     puntajeUsuario : 0,
     puntajeComputadora : 0,
     usuario : "",
     computadora : "",
     game : function(user) {
    this.numeroRandom = parseInt(Math.random() * (3 - 0) + 0);
    this.computadora = this.opciones[this.numeroRandom];
    this.usuario = user;

  if (this.usuario == this.computadora) {
    console.log("Hey! Esto es un empate");
    document.getElementById("mensaje").innerHTML = "EMPATE";
  } else {
    if (this.usuario == "piedra") {
      if (this.computadora == "papel") {
        console.log("Perdiste 😪");
        this.perdiste();
        
      } else {
        console.log("Ganaste");
        this.ganaste();
      }
    }

    if (this.usuario == "papel") {
      if (this.computadora == "piedra") {
        console.log("Ganaste");
        this.ganaste();
      } else {
        console.log("Perdiste 😪");
        this.perdiste();
      }
    }

    if (this.usuario == "tijera") {
      if (this.computadora == "piedra") {
        console.log("Perdiste 😪");
        this.perdiste();
      } else {
        console.log("Ganaste");
        this.ganaste();
      }
    }
  }
 // this.quienGano();
     },
     actualizarMarcadores : function () {
        document.getElementById("puntajeMaquina").innerHTML = this.puntajeComputadora;
        document.getElementById("puntajeUsuario").innerHTML = this.puntajeUsuario;
    },
    ganaste : function () {
        this.puntajeUsuario++;
        document.getElementById("mensaje").innerHTML = "GANASTE";
        this.actualizarMarcadores();
    },
    perdiste :function () {
        this.puntajeComputadora++;
        document.getElementById("mensaje").innerHTML = "PERDISTE";
        this.actualizarMarcadores();
    },
    quienGano : function () {
      if (gameObject.puntajeUsuario == 2) {
        alert("Gano el jugador!")
      }
      if (gameObject.puntajeComputadora == 2) {
        alert("Gano la computadora!")
      }
    }

}


/*while ((gameObject.puntajeUsuario < 2) && (gameObject.puntajeComputadora < 2)) {
    gameObject.game();
}*/







