
export const bskCapCardModal = {

    make: null,
    model: null,
    version: null,
    price: null,
    img: null,
    spec: null,
    contact: null,

    init(el) {
        document.addEventListener('cap-modal-triggered', (e) => {
            const featuresList = el.querySelector('[slot="spec"]').children[0]
            featuresList.setAttribute("features", store.capModal.spec)
        })
    }
};