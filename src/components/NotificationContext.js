import React, { createContext, useContext, useState } from 'react';
import Notification from './Notification';

const NotificationContext = createContext(null);

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setNotifications(prev => {
      // Remove any existing notifications with the same message to prevent duplicates
      const filtered = prev.filter(n => n.message !== message);
      return [...filtered, { id, message, type, duration }];
    });
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const value = { addNotification };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="notification-container">
        {notifications.map((notification, index) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
            style={{
              top: `${20 + index * 70}px`
            }}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export { NotificationProvider, useNotification }; 