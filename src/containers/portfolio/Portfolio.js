import React from 'react';
import Nav from 'components/nav/Nav.js';
import Card from 'components/card/Card.js';
import './Portfolio.css';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    };
  }

  componentDidMount() {
    fetch('/stocks')
      .then((res) => {
        return res.json();
      })
      .then((parsedData) => {
        this.setState({
          stocks: parsedData
        });
      });
  }

  // getStockData = (stocksArr) => {
  //   let newArr = [];
  //   console.log(stocksArr);
  //   for (let i=0; i < stocksArr.length; i++ ) {
  //       console.log(i);
  //   }
  // }

  render() {
    return (
      <div>
        <Nav />
        Portfolio

        <div className="stock-container">
          { this.state.stocks ? this.state.stocks.map((stock, i) => {
            return (
              <Card
                symbol={stock.symbol}
                shares={stock.shares}
              />
            );
          }) : null}
        </div>

      </div>
    );
  }
}

export default Portfolio;
