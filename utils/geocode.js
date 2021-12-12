const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWlndWVsZmFyaWFzIiwiYSI6ImNrd3ZvM3o5MjIyM3UybnMyNm9ucDB3eXQifQ.4vNJffaymV_b53BPtcEU4w&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service!");
      return;
    }

    if (body.features.length === 0) {
      callback("Unable to find location!");
      return;
    }

    const feature = body.features[0];
    callback(undefined, {
      location: feature.place_name,
      latitude: feature.center[1],
      longitude: feature.center[0],
    });
  });
};

module.exports = geocode;
