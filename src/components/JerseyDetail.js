import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './JerseyDetail.css';
import { jerseys } from './TeamJerseys';
import { useCart } from './CartContext';

const allJerseys = [
  ...jerseys.laliga,
  ...jerseys.international,
  ...jerseys.secondDivision
];

const JerseyDetail = () => {
  const { jerseyId } = useParams();
  const jersey = allJerseys.find(j => j.id === Number(jerseyId));
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!jersey) {
    return <div className="jersey-detail-not-found">Jersey not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(jersey);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="jersey-detail-container">
      <div className="jersey-detail-image-section">
        <img src={jersey.image} alt={jersey.name} className="jersey-detail-image" />
      </div>
      <div className="jersey-detail-info-section">
        <h2 className="jersey-detail-title">{jersey.name}</h2>
        <div className="jersey-detail-team">
          <img src={jersey.teamLogo} alt={jersey.team} className="jersey-detail-team-logo" />
          <span>{jersey.team}</span>
        </div>
        <div className="jersey-detail-price">€{jersey.price}</div>
        <p className="jersey-detail-description">{jersey.description}</p>
        <button className="jersey-detail-add-to-cart" onClick={handleAddToCart} disabled={added}>
          {added ? 'Added!' : 'Add to Cart'}
        </button>
        <Link to="/team-jerseys/all" className="jersey-detail-back-link">← Back to Jerseys</Link>
      </div>
    </div>
  );
};

export default JerseyDetail; 