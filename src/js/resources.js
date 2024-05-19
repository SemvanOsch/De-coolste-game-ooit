import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Bg: new ImageSource('images/pathbg.png'),
    Orb: new ImageSource('images/orb.png'),
    TankOrb: new ImageSource('images/orb2.png'),
    towerOrb: new ImageSource('images/towerOrb.png'),
    playButton: new ImageSource('images/playbutton.png'),
    Tower1_1: new ImageSource('images/towers/tower1/towerlvl1.png'),
    Tower1_2: new ImageSource('images/towers/tower1/towerlvl2.png'),
    Tower1_3: new ImageSource('images/towers/tower1/towerlvl3.png')
}
const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }