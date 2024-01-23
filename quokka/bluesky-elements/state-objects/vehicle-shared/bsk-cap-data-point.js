import anime from 'animejs';
export const bskCapDataPoint = {
    dataTitle : null,
    dataValue : null,
    dataUnit : null,
    faIcon : null,
    animate: false,
    init(el) {
        if (this.animate == true) {
            const self = this;
            this.intersectionObs(self, el)
        }
    },
    intersectionObs(self, el) {
        const observer = new IntersectionObserver((entries) => cb(entries), { threshold: [0.2] });
        observer.observe(el);
        function cb(entries) {
            if (entries[0].isIntersecting !== true) return
            self.animation()
            observer.disconnect();
        }
    },
    animation() {
        anime({
            targets: this.$refs.subtitle,
            innerHTML: (el) => [0, this.dataValue],
            easing: 'easeOutQuad',
            duration: 1800,
            round: 1
        });
    },
};
