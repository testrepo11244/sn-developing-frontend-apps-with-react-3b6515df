import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/CartSlice';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Plants</Link></li>
        <li>
          <Link to="/cart">
            Cart <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.name} className="cart-thumb" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(decrementQuantity(item.id))} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                  </div>
                  <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
                  <button className="delete-btn" onClick={() => dispatch(removeFromCart(item.id))}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Amount: ${totalAmount}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            <Link to="/products"><button className="continue-shopping-btn">Continue Shopping</button></Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;