import React, { useState } from 'react';
import ProductList from './components/ProductList';
import './App.css';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing">
      <h1>Paradise Nursery</h1>
      <p>Bringing nature indoors</p>
      <button className="get-started-btn" onClick={onGetStarted}>
        Get Started
      </button>
    </div>
  );
}

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStartedClick = () => {
    setShowProducts(true);
  };

  return (
    <div className="App">
      {!showProducts ? (
        <LandingPage onGetStarted={handleGetStartedClick} />
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;