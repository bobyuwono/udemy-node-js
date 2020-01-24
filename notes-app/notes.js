const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return "your notes is..";
}

const addNote = function (title, body) {
    // 1. buat fungsi untuk meload note
    // 1.b buat filter untuk menghindari dupplikat
    // 2. buat fungsi untuk menempelkan notes baru ke file json
    // 3. save notes
    
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    })
    if (duplicateNotes.length === 0) {
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

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function () {
    //cek apakah file udah ada atau belum dengan menggunakan try catch
    try {
        const databuffer = fs.readFileSync('notes.json');
        const dataJSON = databuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const removeNote = function(title){
    const notes = loadNotes();
    const notesToKeep =  notes.filter(function(note){
        return note.title !== title;
    })
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse("No Note found!"))
    } else  {
        console.log(chalk.green.inverse("Note Removed"))
    }
    saveNotes(notesToKeep); 
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
}