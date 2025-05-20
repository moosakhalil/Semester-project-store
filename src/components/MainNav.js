import React from 'react';
import './MainNav.css';
import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <nav className="fb-store-main-nav">
      <div className="fb-store-nav-container">
        <ul className="fb-store-nav-categories">
          <li className="fb-store-nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="fb-store-nav-item">
            <Link to="/football-boots">Football boots</Link>
          </li>
          <li className="fb-store-nav-item">
            <Link to="/football-gloves">Goalkeeper gloves</Link>
          </li>
          <li className="fb-store-nav-item">
            <Link to="/team-jerseys">Team jerseys</Link>
          </li>
          <li className="fb-store-nav-item">
            <Link to="/idol-boots">Idols & Boots</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNav; 