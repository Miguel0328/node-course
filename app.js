const request = require("request");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const address = process.argv[2];

if (!address) {
  return console.log("Please provide an address");
}

geocode(address, (error, { latitude, longitude, location } = {}) => {
  if (error) {
    return console.log(error);
  }

  forecast(latitude, longitude, (error, forecastData) => {
    if (error) {
      return console.log(error);
    }
    console.log(location);
    console.log(forecastData);
  });
});
