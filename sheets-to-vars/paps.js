// Import required modules
const fs = require('fs');
const Papa = require('papaparse');
const sh = require('shelljs');
const beautify_css = require('js-beautify').css;
sh.config.silent = true;

const idOne = '1wZFXiVKjynxMvWnUv5X0eBXiORo8IAiCLAp2bwjqgFs'
const sheet = sh.exec(`curl -sL https://docs.google.com/spreadsheets/d/${idOne}/pub?output=csv`).toString()

const results = Papa.parse(sheet, {header: true}).data;
const spacings = results.map(row => row['spacings list'])[0].split(',');
let str = `$spacers: (0 : 0,`
spacings.forEach((spacing, i) => str = str + `${i + 1} : ${spacing.trim()},`)
const z = ');'
str = str + z
const beautifiedStyles = beautify_css(str, { indent_size: 2 })

const regex = /\$spacers:[\s\S]*?\).*;/gm;
const existing = sh.cat('spacings.scss').toString().replace(regex, beautifiedStyles)
const shStr = sh.ShellString(existing)
shStr.to('spacings.scss')
