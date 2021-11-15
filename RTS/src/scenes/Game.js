import Phaser from "../lib/phaser.js"
import Character from "../game/character.js";


export default class Game extends Phaser.Scene
{

    character
    ground
    constructor()
    {
        super('game');
    }
    preload()
    {
        //Load images
            //Stage
                // BackGround
                this.load.image('background','../assets/img/BackGround/bg_layer1.png');
                //-----------

                this.load.image('grass','../assets/img/Ground/slice01_01.png');
                this.load.image('tower','../assets/img/Ground/tower_grey.png');

                // Units 
                this.load.image('character','../assets/img/Characters/character_maleAdventurer_side.png')
                //------
            //-----------------------
            // UI
                
            //---


        //-----------
    }
    create()
    {
        this.add.image(240, 320, "background")
         .setScrollFactor(1,0)

        this.ground = this.physics.add.staticGroup({
            classType: Character
        });
        const y = 500;
        
        for (let i = 0; i < 15; i++){
            const ground = this.ground.create(21,y,'grass');
            ground.scaleX = 0.6;
            
        
            const body = ground.body;
            body.updateFromGameObject();
            this.ground.setX(body.halfWidth,body.width);
            body.updateFromGameObject();


        }


        const boton2 = this.add.sprite(240,300,'boton');
        boton2.setInteractive();

        this.character = this.physics.add.group()

        this.physics.add.collider(this.ground,this.character)


        boton2.on('pointerdown',()=>{
            const character = this.character.get(201,401,'character');
            character.setActive(true)
            character.setVisible(true)

           
        })

        //console.log(configTab.map);

    }
    update()
    { 
        this.character.getChildren().forEach(element => {
            console.log(element);
            element.setMaxVelocity(70);
            element.setAccelerationX(20);
        });
    }
}