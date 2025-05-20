import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GloveDetails.css';
import { useCart } from './CartContext';

const gloves = [];

// First glove with correct data
gloves.push({
  id: 1,
  name: 'adidas Predator Pro Hybrid',
  images: [
    '/images/footballgloves/1/angle1.jpg',
    '/images/footballgloves/1/main.jpg',
    '/images/footballgloves/1/angle2.jpg',
  ],
  price: 119.99,
  description: 'Professional goalkeeper gloves with hybrid cut for maximum grip and control. The adidas Predator Pro Hybrid features premium latex palm and advanced finger protection.',
  type: 'glove',
  image: '/images/footballgloves/1/main.jpg',
  brand: 'adidas',
  brandLogo: '/images/brand-logos/adidas.jpg',
  cutType: 'hybrid',
  weatherType: 'allWeather'
});

// Rest of the gloves with proper data
gloves.push({
  id: 2,
  name: 'Nike Goalkeeper Mercurial Touch Elite',
  images: [
    '/images/footballgloves/2/angle1.jpg',
    '/images/footballgloves/2/main.jpg',
    '/images/footballgloves/2/angle2.jpg',
  ],
  price: 129.99,
  description: 'The Nike Goalkeeper Mercurial Touch Elite gloves feature an innovative one-piece design for a second-skin fit, with premium grip latex and lightweight construction for elite performance.',
  type: 'glove',
  image: '/images/footballgloves/2/main.jpg',
  brand: 'nike',
  brandLogo: '/images/brand-logos/nike.jpg',
  cutType: 'negative',
  weatherType: 'dry'
});

gloves.push({
  id: 3,
  name: 'adidas Predator Pro Fingersave',
  images: [
    '/images/footballgloves/3/angle1.jpg',
    '/images/footballgloves/3/main.jpg',
    '/images/footballgloves/3/angle2.jpg',
  ],
  price: 99.99,
  description: 'The adidas Predator Pro Fingersave gloves offer superior finger protection with removable spines, premium latex palm, and extended wrist support for maximum control and protection.',
  type: 'glove',
  image: '/images/footballgloves/3/main.jpg',
  brand: 'adidas',
  brandLogo: '/images/brand-logos/adidas.jpg',
  cutType: 'negative',
  weatherType: 'allWeather',
  feature: 'fingerSave'
});

// Add the remaining gloves
for (let i = 4; i <= 25; i++) {
  const brands = ['adidas', 'nike', 'puma', 'reusch', 'uhlsport'];
  const brandIndex = (i % brands.length);
  const brand = brands[brandIndex];
  
  const cutTypes = ['negative', 'flat', 'rollFinger', 'hybrid'];
  const cutType = cutTypes[i % cutTypes.length];
  
  const weatherTypes = ['dry', 'wet', 'allWeather'];
  const weatherType = weatherTypes[i % weatherTypes.length];
  
  const hasFingerSave = i % 3 === 0;
  const hasLatex = i % 4 === 0;

  let feature = null;
  if (hasFingerSave) feature = 'fingerSave';
  else if (hasLatex) feature = 'latex';
  
  const name = gloves.find(g => g.id === i)?.name || `Goalkeeper Glove Model ${i}`;
  
  gloves.push({
    id: i,
    name: name,
    images: [
      `/images/footballgloves/${i}/angle1.jpg`,
      `/images/footballgloves/${i}/main.jpg`,
      `/images/footballgloves/${i}/angle2.jpg`,
    ],
    price: Number((59.99 + (i % 7) * 15).toFixed(2)),
    description: `Professional goalkeeper gloves with ${cutType} cut design for excellent fit and ${weatherType} conditions. ${hasFingerSave ? 'Includes finger protection technology for added safety. ' : ''}${hasLatex ? 'Features premium latex palm for exceptional grip in all conditions.' : ''}`,
    type: 'glove',
    image: `/images/footballgloves/${i}/main.jpg`,
    brand: brand,
    brandLogo: `/images/brand-logos/${brand}.jpg`,
    cutType: cutType,
    weatherType: weatherType,
    ...(feature && { feature })
  });
}

const GloveDetails = () => {
  const { id } = useParams();
  const glove = gloves.find(g => g.id === Number(id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  if (!glove || !glove.images || glove.images.length === 0) {
    return (
      <div className="fb-store-glove-details-page">
        <div className="fb-store-container">
          <h2>Gloves not found or images not available</h2>
          <Link to="/football-gloves" className="fb-store-back-link">Back to Gloves</Link>
        </div>
      </div>
    );
  }

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? glove.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === glove.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleAddToCart = () => {
    addToCart(glove);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section className="fb-store-glove-details-page">
      <div className="fb-store-container fb-store-details-container">
        <div className="fb-store-details-image-section">
          <div className="fb-store-details-main-image-container">
            <button 
              className="fb-store-slider-arrow fb-store-slider-arrow-left" 
              onClick={handlePrevSlide}
              aria-label="Previous image"
            >
              &#8249;
            </button>
            
            <div className="fb-store-slider-container">
              <div 
                className="fb-store-slider-track" 
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)` 
                }}
              >
                {glove.images.map((image, index) => (
                  <div className="fb-store-slider-item" key={index}>
                    <img 
                      src={image} 
                      alt={`${glove.name} - View ${index + 1}`} 
                      className="fb-store-details-image" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="fb-store-slider-arrow fb-store-slider-arrow-right" 
              onClick={handleNextSlide}
              aria-label="Next image"
            >
              &#8250;
            </button>
          </div>
          
          <div className="fb-store-thumbnails-container">
            {glove.images.map((image, index) => (
              <div 
                key={index}
                className={`fb-store-thumbnail ${currentIndex === index ? 'fb-store-active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img 
                  src={image} 
                  alt={`${glove.name} thumbnail ${index + 1}`} 
                />
              </div>
            ))}
          </div>
          
          <div className="fb-store-slider-dots">
            {glove.images.map((_, index) => (
              <span 
                key={index} 
                className={`fb-store-dot ${currentIndex === index ? 'fb-store-active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="fb-store-details-info-section">
          <h1 className="fb-store-details-title">{glove.name}</h1>
          <div className="fb-store-details-price">€{glove.price}</div>
          {/* Size selector removed as requested */}
          <button className="fb-store-details-add-btn" onClick={handleAddToCart} disabled={added}>
            {added ? 'Added!' : 'Add to cart'}
          </button>
          <div className="fb-store-details-desc-title">Technical description of the goalkeeper gloves</div>
          <div className="fb-store-details-description">{glove.description}</div>
          <Link to="/football-gloves" className="fb-store-back-link">&#8592; Back to Gloves</Link>
        </div>
      </div>
    </section>
  );
};

export default GloveDetails; 