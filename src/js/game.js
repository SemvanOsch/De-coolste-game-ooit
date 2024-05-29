import '../css/style.css'
import { Actor, Engine, Vector, Timer, Keys, Label, Font, FontUnit, Color } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Level } from './level.js'
import { IntroScreen } from './intro.js'
import { endScreen } from './endScreen.js'

export class Game extends Engine {
    constructor() {
        super({ width: 1280, height: 720 })
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.add('intro', new IntroScreen())
        this.add('level', new Level())
        this.add('game-over', new endScreen())
        this.goToScene('intro')
    }
}

new Game()