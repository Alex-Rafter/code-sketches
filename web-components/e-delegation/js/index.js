// import { html } from './html.js'

class MyButton extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    html(strings, ...values) {
        let htmlString = strings.reduce((result, string, i) => {
            return result + string + (values[i] || '');
        }, '');

        const clickAttribute = htmlString.match(/@click="(.*?)"/)
        if (clickAttribute[1]) {
            const eventName = 'click';
            const handler = clickAttribute[1]
            this.addEventListener(eventName, this[handler]);
        }

        // return element;
        return htmlString;
    }


    logger(e) {
        console.log('I was clicked!', this)
    }

    connectedCallback() {
        this.render()
        // const button = this.shadowRoot.querySelector('button')
        // button.addEventListener('click', this.logger)
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/this.html`
        <style>
            button {
                cursor: pointer;
                background-color: #4CAF50; /* Green */
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
              }

                button:hover {
                    background-color: #3e8e41;
                }

                button:active {
                    background-color: #3e8e41;
                    box-shadow: 0 5px #666;
                    transform: translateY(4px);
                }

        </style>
        <button @click="logger">
          Click Me to Activate
        </button>
      `
    }
}

customElements.define('my-button', MyButton)

