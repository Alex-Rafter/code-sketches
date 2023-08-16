// These lines make "require" available
import { createRequire } from "module";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
const require = createRequire(import.meta.url);
const html2json = require('html2json').html2json;
var json2html = require('html2json').json2html;

const db = new Low(new JSONFile('forms.json'))
await db.read()
db.data ||= { forms: [] } 
const forms = db.data.forms

console.log(json2html(forms[0]))