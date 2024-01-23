export const sl = {
    carsMounted: [],
    cars: [],
    isShortlistPage: false,
    get count() {
        return this.cars.length;
    },
    get sessionCars() {
        return window.sessionStorage.getItem("shortlist");
    },
    reveal: false,
    checkIfSession() {
        const jsonCars = JSON.parse(this.sessionCars);
        const conditions = jsonCars === null || jsonCars.length === 0;
        if (!conditions) {
            jsonCars.forEach((car) => this.cars.push(car));
        }
    },
    checkIfAdded: function (uniqueRef) {
        const carNamesArr = this.cars.map((car) => car.stockId);
        return carNamesArr.includes(uniqueRef);
    },
    rmFromList(car) {
        const filteredCars = this.cars.filter(
            (storedCar) => storedCar.stockId !== car.stockId
        );
        this.cars = filteredCars;
        this.sessionSetItems();
    },
    rmFromSummary(car, el) {
        const event = new CustomEvent("removingFromShortlistSummary", {
            bubbles: true,
            cancelable: true,
            detail: {
                stockId: car.stockId,
                el: el,
            },
        });
        el.dispatchEvent(event);
        this.rmFromList(car);
    },
    sessionSetItems() {
        window.sessionStorage.setItem("shortlist", JSON.stringify(this.cars));
    },
};
