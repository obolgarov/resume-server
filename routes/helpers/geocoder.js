var api = require('../../config/api.js');
var axios = require('axios');


var url = "https://maps.googleapis.com/maps/api/geocode/json?key=" + api.gmaps;


module.exports = {
  getLatLong: (address) => {
    address = address.split(' ').join('+');

    var requestUrl = url + "&address=" + address

    let headers = {
      'Content-Type': 'application/json'
    };

    // console.log(requestUrl);

    let axiosOptions = {
      url: requestUrl,
      method: 'GET',
      responseType: 'json',
      headers: headers
    };

    return new Promise( (resolve, reject) => {
      axios(axiosOptions)
      .then( (response) => {
        resolve(response);
      })
      .catch( (error) => {
        reject(error);
      });
    });

  },
  getAddress: (lat, long) => {

    var requestUrl = url + "&latlng=" + lat + "," + long;

    let axiosOptions = {
      url: requestUrl,
      method: 'GET',
      responseType: 'json'
    };

    return new Promise( (resolve, reject) => {
      axios(axiosOptions)
      .then( (response) => {
        resolve(response);
      })
      .catch( (error) => {
        reject(error);
      });
    });

  }
}
