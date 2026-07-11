import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing">
      <h1>Paradise Nursery</h1>
      <p>Your destination for lush houseplants</p>
      <button onClick={onGetStarted}>Get Started</button>
    </div>
  );
}

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStarted = () => setShowProducts(true);
  const handleShowLanding = () => setShowProducts(false);
  const handleShowCart = () => setShowCart(true);
  const handleContinueShopping = () => setShowCart(false);

  if (!showProducts) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="app-main">
      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <ProductList onShowCart={handleShowCart} onShowLanding={handleShowLanding} />
      )}
    </div>
  );
}

export default App;