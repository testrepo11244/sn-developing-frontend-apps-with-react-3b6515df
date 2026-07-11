import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, removeItem } from '../features/cartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setShowCheckoutMessage(true);
    setTimeout(() => setShowCheckoutMessage(false), 3000);
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))}>
                      +
                    </button>
                  </div>
                  <p>Total: ${item.price * item.quantity}</p>
                  <button onClick={() => dispatch(removeItem(item.id))}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Total Amount: ${totalAmount}</p>
            <button onClick={handleCheckout}>Checkout</button>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
      {showCheckoutMessage && (
        <div className="checkout-message">Coming Soon</div>
      )}
    </div>
  );
};

export default CartItem;