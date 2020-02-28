const request = require('request');
const yargs = require('yargs');
const weather = require('./weather.js')

const url = 'https://api.darksky.net/forecast/e036ceb2efed35210ee65e12cbcd84c2/-6.571120, 106.750576?units=si'

request({url: url, json:true}, (error, response)=>{
    // console.log(response.body.currently)
    console.log(response.body.daily.data[0].summary+ "It is currently "+ response.body.currently.temperature + " degrees out. "+ 
    "There is a "+ response.body.currently.precipIntensity + "% chance of rain") 
})
 
//finding the latitude and longitude by location's name. 
//input=[name's location], output=[latitude],[longitude]
//**need to include method to change [space] as '%20'
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
    
