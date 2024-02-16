const obj = new class {
    constructor(name) {
        this.name = name || 'default';
    }
    getName() {
        return this.name;
    }
}("test");


console.log(obj.getName());

