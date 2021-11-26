import Phaser from "../lib/phaser.js"

export default class menuPrincipal extends Phaser.Scene{
    width
    height
    backGroundSpeed
    backGround
    botones
    configurations
    arrayLenguaje
    idiomaActual
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

        const arrayBotones = [];

        this.botones = this.createElements(arrayBotones);
        this.mainMenu();
        arrayBotones[6].boton.on('pointerdown',() => {this.cogAnimationPlay()});
        arrayBotones[7].boton.on('pointerdown',() => {this.mainMenu()})
        arrayBotones[4].boton.on('pointerdown',() => {this.createLanguageMenu()}); 
        arrayBotones[11].boton.on('pointerdown',() => {this.siguienteLenguaje()});

        for (let i = 0; i < 11; i++) {
            if ((i !== 6)&&(i !== 7)&&(i !== 8)) {
                this.botones[i].boton.on('pointerdown',() =>{
                    this.botones[i].boton.play('run')
                })  
            }       
        }

        this.arrayLenguaje = ["es","en","it"]
        this.idiomaActual = this.configurations.lan

    }
    update(){
        this.backGround[0].setX(this.backGround[0].x+ this.backGroundSpeed);
        this.backGround[1].setX(this.backGround[1].x+ this.backGroundSpeed);
        this.horizontalWrap(this.backGround)    


        if (this.botones[6].animation) {
            this.botones[6].text.angle += 7;
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
            case 'boton1':
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
            case 'boton9' :
                return len.boton9;
                break;             
            default :
                return "MissingButton"               
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
    createElements (arrayBotones) {
        for (let i = 0; i < 11; i++) {
            if ((i !== 6) && (i!== 7)) {
                arrayBotones[i] = {
                    boton : this.add.sprite(-200,-200,'BotonUnpressed'),
                    text : this.add.text(-200,-200)
                }
                arrayBotones[i].boton.setScale(1.5,1.5);
                arrayBotones[i].boton.setVisible(false);
                arrayBotones[i].boton.setInteractive();
            }   
        }
        arrayBotones[6] = {
            boton :this.add.sprite(-200,-200,'SmallBotonUnpressed'),
            text : this.add.image(-200,-200,''),
            animation : false
        }
        arrayBotones[6].text.setScale(0.2,0.2);
        arrayBotones[6].text.setTintFill(13027014);
        arrayBotones[6].boton.setInteractive();

        arrayBotones[7] = {
            boton: this.add.sprite(-200,-200,'SmallBotonUnpressed'),
            text : this.add.image(-200,-200,'')
        }
        arrayBotones[7].text.setScale(0.2,0.2);
        arrayBotones[7].text.setTintFill(13027014);
        arrayBotones[7].boton.setInteractive();

        arrayBotones[11] = {
            boton : this.add.sprite(-200,-200,'arrowLeft'),
        }
        arrayBotones[11].boton.setInteractive();
        arrayBotones[11].boton.setScale(1.2,1.2)
        arrayBotones[12] = {
            boton : this.add.sprite(-200,-200,'arrowRight'),
        }
        arrayBotones[12].boton.setInteractive();
        arrayBotones[12].boton.setScale(1.2,1.2)

        return arrayBotones;

    }
    mainMenu () {
        this.clearMenu();

        for (let i = 0; i < 3; i++) {
            this.botones[i].boton.setVisible(true);
            this.botones[i].text.setVisible(true);
        }

        this.botones[6].boton.setVisible(true);
        this.botones[6].text.setVisible(true);


        this.botones[0].boton.setPosition(this.width/2,140);
        this.botones[0].text.setText(this.determineLeng("boton1"))
        this.textRender(this.botones[0]);

        this.botones[1].boton.setPosition(this.width/2,this.botones[0].boton.displayHeight + this.botones[0].boton.y +13);
        this.botones[1].text.setText(this.determineLeng("boton2"))
        this.textRender(this.botones[1]);

        this.botones[2].boton.setPosition(this.width/2,this.botones[1].boton.displayHeight + this.botones[1].boton.y +160);
        this.botones[2].text.setText(this.determineLeng("boton3"))
        this.textRender(this.botones[2]);

        this.botones[6].boton.setPosition(440,40);
        this.botones[6].text.setPosition(440,40);
        this.botones[6].text.setTexture('Cog');

    }
    cogAnimationPlay() {
        this.botones[6].animation = true;
        this.botones[6].boton.off('pointerdown');
        setTimeout(() => {
            this.cogAnimationStop(this.botones,this.configurations)},500);
    }

    cogAnimationStop (boton,configurations) {
        boton[6].animation = false;
        this.createConfigMenu(configurations)
        boton[6].boton.on('pointerdown',() => {this.cogAnimationPlay()});
    }
    clearMenu () {
        this.botones.forEach(element => {
            element.boton.setVisible(false);
            if (element.text !== undefined) {
                element.text.setVisible(false);
            }
            
        });
    }
    createConfigMenu () {
        this.clearMenu();
        for (let i = 3; i < 6; i++) {
            this.botones[i].boton.setVisible(true);
            this.botones[i].text.setVisible(true);
        }

        this.botones[7].boton.setVisible(true);
        this.botones[7].text.setVisible(true);

        this.botones[7].boton.setPosition(40,40);
        this.botones[7].text.setPosition(40,40);
        this.botones[7].text.setTexture('BackArrow');

        this.botones[3].text.setText(this.determineLeng("boton4"));
        this.botones[3].boton.setPosition(this.width/2,140);
        this.textRender(this.botones[3]);

        this.botones[4].text.setText(this.determineLeng("boton5"));
        this.botones[4].boton.setPosition(this.width/2,this.botones[3].boton.displayHeight + this.botones[3].boton.y +13);
        this.textRender(this.botones[4]);

        this.botones[5].text.setText(this.determineLeng("boton6"));
        this.botones[5].boton.setPosition(this.width/2,this.botones[4].boton.displayHeight + this.botones[4].boton.y +160);
        this.textRender(this.botones[5]); 
    }
    createLanguageMenu(){
        this.clearMenu();

        for (let i = 6; i < 13; i++) {
            this.botones[i].boton.setVisible(true);
            if (this.botones[i].text !== undefined) {
                this.botones[i].text.setVisible(true);
            }
            
        }
        
        this.botones[8].boton.setPosition(this.width/2,161);
        this.botones[8].text.setText(this.determineLeng("boton7"));
        this.textRender(this.botones[8]);

        this.botones[11].boton.setPosition(this.botones[8].boton.x - this.botones[8].boton.displayWidth/2 - 20,this.botones[8].boton.y)
        this.botones[12].boton.setPosition(this.botones[8].boton.x + this.botones[8].boton.displayWidth/2 + 20,this.botones[8].boton.y)

        this.botones[9].boton.setPosition(this.width/2,this.botones[9].boton.displayHeight*2 + this.botones[8].boton.y);
        this.botones[9].text.setText(this.determineLeng("boton8"));
        this.textRender(this.botones[9]);

        this.botones[10].boton.setPosition(this.width/2,this.botones[10].boton.displayHeight + this.botones[9].boton.y+16);
        this.botones[10].text.setText(this.determineLeng("boton9"));
        this.textRender(this.botones[10]);

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
}
