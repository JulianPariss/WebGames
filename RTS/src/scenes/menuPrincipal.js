import Phaser from "../lib/phaser.js"

export default class Game extends Phaser.Scene{
    backGroundSpeed
    backGround
    botones
    constructor(){
        super('menuPrincipal');
    }
    preload(){
        //Background load
        this.load.image('M_BackGround','assets/img/BackGround/background2.png');

        //Ui Load
        this.load.image('BotonUnpressed','assets/img/UI/buttonLong_blue.png');
        this.load.image('BotonPressed','assets/img/UI/buttonLong_blue_pressed.png');

        //Json Load
        this.load.json('config',"src/data/configurations.json");
        this.load.json('es',"src/data/lang/es.json");
        this.load.json('en','src/data/lang/en.json');

    }
    create(){
        //Json inicialize
        const configurations = this.cache.json.get('config');
        const es = this.cache.json.get('es');
        const en = this.cache.json.get('en');

        //---------------

        // BackGround -------------------------------------------------------------------------------
        const arrayBackground = [];

        arrayBackground[0] = this.add.image(0,320,'M_BackGround');
        arrayBackground[0].setScale(1.5,1.5);
        
        arrayBackground[1] = this.add.image(-(arrayBackground[0].displayWidth),320,'M_BackGround');
        arrayBackground[1].setScale(1.5,1.5); 

        this.backGround = arrayBackground;
        this.backGroundSpeed = 1.5;
        // ------------------------------------------------------------------------------------------ 

        const arrayBotones = [];
        console.log(this.determineLeng(configurations));

        arrayBotones[0] = {
            boton : this.add.sprite(240,140,'BotonUnpressed'),
            text : this.add.text(240,320,this.determineLeng(configurations,es.boton1,en.boton1),{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        }
        arrayBotones[0].boton.setScale(1.5,1.5);

        arrayBotones[1] = {
            boton : this.add.sprite(240,arrayBotones[0].boton.displayHeight + arrayBotones[0].boton.y +13,'BotonUnpressed'),
        }
        arrayBotones[1].boton.setScale(1.5,1.5);

        arrayBotones[2] = {
            boton: this.add.sprite(240,arrayBotones[1].boton.displayHeight + arrayBotones[1].boton.y +160,'BotonUnpressed'),
        }
        arrayBotones[2].boton.setScale(1.5,1.5);




    }
    update(){
        this.backGround[0].setX(this.backGround[0].x+ this.backGroundSpeed);
        this.backGround[1].setX(this.backGround[1].x+ this.backGroundSpeed);
        this.horizontalWrap(this.backGround)    
    }
    horizontalWrap (arrayBackground) 
    {
        const display = arrayBackground[0].displayWidth;

        if (arrayBackground[0].x > display){
            arrayBackground[0].setX(arrayBackground[1].x-display)
            //console.log("entro0");
        }
        if (arrayBackground[1].x > display){
            arrayBackground[1].setX(arrayBackground[0].x-display)
            //console.log("entro1");
        }
    }
    determineLeng (configurations,es,en){
        switch (configurations.lan){
            case 'es':
                return es;
                break;
            case 'en':
                return en;
                break;
            default:
                return "unknow";    
        }
    }

}