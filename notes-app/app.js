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
    handler(argv)  {
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
    handler(argv) {
        notes.removeNote(argv.title);

    }
})
//create list command
yargs.command({
    command: "list",
    describe: 'List your notes',
    handler(){
        notes.listNotes();
    }
})

yargs.command({
    command: "read",
    describe: 'Read your notes',
    builder: {
        title: {
            describe: 'notes title',
            type: "string",
            demandOption: true,
        }
    },
    handler (argv){
        notes.readNote(argv.title);
    }
})

//ini esensial, untuk memcah argumen menjadi beberapa bagian
yargs.parse()

