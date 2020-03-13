const request = require('request');
const yargs = require('yargs');
const weather = require('./weather.js') //this is my custom file
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address){
    console.log('Please provide an address')
}else {
    geocode (address, (error,{latitude, longitude, location}) => {
        //return    
        if(error) return console.log(error)
    
        forecast(latitude,longitude, (error,forecastData) =>{
            if(error) {
                return console.log(error)
            }
    
            console.log(location)
            console.log('Data',forecastData)
        })
    })
}

/*
fungsi untuk mengambil input lewat command line,
contoh: "node app.js geocode --name="new York" "

yargs.version('1.1.0');

yargs.command({
    command:'getGeocode',
    describe:'get geocode just from a name input',
    builder:{
        name:{
            describe: 'Location\'s name ',
            demandOption:true,
            type: 'string'
        }
    },
    handler(argv){
        weather.getGeocode(argv.name)
    }
})

yargs.parse()
    
*/