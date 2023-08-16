class MyButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = /*html*/ `
            <div v-scope>
                <button @click="logger">click me</button>
            </div>
        `;

        // this.shadowRoot.querySelector('button').addEventListener('click', () => {
        //     console.log('Button clicked!');
        // });
    }

    logger() {
        console.log('logger');
    }

    connectedCallback() {
        console.log('MyButton mounted!', this.setAttribute('global-styles', ''));
    }

    // static get observedAttributes() {
    //     return ['styles'];
    // }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (name === 'styles') {
    //         const link = document.createElement('link');
    //         link.setAttribute('rel', 'stylesheet');
    //         link.setAttribute('href', newValue);
    //         this.shadowRoot.appendChild(link);
    //     }
    // }

}

customElements.define('my-button', MyButton);
