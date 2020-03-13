const request = require('request')

const geocode = (address,callback) => {
    var latitude=''
    var longitude=''
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYm9ieXV3b25vIiwiYSI6ImNrNzJpbzRnbDAwNXEzaG1pd2R1OWN6ZnQifQ.KgEu-tiNmxjA4CDHINMRSQ'
    request({url ,json:true}, (error,{body})=>{
        if (error){
            // error if there's no connection
            callback('unable to connect to location servies!',undefined)
        } else if(body.features.length === 0){
            // error if there's no matching location
            callback('Unable to find location. Try another search.',undefined)
        }else{
            // running properly
            callback(undefined, {
                longitude:  body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name  
            })
        }        
    })
}

module.exports=geocode
