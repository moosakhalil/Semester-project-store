import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { useCart } from './CartContext';
import { useAuth } from '../context/AuthContext';
import { jerseys } from './TeamJerseys';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// Boots data with actual boot names
const boots = [
  { id: 1, name: 'adidas F50 Elite LL FG Son', image: '/images/footballboots/1/main.webp', type: 'boot', detailPath: '/football-boots/1' },
  { id: 2, name: 'Nike Air Zoom Mercurial Vapor 16 Elite KM FG Mbappe', image: '/images/footballboots/2/main.webp', type: 'boot', detailPath: '/football-boots/2' },
  { id: 3, name: 'adidas Predator Elite FT FG Jude Bellingham', image: '/images/footballboots/3/main.webp', type: 'boot', detailPath: '/football-boots/3' },
  { id: 4, name: 'Nike Air Zoom Mercurial Superfly 10 Elite Air Max 95 FG', image: '/images/footballboots/4/main.webp', type: 'boot', detailPath: '/football-boots/4' },
  { id: 5, name: 'adidas Predator Mania FG', image: '/images/footballboots/5/main.webp', type: 'boot', detailPath: '/football-boots/5' },
  { id: 6, name: 'adidas Predator Elite FT FG +Teamgeist', image: '/images/footballboots/6/main.webp', type: 'boot', detailPath: '/football-boots/6' },
  { id: 7, name: 'adidas Predator Elite FT AG', image: '/images/footballboots/7/main.webp', type: 'boot', detailPath: '/football-boots/7' },
  { id: 8, name: 'Nike Phantom Luna II Elite FG', image: '/images/footballboots/8/main.webp', type: 'boot', detailPath: '/football-boots/8' },
  { id: 9, name: 'Puma King Ultimate X Porsche FG/AG', image: '/images/footballboots/9/main.webp', type: 'boot', detailPath: '/football-boots/9' },
  { id: 10, name: 'Under Armour Magnetico Elite 4 FG', image: '/images/footballboots/10/main.webp', type: 'boot', detailPath: '/football-boots/10' },
  { id: 11, name: 'adidas F50 League FG/MG Messi', image: '/images/footballboots/11/main.webp', type: 'boot', detailPath: '/football-boots/11' },
  { id: 12, name: 'adidas Copa Pure III League Turf', image: '/images/footballboots/12/main.webp', type: 'boot', detailPath: '/football-boots/12' },
  { id: 13, name: 'adidas Predator Elite FT SG', image: '/images/footballboots/13/main.webp', type: 'boot', detailPath: '/football-boots/13' },
  { id: 14, name: 'Nike Air Zoom Mercurial Vapor 16 Pro Air Max 95 FG', image: '/images/footballboots/14/main.webp', type: 'boot', detailPath: '/football-boots/14' },
  { id: 15, name: 'Mizuno Morelia II Pro FG', image: '/images/footballboots/15/main.webp', type: 'boot', detailPath: '/football-boots/15' },
  { id: 16, name: 'Mizuno Monarcida Neo III Select AG', image: '/images/footballboots/16/main.webp', type: 'boot', detailPath: '/football-boots/16' },
  { id: 17, name: 'adidas Copa 11 Pure FG', image: '/images/footballboots/17/main.webp', type: 'boot', detailPath: '/football-boots/17' },
  { id: 18, name: 'adidas F50 Elite FG Two Horizons', image: '/images/footballboots/18/main.webp', type: 'boot', detailPath: '/football-boots/18' },
  { id: 19, name: 'F50 Elite AG Kings League', image: '/images/footballboots/19/main.webp', type: 'boot', detailPath: '/football-boots/19' },
  { id: 20, name: 'Predator Elite FT FG Jude Bellingham', image: '/images/footballboots/20/main.webp', type: 'boot', detailPath: '/football-boots/20' },
  { id: 21, name: 'F50+ FG', image: '/images/footballboots/21/main.webp', type: 'boot', detailPath: '/football-boots/21' },
  { id: 22, name: 'Copa Mundial Jamaica', image: '/images/footballboots/22/main.webp', type: 'boot', detailPath: '/football-boots/22' },
  { id: 23, name: 'Copa Pure 2 Elite Made in Germany FG', image: '/images/footballboots/23/main.webp', type: 'boot', detailPath: '/football-boots/23' },
  { id: 24, name: 'Predator Elite L FG Gen Pred 2.0', image: '/images/footballboots/24/main.webp', type: 'boot', detailPath: '/football-boots/24' },
  { id: 25, name: 'Copa Pure III Elite LL FG', image: '/images/footballboots/25/main.webp', type: 'boot', detailPath: '/football-boots/25' },
  { id: 26, name: 'Predator Pro FT FG', image: '/images/footballboots/26/main.webp', type: 'boot', detailPath: '/football-boots/26' },
  { id: 27, name: 'F50 Elite FG Messi', image: '/images/footballboots/27/main.webp', type: 'boot', detailPath: '/football-boots/27' },
  { id: 28, name: 'F50 Elite FG Messi', image: '/images/footballboots/28/main.webp', type: 'boot', detailPath: '/football-boots/28' },
  { id: 29, name: 'Copa Pure III Elite FG', image: '/images/footballboots/29/main.webp', type: 'boot', detailPath: '/football-boots/29' },
  { id: 30, name: 'F50 Elite FG Messi', image: '/images/footballboots/30/main.webp', type: 'boot', detailPath: '/football-boots/30' },
]

