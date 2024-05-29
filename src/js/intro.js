import '../css/style.css'
import { Actor, Engine, Vector, Scene, Label, Font, FontUnit, Color } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { IntroScreenBackground } from './background.js'
import { StartButton } from './UI.js'

export class IntroScreen extends Scene {

    onActivate() {
        const bg = new IntroScreenBackground
        bg.scale = new Vector(0.67, 0.67)
        this.add(bg)
        const startButton = new StartButton
        this.add(startButton)
        this.setLabel()
    }

    setLabel() {
        this.Label = new Label({
            text: `Tower Defense`,
            pos: new Vector(300, 200),
            font: new Font({
                unit: FontUnit.Px,
                size: 108,
                color: Color.White
            })
        })
        this.add(this.Label)

        this.Label2 = new Label({
            text: `Place towers to make sure the orbs don't reach the end`,
            pos: new Vector(-25, 120),
            font: new Font({
                unit: FontUnit.Px,
                size: 32,
                color: Color.White
            })
        })
        this.Label.addChild(this.Label2)
    }
}