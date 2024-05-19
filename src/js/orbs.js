import { Actor, Engine, Vector, Label, Font, FontUnit } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { HpBar } from './UI.js'

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
        this.scene.engine.orbCount++

        this.maxHp = 10
        this.hp = 10
        this.moveSpeed = 100

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
            this.scene.engine.updateGold(50)
        }

    }
}

export class TankOrb extends Actor {
    maxHp
    constructor() {
        super({ width: Resources.TankOrb.width, height: Resources.TankOrb.height })
    }

    onInitialize(engine) {
        this.path = [
            new Vector(240, 240),
            new Vector(270, 410),
            new Vector(520, 410),
            new Vector(540, 160),
            new Vector(800, 150)
        ]

        this.graphics.use(Resources.TankOrb.toSprite())
        this.pos = new Vector(20, 240)

        this.maxHp = 25
        this.hp = 25
        this.moveSpeed = 50

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
            this.actions.moveTo(this.path[i].x, this.path[i].y, this.moveSpeed)
        }

    }

    hpUpdate(dmg) {
        if (this.hp - dmg > 0) {
            this.hp -= dmg
            this.hpCounter.text = `${this.hp}`
        } else {
            this.kill()
            this.scene.engine.updateGold(80)
        }

    }
}