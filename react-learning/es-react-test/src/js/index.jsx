import React from "react";
import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import parse from 'html-react-parser';
import { marked } from 'marked';

let url = 'https://api.sheety.co/7016cabf6b37601c93f0bcbd5ec85980/testForWeb/markdown';
// let Data
// const setData = (x) => Data = x;


fetch(url)
  .then((response) => response.json())
  .then(json => {

    const Data = createContext(json.markdown[0].content);

    function Component1() {

      const dPassed = useContext(Data);
      return <div>{parse(dPassed)}</div>
    }

    // App
    // const App = () => {
    //   return (
    //     <Data.Provider>
    //       <h1>Hello</h1>
    //     </Data.Provider>
    //   );
    // }
    // App


    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Component1 />);
  });


// TST

// Test
// And another
// And  third
