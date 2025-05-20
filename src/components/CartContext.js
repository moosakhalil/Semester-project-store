import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.type === item.type);
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.type === item.type ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id, type) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.type === type)));
  };

  const incrementQuantity = (id, type) => {
    setCart(prev => prev.map(i =>
      i.id === id && i.type === type ? { ...i, quantity: i.quantity + 1 } : i
    ));
  };

  const decrementQuantity = (id, type) => {
    setCart(prev => prev.flatMap(i => {
      if (i.id === id && i.type === type) {
        if (i.quantity > 1) {
          return { ...i, quantity: i.quantity - 1 };
        } else {
          return [];
        }
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 