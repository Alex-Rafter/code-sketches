import { h, render, Component, createContext } from 'preact';
import { useContext } from 'preact/hooks';
import parse from 'preact-parser';
// import parse from 'html-react-parser';
import { marked } from 'marked';

let url = 'https://api.sheety.co/7016cabf6b37601c93f0bcbd5ec85980/testForWeb/markdown';

fetch(url)
  .then((response) => response.json())
  .then(json => {

    const Data = createContext(json.markdown[0].content);
    console.log(Data.__)

    function Component1() {
      return <p>{parse(marked.parse(Data))}</p>
    }


    render(<Component1 />, document.body)
  });


