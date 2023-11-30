const animal = {

    get logObj() {
        console.log(this);
    },

    get noise() {
        console.log(this.sound);
    }
}

const dog = Object.create(animal);
dog.sound = 'woof';
dog.noise; // 'woof'
dog.logObj; // { sound: 'woof' }
