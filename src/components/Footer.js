import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="fb-store-footer">
      <div className="fb-store-footer-top">
        <div className="fb-store-container">
          <div className="fb-store-footer-grid">
            {/* About Section */}
            <div className="fb-store-footer-section">
              <h3 className="fb-store-footer-title">About Us</h3>
              <p className="fb-store-footer-about">
                Your premier destination for football boots and authentic team jerseys. 
                We bring you the latest and greatest in football gear, ensuring you 
                step onto the pitch with confidence and style.
              </p>
              <div className="fb-store-footer-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">FB</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">TW</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">IG</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">YT</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="fb-store-footer-section">
              <h3 className="fb-store-footer-title">Quick Links</h3>
              <ul className="fb-store-footer-links">
                <li>
                  <Link to="/football-boots">Football boots</Link>
                </li>
                <li>
                  <Link to="/team-jerseys">Team jerseys</Link>
                </li>
                <li>
                  <Link to="/football-gloves">Goalkeeper gloves</Link>
                </li>
                <li>
                  <Link to="/idol-boots">Idols & Boots</Link>
                </li>
                <li>
                  <Link to="/footballs">Footballs</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="fb-store-footer-section">
              <h3 className="fb-store-footer-title">Contact Info</h3>
              <ul className="fb-store-footer-contact">
                <li>
                  <span>📍 123 Football Street, Stadium District, 10001</span>
                </li>
                <li>
                  <a href="tel:+1234567890">📞 +1 (234) 567-890</a>
                </li>
                <li>
                  <a href="mailto:info@footballstore.com">✉️ info@footballstore.com</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="fb-store-footer-section">
              <h3 className="fb-store-footer-title">Newsletter</h3>
              <p className="fb-store-footer-newsletter-text">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="fb-store-footer-newsletter">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="fb-store-footer-bottom">
        <div className="fb-store-container">
          <div className="fb-store-footer-bottom-content">
            <p className="fb-store-footer-copyright">
              © {new Date().getFullYear()} Football Store. All rights reserved.
            </p>
            <div className="fb-store-footer-bottom-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/shipping">Shipping Information</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 