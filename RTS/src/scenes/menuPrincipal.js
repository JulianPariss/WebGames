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
        this.load.image('SmallBotonUnpressed','assets/img/UI/buttonSquare_blue.png');
        this.load.image('SmallBotonPressed','assets/img/UI/buttonSquare_blue_pressed.png');
        this.load.svg('Cog','assets/img/UI/cog-solid.svg')

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

        arrayBotones[0] = {
            boton : this.add.sprite(240,140,'BotonUnpressed'),
            text : this.add.text(-200,-200,this.determineLeng(configurations,es.boton1,en.boton1))
        }
        arrayBotones[0].boton.setScale(1.5,1.5);
        this.textRender(arrayBotones[0]);

        arrayBotones[1] = {
            boton : this.add.sprite(240,arrayBotones[0].boton.displayHeight + arrayBotones[0].boton.y +13,'BotonUnpressed'),
            text : this.add.text (-200,-200,this.determineLeng(configurations,es.boton2,en.boton2))
        }
        arrayBotones[1].boton.setScale(1.5,1.5);
        this.textRender(arrayBotones[1]);

        arrayBotones[2] = {
            boton : this.add.sprite(240,arrayBotones[1].boton.displayHeight + arrayBotones[1].boton.y +160,'BotonUnpressed'),
            text : this.add.text(-200,-200,this.determineLeng(configurations,es.boton3,en.boton3))
        }
        arrayBotones[2].boton.setScale(1.5,1.5);
        this.textRender(arrayBotones[2]);

        arrayBotones[3] = {
            boton :this.add.sprite(440,40,'SmallBotonUnpressed'),
            img : this.add.image(440,40,'Cog'),
            animation : false
        }
        arrayBotones[3].img.setScale(0.2,0.2)
        arrayBotones[3].img.setTintFill(13027014);

        arrayBotones.forEach(element => {
            element.boton.setInteractive();
        });

        arrayBotones[3].boton.on('pointerdown',function cog(){
            arrayBotones[3].animation = true;
            arrayBotones[3].boton.off('pointerdown')
            setTimeout( () => {
                arrayBotones[3].animation = false;
                arrayBotones[3].boton.on('pointerdown',cog)
            },1000)
        })

        this.botones = arrayBotones;

        
    }
    update(){
        this.backGround[0].setX(this.backGround[0].x+ this.backGroundSpeed);
        this.backGround[1].setX(this.backGround[1].x+ this.backGroundSpeed);
        this.horizontalWrap(this.backGround)    


        if (this.botones[3].animation) {
            this.botones[3].img.angle += 5;
        }
            


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
    textRender (objeto) {
        objeto.text.setFontFamily('Times, "Times New Roman", Georgia, serif');

        const halfWidth = objeto.text.width/2;
        const halfHeight = objeto.text.height/2;

        objeto.text.setX(objeto.boton.x-halfWidth);
        objeto.text.setY(objeto.boton.y-halfHeight); 

        objeto.text.setColor("#C6C6C6")
        
    }

}
