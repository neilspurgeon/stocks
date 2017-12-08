import React from 'react';
import Nav from 'components/nav/Nav.js';
import Card from 'components/card/Card.js';
import style from './style.css';

class Portfolio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    };
  }

  componentDidMount() {
    fetch('/stocks')
      .then((res) => res.json())
      .then((stocksArr) => this.getStockQuotes(stocksArr));

    fetch('/account')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ balance: data.balance });
      });
  }


  getStockQuotes(stockObjArr) {

    // create new arr of just the symbol names
    const symbolsArr = [];
    stockObjArr.forEach((obj) => {
      return symbolsArr.push(obj.symbol);
    });

    // create request string
    symbolsArr.join(',');
    const requestUrl = 'https://api.iextrading.com/1.0/stock/market/batch?symbols=' + symbolsArr + '&types=quote';

    fetch(requestUrl)
      .then((res) => res.json())
      .then((parsedData) => {

        // loop through quote obj and add quote to stocks arr (parsedData)
        Object.keys(parsedData).forEach((key, i) => {
          return stockObjArr[i].data = parsedData[key];
        });

        return this.setState({ stocks: stockObjArr });

      });
  }


  // Handle Transactions

  addFunds = (amount) => {
    console.log('trigger');
    fetch('/account/addFunds', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount
      })
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          balance: data.balance
        });
      });
  }

  removeFunds = (amount) => {
    console.log('trigger');
    fetch('/account/removeFunds', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount
      })
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          balance: data.balance
        });
      });
  }

  handlePurchase = (symbol, cost, shares, index, cb, errCb) => {

    if (cost * shares > this.state.balance) {
      return errCb('You do not have enough money');
    }

    fetch('/stocks/purchase', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        symbol: symbol,
        costPerShare: cost,
        shares: shares
      })
    })
    .then((res) => res.json())

    // need to add catch for errors

    // if successful update ui
    .then((parsedData) => {

      let stockObj = this.state.stocks;
      stockObj[index].shares = stockObj[index].shares += shares;

      this.setState({
        stocks: stockObj,
        balance: parsedData.balance
      });
      cb();
    });
  }

  handleSell = (symbol, cost, shares, index, cb, errCb) => {

    if (shares > this.state.stocks[index].shares) {
      return errCb('You do not have enough shares');
    }

    fetch('/stocks/sell', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        symbol: symbol,
        costPerShare: cost,
        shares: shares
      })
    })
    .then((res) => res.json())

    // need to add catch for errors

    // if successful update ui
    .then((parsedData) => {

      let stockObj = this.state.stocks;
      stockObj[index].shares = stockObj[index].shares -= shares;

      this.setState({
        stocks: stockObj,
        balance: parsedData.balance
      });
      cb();
    });
  }


  render() {
    return (
      <div>
        <Nav
          balance={this.state.balance}
          handleAddFunds={this.addFunds}
          handleRemoveFunds={this.removeFunds}
        />

      <div className={style.stockContainer}>
          { this.state.stocks[0] && this.state.stocks[0].data && this.state.stocks.map((stock, i) => {
            return (
              <Card
                isSellable
                key={i}
                index={i}
                handlePurchase={this.handlePurchase}
                handleSell={this.handleSell}
                symbol={stock.symbol}
                latestPrice={stock.data.quote.latestPrice}
                open={stock.data.quote.open}
                low={stock.data.quote.low}
                high={stock.data.quote.high}
                shares={stock.shares}
              />
            );
          })}
        </div>

      </div>
    );
  }
}

export default Portfolio;
