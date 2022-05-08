import React from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import reactHyperscriptHelpers from 'https://cdn.skypack.dev/react-hyperscript-helpers';
const { div, h1, h2, h3, button, ul, li, h } = reactHyperscriptHelpers

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'John'
        };
        
        this.tick = this.tick.bind(this);
    }

    tick() {
        this.setState({
            name: (this.state.name === 'Tommy') ? 'John' : 'Tommy'
        });
    }
    
    render() {
        // With HyperScript Helpers
        return button('.btn.btn-primary', { onClick: this.tick }, this.state.name)
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(h(App), domContainer);