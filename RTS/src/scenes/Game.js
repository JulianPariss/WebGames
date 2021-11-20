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

                this.load.image('Grass','../assets/img/Ground/tile_0002.png');                
                this.load.image('Sand','../assets/img/Ground/tile_0042.png');
                this.load.image('tower','../assets/img/Ground/tower_grey.png');

                // Units 
                this.load.image('character','../assets/img/Characters/character_maleAdventurer_side.png')
                //------
            //-----------------------
            // UI
                
            //---
            //this.load.json('configs','src/data/preConfigs.json');

        //-----------
    }
    create()
    {
        const data = this.cache.json.get('configs');
        //console.log(data);

        this.add.image(240, 320, "background")
        .setScrollFactor(1,0)
        this.ground = this.physics.add.staticGroup({
            classType: Character
        });
        const y = 500;
        
        function makeMap(gro) {
            for (let i = 0; i < 15; i++){
            const ground = gro.create(21,y,data.map);
            ground.scale = 2.5;
            
        
            const body = ground.body;
            body.updateFromGameObject();
            gro.setX(body.halfWidth,body.width);
            body.updateFromGameObject();

            }
        }
        makeMap(this.ground);
        


        const boton2 = this.add.sprite(240,300,'boton');
        boton2.setInteractive();

        this.character = this.physics.add.group()

        this.physics.add.collider(this.ground,this.character)


        boton2.on('pointerdown',()=>{
            const character = this.character.get(201,401,'character');
            character.setActive(true)
            character.setVisible(true)
        })

    }
    update()
    { 
        this.character.getChildren().forEach(element => {
            element.setMaxVelocity(70);
            element.setAccelerationX(20);
        });
    }
}