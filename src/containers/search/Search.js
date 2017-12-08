import React from 'react';
import Nav from 'components/nav/Nav.js';
import Card from 'components/card/Card.js';
import style from './style.css';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      searchInput: null,
      searchResults: null
    };
  }

  componentDidMount() {
    fetch('/account')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ balance: data.balance });
      });

    fetch('https://api.iextrading.com/1.0/stock/market/list/mostactive')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ stocks: data });
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
      this.setState({ balance: parsedData.balance });
      cb();
    });
  }


  handleSearchInputChange = (e) => {
    this.setState({
      searchInput: e.target.value
    });
  }


  search = (e) => {
    const searchText = this.state.searchInput;
    e.preventDefault();
    fetch('https://api.iextrading.com/1.0/stock/' + searchText + '/quote')
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        throw this.setState({
          searchResults: null,
          noResults: true
        });
      })
      .then((result) => this.setState({
        searchResults: result,
        noResults: false
      }));
  }


  render() {
    return (
      <div>
        <Nav
          balance={this.state.balance}
          handleAddFunds={this.addFunds}
          handleRemoveFunds={this.removeFunds}
        />

      <div className={style.searchContainer}>

          <form onSubmit={this.search}>
            <input
              className={style.searchInput}
              value={this.state.searchInput}
              placeholder="Search by symbol"
              onChange={this.handleSearchInputChange}
            />
          </form>

          { this.state.noResults === true && <div className={style.notFound}>Nothing was found.</div>}

      </div>

      <div className={[style.resultsContainer, this.state.searchResults ? null : style.isHidden].join(' ')}>

        <div className={style.sectionHeader}>Search Results</div>

        { this.state.searchResults && <Card
          handlePurchase={this.handlePurchase}
          symbol={this.state.searchResults.symbol}
          latestPrice={this.state.searchResults.latestPrice}
          open={this.state.searchResults.open}
          low={this.state.searchResults.low}
          high={this.state.searchResults.high}
        />}

      </div>

        <div className={style.stockContainer}>

          <div className={style.sectionHeader}>Most Active Stocks</div>

          { this.state.stocks[0] && this.state.stocks.map((stock, i) => {
            return (
              <Card
                key={i}
                index={i}
                handlePurchase={this.handlePurchase}
                symbol={stock.symbol}
                latestPrice={stock.latestPrice}
                open={stock.open}
                low={stock.low}
                high={stock.high}
              />
            );
          })}
        </div>

      </div>
    );
  }
}

export default Search;
