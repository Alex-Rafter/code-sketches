const obj = {
    fruits: ['apple', 'banana', 'orange'],
    chooseRandomFruit() {
        const { fruits } = this;
        const randomIndex = Math.floor(Math.random() * fruits.length);
        return fruits[randomIndex];
    },
    chooseRandomFruitWithArrowFunc: () => {
        // will error because arrow funcs don't have their own 'this'
        const { fruits } = this;
        const randomIndex = Math.floor(Math.random() * fruits.length);
        return fruits[randomIndex];
    },
    chooseRandomFruitWithArrowFuncThatWorks() {
        const { fruits } = this;
        return (() => fruits[Math.floor(Math.random() * fruits.length)])();
    }
}

// console.log(obj.chooseRandomFruit());
// console.log(obj.chooseRandomFruitWithArrowFunc());
console.log(obj.chooseRandomFruitWithArrowFuncThatWorks());