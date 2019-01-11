const express = require('express');
const request = require('request');
const axios = require('axios');

const app = express();
const PORT = 3000;
const API_KEY = '5666db02cf64d0d4d9a688ce6a9fb0f8';
const KEY_PARAM = `?key=${API_KEY}`;
const API_URL = `https://sandbox-api.brewerydb.com/v2`;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api', (req, res) => {
  request(`${API_URL}/${KEY_PARAM}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(error);
    }
  });
});

app.get('/api/beers', (req, res) => {
  const { abv, ibu } = req.query;

  request({
    method: 'GET',
    uri: `${API_URL}/beers/?withBreweries=Y`,
    qs: {
      key: API_KEY,
      abv,
      ibu
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
      console.log(req.query);
    } else {
      console.log(error);
    }
  });
});

app.get('/api/beer/:beerId', (req, res) => {
  request(`${API_URL}/beer/${req.params.beerId}/?withBreweries=Y&withIngredients=Y&key=${API_KEY}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(error);
    }
  });
});

app.get('/api/beer/:beerId/breweries', (req, res) => {
  request(`${API_URL}/beer/${req.params.beerId}/breweries/${KEY_PARAM}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(error);
    }
  });
});

app.get('/api/styles', (req, res) => {
  request(`${API_URL}/styles/${KEY_PARAM}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(error);
    }
  });
});

app.get('/api/categories', (req, res) => {
  request(`${API_URL}/categories/${KEY_PARAM}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(error);
    }
  });
});

app.get('/api/glassware', (req, res) => {
  request(`${API_URL}/glassware/${KEY_PARAM}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(error);
    }
  });
});

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
