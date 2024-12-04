import React from 'react';
import './ScreenCss/CartScreen.css';


const CartScreen = ({ cart, removeFromCart }) => {
  return (
    <div className="MainContainerForCartScreen">
      <div className="shopping-cart">
        <h2>Your Shopping Cart</h2>
        {cart && Array.isArray(cart) && cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p>Price: ${(parseFloat(item.product.price)).toFixed(2)}</p>
                  {/* ^ Convert the price to a number and then call toFixed(2) */}
                </div>
                <div className="cart-item-actions">
                  <span>{item.quantity}</span>
                  <button  onClick={() => removeFromCart(index)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartScreen;

