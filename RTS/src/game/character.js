import Phaser from "../lib/phaser.js";

export default class Character extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,texture)
    {
        super(scene,x,y,texture)
        this.setScale(0.4)
    }

}