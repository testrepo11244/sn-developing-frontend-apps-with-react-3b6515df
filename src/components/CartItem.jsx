import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/CartSlice';
import { Link } from 'react-router-dom';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    alert('Coming Soon!');
  };

  const handleIncrease = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrease = (id, quantity) => {
    if (quantity === 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(decrementQuantity(id));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-container">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Plants</Link>
        <Link to="/cart" className="nav-link cart-link">
          Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
      </nav>

      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.name} className="cart-item-thumbnail" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(item.id, item.quantity)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                </div>
                <p>Total: ${item.price * item.quantity}</p>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total Amount: ${calculateTotalAmount()}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;