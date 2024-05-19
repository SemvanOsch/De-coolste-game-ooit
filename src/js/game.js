import '../css/style.css'
import { Actor, CollisionContact, Engine, RotateTo, Vector, Timer, Label, FontUnit, Font, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Fish } from './fish.js'
import { Orb } from './orb.js'
import { Background } from './background.js'

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.score = 0

        console.log("start de game!")

        const bg = new Background
        this.add(bg)

        this.fishSpawn()
        this.fishSpawn2()

        this.label = new Label({
            text: 'Score: 0',
            pos: new Vector(10, 10),
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px
            })
        })
        this.add(this.label)

        this.timer = new Timer({
            fcn: () => this.fishSpawn2(),
            interval: 2000,
            repeats: true
        })
        this.add(this.timer)
        this.timer.start()
    }

    fishSpawn() {
        const fish = new Fish()
        this.add(fish)
    }

    fishSpawn2() {
        const orb = new Orb()
        this.add(orb)
    }

    updateScore(scoreValue) {
        this.score += scoreValue
        this.label.text = `Score: ${this.score}`
    }
}

new Game()
