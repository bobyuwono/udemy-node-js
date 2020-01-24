const notes = require('./notes.js');
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
            demandOption:true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body);
    }
})
//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note', 
    builder: {
        title: {
            describe: "note title",
            type: "string",
            demandOption: true,
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title);

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

//ini esensial, untuk memcah argumen menjadi beberapa bagian
yargs.parse()

