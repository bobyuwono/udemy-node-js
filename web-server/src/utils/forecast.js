const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e036ceb2efed35210ee65e12cbcd84c2/' + latitude+', ' + longitude +'?units=si'

    request({url,json:true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to forecase service!', undefined)
        } else if(body.error ){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature  ,
                precipitation: body.currently.precipIntensity 
            } ) 
            
            /* 
            callback alternatif
            
            console.log(body.daily.data[0].summary+ "It is currently "+ body.currently.temperature + " degrees out. "+ 
             "There is a "+ body.currently.precipIntensity + "% chance of rain") 
              */
        }
    })
}

module.exports = forecast