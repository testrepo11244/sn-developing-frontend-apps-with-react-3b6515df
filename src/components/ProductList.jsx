import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/CartSlice';

const categories = [
  {
    name: 'Succulents',
    plants: [
      { id: 1, name: 'Aloe Vera', price: 10.99, thumbnail: 'https://via.placeholder.com/150?text=Aloe+Vera' },
      { id: 2, name: 'Echeveria', price: 8.99, thumbnail: 'https://via.placeholder.com/150?text=Echeveria' },
      { id: 3, name: 'Haworthia', price: 7.49, thumbnail: 'https://via.placeholder.com/150?text=Haworthia' },
      { id: 4, name: 'Jade Plant', price: 12.99, thumbnail: 'https://via.placeholder.com/150?text=Jade+Plant' },
      { id: 5, name: 'Sedum', price: 6.99, thumbnail: 'https://via.placeholder.com/150?text=Sedum' },
      { id: 6, name: 'Sempervivum', price: 9.49, thumbnail: 'https://via.placeholder.com/150?text=Sempervivum' },
    ],
  },
  {
    name: 'Flowering Plants',
    plants: [
      { id: 7, name: 'Orchid', price: 24.99, thumbnail: 'https://via.placeholder.com/150?text=Orchid' },
      { id: 8, name: 'Anthurium', price: 18.99, thumbnail: 'https://via.placeholder.com/150?text=Anthurium' },
      { id: 9, name: 'Peace Lily', price: 15.99, thumbnail: 'https://via.placeholder.com/150?text=Peace+Lily' },
      { id: 10, name: 'African Violet', price: 9.99, thumbnail: 'https://via.placeholder.com/150?text=African+Violet' },
      { id: 11, name: 'Bromeliad', price: 21.49, thumbnail: 'https://via.placeholder.com/150?text=Bromeliad' },
      { id: 12, name: 'Begonia', price: 13.99, thumbnail: 'https://via.placeholder.com/150?text=Begonia' },
    ],
  },
  {
    name: 'Foliage Plants',
    plants: [
      { id: 13, name: 'Monstera', price: 29.99, thumbnail: 'https://via.placeholder.com/150?text=Monstera' },
      { id: 14, name: 'Snake Plant', price: 19.99, thumbnail: 'https://via.placeholder.com/150?text=Snake+Plant' },
      { id: 15, name: 'ZZ Plant', price: 22.99, thumbnail: 'https://via.placeholder.com/150?text=ZZ+Plant' },
      { id: 16, name: 'Philodendron', price: 17.99, thumbnail: 'https://via.placeholder.com/150?text=Philodendron' },
      { id: 17, name: 'Pothos', price: 11.99, thumbnail: 'https://via.placeholder.com/150?text=Pothos' },
      { id: 18, name: 'Calathea', price: 25.99, thumbnail: 'https://via.placeholder.com/150?text=Calathea' },
    ],
  },
];

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Plants</Link></li>
        <li>
          <Link to="/cart">
            Cart <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isInCart = (plantId) => cartItems.some(item => item.id === plantId);

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <h2>Our Plants</h2>
      {categories.map((category, catIdx) => (
        <div key={catIdx} className="category">
          <h3>{category.name}</h3>
          <div className="plants-grid">
            {category.plants.map((plant) => (
              <div key={plant.id} className="plant-card">
                <img src={plant.thumbnail} alt={plant.name} className="plant-thumb" />
                <h4>{plant.name}</h4>
                <p>${plant.price.toFixed(2)}</p>
                <button
                  onClick={() => dispatch(addToCart(plant))}
                  disabled={isInCart(plant.id)}
                  className="add-to-cart-btn"
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
};

export default ProductList;