import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainNav from './components/MainNav';
import HeroCarousel from './components/HeroCarousel';
import FeaturedProducts from './components/FeaturedProducts';
import FootballBoots from './components/FootballBoots';
import BootDetails from './components/BootDetails';
import FootballGloves from './components/FootballGloves';
import GloveDetails from './components/GloveDetails';
import IdolBoots from './components/IdolBoots';
import TeamJerseys from './components/TeamJerseys';
import JerseyDetail from './components/JerseyDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './components/NotificationContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <NotificationProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="fb-store-app">
              <Header openCart={openCart} />
              <MainNav />
              <main className="fb-store-main">
                <Routes>
                  <Route path="/" element={
                    <>
                      <HeroCarousel />
                      <FeaturedProducts />
                      <Footer />
                    </>
                  } />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/football-boots" element={<FootballBoots />} />
                  <Route path="/football-boots/:id" element={<BootDetails />} />
                  <Route path="/football-gloves" element={<FootballGloves />} />
                  <Route path="/football-gloves/:id" element={<GloveDetails />} />
                  <Route path="/idol-boots" element={<IdolBoots />} />
                  <Route path="/idols/:idolName" element={<IdolBoots />} />
                  <Route path="/idol-boots/:idolName" element={<IdolBoots />} />
                  <Route path="/team-jerseys" element={<TeamJerseys />} />
                  <Route path="/team-jerseys/all" element={<TeamJerseys />} />
                  <Route path="/team-jerseys/:jerseyId" element={<JerseyDetail />} />
                  <Route path="/team-jerseys/team/:teamId" element={<TeamJerseys />} />
                  <Route 
                    path="/checkout" 
                    element={
                      <PrivateRoute>
                        <Checkout />
                      </PrivateRoute>
                    } 
                  />
                  {/* Catch all route for 404 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Cart open={cartOpen} onClose={closeCart} />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
