const request = require('request')
var encodeUrl  = require('encodeurl')

const getGeocode = (address,callback) => {
    var latitude=''
    var longitude=''
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(titleCase(address)) + '.json?access_token=pk.eyJ1IjoiYm9ieXV3b25vIiwiYSI6ImNrNzJpbzRnbDAwNXEzaG1pd2R1OWN6ZnQifQ.KgEu-tiNmxjA4CDHINMRSQ'
    request({url:url ,json:true}, (error,response)=>{
        if (error){
            // error if there's no connection
            callback('unable to connect to location servies!',undefined)
        } else if(response.body.features.length === 0){
            // error if there's no matching location
            callback('Unable to find location. Try another search.',undefined)
        }else{
            // running properly
            callback(undefined, {
                latitude:  response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name  
            })
        }        
    })
}

//function to uppercase all word
const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0 ; i < splitStr.length ; i++){
        splitStr[i] = splitStr[i].charAt(0).toUpperCase()+ splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

//export all function to outside
module.exports ={
    getGeocode:getGeocode
}