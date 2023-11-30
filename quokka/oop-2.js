const obj = (() => {
    let _name = 'Lucas';
    let _age = 25;

    return {
        get name() {
            return `Name : ${_name}`;
        },
        get age() {
            return `Age : ${_age}`;
        },
        set name(value) {
            _name = value;
        }
    };
})();

const x = {
    _namey: 'Lucas',
    get namey() {
        console.log(this._namey);
    }

}

Object.setPrototypeOf(obj, x);

// console.log(obj.name);
console.log(obj.namey)

