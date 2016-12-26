const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

let argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for'
    }
})
    .help()
    .alias('help', 'h')
    .argv;



geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{

        const {lat, lng, address} = results;

        weather.getWeather(lat, lng, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }else{

                console.log('address: ', address);
                console.log('temperature: ', weatherResults.temperature);
                console.log('apparentTemperature: ', weatherResults.apparentTemperature);
            }
        });


    }
});



