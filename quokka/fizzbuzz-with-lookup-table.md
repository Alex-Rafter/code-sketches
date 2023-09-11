# Fizzbuzz exercise from Eloquent JS

I'm reading Eloquent JavaScript at the moment as part of my current learning project (a loop round over some Front End fundamentals). As i go i'm working through the exersises in th ebook. I'm also prompting ChatGPT to give me other ideas for exercises so i can test myself as i go.

### Print all the numbers from 1 to 100, with these exceptions :

- For numbers divisible by 3, print "Fizz" instead of the number.
- For numbers divisible by 5 (and not 3), print "Buzz" instead.
- For numbers that are divisible by both 3 and 5, print "FizzBuzz".

### Version One

I don't like version one at all really. It has to do with the verbosity of using the multiple if/else statments. Yes, it avoid the iteration inside the loop in version two but its definitley not my preference still...


```js

const divisibleByThree = (num) => num % 3 === 0
const divisibleByFive = (num) => num % 5 === 0

for (let i = 1; i < 100; i++) {
    if (divisibleByThree(i) && divisibleByFive(i)) {
        console.log(`FizzBuzz(${i})`)
    } else if (divisibleByThree(i)) {
        console.log(`Fizz(${i})`)
    } else if (divisibleByFive(i)) {
        console.log(`Buzz(${i})`)
    } else {
        console.log(`${i}`)
    }
}

```

### Version Two

Ahhh version two, so much nicer to read! I'm using a lookup table here.

```js
const obj = {
	3: 'Fizz',
	5: 'Buzz',
}

for (let i = 1; i < 100; i++) {
	let output = ''
	Object.keys(obj).forEach((key) => (output += i % key === 0 ? obj[key] : ''))
	console.log(output || i)
}
```
