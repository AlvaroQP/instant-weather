const axios = require('axios').default;

function forecast(location, callback) {
    axios.get(`http://api.weatherstack.com/current?access_key=3210a8d3694afba1c512611d1bc64791&query=${location}`)
        .then(function(response) {
            const data = response.data;
            callback({
                location: data.location.name,
                country: data.location.country,
                lat: data.location.lat,
                lon: data.location.lon,
                weatherDesc: data.current.weather_descriptions[0],
                currentTemp: data.current.temperature,
                feelsLike: data.current.feelslike,
                humidity: data.current.humidity,
                windSpeed: data.current.wind_speed
            });      
        }).catch(function(error) {
            if(error.response) {
                callback({
                    error: 'Unable to connect to weather services'
                });
            } else {
                callback({
                    error: 'Something went wrong. Please try another search.'
                });
            }
        });
}

module.exports = forecast;
