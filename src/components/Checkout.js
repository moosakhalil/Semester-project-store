import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from './NotificationContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: ''
  });

  const shipping = 9.99;
  const total = cartTotal + shipping;

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
      if (formatted.length <= 19) {
        setFormData(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    // Format expiry date
    if (name === 'cardExpiry') {
      const expiry = value.replace(/\D/g, '');
      if (expiry.length <= 4) {
        const formatted = expiry.match(/.{1,2}/g)?.join('/') || expiry;
        setFormData(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    // Format CVC
    if (name === 'cardCVC') {
      const cvc = value.replace(/\D/g, '');
      if (cvc.length <= 3) {
        setFormData(prev => ({ ...prev, [name]: cvc }));
      }
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'address', 'city', 'postalCode', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      addNotification('Please fill in all required fields', 'error');
      return false;
    }

    if (formData.paymentMethod === 'credit') {
      const cardFields = ['cardNumber', 'cardExpiry', 'cardCVC', 'cardName'];
      const missingCardFields = cardFields.filter(field => !formData[field]);
      
      if (missingCardFields.length > 0) {
        addNotification('Please fill in all card details', 'error');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setProcessing(true);
    addNotification('Processing your payment...', 'info');
    
    try {
      // Here you would integrate with your payment processor
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate payment processing

      // Clear cart and redirect on success
      clearCart();
      addNotification('Order placed successfully!', 'success');
      navigate('/order-confirmation');
    } catch (error) {
      addNotification('Payment failed. Please try again.', 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <h1>Your cart is empty</h1>
          <button onClick={() => navigate('/')} className="checkout-button">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          {/* Order Summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id + '-' + item.type} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p className="cart-item-price">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>€{shipping.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="checkout-form">
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Shipping Information</h3>
                <div className="form-row">
              <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                      disabled={processing}
                />
              </div>
              <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                      disabled={processing}
                />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    disabled={processing}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      disabled={processing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      disabled={processing}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    disabled={processing}
                  >
                    <option value="">Select a country</option>
                    <option value="ES">Spain</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="IT">Italy</option>
                    <option value="UK">United Kingdom</option>
                    <option value="PT">Portugal</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Method</h3>
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                    <span>Credit Card</span>
                  </label>
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                    <span>PayPal</span>
                  </label>
                </div>

                {formData.paymentMethod === 'credit' && (
                  <div className="credit-card-form">
                    <div className="form-group">
                      <label htmlFor="cardName">Name on Card *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        disabled={processing}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        disabled={processing}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cardExpiry">Expiry Date *</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                          disabled={processing}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cardCVC">CVC *</label>
                        <input
                          type="text"
                          id="cardCVC"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          disabled={processing}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="checkout-button"
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay €${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 