const request = require('request')

// lat: 10.9800899
//long: -74.8315482
const forecast = (lat,long,callback) => {

    const url = `http://api.weatherstack.com/current?access_key=a7917102387058857d4f3b601aef1ac4&query=${lat},${long}`
    request.get({ url, json: true },(error, response) => {
        if(error){
            callback("An unexpected error has ocurred",undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            const {temperature, feelslike,weather_descriptions} = response.body.current
            callback(undefined,`${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
        }
    })

}


module.exports = forecast
