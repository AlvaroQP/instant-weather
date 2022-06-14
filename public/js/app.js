console.log('Client side JavaScript file is loaded');

const weatherForm = document.querySelector('form');
const weatherResults = document.querySelector('.weather_results');
const locationInput = document.querySelector('input');
const errorMessage = document.querySelector('.error_message');
const locationText = document.querySelector('.location_text');
const countryText = document.querySelector('.country_text');
const temperatureText = document.querySelector('.temperature_text');
const feelsLikeText = document.querySelector('.feels_like');
const descriptionText = document.querySelector('.description_text');
const humidityText = document.querySelector('.humidity_text');
const windText = document.querySelector('.wind_text');
const latLonTitle = document.querySelector('.lat_lon_title');
const latLonText = document.querySelector('.lat_lon_text');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = locationInput.value;

    fetch(`http://api.weatherstack.com/current?access_key=3210a8d3694afba1c512611d1bc64791&query=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                errorMessage.textContent = `${data.error}`;
            } else {
                weatherResults.style.display = 'grid';
                errorMessage.textContent = '';
                locationText.textContent = `${data.location}`;
                countryText.textContent = `${data.country}`;
                temperatureText.textContent = `${data.currentTemperature}ºC`;
                feelsLikeText.textContent = `Feels like: ${data.feelsLike}ºC`;
                descriptionText.textContent = `${data.weatherDescription}`;
                humidityText.textContent = `${data.humidity}%`;
                windText.textContent = `${data.windSpeed} km/h`;
                latLonTitle.textContent = 'Lat Long';
                latLonText.textContent = `(${data.latitude}, ${data.longitude})`;
            }
        });
    });
});
