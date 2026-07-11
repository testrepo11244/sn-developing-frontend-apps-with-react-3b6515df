import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { Link } from 'react-router-dom';

function Navbar() {
  const items = useSelector(state => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f5f5f5' }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/" style={{ marginRight: '1rem' }}>Plants</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <div>
        <span>🛒</span>
        <span style={{ marginLeft: '0.5rem', fontWeight: 'bold' }}>{totalQuantity}</span>
      </div>
    </nav>
  );
}

const plantCategories = [
  {
    name: 'Air Purifying',
    plants: [
      { id: 1, name: 'Snake Plant', price: 19.99, thumbnail: 'https://placehold.co/150?text=Snake+Plant' },
      { id: 2, name: 'Peace Lily', price: 24.99, thumbnail: 'https://placehold.co/150?text=Peace+Lily' },
      { id: 3, name: 'Spider Plant', price: 14.99, thumbnail: 'https://placehold.co/150?text=Spider+Plant' },
      { id: 4, name: 'Aloe Vera', price: 12.99, thumbnail: 'https://placehold.co/150?text=Aloe+Vera' },
      { id: 5, name: 'Boston Fern', price: 22.99, thumbnail: 'https://placehold.co/150?text=Boston+Fern' },
      { id: 6, name: 'Bamboo Palm', price: 29.99, thumbnail: 'https://placehold.co/150?text=Bamboo+Palm' }
    ]
  },
  {
    name: 'Succulents',
    plants: [
      { id: 7, name: 'Echeveria', price: 9.99, thumbnail: 'https://placehold.co/150?text=Echeveria' },
      { id: 8, name: 'Jade Plant', price: 15.99, thumbnail: 'https://placehold.co/150?text=Jade+Plant' },
      { id: 9, name: 'Haworthia', price: 8.99, thumbnail: 'https://placehold.co/150?text=Haworthia' },
      { id: 10, name: 'Sedum', price: 11.99, thumbnail: 'https://placehold.co/150?text=Sedum' },
      { id: 11, name: 'Agave', price: 18.99, thumbnail: 'https://placehold.co/150?text=Agave' },
      { id: 12, name: 'Lithops', price: 13.99, thumbnail: 'https://placehold.co/150?text=Lithops' }
    ]
  },
  {
    name: 'Flowering',
    plants: [
      { id: 13, name: 'Orchid', price: 34.99, thumbnail: 'https://placehold.co/150?text=Orchid' },
      { id: 14, name: 'African Violet', price: 12.99, thumbnail: 'https://placehold.co/150?text=African+Violet' },
      { id: 15, name: 'Anthurium', price: 27.99, thumbnail: 'https://placehold.co/150?text=Anthurium' },
      { id: 16, name: 'Christmas Cactus', price: 19.99, thumbnail: 'https://placehold.co/150?text=Christmas+Cactus' },
      { id: 17, name: 'Kalanchoe', price: 10.99, thumbnail: 'https://placehold.co/150?text=Kalanchoe' },
      { id: 18, name: 'Gloxinia', price: 16.99, thumbnail: 'https://placehold.co/150?text=Gloxinia' }
    ]
  }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (plantId) => cartItems.some(item => item.id === plantId);

  return (
    <div>
      <Navbar />
      <h2>Houseplants</h2>
      {plantCategories.map((category, idx) => (
        <div key={idx} style={{ marginBottom: '2rem' }}>
          <h3>{category.name}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {category.plants.map(plant => (
              <div key={plant.id} className="plant-card" style={{ border: '1px solid #ddd', padding: '1rem', width: '150px', textAlign: 'center' }}>
                <img src={plant.thumbnail} alt={plant.name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                <p style={{ fontWeight: 'bold' }}>{plant.name}</p>
                <p>${plant.price.toFixed(2)}</p>
                <button
                  onClick={() => dispatch(addItem({ id: plant.id, name: plant.name, price: plant.price, thumbnail: plant.thumbnail, quantity: 1 }))}
                  disabled={isInCart(plant.id)}
                  style={{ padding: '0.5rem', backgroundColor: isInCart(plant.id) ? '#ccc' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: isInCart(plant.id) ? 'not-allowed' : 'pointer' }}
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