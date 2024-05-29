import '../css/style.css'
import { Actor, Engine, Vector, Timer, Keys, Label, Font, FontUnit, Color, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Orb } from './orbs.js'
import { TowerOrb } from './towerPlace.js'
import { Background } from './background.js'
import { PlayButton } from './UI.js'
import { Bullet } from './bullet.js'

export class Level extends Scene {
    scoreText
    orbCooldown = 150
    orbTimer = 0
    orbCount = 0
    orbThisWave
    waveStarted = false
    waveCount = 1
    goldAmount = 500
    playerHp
    playButton;
    orb;
    difficulty = 1

    constructor() {
        super()

    }

    onActivate() {
        this.playerHp = 25
        const bg = new Background
        bg.scale = new Vector(0.67, 0.67)
        this.add(bg)
        this.playButton = new PlayButton
        this.add(this.playButton)
        this.setLabel()
        this.towerSpawn()
    }


    setLabel() {
        this.moneyLabel = new Label({
            text: `${this.goldAmount} / ${this.waveCount} / ${this.playerHp}`,
            pos: new Vector(20, 20),
            font: new Font({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White
            })
        })
        this.add(this.moneyLabel)
    }

    updateGold(moneyAmount, healthAmount) {
        this.goldAmount += moneyAmount
        this.playerHp += healthAmount
        this.moneyLabel.text = `${this.goldAmount} / ${this.waveCount} / ${this.playerHp}`
    }

    towerSpawn() {
        const towerLocations = [
            new Vector(219, 462),
            new Vector(498, 230),
            new Vector(732, 485),
            new Vector(1040, 428),
            new Vector(990, 160)
        ]

        for (let i = 0; i < towerLocations.length; i++) {
            const towerOrb = new TowerOrb()
            this.add(towerOrb)
            towerOrb.setPosition(towerLocations[i].x, towerLocations[i].y)
        }
    }

    orbSpawn() {
        let randNum = Math.random()

        if (randNum <= 0.2 && this.waveCount >= 2) {
            this.orb = new Orb(25, 25, 100, 80, Resources.TankOrb.toSprite())
        } else if (randNum <= 0.4 && this.waveCount >= 3) {
            this.orb = new Orb(8, 8, 400, 60, Resources.SpeedOrb.toSprite())
        } else {
            this.orb = new Orb(10, 10, 200, 50, Resources.Orb.toSprite())
        }

        this.add(this.orb)
        this.orbCount++
    }

    bulletSpawn(x, y, target, dmg) {
        const bullet = new Bullet(x, y, target, dmg)
        this.add(bullet)
    }

    onPostUpdate() {
        if (this.waveStarted === true) {
            if (this.orbTimer < this.orbCooldown / (this.waveCount * 0.25)) {
                this.orbTimer++
            } else if (this.orbCount < this.orbThisWave) {
                this.orbSpawn()
                this.orbTimer = 0
            } else if (this.orbCount === this.orbThisWave) {
                this.endWave()
            }
        }
    }

    endWave() {
        this.waveStarted = false
        this.orbCount = 0
        this.waveCount++
        this.playButton.changeSprite()
    }

    playGame() {
        if (this.waveStarted === false) {
            this.waveStarted = true
            this.orbThisWave = 6 * this.waveCount
        }
    }

    gameOver() {
        this.engine.goToScene('game-over')
        this.waveStarted = false;
        this.difficulty * 1.2
    }
}
