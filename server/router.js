const express = require('express');
const stockController = require('./controllers/stockController');
const accountController = require('./controllers/accountController');

module.exports = function(app) {

  app.get('/account', accountController.getAccount);
  app.post('/account/addFunds', accountController.addFunds);
  app.post('/account/removeFunds', accountController.removeFunds);

  app.get('/stocks', stockController.getStocks);
  app.post('/stocks/purchase', stockController.purchaseStock);
  app.post('/stocks/sell', stockController.sellStock);

};