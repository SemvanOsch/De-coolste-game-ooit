import { Actor, Engine, Vector, Color, Keys, CircleCollider, Timer, vec, range } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Orb } from './orbs.js'
import { Bullet } from './bullet.js'

export class TowerNum1 extends Actor {
    level1 = Resources.Tower1_1.toSprite()
    level2 = Resources.Tower1_2.toSprite()
    level3 = Resources.Tower1_3.toSprite()
    level4 = Resources.Tower1_4.toSprite()
    bullet;

    constructor() {
        super({ width: Resources.Tower1_1.width, height: Resources.Tower1_1.height })
    }

    onInitialize(engine) {
        this.bullet = new Bullet
        this.level = 1
        this.towerDmg = 2
        this.attackSpeed = 120
        this.attackCd = 0

        console.log(this.level)

        this.scale = new Vector(0.3, 0.3)
        this.graphics.use(this.level1)

        let rangeDetector = new Actor({ radius: 1000 })
        this.addChild(rangeDetector)

        this.on("pointerdown", () => this.towerUpgrade())
        rangeDetector.on('precollision', (event) => this.rangeEnter(event))

    }

    setPos(xpos, ypos) {
        this.pos = new Vector(xpos, ypos)
    }

    towerUpgrade() {

        switch (this.level) {
            case 1:
                if (this.scene.goldAmount >= 250) {
                    this.scene.updateGold(-250, 0)
                    this.level++
                    this.towerDmg += 3
                    this.attackCd = 0
                    this.graphics.use(this.level2)
                    break
                }
            case 2:
                if (this.scene.goldAmount >= 450) {
                    this.scene.updateGold(-450, 0)
                    this.level++
                    this.attackSpeed -= 40
                    this.attackCd = 0
                    this.graphics.use(this.level3)
                    break
                }
            case 3:
                if (this.scene.goldAmount >= 1300) {
                    this.scene.updateGold(-1300, 0)
                    this.level++
                    this.towerDmg += 5
                    this.attackCd = 0
                    this.graphics.use(this.level4)
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
        if (event.other instanceof Orb) {
            if (this.attackCd === this.attackSpeed) {
                this.scene.bulletSpawn(this.pos.x, this.pos.y, event.other, this.towerDmg)
                this.attackCd = 0
            }
        }
    }
}