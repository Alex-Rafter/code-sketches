// function logger(message) {
//     return {
//         log() {
//             console.log(`passed message: ${message}`)
//         }
//     }
// }

const logger = functionProxyCreator(() => {
    return {
        log(message) {
            console.log(`passed message: ${message}`)
        }
    }
})

function functionProxyCreator(func) {

    return new Proxy(func(), {

        get(target, prop, receiver) {
            console.log(`Accessing property '${prop}'`);

            // Check if the property is a function
            if (typeof target[prop] === 'function') {
                // Return a function that will log when called and then call the original function
                return function (...args) {
                    console.log(`Calling ${prop} with arguments: ${args}`);
                    return Reflect.apply(target[prop], receiver, args);
                };
            }

            // For properties that are not functions, return them directly
            return Reflect.get(target, prop, receiver);
        }

    })
}

logger.log('hello world')
// proxy('hello world')