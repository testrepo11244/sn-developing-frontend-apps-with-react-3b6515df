import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import ProductList from './components/ProductList'
import CartItem from './components/CartItem'
import Navbar from './components/Navbar'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="App">
      {currentPage !== 'landing' && (
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={() => handleNavigate('products')} />
      )}
      {currentPage === 'products' && (
        <ProductList onNavigate={handleNavigate} />
      )}
      {currentPage === 'cart' && (
        <CartItem onNavigate={handleNavigate} />
      )}
    </div>
  )
}

export default App