const fs = require('fs');
const dataBob = {
    name: 'Bob Yuwono',
    planet: 'Earth',   
    age: '20',
}


const dataBufffer = fs.readFileSync('1-json.json'); //nge load json nya sebagai buffer
const dataJSON = dataBufffer.toString(); //buffernya diubah jadi string
const data = JSON.parse(dataJSON); //stringnya di-parse biar jadi objek

const dataBobJSON = JSON.stringify(dataBob); //objek diubah jadi string
fs.writeFileSync('1-json.json',dataBobJSON); // string di write sebagai json


console.log(dataBob.name);