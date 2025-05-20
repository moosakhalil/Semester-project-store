import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from '../config/firebase';
import { useNotification } from '../components/NotificationContext';
import './Auth.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oobCode, setOobCode] = useState(null);

  useEffect(() => {
    // Get the action code from the URL
    const urlParams = new URLSearchParams(location.search);
    const actionCode = urlParams.get('oobCode');

    if (!actionCode) {
      addNotification('Invalid password reset link', 'error');
      navigate('/login');
      return;
    }

    // Verify the action code
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        setEmail(email);
        setOobCode(actionCode);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error verifying reset code:', error);
        let errorMessage = 'Invalid or expired reset link. Please try again.';
        if (error.code === 'auth/invalid-action-code') {
          errorMessage = 'This password reset link has expired or has already been used.';
        }
        addNotification(errorMessage, 'error');
        navigate('/login');
      });
  }, [navigate, location.search, addNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      addNotification('Passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 6) {
      addNotification('Password should be at least 6 characters', 'error');
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, newPassword);
      addNotification('Password has been reset successfully. Please login with your new password.', 'success');
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      let errorMessage = 'Failed to reset password. Please try again.';
      
      if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/expired-action-code') {
        errorMessage = 'This password reset link has expired. Please request a new one.';
      } else if (error.code === 'auth/invalid-action-code') {
        errorMessage = 'This password reset link is invalid or has already been used.';
      }
      
      addNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-form-wrapper">
            <div className="auth-form-container">
              <h1>Verifying Reset Link...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-wrapper">
          <div className="auth-form-container">
            <h1>Reset Password</h1>
            <p className="auth-subtitle">Enter your new password for {email}</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter your new password"
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your new password"
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="back-to-login-btn"
                disabled={loading}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 