import { Actor, Engine, Vector, Label, Font, FontUnit } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { HpBar } from './hpbar.js'

export class Orb extends Actor {
    maxHp
    constructor() {
        super({ width: Resources.Orb.width, height: Resources.Orb.height })
    }

    onInitialize(engine) {
        this.path = [
            new Vector(240, 240),
            new Vector(270, 410),
            new Vector(520, 410),
            new Vector(540, 160),
            new Vector(800, 150)
        ]

        this.graphics.use(Resources.Orb.toSprite())
        this.pos = new Vector(20, 240)

        this.maxHp = 10
        this.hp = 10

        console.log(this.hp)

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

        // const hpbar = new HpBar()
        // this.addChild(hpbar)

        for (let i = 0; i < this.path.length; i++) {
            this.actions.moveTo(this.path[i].x, this.path[i].y, 100)
        }

    }

    hpUpdate(dmg) {
        this.hp -= dmg
        this.hpCounter.text = `${this.hp}`
    }

    onPostUpdate(engine) {
        if (this.pos.x < -50) {
            this.pos.x = 850
        } else if (this.pos.x > 850) {
            this.pos.x = -50
        }
    }

}