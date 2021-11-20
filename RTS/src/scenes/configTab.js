import Phaser from "../lib/phaser.js"

export default class Game extends Phaser.Scene{
    
    constructor(){
        super('configTab')
    }
    preload(){
        this.load.image('boton','assets/img/UI/panel_blue.png');

        this.load.json('configs','src/data/preConfigs.json');
    }
    create(){

        const data = this.cache.json.get('configs');
        console.log(data.map);

        const mapGrass = this.add.sprite(100,320,'boton')
        mapGrass.setInteractive();

        mapGrass.on('pointerdown',()=>{
            data.map = "Grass";
            console.log(data.map);
        })

        const mapSand = this.add.sprite(380,320,'boton')
        mapSand.setInteractive();

        mapSand.on('pointerdown',()=>{
            data.map = "Sand";
            console.log("Sand");
        })

        const comenzarJuego = this.add.sprite(240,320,'boton')
        comenzarJuego.setInteractive();

        comenzarJuego.on('pointerdown',()=>{
            this.scene.start("game")
        })
        
    }
}