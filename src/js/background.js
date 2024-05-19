import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Background extends Actor {

    constructor() {
        super()
        this.graphics.use(Resources.Bg.toSprite())
        this.pos = new Vector(400, 300)
        //this.scale = new Vector(0.45, 0.55)
    }

}