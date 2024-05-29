import { Actor, Vector, Clock, } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Bullet extends Actor {
    orbTarget
    towerDmg
    lifeSpan = 0
    constructor(x, y, target, dmg) {
        super({ width: Resources.bullet.width / 10, height: Resources.bullet.height / 10 })
        this.pos = new Vector(x, y)
        this.orbTarget = target
        this.towerDmg = dmg
    }

    onInitialize() {
        this.sprite = Resources.bullet.toSprite()
        this.sprite.scale = new Vector(0.5, 0.5)
        this.graphics.use(this.sprite)
        this.on('precollision', (event) => this.bulletHit(event))

        this.actions.meet(this.orbTarget, 500)
    }

    bulletHit(event) {
        if (event.other === this.orbTarget) {
            event.other.hpUpdate(this.towerDmg)
            this.kill()
        }
    }

    onPostUpdate() {
        if (this.lifeSpan === 160) {
            this.kill()
        } else {
            this.lifeSpan++
        }
    }
}