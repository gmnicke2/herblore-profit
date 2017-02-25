/**
 * GET /
 * Home page and where herb profits show
 */

// JSON objects of grimy herbs, price refers to buy price
var grimyGuam = {'name': 'Grimy guam leaf', 'id': 199, 'price': 0};
var grimyMarrentill = {'name': 'Grimy marrentill', 'id': 201, 'price': 0};
var grimyTarromin = {'name': 'Grimy tarromin', 'id': 203, 'price': 0};
var grimyHarralander = {'name': 'Grimy harralander', 'id': 205, 'price': 0};
var grimyRannar = {'name': 'Grimy ranarr weed', 'id': 207, 'price': 0};
var grimyIrit = {'name': 'Grimy irit leaf', 'id': 209, 'price': 0};
var grimyAvantoe = {'name': 'Grimy avantoe', 'id': 211, 'price': 0};
var grimyKwuarm = {'name': 'Grimy kwuarm', 'id': 213, 'price': 0};
var grimyCadantine = {'name': 'Grimy cadantine', 'id': 215, 'price': 0};
var grimyDwarf = {'name': 'Grimy dwarf weed', 'id': 217, 'price': 0};
var grimyTorstol = {'name': 'Grimy torstol', 'id': 219, 'price': 0};
var grimyToadflax = {'name': 'Grimy toadflax', 'id': 3049, 'price': 0};
var grimySnapdragon = {'name': 'Grimy snapdragon', 'id': 3051, 'price': 0};

// JSON objects of clean herbs, price refers to sell price
var guam = {'name': 'Guam leaf', 'id': 249, 'price': 0};
var marrentill = {'name': 'Marrentill', 'id': 251, 'price': 0};
var tarromin = {'name': 'Tarromin', 'id': 253, 'price': 0};
var harralander = {'name': 'Harralander', 'id': 255, 'price': 0};
var ranarr = {'name': 'Ranarr weed', 'id': 257, 'price': 0};
var irit = {'name': 'Irit leaf', 'id': 259, 'price': 0};
var avantoe = {'name': 'Avantoe', 'id': 261, 'price': 0};
var kwuarm = {'name': 'Kwuarm', 'id': 263, 'price': 0};
var cadantine = {'name': 'Cadantine', 'id': 265, 'price': 0};
var dwarf = {'name': 'Dwarf weed', 'id': 267, 'price': 0};
var torstol = {'name': 'Torstol', 'id': 269, 'price': 0};
var toadflax = {'name': 'Toadflax', 'id': 2998, 'price': 0};
var snapdragon = {'name': 'Snapdragon', 'id': 3000, 'price': 0};

var grimyHerbs = [grimyGuam, grimyMarrentill, grimyTarromin, grimyHarralander,
                  grimyRannar, grimyIrit, grimyAvantoe, grimyKwuarm, grimyCadantine,
                  grimyDwarf, grimyTorstol, grimyToadflax, grimySnapdragon];

var cleanHerbs = [guam, marrentill, tarromin, harralander, 
                  ranarr, irit, avantoe, kwuarm, cadantine, 
                  dwarf, torstol, toadflax, snapdragon];

const Client = require('node-rest-client').Client;
var client = new Client();

const rsbuddyAPIURL = process.env.RSBUDDY_APIURL;

// Register method to GET from RSBuddy API
client.registerMethod('callAPI', rsbuddyAPIURL, 'GET');

var getPrice = (item, cb, frontendRes) => {

  var args = {
      parameters: {a: 'guidePrice', i: item['id']} // GET request params
  };

  client.methods.callAPI(args, (data, res) => {
    item['price'] = item['name'].includes('Grimy') ? data['buying'] : data['selling'];
    cb(frontendRes);
  });
};

var calls = 0;

var incrementCalls = (res) => {
  calls ++;
  if (calls == grimyHerbs.length * 2) {
    calls = 0;
    res.send({grimyHerbs: grimyHerbs, cleanHerbs: cleanHerbs});
  }
};

exports.index = (req, res) => {
  res.render(
    'index', 
    {
      title: 'Herb Cleaning Profits (07scape)',
      grimyHerbs: grimyHerbs,
      cleanHerbs: cleanHerbs
  });
};

exports.updatePrices = (req, res) => {
  for(var i = 0; i < grimyHerbs.length; i++) {
    getPrice(grimyHerbs[i], incrementCalls, res);
    getPrice(cleanHerbs[i], incrementCalls, res);
  }
};