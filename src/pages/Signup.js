import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../components/NotificationContext';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      addNotification('Successfully signed in with Google', 'success');
      navigate('/');
    } catch (error) {
      let errorMessage = 'Failed to sign in with Google';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in popup was closed before completing';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Sign-in popup was blocked by the browser';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Another sign-in popup is already open';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with the same email but different sign-in credentials';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred';
      }
      
      console.error('Google sign-in error:', error);
      addNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      addNotification('Please fill in all fields', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      addNotification('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      addNotification('Password should be at least 6 characters', 'error');
      return;
    }
    
    try {
      setLoading(true);
      await signup(formData.email, formData.password, formData.name);
      addNotification('Account created successfully', 'success');
      navigate('/');
    } catch (error) {
      let errorMessage = 'Failed to create account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        case 'auth/configuration-not-found':
          errorMessage = 'Authentication is not properly configured. Please try again in a few moments.';
          break;
        case 'auth/internal-error':
          errorMessage = 'An internal error occurred. Please try again later.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred';
      }
      
      console.error('Signup error:', error);
      addNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div 
          className="auth-image" 
          style={{ backgroundImage: 'url(/images/auth/signup-image.jpg)' }}
        />
        <div className="auth-form-wrapper">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          
          <div className="auth-form-container">
            <h1>Create Account</h1>
            <p className="auth-subtitle">Join our community today</p>
            
            <button 
              onClick={handleGoogleSignIn}
              className="google-sign-in-btn"
              disabled={loading}
              type="button"
            >
              <img 
                src="/images/icons/google.svg" 
                alt="Google" 
                className="google-icon"
              />
              Continue with Google
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Create a password"
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Confirm your password"
                  disabled={loading}
                />
              </div>
              
              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <p className="auth-switch">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')} 
                className="auth-switch-btn"
                disabled={loading}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 