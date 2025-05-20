import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { featuredProducts } from './FeaturedProducts';
import './FeaturedProductDetails.css';

const FeaturedProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  
  const product = featuredProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="fb-store-featured-details-error">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Add to cart logic here
    alert('Added to cart!');
  };

  return (
    <div className="fb-store-featured-details">
      <div className="fb-store-container">
        <div className="fb-store-featured-details-grid">
          <div className="fb-store-featured-details-image">
            <img src={product.image} alt={product.name} />
            <div className="fb-store-featured-details-logo">
              <img 
                src={product.type === 'boot' ? product.brandLogo : product.teamLogo} 
                alt={product.type === 'boot' ? product.brand : product.team}
              />
            </div>
          </div>
          
          <div className="fb-store-featured-details-info">
            <h1 className="fb-store-featured-details-name">{product.name}</h1>
            <div className="fb-store-featured-details-price">€{product.price}</div>
            <p className="fb-store-featured-details-description">{product.description}</p>
            
            <div className="fb-store-featured-details-attributes">
              <div className="fb-store-featured-details-color">
                <span className="attribute-label">Color:</span>
                <span className="attribute-value">{product.color}</span>
              </div>
              <div className="fb-store-featured-details-material">
                <span className="attribute-label">Material:</span>
                <span className="attribute-value">{product.material}</span>
              </div>
            </div>

            <div className="fb-store-featured-details-sizes">
              <h3>Select Size</h3>
              <div className="fb-store-featured-details-size-grid">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="fb-store-featured-details-add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <div className="fb-store-featured-details-type">
              {product.type === 'boot' ? 'Football Boot' : 'Team Jersey'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductDetails; 