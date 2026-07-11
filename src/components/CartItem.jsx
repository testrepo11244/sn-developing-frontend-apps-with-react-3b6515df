import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, incrementQuantity, decrementQuantity } from '../redux/CartSlice';
import { BsCart3 } from 'react-icons/bs';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    alert('Coming Soon!');
  };

  return (
    <div className="cart-page">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Plants</Link>
        <Link to="/cart" className="nav-link cart-icon-link">
          <BsCart3 size={24} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </nav>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.name} className="cart-item-thumbnail" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => dispatch(decrementQuantity(item.id))} disabled={item.quantity <= 1}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                  <button className="delete-btn" onClick={() => dispatch(removeItem(item.id))}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
            <div className="cart-footer-actions">
              <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
              <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;