import React from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

import ShoppingBasketTotal from './../ShoppingBasketTotal';

import { signOut } from './../../services/authentication';

const NavBar = props => {
  const signOutAndLiftUserState = () => {
    signOut()
      .then(() => {
        props.updateUser(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo">
          <span>BYTE</span>
          <strong>ME</strong>
        </div>
      </Link>
      {(props.user && (
        <>
          <img src={props.user.photo} alt={props.user.name} />
          <span>{props.user.name}</span>
          <button onClick={signOutAndLiftUserState}>Sign Out</button>
        </>
      )) || (
        <>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </>
      )}
      <Link to="/shopping-basket">
        <ShoppingBasketTotal shoppingBasket={props.shoppingBasket} />
      </Link>
    </nav>
  );
};

export default NavBar;
