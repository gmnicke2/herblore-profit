/**
 * GET /
 * Home page and where herb profits show
 */
const Client = require('node-rest-client').Client;
var client = new Client();

const rsbuddyAPIURL = process.env.RSBUDDY_APIURL;

// JSON objects of grimy herbs, price refers to buy price
var grimyGuam = {'name': 'Grimy guam leaf', 'id': 199, 'price': 0};
var grimyMarrentill = {'name': 'Grimy marrentill', 'id': 201, 'price': 0};
var grimyTarromin = {'name': 'Grimy tarromin', 'id': 203, 'price': 0};
var grimyHarralander = {'name': 'Grimy Harralander', 'id': 205, 'price': 0};
var grimyRannar = {'name': 'Grimy ranarr weed', 'id': 207, 'price': 0};
var grimyIrit = {'name': 'Grimy irit leaf', 'id': 209, 'price': 0};
var grimyAvantoe = {'name': 'Grimy avantoe', 'id': 211, 'price': 0};
var grimyKwuarm = {'name': 'Grimy kwuarm', 'id': 213, 'price': 0};
var grimyCadantine = {'name': 'Grimy cadantine', 'id': 215, 'price': 0};
var grimyDwarf = {'name': 'Grimy dwarf weed', 'id': 217, 'price': 0};
var grimyTorstol = {'name': 'Grimy torstol', 'id': 219, 'price': 0};
var grimyToadflax = {'name': 'Grimy toadflax', 'id': 3049, 'price': 0};
var grimySnapdragon = {'name': 'Grimy toadflax', 'id': 3051, 'price': 0};

// JSON objects of clean herbs, price refers to sell price
var guam = {'name': 'Guam leaf', 'id': 249, 'price': 0};
var marrentill = {'name': 'Marrentill', 'id': 251, 'price': 0};
var tarromin = {'name': 'Tarromin', 'id': 253, 'price': 0};
var harralander = {'name': 'Guam leaf', 'id': 255, 'price': 0};
var ranarr = {'name': 'Marrentill', 'id': 257, 'price': 0};
var irit = {'name': 'Tarromin', 'id': 259, 'price': 0};
var avantoe = {'name': 'Guam leaf', 'id': 261, 'price': 0};
var kwuarm = {'name': 'Marrentill', 'id': 263, 'price': 0};
var cadantine = {'name': 'Tarromin', 'id': 265, 'price': 0};
var dwarf = {'name': 'Guam leaf', 'id': 267, 'price': 0};
var torstol = {'name': 'Marrentill', 'id': 269, 'price': 0};
var toadflax = {'name': 'Guam leaf', 'id': 2998, 'price': 0};
var snapdragon = {'name': 'Marrentill', 'id': 3000, 'price': 0};

var grimyHerbs = [grimyGuam, grimyMarrentill, grimyTarromin, grimyHarralander,
                  grimyRannar, grimyIrit, grimyAvantoe, grimyKwuarm, grimyCadantine,
                  grimyDwarf, grimyTorstol, grimyToadflax, grimySnapdragon];

var cleanHerbs = [guam, marrentill, tarromin, harralander, 
                  ranarr, irit, avantoe, kwuarm, cadantine, 
                  dwarf, torstol, toadflax, snapdragon];

// Register method to GET from RSBuddy API
client.registerMethod('callAPI', rsbuddyAPIURL, 'GET');

var getPrice = (item, cb) => {
  console.log('Getting price for %s', item['name']);

  var args = {
      parameters: {a: 'guidePrice', i: item['id']} // GET request params
  };

  client.methods.callAPI(args, (data, res) => {

    item['price'] = item['name'].includes('Grimy') ? data['buying'] : data['selling'];

    cb();
  });
};

var updateRender = () => {
  // TODO update prices in view when getPrice calls as callback
};

exports.index = (req, res) => {
  for(var i = 0; i < grimyHerbs.length; i++) {
    getPrice(grimyHerbs[i], updateRender);
    getPrice(cleanHerbs[i], updateRender);
  }

  res.render('index', {
    title: 'Herb Cleaning Profits (07scape)',
    grimyGuamPrice: grimyGuam['price'],
    guamPrice: guam['price']
  });
};