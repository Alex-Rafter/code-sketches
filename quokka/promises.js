const p = new Promise((resolve, reject) => {
    let random = Math.random();
    setTimeout(() => {
        if (random > 0.5) {
            resolve({ 'Success': random });
        } else {
            reject({ 'Failure': random });
        }
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    let random = Math.random();
    setTimeout(() => {
        if (random > 0.5) {
            resolve({ 'Success 2': random });
        } else {
            reject({ 'Failure 2': random });
        }
    }, 3000);
});


const p3 = new Promise((resolve, reject) => {
    let random = Math.random();
    setTimeout(() => {
        if (random > 0.5) {
            resolve({ 'Success 3': random });
        } else {
            reject({ 'Failure 3': random });
        }
    }, 3000);
});

console.log('Promise made', p);

// p.then((obj) => {
//     console.log('Promise resolved with obj:', obj);
// }).catch((obj) => {
//     console.log('Promise rejected with obj:', obj);
// });

const promisesBundle = Promise.all([p, p2, p3]);

promisesBundle.then((data) => {
    console.log('All promises resolved:', data);
}).catch((data) => {
    console.log('At least one promise rejected:', data);
});