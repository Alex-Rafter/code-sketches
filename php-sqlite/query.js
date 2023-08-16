const Database = require('better-sqlite3');
const db = new Database('test.db');

const stmt = db.prepare('SELECT * FROM cars');

console.log(stmt.all())