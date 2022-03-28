import Phaser from "../lib/phaser.js"
import Character from "../game/character.js";

export default class Game extends Phaser.Scene
{
    width
    height


    onClick
    cam
    cam2
    cam3

    character
    ground

    lastElement
    firstElement
    bloqueA
    bloqueB
    bloqueC
    bloqueD

    constructor()
    {
        super('game');
    }
    preload()
    {
        //Load images
            //Stage
                // BackGround
                this.load.image('back','../assets/img/BackGround/bg_layer1.png');
                //-----------

                this.load.image('Grass','../assets/img/Ground/tile_0002.png');                
                this.load.image('Sand','../assets/img/Ground/tile_0042.png');
                this.load.image('tower','../assets/img/Ground/tower_grey.png');

                // Units 
                this.load.image('character','../assets/img/Characters/character_maleAdventurer_side.png')
                //------
            //-----------------------
            // UI
                this.load.image('baseUI','assets/img/UI/panel_beigeLight.png')
            //---
            this.load.json('configs','src/data/preConfigs.json');
        //-----------
    }
    create()
    {
        let {width,height} = this.sys.game.canvas;
        this.width = width;
        this.height = height;

        /* const fondo = this.add.image(0,0,'back');
        fondo.setScrollFactor(0,0) */
        const data = this.cache.json.get('configs');
        
        this.ground = this.physics.add.staticGroup({
            classType: Character
        });
        this.makeMap(data);

        this.lastElement = this.ground.children.entries[this.ground.children.entries.length-1];
        this.firstElement = this.ground.children.entries[0];


        this.cam = this.cameras.main;
        this.cam.transparent = false;
        //this.cam.setBackgroundColor('rgba(0,255,122,0.5)');
        this.cam.setName('cam1')
        //this.cam.setBounds(-900,-900,3200,3200)
        

        this.cam2 = this.cameras.add(0,0,480,640)
        this.cam2.scrollX = -this.width - this.lastElement.displayWidth/2;
        this.cam2.transparent = false;
        //this.cam2.setBackgroundColor('rgba(255,0,122,0.5)');
        this.cam2.setName('cam2')
        this.cam2.setVisible(false);
        //this.cam2.setBounds(-900,-900,3200,3200)

        this.cam3 = this.cameras.add(0,0,480,640)
        this.cam3.scrollX = this.lastElement.x + this.lastElement.displayWidth/2;
        this.cam3.transparent = false;
        this.cam3.setVisible(false);

        this.bloqueA = false;
        this.bloqueB = true;
        this.bloqueC = false;
        this.bloqueD = true;
        //this.cameras.addExisting(this.cam2,true)
    


        const zoneViewR = this.add.zone(-200,-200,width/4,height/1.5);
        zoneViewR.setX(width-zoneViewR.displayWidth/2);
        zoneViewR.setY(height-zoneViewR.height);
        zoneViewR.setInteractive();
        zoneViewR.setScrollFactor(0,1);

        const zoneViewL = this.add.zone(-200,-200,width/4,height/1.5);
        zoneViewL.setX(zoneViewL.displayWidth/2);
        zoneViewL.setY(height-zoneViewL.height);
        zoneViewL.setInteractive();
        zoneViewL.setScrollFactor(0,1);



        this.onClick = [];
        this.onClick[0] = false;
        this.onClick[1] = false;

        zoneViewR.on('pointerdown',() => {this.onClick[1] = true});
        zoneViewR.on('pointerup',() => {this.onClick[1] = false});

        zoneViewL.on('pointerdown',() => {this.onClick[0] = true});
        zoneViewL.on('pointerup',() => {this.onClick[0] = false});
        

        this.add.sprite(1000,320, 'tower');
        this.add.sprite(150,320, 'tower');
        //this.add.image(0,0,'back').setScrollFactor(0,0).setZ(-9999)

        /* this.character = this.physics.add.group()

        this.physics.add.collider(this.ground,this.character) */

        /*  const boton2 = this.add.sprite(240,300,'boton');
            boton2.setInteractive(); */

        /*  boton2.on('pointerdown',()=>{
            const character = this.character.get(240,300,'character');
            character.setActive(true)
            character.setVisible(true)
        }) */

        this.firstElement.setTintFill(1555556);
        this.lastElement.setTintFill(1555556);
    }
    update()
    { 
        /* this.character.getChildren().forEach(element => {
            element.setMaxVelocity(70);
            element.setAccelerationX(20);
        }); */

        //-------------------------------------------------------------------------------------------

        if (this.onClick[1]) {
            if (this.cam.scrollX > this.lastElement.x) {
                this.bloqueA = true;
                this.bloqueB = false;
                //console.log(this.cam.scrollX+" Red playing");
            } else if (this.cam2.scrollX > this.lastElement.x){
                this.bloqueB = true;
                this.bloqueA = false;
                //console.log(this.cam2.scrollX+" Green playing");
            }
            

            if (this.bloqueA) {
                this.cam2.scrollX += 5;
                this.cam2.setVisible(true); 
                if (this.cam.scrollX > this.lastElement.x) {
                    console.log(this.cam2.scrollX+" Recolocar GREEN");
                    this.cam.setVisible(false);
                    this.cam.scrollX = -this.width - this.lastElement.displayWidth/2;
                } else if (this.cam2.scrollX > this.lastElement.x -this.width){
                    this.cam.scrollX += 5;
                    this.cam.setVisible(true);
                    console.log("Green moving");
                } 
            } else if (this.bloqueB) {
                this.cam.scrollX += 5;
                this.cam.setVisible(true);
                if (this.cam2.scrollX > this.lastElement.x) {
                    console.log(this.cam2.scrollX+" Recolocar RED");
                    this.cam2.setVisible(false);
                    this.cam2.scrollX = -this.width - this.lastElement.displayWidth/2;
                } else if (this.cam.scrollX > this.lastElement.x -this.width) {
                    this.cam2.scrollX += 5;
                    this.cam2.setVisible(true);
                    console.log("Red moving");
                } 
                
            } 
        }
        //-------------------------------------------------------------------------------------------

        if (this.onClick[0]) {
            if (this.cam.scrollX > this.firstElement.x) {
                this.bloqueC = false;
                this.bloqueD = true;
                //console.log(this.cam.scrollX+" Red playing");
            } else if (this.cam3.scrollX > this.firstElement.x){
                this.bloqueD = false;
                this.bloqueC = true;
                //console.log(this.cam2.scrollX+" Green playing");
            }
            if (this.bloqueC) {
                this.cam3.scrollX -= 5;
                this.cam3.setVisible(true);
                if (this.cam3.scrollX < this.firstElement.x) {
                    console.log("cam rec");
                    this.cam.setVisible(false);
                    this.cam.scrollX = this.lastElement.x + this.lastElement.displayWidth;
                } else if (this.cam.scrollX > -this.firstElement.x-this.width){
                    this.cam.scrollX -= 5;
                    this.cam.setVisible(true);
                    console.log("cam Moving");
                }
            } else if (this.bloqueD) {
                this.cam.scrollX -= 5;
                this.cam.setVisible(true);
                this.cam3.setVisible(false); 
                if (this.cam.scrollX < this.firstElement.x) {
                    console.log("cam3 rec");
                    this.cam3.setVisible(false);
                    this.cam3.scrollX = this.lastElement.x + this.lastElement.displayWidth;
                }else if (this.cam3.scrollX > -this.firstElement.x-this.width) {
                    this.cam3.scrollX -= 5;
                    this.cam3.setVisible(true);
                    console.log("cam3 Moving");
                }  
            }
        }

    }
    makeMap(data) {
        for (let i = 0; i < 40; i++){
        const ground = this.ground.create(21,450,data.map);
        ground.scale = 2.5;
        
        const body = ground.body;
        body.updateFromGameObject();
        this.ground.setX(body.halfWidth,body.width);
        body.updateFromGameObject();

        }
    }

}