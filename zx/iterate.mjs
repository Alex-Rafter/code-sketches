#!/usr/bin/env zx

// $.verbose = false

// const currentBranch = await $`git branch --show-current`;

function main() {

    const branches = ['main', 'uat', 'dev'];
    const x = async (b) => await $`git co ${b}`
    branches.forEach(x)

};

main();