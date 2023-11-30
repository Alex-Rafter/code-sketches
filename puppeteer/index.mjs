import puppeteer from 'puppeteer';
// import getCssUsed from './content.js';
import convTextToRules from './css-used/convTextToRules.mjs';
// import generateRulesAll from './util/generateRulesAll'
// import filterRules from './css-used/filterRules.mjs'
import { PurgeCSS } from 'purgecss'
import sh from 'shelljs'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://boilerplate.dev.cogplatform.co.uk/');

  const bodyHTML = await page.evaluate(() => {
    return document.querySelector('body').outerHTML;
  });


  const cssLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('link[rel~="stylesheet"][href]'), ele => ele.href).filter(link => !link.toLowerCase().includes('uknumberplate'))
  );

  // console.log('cssLinks is :', cssLinks)

  const fetchCssContent = async (cssLink) => {
    return await page.evaluate(async (url) => {
      const response = await fetch(url);
      if (response.ok) {
        return await response.text();
      }
      return null;  // or you could throw an error
    }, cssLink);
  };

  const allCssContents = await Promise.all(cssLinks.map(fetchCssContent));

  //  console.log('bodyHTML is :', bodyHTML)
  let rules = []
  // Log the fetched CSS content
  allCssContents.forEach((cssContent, index) => {
    rules.push(cssContent)
    // sh.ShellString(cssContent).to(`test.css`);

    // rulesObj = convTextToRules(cssContent, cssLinks[index])
    // console.log(`Content of ${cssLinks[index]}:`, cssContent);
  });

  rules.forEach(r => sh.ShellString(r).toEnd(`test.css`))
  // sh.ShellString(rules).toEnd(`test.css`);
  sh.ShellString(bodyHTML).to(`./test.html`);

  const result = await new PurgeCSS().purge({
    content: ['./test.html'],
    css: ['./test.css']
  })

  // console.log('acted on  :', result.length)

  sh.ShellString(result[0].css).toEnd(`test2.css`);


  // console.log('result is :', result)
  // sh.ShellString(result[0].css).toEnd(`test2.css`);


  // const x = await filterRules(bodyHTML, rulesObj, [])
  // console.log('x is :', x)
  // return filterRules($0, objCss, arrTimerOfTestingIfMatched)

  // Steps needed
  // X 1. convert the css text to css rules
  // DONE

  // 2. filter the css rules based on the selectors of the html elements passed as argument


  await browser.close();
})();
