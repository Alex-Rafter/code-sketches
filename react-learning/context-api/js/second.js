'use strict';
import { React, ReactDOM, useContext, createContext, useState } from 'https://unpkg.com/es-react/dev';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement);

const UserContext = createContext()
const Data = createContext("Alex Rafter")

function Component1() {
    const [user, setUser] = useState("Jesse Hall");
  
    return html`
     <${UserContext.Provider} value=${user}>
        <h1>Hello ${user}!</h1>
        <${Component2} user=${user} />
      </${UserContext.Provider}>
    `     
  }

  function Component2() {
    const user = useContext(UserContext);

    return html`
    <h1>Component 2</h1>
    <h2>Hello ${user} again!</h2>
    `           
  }

// const App = () => { return Button() }

const domContainer = document.querySelector('#root');
ReactDOM.render(html`<${Component1}/>`, domContainer);