const fs = require('fs');
const chalk = require('chalk');

const getNotes =  () => {
    return "your notes is..";
}

const addNote =  (title, body) => {
    
    const notes = loadNotes();
    const duplicateNote = notes.find( (note) =>  note.title === title)
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added"));
    } else{
        console.log(chalk.red.inverse("Note Title has been taken!"));
    } 
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes =  () => {
    //cek apakah file udah ada atau belum dengan menggunakan try catch
    try {
        const databuffer = fs.readFileSync('notes.json');
        const dataJSON = databuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep =  notes.filter((note) =>note.title !== title); 

    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse("No Note found!"))
    } else  {
        console.log(chalk.green.inverse("Note Removed"))
    }
    saveNotes(notesToKeep); 
}

const listNotes = () => {
    notes = loadNotes();
    console.log(chalk.green.inverse("Your notes"));

    notes.forEach((note) => {
        console.log(note.title);
    } )
}

const readNote = (title) => {
    const notes=loadNotes();
    const duplicateNote = notes.find( (note) => note.title === title )

    if (duplicateNote){
        console.log(chalk.inverse.green(duplicateNote.title) + " : "+ duplicateNote.body);
    } else {
        console.log(chalk.inverse.red("notes not found"));
    }

}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}