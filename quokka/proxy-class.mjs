class Thing {

    constructor(obj = {}) {

        const queryKey = Object.keys(obj)[0];

        Object.assign(this, obj);
        window.addEventListener('DOMContentLoaded', (event) => {
            const domEl = document.querySelector(`#${queryKey}`);
            let outer = domEl.outerHTML;
            const regex = /{{(.*?)}}/g;
            const matches = outer.match(regex);
            matches.forEach(match => {
                const key = match.replace('{{', '').replace('}}', '').trim();
                outer = outer.replace(match, obj[queryKey][key]);
            })
            domEl.outerHTML = outer;
        })

        return new Proxy(this, {
            get(target, prop) {
                console.log(`Getting property ${prop}`);
                return target[prop];
            },
            set(target, prop, value) {
                console.log(`Setting property ${prop} to ${value}`);
                target[prop] = value;
                return true;
            }
        })

    }

}

const objy = { name: 'John' }
const myThing = new Thing({ objy });
myThing.objy.name = 'Jane';
