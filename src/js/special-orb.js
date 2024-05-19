import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class SpecialOrb extends Actor {

    constructor() {
        super({ width: Resources.SpecialOrb.width, height: Resources.SpecialOrb.height })
    }

    onInitialize(engine) {
        this.xposition = (Math.random() * 700) + 100
        this.yposition = (Math.random() * 400) + 100
        this.xvel = (Math.random() * 60) + 10

        this.graphics.use(Resources.SpecialOrb.toSprite())
        this.pos = new Vector(this.xposition, this.yposition)
        this.vel = new Vector(this.xvel, 0)
    }

    onPostUpdate(engine) {
        if (this.pos.x < -100) {
            this.pos.x = 900
        } else if (this.pos.x > 900) {
            this.pos.x = -100
        }
    }
}