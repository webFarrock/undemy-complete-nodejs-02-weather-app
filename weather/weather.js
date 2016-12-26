const request = require('request');

const getWeather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/80996fdc71305e929a88e99d10c0c8f6/${lat},${lng}`,
        json: true,
    }, (error, response, body) => {
        if(!error && response.statusCode === 200){
            console.log(body.currently.temperature);
            callback(null, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
            });
        }else{
            callback('Unable to fetch weather.');

        }
    });

}

module.exports.getWeather = getWeather;