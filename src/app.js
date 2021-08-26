const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const PORT = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Iván Mardini'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Iván Mardini'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Iván Mardini',
        helpfulText:"This is some helpful text"
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'My 404 page',
        name: 'Iván Mardini',
        errorText:"Help article not found"
    })
})
app.get('/weather', (req, res) => {
    const {address} = req.query
    if(!address){
       return res.send({
           error:"You must provide an address"
       }) 
    }
    geocode(address,(error, {lat, long, location} = {}) => {
        if(error)
        return res.send({ error }) 
        forecast(lat, long,(error, forecastData)=>{
            if(error)
                return res.send({ error }) 
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
        
    })
    
})
app.get('/products', (req, res) => {
    const {rating, search} = req.query
    if(!search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
    
        
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 page',
        name: 'Iván Mardini',
        errorText:"The page was not found"
    })
})


app.listen(PORT, () =>{
    console.log("Server is up on port 3000.")
})