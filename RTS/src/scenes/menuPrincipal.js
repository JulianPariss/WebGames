import Phaser from "../lib/phaser.js"

export default class menuPrincipal extends Phaser.Scene{
    width
    height
    backGroundSpeed
    backGround

    largeButtonArray
    especialButtons


    configurations
    arrayLenguaje
    idiomaActual
    idiomaAnterior
    

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
        this.load.svg('Cog','assets/img/UI/cog-solid.svg');
        this.load.svg('BackArrow','assets/img/UI/arrow-solid.svg');
        this.load.image('arrowLeft', 'assets/img/UI/arrowBlue_left.png');
        this.load.image('arrowRight', 'assets/img/UI/arrowBlue_right.png')

        //Json Load
        this.load.json('config',"src/data/configurations.json");
        this.load.json('es',"src/data/lang/es.json");
        this.load.json('en','src/data/lang/en.json');
        this.load.json('it','src/data/lang/it.json');

        this.canvas = this.sys.game.canvas;

    }
    create(){
        //Json inicialize
        this.configurations = this.cache.json.get('config');
        //---------------
        let {width,height} = this.sys.game.canvas;
        this.width = width;
        this.height = height;
        //---------------

        // BackGround -------------------------------------------------------------------------------
        const arrayBackground = [];
        
        arrayBackground[0] = this.add.image(0,320,'M_BackGround');
        arrayBackground[0].setScale(1.5,1.5);
        
        arrayBackground[1] = this.add.image(-(arrayBackground[0].displayWidth),320,'M_BackGround');
        arrayBackground[1].setScale(1.5,1.5); 

        this.backGround = arrayBackground;
        this.backGroundSpeed = 0.5;
        // ------------------------------------------------------------------------------------------ 

        // Animaciones-------------------------------------------------------------------------------

        const frames = [];

        frames[0] = {
            key: 'BotonPressed'
            //frame: 0
        }
        frames[1] = {
            key: 'BotonUnpressed'
            //frame : 1
        }

        const config = {
            key : 'run',
            frames : frames,
            frameRate: 3,
            repeat : 0

        }
        this.anims.create(config);

        // ------------------------------------------------------------------------------------------ 
        
        // Create largeButtons ----------------------------------------------------------------------
        function Button(scene,type,key){
            this.type = type;
            this.key = key;
            this.spr = scene.add.sprite(-200,-200,'BotonUnpressed')
            this.spr.setScale(1.5,1.5);
            this.spr.setVisible(false);
            this.spr.setInteractive();
            this.text = scene.add.text(-200,-200);
            this.text.setVisible(false);
        }

        this.largeButtonArray = [];

        for (let i = 0; i < 9;i++){
            let type = 'mainMenu';
            if ((i > 2) && (i < 6)) {
                type = 'configMenu';
            } else if ((i > 5) && (i < 9)){
                type = 'lenguageMenu';
            }
            this.largeButtonArray[i] = new Button(this,type,"boton"+i)
            this.largeButtonArray[i].spr.on('pointerdown',() =>{
                this.largeButtonArray[i].spr.play('run')
            })
        }
        // ------------------------------------------------------------------------------------------ 

        this.especialButtons = {
            configButton : {
                key : "mainMenu",
                spr : this.add.sprite(-200,-200,'SmallBotonUnpressed'),
                text : this.add.image(-200,-200,'Cog'),
                animation : false
            },
            backButton : {
                key : "configMenu",
                spr : this.add.sprite(-200,-200,'SmallBotonUnpressed'),
                text : this.add.image(-200,-200,'BackArrow')
            }
        }

        this.especialButtons.configButton.text.setScale(0.2,0.2);
        this.especialButtons.configButton.text.setTintFill(13027014);
        this.especialButtons.configButton.spr.setInteractive();
        this.especialButtons.configButton.spr.setPosition(440,40);
        this.especialButtons.configButton.text.setPosition(440,40);


        this.especialButtons.backButton.spr.setPosition(40,40);
        this.especialButtons.backButton.text.setPosition(40,40);
        this.especialButtons.backButton.text.setScale(0.2,0.2);
        this.especialButtons.backButton.text.setTintFill(13027014);
        this.especialButtons.backButton.spr.setInteractive();


        this.createMainMenu();

        this.especialButtons.configButton.spr.on('pointerdown',() => {this.cogAnimationPlay()});
        this.especialButtons.backButton.spr.on('pointerdown',() => {this.determineBack()})
        this.largeButtonArray[4].spr.on('pointerdown',() => {this.createLanguageMenu()});
        this.largeButtonArray[0].spr.on('pointerdown',() => {this.scene.start('game')}); 

        /* 
        arrayBotones[11].boton.on('pointerdown',() => {this.siguienteLenguaje()});
        arrayBotones[10].boton.on('pointerdown',()=> {this.cancelarCambioLenguaje()}) */

        this.arrayLenguaje = ["es","en","it"]
        this.idiomaActual = this.configurations.lan;
        this.idiomaAnterior = this.configurations.lan;

    }
    update(){
        this.backGround[0].setX(this.backGround[0].x+ this.backGroundSpeed);
        this.backGround[1].setX(this.backGround[1].x+ this.backGroundSpeed);
        this.horizontalWrap(this.backGround)    


         if (this.especialButtons.configButton.animation) {
            this.especialButtons.configButton.text.angle += 7;
        }
             


    }
    horizontalWrap (arrayBackground) 
    {
        const display = arrayBackground[0].displayWidth;

        if (arrayBackground[0].x > display){
            arrayBackground[0].setX(arrayBackground[1].x-display)
        }
        if (arrayBackground[1].x > display){
            arrayBackground[1].setX(arrayBackground[0].x-display)
        }
    }
    determineLeng (boton){
        const es = this.cache.json.get('es');
        const en = this.cache.json.get('en');
        const it = this.cache.json.get('it')
        switch (this.configurations.lan){
            case 'es':
                return this.determineBoton(boton,es);
                break;
            case 'en':
                return this.determineBoton(boton,en);
                break;
            case 'it':
                return this.determineBoton(boton,it);
                break; 
            default:
                return "unknow";    
        }
    }
    determineBoton(boton,len){
        switch(boton){
            case 'boton0':
                return len.boton0;
                break;
            case 'boton1' :
                return len.boton1;
                break;
            case 'boton2' : 
                return len.boton2;
                break;
            case 'boton3' :
                return len.boton3;
                break;
            case 'boton4' :
                return len.boton4;
                break;
            case 'boton5' : 
                return len.boton5;
                break;
            case 'boton6' :
                return len.boton6;
                break;
            case 'boton7' : 
                return len.boton7;
                break;
            case 'boton8' :
                return len.boton8;
                break;             
            default :
                return "MissingButton"               
        }
    }
    textRender (objeto) {
        objeto.text.setFontFamily('Times, "Times New Roman", Georgia, serif');

        const halfWidth = objeto.text.width/2;
        const halfHeight = objeto.text.height/2;

        objeto.text.setX(objeto.spr.x-halfWidth);
        objeto.text.setY(objeto.spr.y-halfHeight); 

        objeto.text.setColor("#C6C6C6")
        
    }
    createElements () {
        /* 
        arrayBotones[11] = {
            boton : this.add.sprite(-200,-200,'arrowLeft'),
        }
        arrayBotones[11].boton.setInteractive();
        arrayBotones[11].boton.setScale(1.2,1.2)
        arrayBotones[12] = {
            boton : this.add.sprite(-200,-200,'arrowRight'),
        }
        arrayBotones[12].boton.setInteractive();
        arrayBotones[12].boton.setScale(1.2,1.2) */
    }
    createMainMenu () {
        this.clearMenu();

        this.largeButtonArray.forEach(element => {
            if (element.type === "mainMenu") {
                element.spr.setVisible(true);
                element.text.setVisible(true);
                if (element.key === "boton0") {
                    element.spr.setPosition(this.width/2,element.spr.displayHeight+109);
                    element.text.setText(this.determineLeng(element.key));
                }
                else if (element.key === "boton1") {
                    element.spr.setPosition(this.width/2,element.spr.displayHeight+197);
                    element.text.setText(this.determineLeng(element.key));
                }
                else if (element.key === "boton2") {
                    element.spr.setPosition(this.width/2,element.spr.displayHeight+432);
                    element.text.setText(this.determineLeng(element.key));
                }
                this.textRender(element);
            }
        });
        this.especialButtons.configButton.spr.setVisible(true);
        this.especialButtons.configButton.text.setVisible(true);
    }
    createConfigMenu () {

        this.clearMenu();

        this.largeButtonArray.forEach(element => {
            if (element.type === "configMenu") {
                element.spr.setVisible(true);
                element.text.setVisible(true);
                if (element.key === "boton3") {
                    element.spr.setPosition(this.width/2,element.spr.displayHeight+109);
                    element.text.setText(this.determineLeng(element.key));
                }
                else if (element.key === "boton4") {
                    element.spr.setPosition(this.width/2,element.spr.displayHeight+197);
                    element.text.setText(this.determineLeng(element.key));
                }
                else if (element.key === "boton5") {
                    element.spr.setPosition(this.width/2,element.spr.displayHeight+432);
                    element.text.setText(this.determineLeng(element.key));
                }
                this.textRender(element);
            }
        });
        this.especialButtons.backButton.key = "mainMenu";

        this.especialButtons.configButton.spr.setVisible(true);
        this.especialButtons.configButton.text.setVisible(true);

        this.especialButtons.backButton.spr.setVisible(true);
        this.especialButtons.backButton.text.setVisible(true);
    }
    createLanguageMenu(){
        this.clearMenu();


        this.largeButtonArray.forEach(element => {
            if (element.type === "lenguageMenu") {
                element.spr.setVisible(true);
                element.text.setVisible(true);
                if (element.key === "boton6") {
                    element.spr.setPosition(this.width/2,element.spr.displayHeight+109);
                    element.text.setText(this.determineLeng(element.key));
                }
                else if (element.key === "boton7") {
                    element.spr.setPosition(this.width/2,element.spr.displayHeight+197);
                    element.text.setText(this.determineLeng(element.key));
                }
                else if (element.key === "boton8") {
                    element.spr.setPosition(this.width/2,element.spr.displayHeight+432);
                    element.text.setText(this.determineLeng(element.key));
                }
                this.textRender(element);
            }
        });
        this.especialButtons.backButton.key = "configMenu";

        this.especialButtons.configButton.spr.setVisible(true);
        this.especialButtons.configButton.text.setVisible(true);

        this.especialButtons.backButton.spr.setVisible(true);
        this.especialButtons.backButton.text.setVisible(true);

        /* 
        this.botones[11].boton.setPosition(this.botones[8].boton.x - this.botones[8].boton.displayWidth/2 - 20,this.botones[8].boton.y)
        this.botones[12].boton.setPosition(this.botones[8].boton.x + this.botones[8].boton.displayWidth/2 + 20,this.botones[8].boton.y)
         */

    }
    determineBack() {
        switch (this.especialButtons.backButton.key) {
            case 'mainMenu' : this.createMainMenu();
            break;
            case 'configMenu' : this.createConfigMenu();
            break;
            default : this.createMainMenu();
        }
        
    }

    clearMenu () {
        this.largeButtonArray.forEach(element => {
            element.spr.setVisible(false);
            element.text.setVisible(false);
        });
        this.especialButtons.configButton.spr.setVisible(false);
        this.especialButtons.configButton.text.setVisible(false);

        this.especialButtons.backButton.spr.setVisible(false);
        this.especialButtons.backButton.text.setVisible(false);
    }


    cogAnimationPlay() {
        this.especialButtons.configButton.animation = true;
        this.especialButtons.configButton.spr.off('pointerdown');
        setTimeout(() => {
            this.cogAnimationStop(this.especialButtons,this.configurations)},500);
    }

    cogAnimationStop (boton,configurations) {
        boton.configButton.animation = false;
        this.createConfigMenu(configurations)
        boton.configButton.spr.on('pointerdown',() => {this.cogAnimationPlay()});
    }


    siguienteLenguaje () {
        const indice = this.arrayLenguaje.indexOf(this.idiomaActual);
        if (indice === this.arrayLenguaje.length - 1) {
            this.idiomaActual = this.arrayLenguaje[0]
        } else this.idiomaActual = this.arrayLenguaje[indice+1];
        this.sobreescribirJson();
    }
    sobreescribirJson(){
        this.configurations.lan = this.idiomaActual;
        this.createLanguageMenu();
        //this.configurations.addToCache();
    }
    cancelarCambioLenguaje() {
        this.configurations.lan = this.idiomaAnterior;
        this.createConfigMenu();
    }
}
