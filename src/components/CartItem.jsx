import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping, onNavigateToHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Paradise Nursery</div>
        <ul className="navbar-links">
          <li>
            <button className="nav-link" onClick={onNavigateToHome}>
              Home
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={onContinueShopping}>
              Plants
            </button>
          </li>
          <li>
            <button className="nav-link cart-link" onClick={() => {}}>
              Cart
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>
          </li>
        </ul>
      </nav>

      {/* Shopping cart content */}
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="cart-item-thumbnail"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-unit-price">
                      Unit Price: ${item.price.toFixed(2)}
                    </p>
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleDecrement(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleIncrement(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-item-total">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
              <div className="cart-actions">
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
                <button
                  className="continue-shopping-btn"
                  onClick={onContinueShopping}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;