import { Actor, Engine, Vector, Color, Keys, CircleCollider, Timer, vec } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Orb, TankOrb } from './orbs.js'
import { delay } from "excalibur/build/dist/Util/Util.js"

export class TowerNum1 extends Actor {
    level1 = Resources.Tower1_1.toSprite()
    level2 = Resources.Tower1_2.toSprite()
    level3 = Resources.Tower1_3.toSprite()
    constructor() {
        super({ width: Resources.Tower1_1.width, height: Resources.Tower1_1.height })
    }

    onInitialize(engine) {
        this.level = 1
        this.towerDmg = 2
        this.attackSpeed = 120
        this.attackCd = 0

        console.log(this.level)

        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(this.level1)

        this.towerRange = new CircleCollider({
            radius: 1000
        })
        this.collider.set(this.towerRange)

        this.on("pointerup", () => this.towerUpgrade())
        this.on('precollision', (event) => this.rangeEnter(event))

    }

    setPos(xpos, ypos) {
        this.pos = new Vector(xpos, ypos)
    }

    towerUpgrade() {
        switch (this.level) {
            case 1:
                if (this.scene.engine.goldAmount >= 250) {
                    this.scene.engine.updateGold(-250)
                    this.level++
                    this.towerDmg += 3
                    this.attackCd = 0
                    this.graphics.use(this.level2)
                    break
                }
            case 2:
                if (this.scene.engine.goldAmount >= 450) {
                    this.scene.engine.updateGold(-450)
                    this.level++
                    this.attackSpeed -= 30
                    this.attackCd = 0
                    this.graphics.use(this.level3)
                    break
                }
        }
    }

    onPostUpdate(engine) {
        if (this.attackCd < this.attackSpeed) {
            this.attackCd++
        }
    }

    rangeEnter(event) {
        if (event.other instanceof Orb || event.other instanceof TankOrb) {
            if (this.attackCd === this.attackSpeed) {
                event.other.hpUpdate(this.towerDmg)
                this.attackCd = 0
            }
        }
    }
}