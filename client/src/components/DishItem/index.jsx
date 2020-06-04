import React from 'react';
import './style.scss';

import formatPrice from './../../helpers/format-price';

function DishItem(props) {
  return (
    <div className="dish">
      <div className="dish__media">
        <img src={props.photo} alt={props.name} />
      </div>
      <div className="dish__body">
        <span>{props.name}</span>
        <em>{formatPrice(props.price)}</em>
      </div>
      <div className="dish__actions">
        <span>Qty. {props.quantity}</span>
        <button onClick={() => props.changeQuantity(props.quantity + 1)}>+</button>
        <button onClick={() => props.changeQuantity(props.quantity - 1)}>-</button>
      </div>
    </div>
  );
}

export default DishItem;
