import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../store/CartSlice';

const categories = [
  {
    name: 'Indoor Plants',
    plants: [
      { id: 1, name: 'Snake Plant', price: 15.99, thumbnail: 'https://via.placeholder.com/150?text=Snake+Plant' },
      { id: 2, name: 'Spider Plant', price: 12.99, thumbnail: 'https://via.placeholder.com/150?text=Spider+Plant' },
      { id: 3, name: 'Peace Lily', price: 18.99, thumbnail: 'https://via.placeholder.com/150?text=Peace+Lily' },
      { id: 4, name: 'Philodendron', price: 14.99, thumbnail: 'https://via.placeholder.com/150?text=Philodendron' },
      { id: 5, name: 'ZZ Plant', price: 19.99, thumbnail: 'https://via.placeholder.com/150?text=ZZ+Plant' },
      { id: 6, name: 'Pothos', price: 10.99, thumbnail: 'https://via.placeholder.com/150?text=Pothos' }
    ]
  },
  {
    name: 'Succulents',
    plants: [
      { id: 7, name: 'Echeveria', price: 8.99, thumbnail: 'https://via.placeholder.com/150?text=Echeveria' },
      { id: 8, name: 'Jade Plant', price: 11.99, thumbnail: 'https://via.placeholder.com/150?text=Jade+Plant' },
      { id: 9, name: 'Aloe Vera', price: 9.99, thumbnail: 'https://via.placeholder.com/150?text=Aloe+Vera' },
      { id: 10, name: 'Haworthia', price: 7.99, thumbnail: 'https://via.placeholder.com/150?text=Haworthia' },
      { id: 11, name: 'Sedum', price: 6.99, thumbnail: 'https://via.placeholder.com/150?text=Sedum' },
      { id: 12, name: "Burro's Tail", price: 10.49, thumbnail: 'https://via.placeholder.com/150?text=Burros+Tail' }
    ]
  },
  {
    name: 'Flowering Plants',
    plants: [
      { id: 13, name: 'Orchid', price: 24.99, thumbnail: 'https://via.placeholder.com/150?text=Orchid' },
      { id: 14, name: 'African Violet', price: 12.99, thumbnail: 'https://via.placeholder.com/150?text=African+Violet' },
      { id: 15, name: 'Anthurium', price: 22.99, thumbnail: 'https://via.placeholder.com/150?text=Anthurium' },
      { id: 16, name: 'Begonia', price: 16.99, thumbnail: 'https://via.placeholder.com/150?text=Begonia' },
      { id: 17, name: 'Kalanchoe', price: 13.99, thumbnail: 'https://via.placeholder.com/150?text=Kalanchoe' },
      { id: 18, name: 'Bromeliad', price: 20.99, thumbnail: 'https://via.placeholder.com/150?text=Bromeliad' }
    ]
  }
];

function ProductList({ onShowCart, onShowLanding }) {
  const dispatch = useDispatch();
  const totalItems = useSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [addedIds, setAddedIds] = useState(new Set());

  const handleAddToCart = (plant) => {
    dispatch(addItem({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      thumbnail: plant.thumbnail
    }));
    setAddedIds(prev => new Set(prev).add(plant.id));
  };

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <a href="#" onClick={(e) => { e.preventDefault(); onShowLanding(); }}>Home</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Plants</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onShowCart(); }}>
          Cart <span className="cart-icon">&#128722; {totalItems}</span>
        </a>
      </nav>
      <h2>Our Plants</h2>
      {categories.map(category => (
        <div key={category.name} className="category-section">
          <h3>{category.name}</h3>
          <div className="plants-grid">
            {category.plants.map(plant => (
              <div key={plant.id} className="plant-card">
                <img src={plant.thumbnail} alt={plant.name} />
                <h4>{plant.name}</h4>
                <p>${plant.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedIds.has(plant.id)}
                >
                  {addedIds.has(plant.id) ? 'Added' : 'Add to Cart'}
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