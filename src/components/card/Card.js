import React from 'react';
import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestPrice: null
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

  render() {
    return (
      <div className="card">

        <h2 className="card-title">{this.props.symbol}</h2>
        <span className="price">{this.state.latestPrice}</span>

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

      </div>
    );
  }
};

export default Card;
