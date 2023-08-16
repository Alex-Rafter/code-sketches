// These lines make "require" available
import { createRequire } from "module";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
const require = createRequire(import.meta.url);
const json2html = require('html2json').json2html;

const db = new Low(new JSONFile('forms.json'))
await db.read()
db.data ||= { forms: [] } 
const forms = db.data.forms


const json = json2html(forms[0]);
console.log(json)

// db.data.forms.push(json)
// await db.write()