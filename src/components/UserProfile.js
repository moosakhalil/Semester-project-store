import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../components/NotificationContext';
import './UserProfile.css';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleLogout = async () => {
    try {
      await logout();
      addNotification('Successfully logged out', 'success');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      addNotification('Failed to log out', 'error');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="user-profile">
      <div className="user-info">
        {currentUser.photoURL ? (
          <img 
            src={currentUser.photoURL} 
            alt="Profile" 
            className="user-avatar"
          />
        ) : (
          <div className="user-avatar-placeholder">
            {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0)}
          </div>
        )}
        <span className="user-name">
          {currentUser.displayName || currentUser.email}
        </span>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile; 