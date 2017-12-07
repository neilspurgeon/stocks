import React from 'react';
import Nav from 'components/nav/Nav.js';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: null
    };
  }

  render() {
    return (
      <div>
        <Nav />
        Portfolio
      </div>
    );
  }
}

export default Portfolio;
