import { mainCreate } from './mainCreate.js';

export async function getText(file) {
    let myObject = await fetch(file);
    const jsonStrs = await myObject.json();
    mainCreate(jsonStrs);
}