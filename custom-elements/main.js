const toggler = (bool = false) => /*html*/ 
`
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

`
const navEl = (t) => /*html*/ `
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">${t}</a>
    ${toggler()}
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active"part="updater"  aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`


// Create a class for the element
class BootNav extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super();
        this.insertAdjacentHTML('beforeend', navEl('passed'))
    }

    connectedCallback() {
        // console.log(this)
    }
}


class TestEl extends HTMLElement {

    internal = this.attachInternals()

    constructor() {
        // Always call super first in constructor
        super();
    }



    connectedCallback() {
        this.internal.states.add('--lded')
        console.log(this)
    }
}




class ListEL extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super();
        const listTitle = this.dataset.title
        const itemsArr = JSON.parse(this.dataset.arr).map((item) => /*html*/ `<li>${item}</li>`)
        const id = Math.random().toString(36).slice(2)

        const listToInject = () => /*html*/ `<ul s="${id}">${listTitle}${itemsArr}</ul>`
        
        const listStyles = /*html*/

        `
        <style>
        :is([s="${id}"]) li {
        color : red;
        }   
        </style>
        `

        this.insertAdjacentHTML('afterbegin', listStyles)
        this.insertAdjacentHTML('beforeend', listToInject())
        // this.setAttribute('class', 'text-danger');
    }



    connectedCallback() {

    }
}

// Define the new element

customElements.define('test-el', TestEl);
customElements.define('boot-nav', BootNav);
customElements.define('list-el', ListEL);