import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/products');
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Paradise Nursery</h1>
      <p>Your one-stop destination for beautiful houseplants</p>
      <button onClick={handleGetStarted} className="get-started-btn">
        Get Started
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;