// mess about with stack vs heap memory allocation

const person = {
    name: 'Max',
    age: 29,
}

const secondPerson = person;
secondPerson.name = "Maximilian";

console.log(person);
