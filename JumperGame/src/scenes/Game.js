import Phaser from "../lib/phaser.js";

import Carrot from "../game/Carrot.js";

export default class Game extends Phaser.Scene
{
    player
    plataforms
    cursors
    carrots
    carrotsCollected = 0
    carrotsCollectedText
    constructor()
    {
        super('game');
    }
    preload()
    {
        // load background image/color
        this.load.image("background","assets/Background/bg_layer1.png");

        // load plataform img
        this.load.image("plataform","assets/Environment/ground_sand.png");

        // load stand player
        this.load.image("player-stand", "assets/Players/bunny2_stand.png");
        this.load.image("player-jump", "assets/Players/bunny2_jump.png" )
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.load.image("carrot", "assets/Items/carrot.png")

        this.load.audio("jump", "assets/sfx/phaseJump1.ogg")
    }
    create()
    {
        // background created
        this.add.image(240, 320, "background")
            .setScrollFactor(1,0)
        // plataform created
        // this.physics.add.staticImage(240, 320, "plataform")
        // .setScale(0.5)

        this.plataforms = this.physics.add.staticGroup()

        for (let i = 0; i < 5; i++)
        {
            const x = Phaser.Math.Between(80,400);
            const y = 150 * i;

            const plataform = this.plataforms.create(x,y,'plataform')
            plataform.scale = 0.3;

            const body = plataform.body
            body.updateFromGameObject()
        }

        this.player = this.physics.add.sprite(240,320, "player-stand")
        .setScale(0.5)

        this.physics.add.collider(this.plataforms,this.player)

        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setDeadzone(this.scale.width * 1.5);

       // const carrot = new Carrot (this, 240, 320, "carrot")
       // this.add.existing(carrot)
        this.carrots = this.physics.add.group({
            classType: Carrot
        })

        //this.carrots.get(240,320,"carrot")
        this.physics.add.collider(this.plataforms,this.carrots)

        this.physics.add.overlap(
            this.player,
            this.carrots,
            this.handleCollectCarrot,
            undefined,
            this
        )
        const style = {color: "#000",fontSize: 24}
        this.carrotsCollectedText = this.add.text(240,10,"Zanahorias: 0",style)
        .setScrollFactor(0)
        .setOrigin(0.5,0)
    }
    init()
    {
        this.carrotsCollected = 0;
    }
    update()
    {
        this.plataforms.children.iterate(child => {
            const plataform = child
            const scrollY = this.cameras.main.scrollY
            if (plataform.y >= scrollY + 700)
            {
                plataform.y = scrollY - Phaser.Math.Between(50,70)
                plataform.x = Phaser.Math.Between(80,400)
                plataform.body.updateFromGameObject()
                this.addCarrotAbove(plataform)
            }
        })

        const touchingDown = this.player.body.touching.down
        if(touchingDown) 
        {
            this.player.setVelocityY(-500);
            this.player.setTexture("player-jump");
            this.sound.play("jump");
        }
        const vy = this.player.body.velocity.y;
        if (vy > 0 && this.player.texture.key !== "player-stand")
        {
            this.player.setTexture("player-stand");
        }


        if (this.cursors.left.isDown && !touchingDown)
        {
            this.player.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown && !touchingDown)
        {
            this.player.setVelocityX(200);
        }
        else
        {
            this.player.setVelocityX(0);
        }

        this.horizontalWrap(this.player);
        this.deleteLostCarrots();

        const bottomPlataform = this.findBottomMostPlataform()
        if (this.player.y > bottomPlataform.y + 200) 
        {
            this.scene.start("game-over")
        }
    }
    horizontalWrap (sprite)
    {
        const halfWidth = sprite.displayWidth * 0.5;
        const gameWidth = this.scale.width;

        if (sprite.x < -halfWidth) 
        {
            sprite.x = gameWidth + halfWidth;
        }
        else if (sprite.x > gameWidth + halfWidth)
        {
            sprite.x = -halfWidth; 
        }
    }
    deleteLostCarrots () 
    {
        this.carrots.children.iterate(child => {
            const carrot = child;
            const scrollY = this.cameras.main.scrollY;
            if (carrot.y >= scrollY + 700)  {
                this.carrots.killAndHide(carrot);
                this.physics.world.disableBody(carrot.body);
            }
        })
    }
    addCarrotAbove(sprite)
    {
        const y = sprite.y - sprite.displayHeight;

        const carrot = this.carrots.get(sprite.x,y,"carrot");

        carrot.setActive(true)
        carrot.setVisible(true)

        this.add.existing(carrot);
        carrot.body.setSize(carrot.width, carrot.height);
        this.physics.world.enable(carrot); 

        return carrot;
    }
    handleCollectCarrot(player,carrot)
    {
        this.carrots.killAndHide(carrot);
        this.physics.world.disableBody(carrot.body);
        this.carrotsCollected++;

        const value = `Zanahorias: ${this.carrotsCollected}`
        this.carrotsCollectedText.text = value;
    }
    findBottomMostPlataform()
    {
        const plataforms = this.plataforms.getChildren();
        let bottomPlataform = plataforms[0]

        for (let i = 0; i < plataforms.length; i++) {
            const plataform = plataforms[i];
            
            if (plataform.y < bottomPlataform.y) 
            {
                continue  
            }
            bottomPlataform = plataform
        }
        return bottomPlataform
    }
}