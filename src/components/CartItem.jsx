import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from '../store/cartSlice';
import { Link } from 'react-router-dom';

function Navbar() {
  const items = useSelector(state => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f5f5f5' }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/" style={{ marginRight: '1rem' }}>Plants</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <div>
        <span>🛒</span>
        <span style={{ marginLeft: '0.5rem', fontWeight: 'bold' }}>{totalQuantity}</span>
      </div>
    </nav>
  );
}

export default function CartItem() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div>
      <Navbar />
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/" style={{ padding: '0.5rem', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '1rem' }}>
                <img src={item.thumbnail} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '1rem' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 'bold' }}>{item.name}</p>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                </div>
                <div>
                  <button onClick={() => dispatch(decreaseQuantity(item.id))} disabled={item.quantity <= 1} style={{ marginRight: '0.5rem' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))} style={{ marginLeft: '0.5rem' }}>+</button>
                </div>
                <div style={{ marginLeft: '1rem', fontWeight: 'bold' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button onClick={() => dispatch(removeItem(item.id))} style={{ marginLeft: '1rem', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <h3>Total Amount: ${totalAmount}</h3>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/" style={{ padding: '0.75rem', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Continue Shopping</Link>
            <button onClick={handleCheckout} style={{ padding: '0.75rem', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}