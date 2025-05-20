import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BootDetails.css';
import { useCart } from './CartContext';

// Import the actual boots data to match with IdolBoots.js
const actualBootsData = [
  { id: 1, name: 'Bota adidas F50 Elite LL FG Son', image: '/images/footballboots/1/main.webp', price: 249.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 2, name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite KM FG Mbappe', image: '/images/footballboots/2/main.webp', price: 229.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 3, name: 'Bota adidas Predator Elite FT FG Jude Bellingham', image: '/images/footballboots/3/main.webp', price: 199.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 4, name: 'Bota Nike Air Zoom Mercurial Superfly 10 Elite Air Max 95 FG Chapter 1', image: '/images/footballboots/4/main.webp', price: 259.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 5, name: 'Bota adidas Predator Mania FG', image: '/images/footballboots/5/main.webp', price: 219.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 6, name: 'Bota adidas Predator Elite FT FG +Teamgeist', image: '/images/footballboots/6/main.webp', price: 209.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 7, name: 'Bota adidas Predator Elite FT AG', image: '/images/footballboots/7/main.webp', price: 189.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 8, name: 'Bota Nike Phantom Luna II Elite FG', image: '/images/footballboots/8/main.webp', price: 179.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 9, name: 'Bota Puma King Ultimate X Porsche FG/AG', image: '/images/footballboots/9/main.webp', price: 249.99, brand: 'puma', brandLogo: '/images/brand-logos/puma.jpg' },
  { id: 10, name: 'Bota Under Armour Magnetico Elite 4 FG', image: '/images/footballboots/10/main.webp', price: 229.99, brand: 'under-armour', brandLogo: '/images/brand-logos/under-armour.jpg' },
  { id: 11, name: 'Bota adidas F50 League FG/MG Messi', image: '/images/footballboots/11/main.webp', price: 199.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 12, name: 'Bota adidas Copa Pure III League Turf', image: '/images/footballboots/12/main.webp', price: 259.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 13, name: 'Bota adidas Predator Elite FT SG', image: '/images/footballboots/13/main.webp', price: 219.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 14, name: 'Bota Nike Air Zoom Mercurial Vapor 16 Pro Air Max 95 FG Niño Chapter 1', image: '/images/footballboots/14/main.webp', price: 209.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 15, name: 'Bota Mizuno Morelia II Pro FG', image: '/images/footballboots/15/main.webp', price: 189.99, brand: 'mizuno', brandLogo: '/images/brand-logos/mizuno.png' },
  { id: 16, name: 'Bota Mizuno Monarcida Neo III Select AG', image: '/images/footballboots/16/main.webp', price: 179.99, brand: 'mizuno', brandLogo: '/images/brand-logos/mizuno.png' },
  { id: 17, name: 'Bota adidas Copa 11 Pure FG', image: '/images/footballboots/17/main.webp', price: 249.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 18, name: 'Bota adidas F50 Elite FG Two Horizons', image: '/images/footballboots/18/main.webp', price: 229.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 19, name: 'Bota F50 Elite AG Kings League', image: '/images/footballboots/19/main.webp', price: 199.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 20, name: 'Bota Predator Elite FT FG Jude Bellingham', image: '/images/footballboots/20/main.webp', price: 259.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 21, name: 'Bota F50+ FG', image: '/images/footballboots/21/main.webp', price: 219.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 22, name: 'Bota Copa Mundial Jamaica', image: '/images/footballboots/22/main.webp', price: 209.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 23, name: 'Bota Copa Pure 2 Elite Made in Germany FG', image: '/images/footballboots/23/main.webp', price: 189.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 24, name: 'Bota Predator Elite L FG Gen Pred 2.0', image: '/images/footballboots/24/main.webp', price: 179.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 25, name: 'Bota Copa Pure III Elite LL FG', image: '/images/footballboots/25/main.webp', price: 249.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 26, name: 'Bota Predator Pro FT FG', image: '/images/footballboots/26/main.webp', price: 229.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 27, name: 'Bota F50 Elite FG Messi', image: '/images/footballboots/27/main.webp', price: 199.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 28, name: 'Bota F50 Elite FG Messi', image: '/images/footballboots/28/main.webp', price: 259.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 29, name: 'Bota Copa Pure III Elite FG', image: '/images/footballboots/29/main.webp', price: 219.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 30, name: 'Bota F50 Elite FG Messi', image: '/images/footballboots/30/main.webp', price: 209.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 31, name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite AG-Pro', image: '/images/footballboots/31/main.webp', price: 289.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 32, name: 'Bota adidas F50 Elite LL AG Yamal', image: '/images/footballboots/32/main.webp', price: 269.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 33, name: 'Bota Puma Future 8 Ultimate FG', image: '/images/footballboots/33/main.webp', price: 194.99, brand: 'puma', brandLogo: '/images/brand-logos/puma.jpg' },
  { id: 34, name: 'Bota Nike Tiempo Legend 10 Elite FG', image: '/images/footballboots/34/main.webp', price: 179.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 35, name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite FG', image: '/images/footballboots/35/main.webp', price: 249.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 36, name: 'Bota adidas F50 Elite FG 2010', image: '/images/footballboots/36/main.webp', price: 259.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 37, name: 'Bota Skechers Skx_1.5 Elite FG', image: '/images/footballboots/37/main.webp', price: 154.99, brand: 'skechers', brandLogo: '/images/brand-logos/skechers.jpg' },
];

// Import goalkeeper gloves data
const goalkeepingGlovesData = [
  { id: 1, name: 'adidas Predator Pro Hybrid', image: '/images/footballgloves/1/main.jpg', price: 119.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg', isGlove: true },
  { id: 2, name: 'Nike Goalkeeper Mercurial Touch Elite', image: '/images/footballgloves/2/main.jpg', price: 129.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg', isGlove: true },
  { id: 3, name: 'adidas Predator Pro Fingersave', image: '/images/footballgloves/3/main.jpg', price: 99.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg', isGlove: true },
  { id: 4, name: 'Nike Goalkeeper Phantom Elite', image: '/images/footballgloves/4/main.jpg', price: 109.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg', isGlove: true },
  { id: 5, name: 'Reusch Attrakt Freegel Gold', image: '/images/footballgloves/5/main.jpg', price: 89.99, brand: 'reusch', brandLogo: '/images/brand-logos/reusch.jpg', isGlove: true },
  { id: 6, name: 'Uhlsport Hyperact Supergrip+', image: '/images/footballgloves/6/main.jpg', price: 99.99, brand: 'uhlsport', brandLogo: '/images/brand-logos/uhlsport.jpg', isGlove: true },
  { id: 7, name: 'Puma FUTURE Ultimate', image: '/images/footballgloves/7/main.jpg', price: 79.99, brand: 'puma', brandLogo: '/images/brand-logos/puma.jpg', isGlove: true }
];

// Generate a complete boots array with all necessary data
const boots = [
  // Map football boots
  ...actualBootsData.map(boot => ({
    id: boot.id,
    name: boot.name,
    images: [
      boot.image || `/images/footballboots/${boot.id}/main.webp`,
      `/images/footballboots/${boot.id}/angle1.webp`,
      `/images/footballboots/${boot.id}/angle2.webp`
    ],
    price: boot.price,
    description: `The ${boot.name} is designed for elite performance on the pitch. Featuring the latest ${boot.brand} technology for exceptional comfort, control, and speed.`,
    type: 'boot',
    image: boot.image || `/images/footballboots/${boot.id}/main.webp`,
    brand: boot.brand,
    brandLogo: boot.brandLogo,
    isGlove: false
  })),
  
  // Map goalkeeper gloves
  ...goalkeepingGlovesData.map(glove => ({
    id: glove.id,
    name: glove.name,
    images: [
      glove.image,
      `/images/footballgloves/${glove.id}/angle1.jpg`,
      `/images/footballgloves/${glove.id}/angle2.jpg`
    ],
    price: glove.price,
    description: `The ${glove.name} goalkeeper gloves provide exceptional grip and protection. Featuring advanced ${glove.brand} technology for superior ball handling in all weather conditions.`,
    type: 'glove',
    image: glove.image,
    brand: glove.brand,
    brandLogo: glove.brandLogo,
    isGlove: true
  }))
];



const BootDetails = () => {
  const { id } = useParams();
  const boot = boots.find(b => b.id === Number(id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  if (!boot) {
    return (
      <div className="fb-store-boot-details-page">
        <div className="fb-store-container">
          <h2>Product Not Found</h2>
          <p>We couldn't find the product you're looking for.</p>
          <Link to="/football-boots" className="fb-store-btn-primary">Browse All Products</Link>
        </div>
      </div>
    );
  }

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? boot.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === boot.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleAddToCart = () => {
    addToCart(boot);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section className="fb-store-boot-details-page">
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
                {boot.images.map((image, index) => (
                  <div className="fb-store-slider-item" key={index}>
                    <img 
                      src={image} 
                      alt={`${boot.name} - View ${index + 1}`} 
                      className="fb-store-details-image"
                      onError={(e) => {
                        e.target.src = boot.image;
                        if (currentIndex !== index) {
                          setCurrentIndex(0);
                        }
                      }} 
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
            {boot.images.map((image, index) => (
              <div 
                key={index}
                className={`fb-store-thumbnail ${currentIndex === index ? 'fb-store-active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img 
                  src={image} 
                  alt={`${boot.name} thumbnail ${index + 1}`} 
                />
              </div>
            ))}
          </div>
          
          <div className="fb-store-slider-dots">
            {boot.images.map((_, index) => (
              <span 
                key={index} 
                className={`fb-store-dot ${currentIndex === index ? 'fb-store-active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="fb-store-details-info-section">
          <h1 className="fb-store-details-title">{boot.name}</h1>
          <div className="fb-store-details-type">{boot.isGlove ? 'Goalkeeper Gloves' : 'Football Boots'}</div>
          <div className="fb-store-details-price">€{boot.price}</div>
          <button className="fb-store-details-add-btn" onClick={handleAddToCart} disabled={added}>
            {added ? 'Added!' : 'Add to cart'}
          </button>
          <div className="fb-store-details-desc-title">
            {boot.isGlove ? 'Goalkeeper Gloves Description' : 'Football Boot Description'}
          </div>
          <div className="fb-store-details-description">{boot.description}</div>
          
          <div className="fb-store-details-features">
            {boot.isGlove ? (
              // Glove features
              <div className="fb-store-details-features-list">
                <div className="fb-store-details-feature">
                  <span className="fb-store-details-feature-name">Palm Material:</span> Advanced Latex
                </div>
                <div className="fb-store-details-feature">
                  <span className="fb-store-details-feature-name">Cut:</span> Negative
                </div>
                <div className="fb-store-details-feature">
                  <span className="fb-store-details-feature-name">Weather:</span> All Conditions
                </div>
              </div>
            ) : (
              // Boot features
              <div className="fb-store-details-features-list">
                <div className="fb-store-details-feature">
                  <span className="fb-store-details-feature-name">Surface:</span> Firm Ground
                </div>
                <div className="fb-store-details-feature">
                  <span className="fb-store-details-feature-name">Material:</span> Synthetic
                </div>
                <div className="fb-store-details-feature">
                  <span className="fb-store-details-feature-name">Closure:</span> Lace-Up
                </div>
              </div>
            )}
          </div>
          <Link to="/football-boots" className="fb-store-back-link">&#8592; Back to {boot.isGlove ? 'Gloves' : 'Boots'}</Link>
        </div>
      </div>
    </section>
  );
};

export default BootDetails;