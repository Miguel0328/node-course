const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPaths = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPaths);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Miguel",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Miguel",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Miguel",
    helpText: "This is some helpful text for everyone",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(
    req.query.address,
    (error, { location, latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: data,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Not found",
    name: "Miguel",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Not found",
    name: "Miguel",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