// Gloves data
const gloves = [
  { id: 1, name: 'adidas Predator Pro Hybrid', image: '/images/footballgloves/1/main.jpg', type: 'glove', detailPath: '/football-gloves/1' },
  { id: 2, name: 'Nike Goalkeeper Mercurial Touch Elite', image: '/images/footballgloves/2/main.jpg', type: 'glove', detailPath: '/football-gloves/2' },
  { id: 3, name: 'Nike Goalkeeper Phantom Elite', image: '/images/footballgloves/3/main.jpg', type: 'glove', detailPath: '/football-gloves/3' },
  { id: 4, name: 'adidas Predator Pro Hybrid', image: '/images/footballgloves/4/main.jpg', type: 'glove', detailPath: '/football-gloves/4' },
  { id: 6, name: 'Uhlsport Hyperact Supergrip+', image: '/images/footballgloves/6/main.jpg', type: 'glove', detailPath: '/football-gloves/6' },
  { id: 7, name: 'Puma FUTURE Ultimate', image: '/images/footballgloves/7/main.jpg', type: 'glove', detailPath: '/football-gloves/7' }
];

// Jerseys data
const allJerseys = [
  ...jerseys.laliga.map(j => ({ ...j, type: 'jersey', detailPath: `/team-jerseys/${j.id}` })),
  ...jerseys.international.map(j => ({ ...j, type: 'jersey', detailPath: `/team-jerseys/${j.id}` })),
  ...jerseys.secondDivision.map(j => ({ ...j, type: 'jersey', detailPath: `/team-jerseys/${j.id}` })),
];

const allProducts = [
  ...boots,
  ...allJerseys,
  ...gloves
];

const Header = ({ openCart }) => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef();
  const userMenuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim() === '') {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const searchTerms = search.toLowerCase().split(' ').filter(term => term.length > 0);
    const filtered = allProducts.filter(p => 
      searchTerms.every(term => 
        p.name.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term)
      )
    );
    setSuggestions(filtered);
    setShowDropdown(filtered.length > 0);
    setActiveIndex(-1);
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch('');
    setShowDropdown(false);
    navigate(suggestion.detailPath);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) setShowDropdown(true);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => (i + 1) % suggestions.length);
      const activeItem = document.querySelector('.search-suggestion-item.active');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => (i - 1 + suggestions.length) % suggestions.length);
      const activeItem = document.querySelector('.search-suggestion-item.active');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setSearch('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(prev => !prev);
  };

  const getUserDisplayName = (user) => {
    if (!user) return '';
    // If we have a display name from Google, use it
    if (user.displayName) {
      return user.displayName;
    }
    // If we have name property
    if (user.name) {
      return user.name;
    }
    // Fallback to email without domain
    return user.email.split('@')[0];
  };

  return (
    <header className="fb-store-header">
      <div className="fb-store-main-header">
        <div className="fb-store-logo">
          <img src="/images/icons/logo1.jpg" alt="Fútbol Emotion" onClick={() => navigate('/')} />
        </div>
        
        <div className="fb-store-search-bar" ref={inputRef}>
          <input 
            type="text" 
            placeholder="Search by name, type (boot, jersey, glove)..." 
            value={search}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <button className="fb-store-search-button">
          <FontAwesomeIcon icon={faSearch} style={{ color: '#000' }} />
          </button>
          {showDropdown && (
            <ul className="search-suggestions-dropdown">
              {suggestions.length === 0 ? (
                <li className="search-no-results">No products found</li>
              ) : (
                suggestions.map((s, idx) => (
                <li
                  key={s.type + '-' + s.id}
                  className={`search-suggestion-item${activeIndex === idx ? ' active' : ''}`}
                  onClick={() => handleSuggestionClick(s)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <img src={s.image} alt={s.name} className="search-suggestion-img" />
                    <div className="search-suggestion-content">
                  <span className="search-suggestion-name">{s.name}</span>
                  <span className="search-suggestion-type">
                        {s.type === 'boot' ? 'Football Boot' : 
                         s.type === 'jersey' ? 'Team Jersey' :
                     s.type === 'glove' ? 'Goalkeeper Glove' :
                     'Football'}
                  </span>
                    </div>
                </li>
                ))
              )}
            </ul>
          )}
        </div>
        
        <div className="fb-store-header-icons">
          <div className="fb-store-icon-container" style={{ cursor: 'pointer' }}>
            {user ? (
              <div className="fb-store-user-menu" ref={userMenuRef}>
                <div onClick={toggleUserDropdown} className="fb-store-user-icon-wrapper">
                  <div className="fb-store-user-icon">
                    <FontAwesomeIcon icon={faUser} className="fb-store-icon" />
                  </div>
                  <span className="fb-store-user-name">{getUserDisplayName(user)}</span>
                </div>
                <div className={`fb-store-user-dropdown ${showUserDropdown ? 'show' : ''}`}>
                  <button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="fb-store-auth-buttons">
                <FontAwesomeIcon icon={faUser} className="fb-store-icon" />
                <div className="fb-store-auth-links">
                  <button onClick={() => navigate('/login')}>Login</button>
                <span>/</span>
                  <button onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
              </div>
            )}
          </div>
          
          <div className="fb-store-icon-container" onClick={openCart} style={{ cursor: 'pointer', position: 'relative' }}>
            <img src="/images/icons/basket.png" alt="Basket" className="fb-store-icon-img" />
            <span>Basket</span>
            {cartCount > 0 && (
              <span className="fb-store-cart-count">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 