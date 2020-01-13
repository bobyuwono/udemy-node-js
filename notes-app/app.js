// const fs = require('fs');

// fs.writeFileSync('notes.txt','hula hula');
// fs.appendFileSync('notes.txt','\ndata to append');

// const add  = require ('./utils.js');
// const sum  = add (4,-2);;
// // console.log(sum);
// const validator = require('validator')
const getNotes = require('./notes');
const chalk = require('chalk');

const msg = getNotes();
console.log(msg);

const greenMSG = chalk.green.inverse.bold ("Success!");
console.log(greenMSG);
console.log(chalk.bgRed('Hello world!'));
console.log(chalk.bgRed('taki taki!'));
