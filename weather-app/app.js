const request = require('request')

const url = 'https://api.darksky.net/forecast/e036ceb2efed35210ee65e12cbcd84c2/-6.571120, 106.750576?units=si'
5
request({url: url, json:true}, (error, response)=>{
    // console.log(response.body.currently)
    console.log("It is currently "+ response.body.currently.temperature + " degrees out. "+ 
    "There is a "+ response.body.currently.precipIntensity + "% chance of rain")

})
