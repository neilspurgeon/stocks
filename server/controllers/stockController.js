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
  account.balance -= totalCost;

  // check to see if stock already exists
  if (stocks[stock]) {
    shares = stocks[stock].shares += shares;
  }

  // add purchased stocks
  stocks[stock] = {
    "shares": shares
  };

  res.send(shares + ' of ' + stock + ' purchased for $' + totalCost);
};


exports.sellStock = (req, res) => {
  const stock = req.body.symbol;
  const shares = req.body.shares;
  const value = req.body.costPerShare;
  const totalValue = value * shares;

  // check to make sure you own this stock
  if (!stocks[stock]) {
    return res.status(400).send('You do not own any ' + stock + ' shares.');
  }

  // check to make sure you have enough stock to sellStock
  if (stocks[stock].shares < shares) {
    return res.status(400).send('You do not own enough shares.');
  }

  // deduct shares from stocks
  stocks[stock] = {
    "shares": stocks[stock].shares -= shares
  };

  // add funds to account
  account.balance += totalValue;

  res.send(shares + ' of ' + stock + ' sold for $' + totalValue);

};
