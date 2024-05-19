import '../css/style.css'
import { Actor, Engine, Vector, Timer, Keys, Label, Font, FontUnit, Color } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { TowerNum1 } from './towers.js'
import { Orb, TankOrb } from './orbs.js'
import { TowerOrb } from './towerPlace.js'
import { Background } from './background.js'
import { PlayButton } from './UI.js'

export class Game extends Engine {
    scoreText
    orbTimer = 0
    orbCount = 0
    orbThisWave
    waveStarted = false
    waveCount = 1
    goldAmount = 500

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const bg = new Background
        this.add(bg)
        const playButton = new PlayButton
        this.add(playButton)
        this.setLabel()
        this.towerSpawn()
    }

    setLabel() {
        this.moneyLabel = new Label({
            text: `${this.goldAmount} / ${this.waveCount}`,
            pos: new Vector(20, 20),
            font: new Font({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White
            })
        })
        this.add(this.moneyLabel)
    }

    updateGold(amount) {
        this.goldAmount += amount
        this.moneyLabel.text = `${this.goldAmount} / ${this.waveCount}`
    }

    towerSpawn() {
        const towerLocations = [
            new Vector(400, 300),
            new Vector(150, 180),
            new Vector(600, 240)
        ]

        for (let i = 0; i < towerLocations.length; i++) {
            const towerOrb = new TowerOrb()
            this.add(towerOrb)
            towerOrb.setPosition(towerLocations[i].x, towerLocations[i].y)
        }
    }

    orbSpawn() {
        const orb = new Orb()
        const tankOrb = new TankOrb()
        this.add(orb)
    }

    onPostUpdate() {
        if (this.waveStarted === true) {
            if (this.orbTimer < 150 / (this.waveCount * 0.5)) {
                this.orbTimer++
            } else if (this.orbCount < this.orbThisWave) {
                this.orbSpawn()
                this.orbTimer = 0
            } else if (this.orbCount === this.orbThisWave) {
                this.waveStarted = false
                this.orbCount = 0
                this.waveCount++
            }
        }
    }

    playGame() {
        if (this.waveStarted === false) {
            this.waveStarted = true
            this.orbThisWave = 6 * this.waveCount
        }
    }
}

new Game()
