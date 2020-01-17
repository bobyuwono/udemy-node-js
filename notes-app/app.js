const getNotes = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

// customizwe yargs version 
yargs.version('1.1.0');

//adding add command
yargs.command({
    command: 'add',
    describe: "add a new note",
    builder:{
        title: {
            describe: 'Note title', 
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        console.log('Title: ' + argv.title + "\nBody: "+ argv.body);
    }
})
//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note', 
    handler: function(){
    console.log('Removing the note..');
    }
})
//create list command
yargs.command({
    command: "list",
    describe: 'List your notes',
    handler: function(){
        console.log("Listing out all notes")
    }
})

yargs.parse()

