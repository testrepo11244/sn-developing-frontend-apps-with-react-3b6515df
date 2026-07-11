import { useDispatch, useSelector } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/CartSlice'
import { useState } from 'react'

function CartItem({ onNavigate }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const totalAmount = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  )
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const handleCheckout = () => {
    setCheckoutMessage('Coming Soon')
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.name} style={{ width: 80 }} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>
            <button onClick={handleCheckout}>Checkout</button>
            {checkoutMessage && <p>{checkoutMessage}</p>}
            <button onClick={() => onNavigate('products')}>Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItem