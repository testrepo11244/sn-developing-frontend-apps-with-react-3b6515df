import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from './ProductList';
import { increaseQuantity, decreaseQuantity, removeItem } from '../features/cartSlice';

const CartItem = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const calculateTotal = (price, quantity) => (price * quantity).toFixed(2);
  const totalAmount = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        {items.length === 0 ? (
          <p className="empty-message">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item-row">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="cart-thumbnail"
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="unit-price">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))}>
                      +
                    </button>
                  </div>
                  <div className="item-total-cost">
                    ${calculateTotal(item.price, item.quantity)}
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <h2>Total Amount: ${totalAmount}</h2>
              <button
                className="checkout-btn"
                onClick={() => alert('Coming Soon')}
              >
                Checkout
              </button>
              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;