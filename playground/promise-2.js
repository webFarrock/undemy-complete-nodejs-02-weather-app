const request = require('request');
var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json: true,
        }, (error, response, body) => {
            if(error){
                reject('Unable to connect to Google servers.')
            }else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to find that address.');
            }else if(body.status === 'OK'){
                const result = body.results[0];
                const locaction = result.geometry.location;
                resolve({
                    address: result.formatted_address,
                    lat: locaction.lat,
                    lng: locaction.lng
                });
            }
        });
    })
}



geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => console.log(errorMessage));