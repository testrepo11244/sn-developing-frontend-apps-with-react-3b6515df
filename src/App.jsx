import React, { useState } from 'react';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Your go‑to destination for houseplants</p>
        <button className="get-started-btn" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStartedClick = () => {
    setShowProducts(true);
    setShowCart(false);
  };

  const goToCart = () => {
    setShowProducts(false);
    setShowCart(true);
  };

  const goToProducts = () => {
    setShowProducts(true);
    setShowCart(false);
  };

  const goHome = () => {
    setShowProducts(false);
    setShowCart(false);
  };

  return (
    <div className="App">
      {!showProducts && !showCart && (
        <LandingPage onGetStarted={handleGetStartedClick} />
      )}
      {showProducts && (
        <ProductList
          onNavigateToCart={goToCart}
          onNavigateToHome={goHome}
        />
      )}
      {showCart && (
        <CartItem
          onContinueShopping={goToProducts}
          onNavigateToHome={goHome}
        />
      )}
    </div>
  );
}

export default App;