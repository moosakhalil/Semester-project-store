import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../components/NotificationContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, resetPassword, currentUser } = useAuth();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      addNotification('Successfully signed in with Google', 'success');
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
    
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      addNotification('Please fill in all fields', 'error');
      return;
    }

    if (!validateEmail(email)) {
      addNotification('Please enter a valid email address', 'error');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      addNotification('Successfully logged in', 'success');
    } catch (error) {
      let errorMessage = 'Failed to log in';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred';
      }
      
      console.error('Login error:', error);
      addNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const email = resetEmail.trim().toLowerCase();

    if (!email) {
      addNotification('Please enter your email address', 'error');
      return;
    }

    if (!validateEmail(email)) {
      addNotification('Please enter a valid email address', 'error');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      addNotification('Password reset email sent. Please check your inbox.', 'success');
      setShowResetForm(false);
    } catch (error) {
      let errorMessage = 'Failed to send password reset email';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred';
      }
      
      addNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // If user is already logged in, don't render the login form
  if (currentUser) {
    return null;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div 
          className="auth-image" 
          style={{ backgroundImage: 'url(/images/auth/login-image.jpg)' }}
        />
        <div className="auth-form-wrapper">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          
          <div className="auth-form-container">
            <h1>Welcome Back</h1>
            <p className="auth-subtitle">Login to your account</p>
            
            {!showResetForm ? (
              <>
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
                      placeholder="Enter your password"
                      disabled={loading}
                      minLength={6}
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowResetForm(true)}
                    className="forgot-password-btn"
                    disabled={loading}
                  >
                    Forgot Password?
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={handlePasswordReset} className="auth-form">
                <h2>Reset Password</h2>
                <p>Enter your email address to receive a password reset link.</p>
                
                <div className="form-group">
                  <label htmlFor="resetEmail">Email</label>
                  <input
                    type="email"
                    id="resetEmail"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value.trim())}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>

                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowResetForm(false)}
                  className="back-to-login-btn"
                  disabled={loading}
                >
                  Back to Login
                </button>
              </form>
            )}
            
            <p className="auth-switch">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/signup')} 
                className="auth-switch-btn"
                disabled={loading}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 