import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Fish2: new ImageSource('images/fish2.png'),
    Bg: new ImageSource('images/pathbg.png'),
    Orb: new ImageSource('images/orb.png'),
    SpecialOrb: new ImageSource('images/orb2.png')
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Fish2,
    Resources.Bg,
    Resources.Orb,
    Resources.SpecialOrb
])

export { Resources, ResourceLoader }