import React from 'react';
import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyModalIsOpen: false,
      sellModalIsOpen: false,
      transactionAmount: 100
    };
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
      buyModalIsOpen: false,
      error: null
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
      sellModalIsOpen: false,
      error: null
    });
  }

  handleError = (message) => {
    this.setState({ error: message });
  }

  handleTransactionAmount = (e) => {
    this.setState({
      transactionAmount: e.target.value
    });
  }

  render() {
    return (
      <div className="card">

        <div className="card-header">
          <h2 className="card-title">{this.props.symbol}</h2>
          <span className="price">{this.props.latestPrice}</span>
        </div>

        <div className="data-container">

          <div className="data-row">
            <span className="data-label">Open</span>
            <span className="data-value">{this.props.open}</span>
          </div>

          <div className="data-row">
            <span className="data-label">Low</span>
            <span className="data-value">{this.props.low}</span>
          </div>

          <div className="data-row">
            <span className="data-label">High</span>
            <span className="data-value">{this.props.high}</span>
          </div>

          <div className="data-row">
            <span className="data-label">Shares</span>
            <span className="data-value">{this.props.shares}</span>
          </div>

        </div>

        <div className="bottom-actions">

          <button
            className="buy-btn card-btn"
            onClick={this.handleOpenBuyModal}
          >
            BUY
          </button>

          {this.props.isSellable &&
            <button
              className="sell-btn card-btn"
              onClick={this.handleOpenSellModal}
            >
              SELL
            </button>
          }

        </div>

        <div className={["buy-modal", "card-modal", (this.state.buyModalIsOpen ? "is-open" : null)].join(' ')}>

          <div className="card-error">{ this.state.error }</div>

          How much would you like to purchase?

          <input
            className="transaction-input"
            type="number"
            value={this.state.transactionAmount}
            onChange={this.handleTransactionAmount}
          />

          <span
            className="cancel-btn"
            onClick={this.handleCloseBuyModal}>
            Cancel
          </span>

          <div className="bottom-actions">
            <button
              className="confirm-btn card-btn"
              onClick={() => this.props.handlePurchase(
                this.props.symbol,
                this.props.latestPrice,
                parseInt(this.state.transactionAmount, 10),
                this.props.index,
                this.handleCloseBuyModal,
                this.handleError
              )}
            >
              Confirm Purchase
            </button>
          </div>

        </div>

        <div className={["sell-modal", "card-modal", (this.state.sellModalIsOpen ? "is-open" : null)].join(' ')}>

          <div className="card-error">{ this.state.error }</div>

          How much would you like to sell?

          <input
            className="transaction-input"
            type="number"
            value={this.state.transactionAmount}
            onChange={this.handleTransactionAmount}
          />

        <span
          className="cancel-btn"
          onClick={this.handleCloseSellModal}>
          Cancel
        </span>

        <div className="bottom-actions">
          <button className="confirm-btn card-btn"
            onClick={() => this.props.handleSell(
              this.props.symbol,
              this.props.latestPrice,
              parseInt(this.state.transactionAmount, 10),
              this.props.index,
              this.handleCloseSellModal,
              this.handleError
            )}
          >
            Confirm Sell
          </button>
        </div>

        </div>

      </div>
    );
  }
};

export default Card;
