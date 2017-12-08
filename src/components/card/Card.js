import React from 'react';
import style from './style.css';

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
      <div className={style.card}>

        <div className={style.cardHeader}>
          <h2 className={style.cardTitle}>{this.props.symbol}</h2>
          <span className={style.price}>{this.props.latestPrice}</span>
        </div>

        <div className={style.dataContainer}>

          <div className={style.dataRow}>
            <span className={style.dataLabel}>Open</span>
            <span className={style.dataValue}>{this.props.open}</span>
          </div>

          <div className={style.dataRow}>
            <span className={style.dataLabel}>Low</span>
            <span className={style.dataValue}>{this.props.low}</span>
          </div>

          <div className={style.dataRow}>
            <span className={style.dataLabel}>High</span>
            <span className={style.dataValue}>{this.props.high}</span>
          </div>

          <div className={style.dataRow}>
            <span className={style.dataLabel}>Shares</span>
            <span className={style.dataValue}>{this.props.shares}</span>
          </div>

        </div>

        <div className={style.bottomActions}>

          <button
            className={[style.buyBtn, style.cardBtn].join(' ')}
            onClick={this.handleOpenBuyModal}
          >
            BUY
          </button>

          {this.props.isSellable &&
            <button
              className={[style.sellBtn, style.cardBtn].join(' ')}
              onClick={this.handleOpenSellModal}
            >
              SELL
            </button>
          }

        </div>

        <div className={[style.buyModal, style.cardModal, (this.state.buyModalIsOpen ? style.isOpen : null)].join(' ')}>

          <div className={style.cardError}>{ this.state.error }</div>

          How much would you like to purchase?

          <input
            className={style.transactionInput}
            type="number"
            value={this.state.transactionAmount}
            onChange={this.handleTransactionAmount}
          />

          <span
            className={style.cancelBtn}
            onClick={this.handleCloseBuyModal}>
            Cancel
          </span>

          <div className={style.bottomActions}>
            <button
              className={[style.confirmBtn, style.cardBtn].join(' ')}
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

        <div className={[style.sellModal, style.cardModal, (this.state.sellModalIsOpen ? style.isOpen : null)].join(' ')}>

          <div className={style.cardError}>{ this.state.error }</div>

          How much would you like to sell?

          <input
            className={style.transactionInput}
            type="number"
            value={this.state.transactionAmount}
            onChange={this.handleTransactionAmount}
          />

          <span
            className={style.cancelBtn}
            onClick={this.handleCloseBuyModal}>
            Cancel
          </span>

        <div className={style.bottomActions}>
          <button className={[style.confirmBtn, style.cardBtn].join(' ')}
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
