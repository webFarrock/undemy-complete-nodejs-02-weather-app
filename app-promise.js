const yargs = require('yargs');
const axios = require('axios');


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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.');

    }

    const {lat, lng} = response.data.results[0].geometry.location;
    const weatherUrl = `https://api.darksky.net/forecast/80996fdc71305e929a88e99d10c0c8f6/${lat},${lng}`;

    console.log(weatherUrl);
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);
}).then((response) => {
    const {temperature, apparentTemperature} = response.data.currently;

    console.log('temperature: ',temperature);
    console.log('apparentTemperature: ',apparentTemperature);

}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.');
    }else{
        console.log(e.message);
    }
});

