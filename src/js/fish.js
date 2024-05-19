import { Actor, Engine, Vector, Color, Keys, CircleCollider, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Orb } from './orb.js'
import { delay } from "excalibur/build/dist/Util/Util.js"

export class Fish extends Actor {

    constructor() {
        super({ width: Resources.Fish.width, height: Resources.Fish.height })
    }

    onInitialize(engine) {
        let sprite = Resources.Fish.toSprite()
        sprite.tint = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255)

        this.orb = new Orb()

        this.graphics.use(sprite)
        this.pos = new Vector(200, 20)
        this.vel = new Vector(0, 0)

        this.speedUp = 50
        this.towerDmg = 2
        this.attackSpeed = 1000
        this.attacking = false

        this.towerRange = new CircleCollider({
            radius: 100
        })
        this.collider.set(this.towerRange)

        this.on("pointerup", () => this.onClick())
        this.on('collisionstart', (event) => this.rangeEnter(event))
    }

    onClick() {
        this.kill()
        this.scene.engine.updateScore()
    }

    onPostUpdate(engine) {
        if (this.pos.x < -100) {
            this.pos.x = 900
        } else if (this.pos.x > 900) {
            this.pos.x = -100
        } else if (this.pos.y < -50) {
            this.pos.y = 650
        } else if (this.pos.y > 650) {
            this.pos.y = -50
        }

        this.xspeed = 0
        this.yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A)) {
            this.xspeed = - this.speedUp
            this.graphics.flipHorizontal = false
        }
        if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)) {
            this.xspeed = this.speedUp
            this.graphics.flipHorizontal = true
        }
        if (engine.input.keyboard.isHeld(Keys.Up) || engine.input.keyboard.isHeld(Keys.W)) {
            this.yspeed = -this.speedUp
        } if (engine.input.keyboard.isHeld(Keys.Down) || engine.input.keyboard.isHeld(Keys.S)) {
            this.yspeed = this.speedUp
        }

        this.vel = new Vector(this.xspeed, this.yspeed)

        if (this.attacking === true) {

        }

    }

    rangeEnter(event) {
        if (event.other instanceof Orb) {
            this.attacking = true
        }
    }

    rangeLeave(event) {
        if (event.other instanceof Orb) {
            this.attacking = false
        }
    }
}