const randomMan = {
    name: 'the old man',
    age: 100,
    sayHello() {
        return `Hello! says ${this.name}`;
    }
}

const utils = {
    str: 'Hello Object',
    logStrAsArr() {
        console.log(this.str.split(' '))
    }
}

const randomWoman = {
    name: 'Aleena',
    nameArr: ['A, l, e, e, n, a'],
    age: 25
}


// console.log(randomMan.sayHello());
// console.log(randomMan.sayHello.call(randomWoman));
// console.log(randomMan.sayHello.apply(randomWoman));
const str = 'Hello Out There World!';
const strObj = {
    str: 'Hello Out There World!',
}

utils.logStrAsArr()
utils.logStrAsArr.call(strObj)


// function returnsArrAsStr(arr) {
//     return arr.join(' ');
// }

// logn returnsStrAsArr(str) {
//     return str.split(' ');
// }

// function returnsArrAsStrWithCommas(arr) {
//     return arr.join(', ');
// }


// const helloWorldArr = ['Hello', 'World'];
// const helloWorldStr = 'Hello World';
// const helloWorldCsv = 'Hello, World';