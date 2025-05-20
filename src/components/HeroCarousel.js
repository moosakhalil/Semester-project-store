import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const slides = [
    {
      id: 1,
      image: '/images/slider/slider1.webp',
    },
    {
      id: 2,
      image: '/images/slider/slider2.webp',
    },
    {
      id: 3,
      image: '/images/slider/slider3.webp',
    },
    {
      id: 4,
      image: '/images/slider/slider4.webp',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeSlide]);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrevSlide = () => {
    const newIndex = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
    goToSlide(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
    goToSlide(newIndex);
  };

  return (
    <div className="fb-store-hero-carousel">
      <div className="fb-store-carousel-container">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`fb-store-carousel-slide ${index === activeSlide ? 'fb-store-active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
          </div>
        ))}
      </div>
      
      <button className="fb-store-carousel-control fb-store-prev" onClick={goToPrevSlide}>
        <span className="fb-store-arrow">&#10094;</span>
      </button>
      
      <button className="fb-store-carousel-control fb-store-next" onClick={goToNextSlide}>
        <span className="fb-store-arrow">&#10095;</span>
      </button>
      
      <div className="fb-store-carousel-dots">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`fb-store-dot ${index === activeSlide ? 'fb-store-active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel; 