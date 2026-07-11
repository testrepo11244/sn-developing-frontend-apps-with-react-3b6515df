import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/CartSlice'

const plantData = {
  'Air Purifying': [
    { id: 'ap1', name: 'Snake Plant', price: 15.99, thumbnail: 'https://via.placeholder.com/80?text=Snake+Plant' },
    { id: 'ap2', name: 'Peace Lily', price: 12.99, thumbnail: 'https://via.placeholder.com/80?text=Peace+Lily' },
    { id: 'ap3', name: 'Spider Plant', price: 9.99, thumbnail: 'https://via.placeholder.com/80?text=Spider+Plant' },
    { id: 'ap4', name: 'Aloe Vera', price: 11.99, thumbnail: 'https://via.placeholder.com/80?text=Aloe+Vera' },
    { id: 'ap5', name: 'Boston Fern', price: 14.99, thumbnail: 'https://via.placeholder.com/80?text=Boston+Fern' },
    { id: 'ap6', name: 'Rubber Plant', price: 18.99, thumbnail: 'https://via.placeholder.com/80?text=Rubber+Plant' },
  ],
  'Aromatic Fragrant': [
    { id: 'ar1', name: 'Lavender', price: 14.99, thumbnail: 'https://via.placeholder.com/80?text=Lavender' },
    { id: 'ar2', name: 'Rosemary', price: 10.99, thumbnail: 'https://via.placeholder.com/80?text=Rosemary' },
    { id: 'ar3', name: 'Mint', price: 8.99, thumbnail: 'https://via.placeholder.com/80?text=Mint' },
    { id: 'ar4', name: 'Jasmine', price: 16.99, thumbnail: 'https://via.placeholder.com/80?text=Jasmine' },
    { id: 'ar5', name: 'Eucalyptus', price: 19.99, thumbnail: 'https://via.placeholder.com/80?text=Eucalyptus' },
    { id: 'ar6', name: 'Gardenia', price: 22.99, thumbnail: 'https://via.placeholder.com/80?text=Gardenia' },
  ],
  'Succulents': [
    { id: 'su1', name: 'Echeveria', price: 7.99, thumbnail: 'https://via.placeholder.com/80?text=Echeveria' },
    { id: 'su2', name: 'Jade Plant', price: 9.99, thumbnail: 'https://via.placeholder.com/80?text=Jade+Plant' },
    { id: 'su3', name: 'Zebra Plant', price: 8.99, thumbnail: 'https://via.placeholder.com/80?text=Zebra+Plant' },
    { id: 'su4', name: 'Burros Tail', price: 11.99, thumbnail: 'https://via.placeholder.com/80?text=Burros+Tail' },
    { id: 'su5', name: 'Haworthia', price: 6.99, thumbnail: 'https://via.placeholder.com/80?text=Haworthia' },
    { id: 'su6', name: 'Lithops', price: 13.99, thumbnail: 'https://via.placeholder.com/80?text=Lithops' },
  ],
}

function ProductList({ onNavigate }) {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  // Track disabled state per plant id after adding
  const [addedItems, setAddedItems] = useState({})

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant))
    setAddedItems((prev) => ({ ...prev, [plant.id]: true }))
  }

  const isInCart = (plantId) => {
    // Check if plant is already in cart (optional additional check)
    return cart.items.some((item) => item.id === plantId)
  }

  const buttonDisabled = (plantId) => {
    // Disable if already added in current session (local state)
    return addedItems[plantId] || false
  }

  return (
    <div className="product-list-container">
      <h1>Our Plants</h1>
      {Object.entries(plantData).map(([category, plants]) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="plant-grid">
            {plants.map((plant) => (
              <div key={plant.id} className="plant-card">
                <img src={plant.thumbnail} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>${plant.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={buttonDisabled(plant.id)}
                >
                  {buttonDisabled(plant.id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList