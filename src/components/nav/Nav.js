import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = (props) => {

  return (
    <div className='navbar'>

      <nav>
        <NavLink
          exact to="/"
          className='nav-link'
          activeClassName='is-active'
          >
          Portfolio
        </NavLink>

        <NavLink
          exact to="/search"
          className='nav-link'
          activeClassName='is-active'
          >
          Find & Purchase
        </NavLink>
      </nav>

      <div className="balance">
        {props.accountBalance}
      </div>

    </div>
  );
};

export default Nav;
