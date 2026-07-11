import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import './ProductList.css';

const plantsData = [
  {
    category: 'Air Purifying Plants',
    items: [
      { id: 1, name: 'Snake Plant', price: 15, thumbnail: 'https://picsum.photos/seed/snakeplant/200/200' },
      { id: 2, name: 'Spider Plant', price: 10, thumbnail: 'https://picsum.photos/seed/spiderplant/200/200' },
      { id: 3, name: 'Peace Lily', price: 20, thumbnail: 'https://picsum.photos/seed/peacelily/200/200' },
      { id: 4, name: 'Aloe Vera', price: 12, thumbnail: 'https://picsum.photos/seed/aloevera/200/200' },
      { id: 5, name: 'Bamboo Palm', price: 25, thumbnail: 'https://picsum.photos/seed/bamboopalm/200/200' },
      { id: 6, name: 'Dracaena', price: 18, thumbnail: 'https://picsum.photos/seed/dracaena/200/200' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    items: [
      { id: 7, name: 'Lavender', price: 8, thumbnail: 'https://picsum.photos/seed/lavender/200/200' },
      { id: 8, name: 'Rosemary', price: 9, thumbnail: 'https://picsum.photos/seed/rosemary/200/200' },
      { id: 9, name: 'Jasmine', price: 14, thumbnail: 'https://picsum.photos/seed/jasmine/200/200' },
      { id: 10, name: 'Mint', price: 6, thumbnail: 'https://picsum.photos/seed/mint/200/200' },
      { id: 11, name: 'Eucalyptus', price: 12, thumbnail: 'https://picsum.photos/seed/eucalyptus/200/200' },
      { id: 12, name: 'Lemon Balm', price: 7, thumbnail: 'https://picsum.photos/seed/lemonbalm/200/200' },
    ],
  },
  {
    category: 'Succulents',
    items: [
      { id: 13, name: 'Echeveria', price: 9, thumbnail: 'https://picsum.photos/seed/echeveria/200/200' },
      { id: 14, name: 'Haworthia', price: 11, thumbnail: 'https://picsum.photos/seed/haworthia/200/200' },
      { id: 15, name: 'Jade Plant', price: 13, thumbnail: 'https://picsum.photos/seed/jadeplant/200/200' },
      { id: 16, name: 'Aloe', price: 12, thumbnail: 'https://picsum.photos/seed/aloe/200/200' },
      { id: 17, name: 'Sedum', price: 8, thumbnail: 'https://picsum.photos/seed/sedum/200/200' },
      { id: 18, name: 'Crassula', price: 10, thumbnail: 'https://picsum.photos/seed/crassula/200/200' },
    ],
  },
];

function ProductList({ onNavigateToCart, onNavigateToHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (plantId) => cartItems.some((item) => item.id === plantId);

  const handleAddToCart = (plant) => {
    if (!isInCart(plant.id)) {
      dispatch(addToCart(plant));
    }
  };

  return (
    <div className="product-list-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Paradise Nursery</div>
        <ul className="navbar-links">
          <li>
            <button className="nav-link" onClick={onNavigateToHome}>
              Home
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => {}}>
              Plants
            </button>
          </li>
          <li>
            <button className="nav-link cart-link" onClick={onNavigateToCart}>
              Cart
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>
          </li>
        </ul>
      </nav>

      {/* Product listing */}
      <div className="product-container">
        {plantsData.map((category) => (
          <div key={category.category} className="category-section">
            <h2 className="category-title">{category.category}</h2>
            <div className="plant-grid">
              {category.items.map((plant) => (
                <div key={plant.id} className="plant-card">
                  <img
                    src={plant.thumbnail}
                    alt={plant.name}
                    className="plant-thumbnail"
                  />
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-price">${plant.price.toFixed(2)}</p>
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
    </div>
  );
}

export default ProductList;