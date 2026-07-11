import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../store/CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (id) => dispatch(increaseQuantity(id));
  const handleDecrease = (id) => dispatch(decreaseQuantity(id));
  const handleDelete = (id) => dispatch(removeItem(id));
  const handleCheckout = () => alert('Coming Soon');

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
        <button onClick={onContinueShopping}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.thumbnail} alt={item.name} className="cart-thumbnail" />
          <div className="cart-item-details">
            <span className="item-name">{item.name}</span>
            <span className="unit-price">${item.price.toFixed(2)}</span>
            <div className="quantity-controls">
              <button onClick={() => handleDecrease(item.id)} disabled={item.quantity === 1}>-</button>
              <span className="quantity">{item.quantity}</span>
              <button onClick={() => handleIncrease(item.id)}>+</button>
            </div>
            <span className="item-total">${ (item.price * item.quantity).toFixed(2) }</span>
          </div>
          <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
      <div className="cart-summary">
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
        <button className="checkout-button" onClick={handleCheckout}>Checkout - Coming Soon</button>
        <button className="continue-shopping" onClick={onContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default CartItem;