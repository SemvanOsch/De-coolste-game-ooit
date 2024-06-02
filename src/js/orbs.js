import { Actor, Engine, Vector, Label, Font, FontUnit } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Orb extends Actor {
    maxHp;
    hp;
    moveSpeed;
    moneyOnKill;
    sprite;
    constructor(maxHealth, health, speed, money, image) {
        super({ width: Resources.Orb.width * 0.9, height: Resources.Orb.height * 0.9 })
        this.maxHp = maxHealth
        this.hp = health
        this.moveSpeed = speed
        this.moneyOnKill = money
        this.graphics.use(image)
    }

    onInitialize(engine) {
        this.path = [
            new Vector(370, 350),
            new Vector(370, 115),
            new Vector(620, 115),
            new Vector(620, 600),
            new Vector(1150, 600),
            new Vector(1150, 250),
            new Vector(880, 260),
            new Vector(880, 0)
        ]

        this.pos = new Vector(40, 350)

        this.hpCounter = new Label({
            text: `${this.hp}`,
            pos: new Vector(-12, -12),
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px
            })
        })
        this.addChild(this.hpCounter)

        for (let i = 0; i < this.path.length; i++) {
            this.actions.moveTo(this.path[i].x, this.path[i].y, this.moveSpeed)
        }

    }

    hpUpdate(dmg) {
        if (this.hp - dmg > 0) {
            this.hp -= dmg
            this.hpCounter.text = `${this.hp}`
        } else {
            this.kill()
            this.scene.updateGold(this.moneyOnKill, 0)
            if (this.maxHp === 1000) {
                this.scene.gameOver()
            }
        }
    }

    onPostUpdate() {

        if (this.pos.x > 800 && this.pos.y < 30) {
            if (this.scene.playerHp - this.hp > 0) {
                this.kill()
                this.scene.updateGold(0, - this.hp)
            } else {
                this.scene.gameOver()
            }
        }
    }
}