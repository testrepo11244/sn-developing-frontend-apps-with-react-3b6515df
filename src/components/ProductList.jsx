import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/CartSlice';
import { BsCart3 } from 'react-icons/bs';

const categories = [
  {
    name: 'Indoor Plants',
    plants: [
      { id: 1, name: 'Snake Plant', price: 29.99, thumbnail: 'https://via.placeholder.com/150?text=Snake+Plant' },
      { id: 2, name: 'Spider Plant', price: 19.99, thumbnail: 'https://via.placeholder.com/150?text=Spider+Plant' },
      { id: 3, name: 'Peace Lily', price: 34.99, thumbnail: 'https://via.placeholder.com/150?text=Peace+Lily' },
      { id: 4, name: 'ZZ Plant', price: 39.99, thumbnail: 'https://via.placeholder.com/150?text=ZZ+Plant' },
      { id: 5, name: 'Pothos', price: 14.99, thumbnail: 'https://via.placeholder.com/150?text=Pothos' },
      { id: 6, name: 'Philodendron', price: 24.99, thumbnail: 'https://via.placeholder.com/150?text=Philodendron' },
    ],
  },
  {
    name: 'Succulents',
    plants: [
      { id: 7, name: 'Aloe Vera', price: 12.99, thumbnail: 'https://via.placeholder.com/150?text=Aloe+Vera' },
      { id: 8, name: 'Echeveria', price: 16.99, thumbnail: 'https://via.placeholder.com/150?text=Echeveria' },
      { id: 9, name: 'Jade Plant', price: 22.99, thumbnail: 'https://via.placeholder.com/150?text=Jade+Plant' },
      { id: 10, name: 'Haworthia', price: 13.99, thumbnail: 'https://via.placeholder.com/150?text=Haworthia' },
      { id: 11, name: 'Sedum', price: 15.99, thumbnail: 'https://via.placeholder.com/150?text=Sedum' },
      { id: 12, name: 'Agave', price: 28.99, thumbnail: 'https://via.placeholder.com/150?text=Agave' },
    ],
  },
  {
    name: 'Flowering Plants',
    plants: [
      { id: 13, name: 'Orchid', price: 44.99, thumbnail: 'https://via.placeholder.com/150?text=Orchid' },
      { id: 14, name: 'Anthurium', price: 32.99, thumbnail: 'https://via.placeholder.com/150?text=Anthurium' },
      { id: 15, name: 'Bromeliad', price: 37.99, thumbnail: 'https://via.placeholder.com/150?text=Bromeliad' },
      { id: 16, name: 'African Violet', price: 18.99, thumbnail: 'https://via.placeholder.com/150?text=African+Violet' },
      { id: 17, name: 'Kalanchoe', price: 21.99, thumbnail: 'https://via.placeholder.com/150?text=Kalanchoe' },
      { id: 18, name: 'Cyclamen', price: 27.99, thumbnail: 'https://via.placeholder.com/150?text=Cyclamen' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addToCart({ id: plant.id, name: plant.name, price: plant.price, thumbnail: plant.thumbnail }));
  };

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Plants</Link>
        <Link to="/cart" className="nav-link cart-icon-link">
          <BsCart3 size={24} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </nav>
      <h1>Our Plants</h1>
      {categories.map((category) => (
        <div key={category.name} className="category-section">
          <h2>{category.name}</h2>
          <div className="plant-grid">
            {category.plants.map((plant) => {
              const isInCart = cartItems.some((item) => item.id === plant.id);
              return (
                <div key={plant.id} className="plant-card">
                  <img src={plant.thumbnail} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={isInCart}
                    className="add-to-cart-btn"
                  >
                    {isInCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;