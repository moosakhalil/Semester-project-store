import React from 'react';
import './Cart.css';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationContext';
import { useAuth } from '../context/AuthContext';

const Cart = ({ open, onClose }) => {
  const { cart, removeFromCart, clearCart, cartTotal, incrementQuantity, decrementQuantity } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  if (!open) return null;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      addNotification('Please login to proceed with checkout', 'info');
      onClose();
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    onClose();
    navigate('/checkout');
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.type);
    addNotification(`${item.name} removed from cart`, 'error');
  };

  const handleClearCart = () => {
    clearCart();
    addNotification('Cart has been cleared', 'info');
  };

  const handleQuantityChange = (item, increment) => {
    if (increment) {
      incrementQuantity(item.id, item.type);
      addNotification(`Added another ${item.name} to cart`, 'success');
    } else {
      if (item.quantity > 1) {
        decrementQuantity(item.id, item.type);
        addNotification(`Removed one ${item.name} from cart`, 'info');
      } else {
        handleRemoveItem(item);
      }
    }
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
        <button className="cart-close-btn" onClick={onClose}>×</button>
        <h2 className="cart-title">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="cart-empty">Your cart is empty.</div>
        ) : (
          <>
            <ul className="cart-items-list">
              {cart.map(item => (
                <li key={item.id + '-' + item.type} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-qty">
                      <button 
                        className="cart-qty-btn"
                        onClick={() => handleQuantityChange(item, false)}
                      >-</button>
                      <span>Qty: {item.quantity}</span>
                      <button 
                        className="cart-qty-btn"
                        onClick={() => handleQuantityChange(item, true)}
                      >+</button>
                    </div>
                    <div className="cart-item-price">€{item.price}</div>
                  </div>
                  <button 
                    className="cart-remove-btn" 
                    onClick={() => handleRemoveItem(item)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="cart-total">
              Total: €{cartTotal.toFixed(2)}
            </div>

            <button className="cart-clear-btn" onClick={handleClearCart}>
              Clear Cart
            </button>

            <button 
              className="cart-checkout-btn" 
              onClick={handleCheckout}
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 