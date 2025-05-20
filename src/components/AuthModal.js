import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from './NotificationContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const { login, signup } = useAuth();
  const { addNotification } = useNotification();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mode === 'login') {
      // Simple validation
      if (!formData.email || !formData.password) {
        addNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Simulate login
      login({ email: formData.email, name: formData.email.split('@')[0] });
      addNotification('Successfully logged in', 'success');
      onClose();
    } else {
      // Simple validation for signup
      if (!formData.name || !formData.email || !formData.password) {
        addNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Simulate signup
      signup({ email: formData.email, name: formData.name });
      addNotification('Account created successfully', 'success');
      onClose();
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={onClose}>×</button>
        
        <h2>{mode === 'login' ? 'Login' : 'Create Account'}</h2>
        
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="auth-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          
          <div className="auth-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button type="submit" className="auth-submit-btn">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-modal-footer">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button className="auth-toggle-btn" onClick={toggleMode}>
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button className="auth-toggle-btn" onClick={toggleMode}>
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 