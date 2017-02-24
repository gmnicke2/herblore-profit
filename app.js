const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({path: '.herblore-profit.env'});
const path = require('path');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const chalk = require('chalk');
const jquery = require('jquery');

const indexController = require('./controllers/index');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', indexController.index);

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d', chalk.green('✓'), app.get('port')); 
});

module.exports = app;