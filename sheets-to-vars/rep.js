const sh = require('shelljs');
sh.config.silent = true;

const regex = /\$spacers:[\s\S]*?\).*;/gm;
const existing = sh.cat('spacings.scss').toString()

// .match(regex)[0];
// sh.echo(existing)
console.log(existing.replace(regex, 'hello'));

const x = `
$spacers: (
    0: 0,
    1: $spacer * 0.25,
    2: $spacer * 0.5,
    3: $spacer,
    4: $spacer * 1.75,
    5: $spacer * 3,
  ) !default;
`

// const y = x.match(regex)
// console.log(y[0]);