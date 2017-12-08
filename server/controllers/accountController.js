let account = require('../db/account');


exports.getAccount = (req, res) => {
  res.json(account);
};

exports.addFunds = (req, res) => {
  const amount = req.body.amount;
  account.balance += amount;

  res.status(200).json({"balance" : account.balance});
};


exports.removeFunds = (req, res) => {
  const amount = req.body.amount;
  account.balance -= amount;

  res.status(200).json({"balance" : account.balance});
};
