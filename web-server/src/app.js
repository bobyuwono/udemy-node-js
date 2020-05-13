const path = require('path')
const express = require('express')



const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bob yuwono'
    })
})

app.get('/about', (req,res) => {
    res.render ('about', {
        title: 'help page' ,
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        
    }) 

})

app.get('/weather', (req, res) => {
    res.send([
        {
            cuaca: 'adem',
            suhu : '27'
        }
    ])

})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})