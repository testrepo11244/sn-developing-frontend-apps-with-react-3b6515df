import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Snake Plant', price: 15.99, thumbnail: 'https://via.placeholder.com/150?text=Snake+Plant' },
      { id: 2, name: 'Spider Plant', price: 12.49, thumbnail: 'https://via.placeholder.com/150?text=Spider+Plant' },
      { id: 3, name: 'Peace Lily', price: 18.99, thumbnail: 'https://via.placeholder.com/150?text=Peace+Lily' },
      { id: 4, name: 'Aloe Vera', price: 10.99, thumbnail: 'https://via.placeholder.com/150?text=Aloe+Vera' },
      { id: 5, name: 'Bamboo Palm', price: 22.99, thumbnail: 'https://via.placeholder.com/150?text=Bamboo+Palm' },
      { id: 6, name: 'Boston Fern', price: 14.99, thumbnail: 'https://via.placeholder.com/150?text=Boston+Fern' },
    ],
  },
  {
    name: 'Flowering Plants',
    plants: [
      { id: 7, name: 'Orchid', price: 25.99, thumbnail: 'https://via.placeholder.com/150?text=Orchid' },
      { id: 8, name: 'African Violet', price: 9.99, thumbnail: 'https://via.placeholder.com/150?text=African+Violet' },
      { id: 9, name: 'Anthurium', price: 19.99, thumbnail: 'https://via.placeholder.com/150?text=Anthurium' },
      { id: 10, name: 'Bromeliad', price: 15.99, thumbnail: 'https://via.placeholder.com/150?text=Bromeliad' },
      { id: 11, name: 'Kalanchoe', price: 11.49, thumbnail: 'https://via.placeholder.com/150?text=Kalanchoe' },
      { id: 12, name: 'Gerbera Daisy', price: 13.99, thumbnail: 'https://via.placeholder.com/150?text=Gerbera+Daisy' },
    ],
  },
  {
    name: 'Succulents & Cacti',
    plants: [
      { id: 13, name: 'Echeveria', price: 8.99, thumbnail: 'https://via.placeholder.com/150?text=Echeveria' },
      { id: 14, name: 'Jade Plant', price: 12.99, thumbnail: 'https://via.placeholder.com/150?text=Jade+Plant' },
      { id: 15, name: 'Cactus', price: 7.99, thumbnail: 'https://via.placeholder.com/150?text=Cactus' },
      { id: 16, name: 'Haworthia', price: 9.49, thumbnail: 'https://via.placeholder.com/150?text=Haworthia' },
      { id: 17, name: 'Aloe Aristata', price: 11.99, thumbnail: 'https://via.placeholder.com/150?text=Aloe+Aristata' },
      { id: 18, name: 'Sedum', price: 6.99, thumbnail: 'https://via.placeholder.com/150?text=Sedum' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
  };

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <Link to="/">Paradise Nursery</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">
          Cart <span className="cart-count">({totalItems})</span>
        </Link>
      </nav>

      <h2>Our Plants</h2>
      {categories.map((category) => (
        <div className="category" key={category.name}>
          <h3>{category.name}</h3>
          <div className="plants-grid">
            {category.plants.map((plant) => {
              const isAdded = items.some((item) => item.id === plant.id);
              return (
                <div className="plant-card" key={plant.id}>
                  <img src={plant.thumbnail} alt={plant.name} />
                  <h4>{plant.name}</h4>
                  <p>${plant.price}</p>
                  <button
                    className="add-to-cart-btn"
                    disabled={isAdded}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isAdded ? 'Added' : 'Add to Cart'}
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