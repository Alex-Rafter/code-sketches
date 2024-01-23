export const bskShortlistLocalHeart = {
    childClass: null,
    stockId: null,
    url: null,
    manufacturer: null,
    model: null,
    version: null,
    reg: null,
    year: null,
    price: null,
    image: null,
    colour: null,
    transmission: null,
    fuelType: null,
    mileage: null,
    addedToList: false,
    init(el) {
        const tempObj = JSON.parse(this.data.replace(/'/g, '"'));
        for (const key in tempObj) {
            this[key] = tempObj[key];
        }
        this.addToMountedArrAndSet();
        document.addEventListener("removingFromShortlistSummary", (e) => {
            if (e.detail.stockId === this.stockId) {
                this.toggleShortlist(e.detail.el);
            }
        });
    },

    // carsMounted
    addToMountedArrAndSet() {
        store.sl.carsMounted.push(this);
        if (store.sl.checkIfAdded(this.stockId)) {
            this.setAsAddedToList(this, true);
        }
    },
    //
    toggleShortlist(el) {
        if (this.addedToList === false) {
            if (!store.sl.checkIfAdded(this.stockId)) {
                this.addToStoreAndSession();
            } else {
                this.setAsAddedToList(this, true);
            }
        } else {
            this.rmFromStoreAndSession();
            const event = new CustomEvent("removedFromShortlist", {
                bubbles: true,
                cancelable: true,
                detail: {
                    stockId: this.stockId,
                },
            });
            el.dispatchEvent(event);
        }
    },
    //
    addToStoreAndSession() {
        this.setAsAddedToList(this, true);
        store.sl.cars.push(this);
        this.sessionSetItem();
        this.gtmPushAdd();
    },
    //
    rmFromStoreAndSession() {
        this.setAsAddedToList(this, false);
        store.sl.cars = store.sl.cars.filter(
            (car) => car.stockId !== this.stockId
        );
        this.sessionSetItem();
        this.gtmPushRemove();
    },
    //
    gtmPushAdd() {
        const dataLayer = window.dataLayer || [];
        dataLayer.push({
            event: "shortlistAdd",
            currency: "GBP",
            value: this.price,
            items: [
                {
                    item_id: this.stockId,
                    item_brand: this.manufacturer,
                    item_name: this.model,
                    item_variant: this.version,
                    price: this.price,
                    item_category: "Used",
                },
            ],
        });
    },
    //
    gtmPushRemove() {
        const dataLayer = window.dataLayer || [];
        dataLayer.push({
            event: "shortlistRemove",
            currency: "GBP",
            value: this.price,
            items: [
                {
                    item_id: this.stockId,
                    item_brand: this.manufacturer,
                    item_name: this.model,
                    item_variant: this.version,
                    price: this.price,
                    item_category: "Used",
                },
            ],
        });
    },
    //
    setAsAddedToList(carObj, bool) {
        store.sl.carsMounted.forEach((car) => {
            if (car.stockId === carObj.stockId) car.addedToList = bool;
        });
    },
    //
    sessionSetItem() {
        window.sessionStorage.setItem(
            "shortlist",
            JSON.stringify(store.sl.cars)
        );
    },
};
