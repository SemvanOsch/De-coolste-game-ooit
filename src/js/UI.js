import { Actor, Engine, Vector, ScreenElement, Color, Rectangle, Label, FontUnit, Font } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Orb } from './orbs.js'
import { vector } from "excalibur/build/dist/Util/DrawUtil.js"

export class HpBar extends ScreenElement {

    healthbar

    onInitialize(engine) {
        this.hpBarWidth = 50

        this.healthbar = new Actor({ x: -25, y: -40, color: Color.Green, width: this.hpBarWidth, height: 10 })
        this.healthbar.graphics.anchor = Vector.Zero
        this.addChild(this.healthbar)


        const whiteborder = new Rectangle({
            width: 300,
            height: 50,
            color: Color.fromRGB(255, 255, 255, 0.4)
        })
        this.border = new Actor()
        this.border.graphics.use(whiteborder)
        this.border.pos = new Vector(100, 0)
    }

    updateScore() {
        this.healthbar.scale = new Vector(0.5, 1)
    }
}

export class PlayButton extends ScreenElement {

    onInitialize(engine) {
        this.graphics.use(Resources.playButton.toSprite())
        this.scale = new Vector(0.6, 0.6)
        this.pos = new Vector(680, 480)

        this.on("pointerup", () => this.scene.engine.playGame())
    }
}
