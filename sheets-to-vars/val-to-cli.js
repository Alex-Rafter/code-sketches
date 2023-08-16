const sh = require("shelljs");
const beautify_css = require('js-beautify').css;
sh.config.silent = true;

const formDataUrl = "https://api.val.town/eval/@rafter.formData";
const dataFromUrl = JSON.parse(sh.exec(`curl -sL ${formDataUrl}`).toString()).data;

const sassFromDataArray = dataFromUrl.map((spacing, i) => `${i + 1} : ${spacing.trim()},`)
sassFromDataArray.splice(0, 0, `$spacers: (0 : 0,`, )
sassFromDataArray.splice(sassFromDataArray.length, 0,');')
const sassStringUnedited = sassFromDataArray.join('\n')
console.log(sassStringUnedited)


const beautifiedStyles = beautify_css(sassStringUnedited, { indent_size: 2 })

const regex = /\$spacers:[\s\S]*?\).*;/gm;
const existingVarsSheet = sh.cat('vars.scss').toString()
const updatedVarsSheet = existingVarsSheet.replace(regex, beautifiedStyles)
const outputAsShellString = (arg) => sh.ShellString(arg)
outputAsShellString(updatedVarsSheet).to('test-2.scss')

