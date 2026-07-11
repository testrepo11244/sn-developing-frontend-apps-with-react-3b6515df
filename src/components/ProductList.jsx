import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { Link } from 'react-router-dom';

const productData = [
  {
    category: 'Indoor Plants',
    plants: [
      { id: 'indoor1', name: 'Peace Lily', price: 25, thumbnail: '/images/indoor/peace-lily.jpg' },
      { id: 'indoor2', name: 'Snake Plant', price: 30, thumbnail: '/images/indoor/snake-plant.jpg' },
      { id: 'indoor3', name: 'Spider Plant', price: 15, thumbnail: '/images/indoor/spider-plant.jpg' },
      { id: 'indoor4', name: 'Fiddle Leaf Fig', price: 45, thumbnail: '/images/indoor/fiddle-leaf.jpg' },
      { id: 'indoor5', name: 'Monstera', price: 40, thumbnail: '/images/indoor/monstera.jpg' },
      { id: 'indoor6', name: 'Pothos', price: 20, thumbnail: '/images/indoor/pothos.jpg' },
    ],
  },
  {
    category: 'Outdoor Plants',
    plants: [
      { id: 'outdoor1', name: 'Rose Bush', price: 35, thumbnail: '/images/outdoor/rose.jpg' },
      { id: 'outdoor2', name: 'Lavender', price: 18, thumbnail: '/images/outdoor/lavender.jpg' },
      { id: 'outdoor3', name: 'Hibiscus', price: 28, thumbnail: '/images/outdoor/hibiscus.jpg' },
      { id: 'outdoor4', name: 'Bougainvillea', price: 32, thumbnail: '/images/outdoor/bougainvillea.jpg' },
      { id: 'outdoor5', name: 'Jasmine', price: 22, thumbnail: '/images/outdoor/jasmine.jpg' },
      { id: 'outdoor6', name: 'Marigold', price: 12, thumbnail: '/images/outdoor/marigold.jpg' },
    ],
  },
  {
    category: 'Succulents & Cacti',
    plants: [
      { id: 'succ1', name: 'Aloe Vera', price: 20, thumbnail: '/images/succulents/aloe.jpg' },
      { id: 'succ2', name: 'Echeveria', price: 15, thumbnail: '/images/succulents/echeveria.jpg' },
      { id: 'succ3', name: 'Barrel Cactus', price: 25, thumbnail: '/images/succulents/barrel.jpg' },
      { id: 'succ4', name: 'Jade Plant', price: 18, thumbnail: '/images/succulents/jade.jpg' },
      { id: 'succ5', name: 'Haworthia', price: 12, thumbnail: '/images/succulents/haworthia.jpg' },
      { id: 'succ6', name: 'Prickly Pear', price: 30, thumbnail: '/images/succulents/prickly-pear.jpg' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const handleAddToCart = (plant) => {
    if (!isInCart(plant.id)) {
      dispatch(addToCart({ id: plant.id, name: plant.name, price: plant.price, thumbnail: plant.thumbnail, quantity: 1 }));
    }
  };

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Plants</Link>
        <Link to="/cart" className="nav-link cart-link">
          Cart ({totalItemsInCart})
        </Link>
      </nav>

      <h1>Our Plants</h1>
      {productData.map((categoryGroup) => (
        <div key={categoryGroup.category} className="category-section">
          <h2>{categoryGroup.category}</h2>
          <div className="plants-grid">
            {categoryGroup.plants.map((plant) => (
              <div key={plant.id} className="plant-card">
                <img src={plant.thumbnail} alt={plant.name} className="plant-thumbnail" />
                <h3>{plant.name}</h3>
                <p className="plant-price">${plant.price}</p>
                <button
                  className="add-to-cart-btn"
                  disabled={isInCart(plant.id)}
                  onClick={() => handleAddToCart(plant)}
                >
                  {isInCart(plant.id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;