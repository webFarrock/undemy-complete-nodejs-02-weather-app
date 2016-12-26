
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');

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


/*
geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(JSON.stringify(results, undefined, 2));
    }
});
*/



const request = require('request');


request({
    url: `https://api.darksky.net/forecast/80996fdc71305e929a88e99d10c0c8f6/37.8267,-122.4233`,
    json: true,
}, (error, response, body) => {
    if(!error && response.statusCode === 200){
        console.log(body.currently.temperature);
    }else{
        console.log('Unable to fetch weather.');
    }
});
