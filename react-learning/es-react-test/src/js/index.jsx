import { h, render, Component, createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { parse } from 'preact-parser';
import { marked } from 'marked';


let url = 'https://api.sheety.co/7016cabf6b37601c93f0bcbd5ec85980/testForWeb/markdown';

fetch(url)
  .then((response) => response.json())
  .then(json => {
    // console.log(json.markdown[0].content)

    const Data = createContext(json.markdown[0].content);

    function Markdown({className}) {
      const MD = marked.parse(useContext(Data))
      const HTML = parse(MD)
      return <div id="topLevel" className={className}>{HTML}</div>
    }

    function Component1() {
      return <Markdown className="tst"/>
    }
const root = document.querySelector('#root')
    render(<Component1 />, root)
  });


