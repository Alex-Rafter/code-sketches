class MyButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    // this.logger = function () {
    //   console.log('I was clicked!')
    // }
  }

  connectedCallback() {
    // this.shadowRoot.querySelector('button')
    console.log(this.shadowRoot.querySelector('button'))
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        /* Add your button styles here */
      </style>
      <button>
        Click Me to Active
      </button>
    `
  }
}

customElements.define('my-button', MyButton)

export default MyButton
