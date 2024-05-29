import { Actor, Engine, Vector, Color, Keys, CircleCollider, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { TowerNum1 } from './towers.js'

export class TowerOrb extends Actor {
    maxHp
    constructor() {
        super({ width: Resources.towerOrb.width, height: Resources.towerOrb.height })
    }

    onInitialize(engine) {
        // this.graphics.use(Resources.towerOrb.toSprite())
        this.scale = new Vector(0.2, 0.2)
        this.on("pointerdown", () => this.onClick())
    }

    setPosition(xpos, ypos) {
        this.pos = new Vector(xpos, ypos)
    }

    onClick() {
        if (this.scene.goldAmount >= 200) {
            const tower1 = new TowerNum1
            this.scene.add(tower1)
            tower1.setPos(this.pos.x, this.pos.y)

            this.kill()
            this.scene.updateGold(-200, 0)
        }

    }
}