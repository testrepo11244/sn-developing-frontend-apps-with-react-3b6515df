import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cartSlice';

const products = [
  // Air Purifying (6 plants)
  { id: 1, name: 'Snake Plant', price: 25, thumbnail: '/images/snake-plant.jpg', category: 'Air Purifying' },
  { id: 2, name: 'Spider Plant', price: 20, thumbnail: '/images/spider-plant.jpg', category: 'Air Purifying' },
  { id: 3, name: 'Peace Lily', price: 30, thumbnail: '/images/peace-lily.jpg', category: 'Air Purifying' },
  { id: 4, name: 'Aloe Vera', price: 18, thumbnail: '/images/aloe-vera.jpg', category: 'Air Purifying' },
  { id: 5, name: 'Bamboo Palm', price: 35, thumbnail: '/images/bamboo-palm.jpg', category: 'Air Purifying' },
  { id: 6, name: 'Boston Fern', price: 28, thumbnail: '/images/boston-fern.jpg', category: 'Air Purifying' },
  // Low Light (6 plants)
  { id: 7, name: 'ZZ Plant', price: 32, thumbnail: '/images/zz-plant.jpg', category: 'Low Light' },
  { id: 8, name: 'Cast Iron Plant', price: 40, thumbnail: '/images/cast-iron-plant.jpg', category: 'Low Light' },
  { id: 9, name: 'Parlor Palm', price: 22, thumbnail: '/images/parlor-palm.jpg', category: 'Low Light' },
  { id: 10, name: 'Pothos', price: 15, thumbnail: '/images/pothos.jpg', category: 'Low Light' },
  { id: 11, name: 'Dracaena', price: 27, thumbnail: '/images/dracaena.jpg', category: 'Low Light' },
  { id: 12, name: 'Philodendron', price: 19, thumbnail: '/images/philodendron.jpg', category: 'Low Light' },
  // Flowering (6 plants)
  { id: 13, name: 'Orchid', price: 45, thumbnail: '/images/orchid.jpg', category: 'Flowering' },
  { id: 14, name: 'African Violet', price: 14, thumbnail: '/images/african-violet.jpg', category: 'Flowering' },
  { id: 15, name: 'Anthurium', price: 38, thumbnail: '/images/anthurium.jpg', category: 'Flowering' },
  { id: 16, name: 'Bromeliad', price: 42, thumbnail: '/images/bromeliad.jpg', category: 'Flowering' },
  { id: 17, name: 'Kalanchoe', price: 16, thumbnail: '/images/kalanchoe.jpg', category: 'Flowering' },
  { id: 18, name: 'Gloxinia', price: 36, thumbnail: '/images/gloxinia.jpg', category: 'Flowering' },
];

const categories = ['Air Purifying', 'Low Light', 'Flowering'];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (productId) => cartItems.some(item => item.id === productId);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="product-list">
      {categories.map(category => (
        <section key={category}>
          <h2>{category}</h2>
          <div className="product-grid">
            {products
              .filter(p => p.category === category)
              .map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.thumbnail} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={isInCart(product.id)}
                  >
                    {isInCart(product.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductList;