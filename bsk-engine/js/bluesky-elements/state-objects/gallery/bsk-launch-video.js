import { Launcher } from '../../shared/launcher-class.js'
const bskLaunchVideo = new Launcher({ btnText: 'View Video' });
// bskLaunchVideo.goToVideo = () => $('bsk-gallery .gallery').slick('slickGoTo', $('bsk-gallery .slick-slide:has(iframe)'));
bskLaunchVideo.goToVideo = (el) => {
    console.log('el', el);
    const event = new CustomEvent('launch-video', { bubbles: true, detail: { el } });
    el.dispatchEvent(event)
};
export { bskLaunchVideo }