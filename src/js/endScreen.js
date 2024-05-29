import '../css/style.css'
import { Actor, Engine, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { EndScreenBackground } from './background.js'
import { StartButton } from './UI.js'

export class endScreen extends Scene {

    onActivate() {
        const bg = new EndScreenBackground
        this.add(bg)
    }
}