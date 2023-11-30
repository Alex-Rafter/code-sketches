#!/usr/bin/env zx

// $.verbose = false

// const currentBranch = await $`git branch --show-current`;

async function main() {

    const branches = ['main', 'uat', 'dev'];
    // const x = async (b) => await $`git co ${b}`
    // const currentBranch = await $`git branch --show-current`;
    // branches.forEach(x)
    for (const branch of branches) {
        // await x(branch)
        await $`git co ${branch}`
    }

};

main();