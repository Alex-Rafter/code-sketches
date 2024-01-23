export const bskCapModalTrigger = {
    make: null,
    model: null,
    version: null,
    price: null,
    img: null,
    spec: null,
    contact: null,
    config: null,

    sendData(el) {
        store.capModal.make = this.make
        store.capModal.model = this.model
        store.capModal.version = this.version
        store.capModal.price = this.price
        store.capModal.img = this.img
        store.capModal.spec = this.spec
        store.capModal.contact = this.contact
        store.capModal.config = this.config
        const event = new Event('cap-modal-triggered', { bubbles: true });
        el.dispatchEvent(event);
    }
};