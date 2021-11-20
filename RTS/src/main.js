import Phaser from "./lib/phaser.js"
import Game from "./scenes/Game.js"
import MenuPrincipal from "./scenes/menuPrincipal.js"
//import configTab from "./scenes/configTab.js"

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 480,
    height: 640,

    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scene:[MenuPrincipal,Game],
    physics: {
        default:"arcade",
        arcade:{
            gravity:{
                y: 250
            },
            debug:true
        }
    }

})