#!/usr/bin/env zx
// $.shell = '/usr/bin/bash'
$.verbose = false

const list = await $`ls`;
// console.log(list);
// console.log(chalk.blue('Hello world!'))
const x = chalk.blue('list')
echo`${x}:\n${list}`;
