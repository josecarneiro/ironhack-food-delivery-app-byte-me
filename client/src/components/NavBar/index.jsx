import React from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Link to="/">
        <div className="logo">
          <span>BYTE</span>
          <strong>ME</strong>
        </div>
      </Link>
      <Link to="/shopping-basket">0,00€</Link>
    </div>
  );
};

export default NavBar;
