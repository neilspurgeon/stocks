let account = require('../db/account');
let stocks  = require('../db/stocks');


exports.getStocks = (req, res) => {
  res.status(200).json(stocks);
};


exports.purchaseStock = (req, res) => {
  const stock  = req.body.symbol;
  let shares = req.body.shares;
  const cost = req.body.costPerShare;
  const totalCost = cost * shares;

  // check to make sure you can afford the purchase
  if (totalCost > account.balance) {
    return res.status(400).json('You do not have enough money');
  }

  // deduct purchase from account
  const newBalance = (account.balance - totalCost);
  account.balance = newBalance;

  // check to see if stock already exists
  // and if so find stock index in stock db array
  const stockIndex = stocks.findIndex((obj) => {
    return obj.symbol === stock;
  });

  // add purchased stocks
  if (!stockIndex) {
    // if new stock, push to array
    stocks.push({
      "symbol": stock,
      "shares": shares
    });
  } else {
    stocks[stockIndex].shares += shares;
  }

  res.status(200).json({"balance": account.balance});
};


exports.sellStock = (req, res) => {
  const stock = req.body.symbol;
  const shares = req.body.shares;
  const value = req.body.costPerShare;
  const totalValue = value * shares;

  const stockIndex = stocks.findIndex((obj) => {
    return obj.symbol === stock;
  });

  // check to make sure you own this stock
  if (!stocks[stockIndex] || stocks[stockIndex].shares === 0) {
    return res.status(400).send('You do not own any ' + stock + ' shares.');
  }

  // check to make sure you have enough stock to sellStock
  if (stocks[stockIndex].shares < shares) {
    return res.status(400).send('You do not own enough shares.');
  }

  // deduct shares from stocks
  stocks[stockIndex].shares = stocks[stockIndex].shares -= shares;

  // add funds to account
  account.balance += totalValue;

  res.status(200).json({"balance": account.balance});

};
