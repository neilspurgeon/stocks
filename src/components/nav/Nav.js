import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import style from './style.css';

const customStyles = {
  overlay : {
    position          : 'fixed',
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width                 : '375px',
    transform             : 'translate(-50%, -50%)',
    color                 : '#000'
  }
};

class Nav extends React.Component {

  constructor() {
    super();
     this.state = {
       modalIsOpen: false,
       transactionAmount: 100
     };
   }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  addFunds = () => {
    this.props.handleAddFunds(this.state.transactionAmount);
    this.closeModal();
  }

  removeFunds = () => {
    this.props.handleRemoveFunds(this.state.transactionAmount);
    this.closeModal();
  }

  handleChange = (e) => {
    // convert value to integer
    const value = parseInt(e.target.value, 10);
    this.setState({
      transactionAmount: value
    });
  }

  render() {
    return (
      <div className={style.navbar}>

        <nav>
          <NavLink
            exact to="/"
            className={style.navLink}
            activeClassName={style.isActive}
            >
            Portfolio
          </NavLink>

          <NavLink
            exact to="/search"
            className={style.navLink}
            activeClassName={style.isActive}
            >
            Find & Purchase
          </NavLink>
        </nav>

        <div className={style.balance}>
          ${this.props.balance && this.props.balance.toFixed(2)}
          <button className={style.editFundsBtn} onClick={this.openModal}>Add/Remove</button>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Add or Withdraw Funds"
          style={customStyles}
        >
          <button onClick={this.closeModal}>close</button>
          <h2>Add or Withdraw Funds</h2>

          <input
            type="number"
            value={this.state.transactionAmount}
            onChange={this.handleChange}
          />

          <button onClick={this.addFunds}>Add Funds</button>
          <button onClick={this.removeFunds}>Withdraw Funds</button>
        </Modal>

      </div>
    );
  }
};

export default Nav;
