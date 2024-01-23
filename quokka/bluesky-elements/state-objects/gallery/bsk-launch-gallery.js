import { Launcher } from '../../shared/launcher-class.js'
const bskLaunchGallery = new Launcher({btnText : 'Open Gallery'});
bskLaunchGallery.launch = () => document.querySelector('bsk-gallery .gallery .slick-active a').click()

export { bskLaunchGallery }