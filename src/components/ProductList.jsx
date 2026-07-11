import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addItem } from '../features/cartSlice';

// ---------- Navbar component (shared with CartItem) ----------
export const Navbar = () => {
  const location = useLocation();
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Plants
        </Link>
        <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
          Cart
        </Link>
      </div>
      <div className="cart-icon">
        <span role="img" aria-label="cart">🛒</span>
        <span className="cart-count">{totalItems}</span>
      </div>
    </nav>
  );
};

// ---------- Product data ----------
const productCategories = [
  {
    name: 'Succulents',
    plants: [
      { id: 's1', name: 'Aloe Vera', price: 12.99, thumbnail: 'https://example.com/aloe.jpg' },
      { id: 's2', name: 'Echeveria', price: 9.99, thumbnail: 'https://example.com/echeveria.jpg' },
      { id: 's3', name: 'Haworthia', price: 11.49, thumbnail: 'https://example.com/haworthia.jpg' },
      { id: 's4', name: 'Jade Plant', price: 13.99, thumbnail: 'https://example.com/jade.jpg' },
      { id: 's5', name: 'Sedum', price: 8.99, thumbnail: 'https://example.com/sedum.jpg' },
      { id: 's6', name: 'Cactus', price: 10.99, thumbnail: 'https://example.com/cactus.jpg' },
    ],
  },
  {
    name: 'Foliage Plants',
    plants: [
      { id: 'f1', name: 'Monstera', price: 24.99, thumbnail: 'https://example.com/monstera.jpg' },
      { id: 'f2', name: 'Fiddle Leaf Fig', price: 29.99, thumbnail: 'https://example.com/fiddle.jpg' },
      { id: 'f3', name: 'Snake Plant', price: 19.99, thumbnail: 'https://example.com/snake.jpg' },
      { id: 'f4', name: 'ZZ Plant', price: 17.99, thumbnail: 'https://example.com/zz.jpg' },
      { id: 'f5', name: 'Pothos', price: 13.99, thumbnail: 'https://example.com/pothos.jpg' },
      { id: 'f6', name: 'Philodendron', price: 15.99, thumbnail: 'https://example.com/philodendron.jpg' },
    ],
  },
  {
    name: 'Flowering Plants',
    plants: [
      { id: 'fl1', name: 'Orchid', price: 34.99, thumbnail: 'https://example.com/orchid.jpg' },
      { id: 'fl2', name: 'Peace Lily', price: 22.99, thumbnail: 'https://example.com/peace-lily.jpg' },
      { id: 'fl3', name: 'Anthurium', price: 26.99, thumbnail: 'https://example.com/anthurium.jpg' },
      { id: 'fl4', name: 'African Violet', price: 14.99, thumbnail: 'https://example.com/african-violet.jpg' },
      { id: 'fl5', name: 'Begonia', price: 18.99, thumbnail: 'https://example.com/begonia.jpg' },
      { id: 'fl6', name: 'Kalanchoe', price: 16.99, thumbnail: 'https://example.com/kalanchoe.jpg' },
    ],
  },
];

// ---------- ProductList component ----------
const ProductList = () => {
  const dispatch = useDispatch();
  const [addedIds, setAddedIds] = useState([]);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedIds((prev) => [...prev, plant.id]);
  };

  return (
    <div className="product-list-page">
      <Navbar />
      <div className="categories">
        {productCategories.map((category) => (
          <section key={category.name} className="category-section">
            <h2>{category.name}</h2>
            <div className="plants-grid">
              {category.plants.map((plant) => (
                <div key={plant.id} className="plant-card">
                  <img src={plant.thumbnail} alt={plant.name} className="plant-thumbnail" />
                  <h3>{plant.name}</h3>
                  <p className="price">${plant.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedIds.includes(plant.id)}
                  >
                    {addedIds.includes(plant.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ProductList;