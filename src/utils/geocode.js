const request = require('request')
const geocode =  (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaXZhbm1hcmRpbmkiLCJhIjoiY2tza3hsenRrMDB4MzJ2bXJvdHEwdzNvOSJ9.hMrg9slhiIPhDE1UCfmHLw&language=es&limit=1`
    request({url, json: true}, (error, response) => {
        if(error){
            callback("An unexpected error has ocurred",undefined)
        }else if(response.body.features.length === 0){
            callback("Location not found",undefined)
        }else{
            const {features} = response.body
            callback(undefined, {
                lat:features[0].center[1],
                long:features[0].center[0],
                location: features[0].place_name
                }
            )
        }
    })
}

module.exports = geocode