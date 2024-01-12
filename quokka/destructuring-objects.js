const guitar = {
    brand: 'Fender',
    model: 'Stratocaster',
    year: 1954,
    price: 1299.99,
    strings: 6,
}

const { brand, price } = guitar;

console.log(brand, price);

let strings = 12;
({ strings } = guitar);

console.log(strings)

let x;
({ strings: x } = guitar);

console.log(x)
