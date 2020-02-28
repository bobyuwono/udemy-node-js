const request = require('request')
var encodeUrl  = require('encodeurl')

const getGeocode = (name) => {
    var latitude=''
    var longitude=''
    const urlHalfFront ='https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const urlHalfBack  ='.json?access_token=pk.eyJ1IjoiYm9ieXV3b25vIiwiYSI6ImNrNzJpbzRnbDAwNXEzaG1pd2R1OWN6ZnQifQ.KgEu-tiNmxjA4CDHINMRSQ'
    request({url: urlHalfFront + encodeUrl(titleCase(name)) + urlHalfBack,json:true}, (error,response)=>{
        latitude= response.body.features[0].center[0].toString()
        longitude=response.body.features[0].center[1].toString()
        console.log(latitude+', '+longitude)
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