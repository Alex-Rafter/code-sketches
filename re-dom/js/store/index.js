const globalState = {
    data: { count: 0 },
    listeners: [],

    update(newState) {
        this.data = { ...this.data, ...newState };
        this.listeners.forEach(listener => listener(this.data));
    },

    subscribe(listener) {
        this.listeners.push(listener);
    },

    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
};


export { globalState };