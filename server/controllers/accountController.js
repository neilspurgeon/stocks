let account = require('../db/account');


exports.getAccount = (req, res) => {
  res.json(account);
};

exports.addFunds = (req, res) => {
  const amount = req.body.amount;
  account.balance += amount;

  res.json('Funds successfully added.');
};


exports.removeFunds = (req, res) => {
  const amount = req.body.amount;
  account.balance -= amount;

  res.json('Funds successfully removed');
};
