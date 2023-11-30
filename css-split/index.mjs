import { JSDOM } from 'jsdom';
import Critters from 'critters';

const { window } = new JSDOM();
global.document = window.document;

const critters = new Critters({
    // optional configuration
});

const html = `
  <style>
    .red { color: red }
    .blue { color: blue }
  </style>
  <div class="blue">I'm Blue</div>
`;

const inlined = await critters.process(html);

console.log(inlined);
