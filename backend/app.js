var express = require("express");
var app = express();
var bodyParser= require('body-parser')
var {resolve} = require('path')
const routes = require('./routes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);


module.exports = app