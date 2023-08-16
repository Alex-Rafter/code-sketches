// Creating the target object
// let dataObj = {
//     message: "Hello, World!"
// };

// let dataObj = {
//     message: "Hello, World!",
//     str : `Title Str`,
// };

// Creating the handler for the Proxy
let handler = {
  get(target, property) {
    // console.log(typeof property)
    // console.log(`Reading ${property} from the target object`);
    return target[property];
  },

  set(target, property, value) {
    function addStr(arg) {
      console.log(`<h1>${arg}</h1>`);
    }

    addStr(value);

    if (property === "message") {
      value = value + " (from the proxy)";
    }

    // console.log(target, property, value)
    // console.log(`Setting value of ${property} to ${value} in the target object`);
    target[property] = value;
    return true; // indicates the assignment succeeded
  },
};

// Creating the Proxy
let proxy = new Proxy(
  {},

  {
    get(target, property) {
      // console.log(typeof property)
      // console.log(`Reading ${property} from the target object`);
      return target[property];
    },

    set(target, property, value) {

      function addStr({str}) {
        console.log(`<h1>${str}</h1>`);
      }

      addStr(value);

      if (property === "message") {
        value = value + " (from the proxy)";
      }

      // console.log(target, property, value)
      // console.log(`Setting value of ${property} to ${value} in the target object`);
      target[property] = value;
      return true; // indicates the assignment succeeded
    },
  }
);

// Using the Proxy
// console.log(proxy.str);
const nObj = {
    str : `CLI`,
    tst : 'New String'
}

// const jSon = `{"str":"CLI"}`;
// console.log(jSon);
proxy.obj = nObj;
