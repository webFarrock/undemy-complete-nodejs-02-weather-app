const request = require('request');

const geocodeAddress = (address, callback) => {
    address = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json: true,
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to Google servers.')
        }else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address.');
        }else if(body.status === 'OK'){
            const result = body.results[0];
            const locaction = result.geometry.location;

            callback(null, {
                address: result.formatted_address,
                lat: locaction.lat,
                lng: locaction.lng
            });
        }
    });
}


module.exports.geocodeAddress = geocodeAddress;



