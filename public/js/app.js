console.log('Client side javascript file is loaded')

const options = {method:'GET', headers:{'Content-type':'json/application'}}
const getWeather = async (address) => {
    const url = 'http://localhost:3000/weather'
    const response = await fetch(`${url}?address=${address}`, options)
    return await response.json()
}
const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
let locationDiv = document.getElementById('location')
let forecastDiv = document.getElementById('forecast')

weatherForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    locationDiv.innerText = 'Loading...'
    forecastDiv.innerText = ''
    const location = input.value
    const weather = await getWeather(location)
    if(!weather.error){
        locationDiv.innerText = weather.location
        forecastDiv.innerText = weather.forecast
    }else{
        locationDiv.innerText = weather.error
        forecastDiv.innerText = ''
    }
})
