import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const RestaurantList = props => {
  return (
    <div className="card__list">
      {props.restaurants.map(restaurant => (
        <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id}>
          <div className="card">
            <div className="card__media">
              <img src={restaurant.photo} alt={restaurant.name} />
            </div>
            <div className="card__body">
              <span>{restaurant.name}</span>
              <small>
                {restaurant.waitTime}min | {restaurant.rating}
              </small>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RestaurantList;
