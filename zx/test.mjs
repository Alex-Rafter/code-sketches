#!/usr/bin/env zx

$.verbose = false

const branch = ['main', 'dev'];
const currentBranch = await $`git branch --show-current`;

// echo(currentBranch)

if (currentBranch !== 'dev') {
    console.log(chalk.red('Current branch is not dev'))
    await $`exit 1`
}

for (let i = 0; i < branch.length; i++) {
    const actOne = await $`git co ${branch[i]};`;
    if (typeof actOne === 'object') continue;
}
