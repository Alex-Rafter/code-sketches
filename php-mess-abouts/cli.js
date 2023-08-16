const names = ['John', 'Paul', 'George', 'Ringo', 'Pete', 'Stuart', 'Mick', 'Keith', 'Ronnie', 'Charlie', 'Bill', 'Mick'];
const ul = (arg) => /*html*/ `<ul>${arg}</ul>`;
const listItems = names.map(name => /*html*/ `<li>${name}</li>`).join('');
console.log(ul(listItems));