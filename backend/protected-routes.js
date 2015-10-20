var express = require('express'),
    jwt     = require('express-jwt'),
    quoter  = require('./quoter');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: process.env.SECRET
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});
