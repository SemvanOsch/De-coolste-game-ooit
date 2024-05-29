import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Background extends Actor {

    constructor() {
        super()
        this.graphics.use(Resources.Bg.toSprite())
        this.pos = new Vector(640, 360)
    }

}

export class EndScreenBackground extends Actor {

    constructor() {
        super()
        this.graphics.use(Resources.EndScreen.toSprite())
        this.pos = new Vector(640, 360)
    }
}

export class IntroScreenBackground extends Actor {

    constructor() {
        super()
        this.graphics.use(Resources.IntroScreen.toSprite())
        this.pos = new Vector(640, 360)
    }
}