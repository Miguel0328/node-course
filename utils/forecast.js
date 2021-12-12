const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4ca8d1d5b4c1539495b90f7470c74651&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service!");
      return;
    }

    if (body.error) {
      callback("Unable to find location!");
      return;
    }

    const current = body.current;
    callback(
      undefined,
      `${current.weather_descriptions[0]}. It is currently ${current.temperature}. It feels like ${current.feelslike}.`
    );
  });
};

module.exports = forecast;
