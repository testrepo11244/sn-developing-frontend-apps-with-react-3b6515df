import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page">
      <h1>Paradise Nursery</h1>
      <p>Your destination for beautiful hand‑picked houseplants</p>
      <button className="get-started-btn" onClick={onGetStarted}>
        Get Started
      </button>
    </div>
  );
}

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div>
      {!showProducts ? (
        <LandingPage onGetStarted={() => setShowProducts(true)} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<CartItem />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;