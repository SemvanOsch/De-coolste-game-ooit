import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Bg: new ImageSource('images/mapbg.png'),
    Orb: new ImageSource('images/orb.png'),
    TankOrb: new ImageSource('images/orb2.png'),
    SpeedOrb: new ImageSource('images/orb3.png'),
    towerOrb: new ImageSource('images/towerOrb.png'),
    playButton: new ImageSource('images/playbutton.png'),
    playingButton: new ImageSource('images/playingbutton.png'),
    StartButton: new ImageSource('images/startbutton.png'),
    bullet: new ImageSource('images/bullet.png'),
    Tower1_1: new ImageSource('images/towers/tower1/towercrystal.png'),
    Tower1_2: new ImageSource('images/towers/tower1/towercrystallvl2.png'),
    Tower1_3: new ImageSource('images/towers/tower1/towercrystallvl3.png'),
    EndScreen: new ImageSource('images/endscreen.png'),
    IntroScreen: new ImageSource('images/mapbgblur.png')
}
const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }