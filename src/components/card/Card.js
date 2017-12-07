import React from 'react';
import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestPrice: null,
      buyModalIsOpen: false,
      sellModalIsOpen: false,
      transationAmount: 100
    };
  }

  // Get the lastet stock Data
  // this should later be combined into single request and passed down through props
  componentDidMount() {
    fetch('https://api.iextrading.com/1.0/stock/' + this.props.symbol + '/quote')
      .then((res) => {
        return res.json();
      })
      .then((parsedData) => {
        this.setState({
          latestPrice: parsedData.latestPrice,
          change: parsedData.change,
          open: parsedData.open,
          low: parsedData.low,
          high: parsedData.high,
          close: parsedData.close
        });
      });
  }

  // Handle open/close modals

  handleOpenBuyModal = () => {
    console.log('open');
    this.setState({
      buyModalIsOpen: true
    });
  }

  handleCloseBuyModal = () => {
    this.setState({
      buyModalIsOpen: false
    });
  }

  handleOpenSellModal = () => {
    console.log('open');
    this.setState({
      sellModalIsOpen: true
    });
  }

  handleCloseSellModal = () => {
    this.setState({
      sellModalIsOpen: false
    });
  }

  handleTransactionAmount = (e) => {
    this.setState({
      transationAmount: e.target.value
    });
  }

  render() {
    return (
      <div className="card">

        <div className="card-header">
          <h2 className="card-title">{this.props.symbol}</h2>
          <span className="price">{this.state.latestPrice}</span>
        </div>

        <div className="data-container">

          <div className="data-row">
            <span className="data-label">Open</span>
            <span className="data-value">{this.state.open}</span>
          </div>

          <div className="data-row">
            <span className="data-label">Low</span>
            <span className="data-value">{this.state.low}</span>
          </div>

          <div className="data-row">
            <span className="data-label">High</span>
            <span className="data-value">{this.state.high}</span>
          </div>

          <div className="data-row">
            <span className="data-label">Shares</span>
            <span className="data-value">{this.props.shares}</span>
          </div>

        </div>

        <div className="bottom-actions">

          <button
            className="purchase-btn card-btn"
            onClick={this.handleOpenBuyModal}
          >
            BUY
          </button>

          {this.props.isSellable ?
            <button
              className="sell-btn card-btn"
              onClick={this.handleOpenSellModal}
            >
              SELL
            </button>
          : null}

        </div>

        <div className={["buy-modal", "card-modal", (this.state.buyModalIsOpen ? "is-open" : null)].join(' ')}>

          How much would you like to purchase?

          <input
            className="transaction-input"
            type="number"
            value={this.state.transationAmount}
            onChange={this.handleTransactionAmount}
          />

          <button className="confirm-btn card-btn">
            Confirm Purchase
          </button>

        </div>

        <div className={["sell-modal", "card-modal", (this.state.sellModalIsOpen ? "is-open" : null)].join(' ')}>

          How much would you like to sell?

          <input
            className="transaction-input"
            type="number"
            value={this.state.transationAmount}
            onChange={this.handleTransactionAmount}
          />

        <button className="confirm-btn card-btn">
          Confirm Sell
        </button>

        </div>

      </div>
    );
  }
};

export default Card;
