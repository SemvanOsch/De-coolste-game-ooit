import { Actor, Engine, Vector, ScreenElement, Color, Rectangle, Label, FontUnit, Font } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Orb } from './orbs.js'
import { vector } from "excalibur/build/dist/Util/DrawUtil.js"
import { Level } from "./level.js"

export class PlayButton extends ScreenElement {

    onInitialize(engine) {
        this.graphics.use(Resources.playButton.toSprite())
        this.scale = new Vector(0.6, 0.6)
        this.pos = new Vector(1150, 590)

        this.on("pointerup", () => this.scene.playGame())
        this.on("pointerup", () => this.graphics.use(Resources.playingButton.toSprite()))
    }

    changeSprite() {
        this.graphics.use(Resources.playButton.toSprite())
    }
}

export class StartButton extends ScreenElement {

    onInitialize(engine) {
        this.graphics.use(Resources.StartButton.toSprite())
        this.pos = new Vector(500, 400)

        this.on("pointerdown", () => this.scene.engine.goToScene('level'))
    }
}