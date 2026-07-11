import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/CartSlice';
import { Link } from 'react-router-dom';

function CartItem() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [checkoutMsg, setCheckoutMsg] = useState('');

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const calculateTotalAmount = () =>
    items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleCheckout = () => {
    setCheckoutMsg('Coming Soon');
    setTimeout(() => setCheckoutMsg(''), 3000);
  };

  return (
    <div className="cart-page">
      <nav className="navbar">
        <Link to="/">Paradise Nursery</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">
          Cart <span className="cart-count">({totalItems})</span>
        </Link>
      </nav>

      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Unit Price: ${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                  </div>
                  <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
                  <button
                    className="delete-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Cart Total: ${calculateTotalAmount().toFixed(2)}</h3>
            {checkoutMsg && <p className="checkout-msg">{checkoutMsg}</p>}
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
            <Link to="/plants" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;