const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const request = require('request')


const app = express()

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // mengide custom nama folder 'views'. defaultnya express akan mencari ke folder 'views'
const partialsPath= path.join(__dirname, '../templates/partials') //path for partials

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // pengaplikasian variabel viewsPath 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bob yuwono',

    })
})

app.get('/about', (req,res) => {
    res.render ('about', {
        title: 'about page' ,
        name : 'BobYuwono'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'Bob Yuwono'

    }) 

})

app.get('/weather', (req, res) => {
    
    if (!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode (req.query.address, (error,{latitude, longitude, location} = {} ) => {   
        if(error) {
            return res.send({error})            
        } 
    
        forecast(latitude,longitude, (error,forecastData) =>{
            if(error) {
                 return res.send({error})
            }

           res.send({
              location: location,
              forecastData: forecastData 
           }) 
        })
    }) 
        
})

app.get( '/help/*', (req,res) => {
    res.render('404', {
        message:'Help article not found'
    })
})

app.get ('*', (req,res) =>{
    res.render('404', {
        message: '404 not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})