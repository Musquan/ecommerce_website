
import React from "react";
import {Link} from 'react-router-dom';
import './ComponentCss/NavigationBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
  
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to='/TestScreen' className="link" aria-label="Go to Home page"> <span> <b> TechnoTreasure </b></span> </Link>
      </div>
      
      {/*
      <div className="navbar-center">
        <input
          className="search-input"
          type="text"
          placeholder="Enter the product you are looking for"
        />
      </div> */}
       
      
      
      <div className="navbar-right">
        <span className='iconNavBar'>
            <Link 
              to={'/WishlistScreen'}
              style={{ textDecoration: 'none', color: '#F15A22'}}
              aria-label="Go to Wishlist"
            >
              <FontAwesomeIcon icon={ faHeart } size='2x' />
            </Link>
        </span>
        <span className='iconNavBar'>
            <Link 
              to={'/ProductCartScreen'}
              style={{ textDecoration: 'none', color: '#F15A22'}}
              aria-label="Go to Cart"
            >
              <FontAwesomeIcon icon={ faCartShopping } size='2x'  />
            </Link>
        </span>
        <span className='iconNavBar'>
            <Link
              to={'/MyProfileScreen'}
              state= {{ userFirstName: "Musquan", userLastName: "Karovalia", userEmail: "MusquanKarovalia@gmail.com", userShippingAddress: "UTSA - Shipping", userBillingAddress: "UTSA - Billing", testid: "654b15bceb65eab62c7897fe"}}
              style={{ textDecoration: 'none', color: '#F15A22'}}
              aria-label="Go to your profile"
            >
              <FontAwesomeIcon icon={ faUser } size='2x'  />
            </Link>
        </span>
      </div>
    </div>
  );
}

export default NavigationBar;

