import anime from 'animejs';

export const bskVersionSelect = {
    version: null,
    manufacturer: null,
    model: null,
    currentVehicleModelVersion: null,
    price : null,

    init(el) {

        if (this.manufacturer && this.model && this.version) {
            this.updateCurrentVehicleModelVersion();
        }

    },
    updateCurrentVehicleModelVersion() {
        this.currentVehicleModelVersion = `${this.manufacturer} ${this.model} ${this.version}`;
    }
};
