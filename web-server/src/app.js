const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

//app.use is used to customize server
app.use(express.static(publicDirectoryPath))


//take two arguments: route and function: request and response 
app.get('/weather', (req, res)=>{
    res.send({
        location: 'Philadephia',
        forecast: 'rain'
    })
})
//listen to port 3000, give a console sign to local that server si running
app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})