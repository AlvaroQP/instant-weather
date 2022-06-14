const cors = require('cors');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./src/utils/forecast');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// * Paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');

// * Handlebars (hbs) engine and the directory for the application's views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // Loads all partials from the given directory

// * Static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    // * Renders the view: index.hbs
    res.render('index', {
        title: 'Instant Weather',
        name: 'Alvaro Quiles'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Alvaro Quiles'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    forecast(req.query.address, function({location, country, lat, lon, weatherDesc, currentTemp, feelsLike, humidity, windSpeed, error} = {}) {
        res.send({
            location: location,
            country: country,
            latitude: lat,
            longitude: lon,
            weatherDescription: weatherDesc,
            currentTemperature: currentTemp,
            feelsLike: feelsLike,
            humidity: humidity,
            windSpeed: windSpeed,
            error: error
        });
    });
});


// * Any URL that starts with /help/...
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alvaro Quiles',
        errorMessage: 'Help article not found'
    });
});

// * Any other URL...
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alvaro Quiles',
        errorMessage: 'Page not found'
    });
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

