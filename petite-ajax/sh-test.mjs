import shell from 'shelljs';
import chalk from 'chalk';

const branches = ['dev', 'main'];
const currentBranch = shell.exec('git branch --show-current', { silent: true }).stdout.trim();
if (currentBranch !== 'dev') {

    console.log(`
    ${chalk.red('Current branch is not dev.')} 
    ${chalk.yellow('Current branch is:')} ${currentBranch}
    Please change branch and try again.
    `);
    shell.exit(1);
    
}

branches.forEach(branch => shell.exec(`git co ${branch}`))
