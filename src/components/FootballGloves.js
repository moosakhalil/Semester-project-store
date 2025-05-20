import React, { useState, useMemo } from 'react';
import './FootballGloves.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const gloves = [
  { id: 1, name: 'adidas Predator Pro Hybrid', image: '/images/footballgloves/1/main.jpg', price: 119.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 2, name: 'Nike Goalkeeper Mercurial Touch Elite', image: '/images/footballgloves/2/main.jpg', price: 129.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 3, name: 'adidas Predator Pro Fingersave', image: '/images/footballgloves/3/main.jpg', price: 99.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 4, name: 'Nike Goalkeeper Phantom Elite', image: '/images/footballgloves/4/main.jpg', price: 109.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 7, name: 'Puma FUTURE Ultimate', image: '/images/footballgloves/7/main.jpg', price: 79.99, brand: 'puma', brandLogo: '/images/brand-logos/puma.jpg' },
  { id: 8, name: 'Nike Goalkeeper Match', image: '/images/footballgloves/8/main.jpg', price: 39.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 11, name: 'adidas Predator Training', image: '/images/footballgloves/11/main.jpg', price: 29.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 12, name: 'Puma ULTRA Grip 1 RC', image: '/images/footballgloves/12/main.jpg', price: 89.99, brand: 'puma', brandLogo: '/images/brand-logos/puma.jpg' },
  { id: 14, name: 'Nike Goalkeeper Vapor Grip3', image: '/images/footballgloves/14/main.jpg', price: 84.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 15, name: 'adidas Predator Pro Fingersave Ultimate', image: '/images/footballgloves/15/main.jpg', price: 139.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 18, name: 'Puma FUTURE Z Grip Hybrid', image: '/images/footballgloves/18/main.jpg', price: 94.99, brand: 'puma', brandLogo: '/images/brand-logos/puma.jpg' },
  { id: 19, name: 'Nike Mercurial Touch Victory', image: '/images/footballgloves/19/main.jpg', price: 49.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 20, name: 'adidas Predator Competition', image: '/images/footballgloves/20/main.jpg', price: 69.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
  { id: 23, name: 'Puma FUTURE Z Grip Fingersave', image: '/images/footballgloves/23/main.jpg', price: 89.99, brand: 'puma', brandLogo: '/images/brand-logos/puma.jpg' },
  { id: 24, name: 'Nike Goalkeeper Match Junior', image: '/images/footballgloves/24/main.jpg', price: 34.99, brand: 'nike', brandLogo: '/images/brand-logos/nike.jpg' },
  { id: 25, name: 'adidas Predator Pro Junior', image: '/images/footballgloves/25/main.jpg', price: 59.99, brand: 'adidas', brandLogo: '/images/brand-logos/adidas.jpg' },
];

const brands = [
  { id: 'adidas', name: 'Adidas', logo: '/images/brand-logos/adidas.jpg' },
  { id: 'nike', name: 'Nike', logo: '/images/brand-logos/nike.jpg' },
  { id: 'puma', name: 'Puma', logo: '/images/brand-logos/puma.jpg' },
];

const cutTypes = [
  { id: 'negative', name: 'Negative Cut' },
  { id: 'flat', name: 'Flat Cut' },
  { id: 'rollFinger', name: 'Roll Finger Cut' },
  { id: 'hybrid', name: 'Hybrid Cut' },
];

const weatherTypes = [
  { id: 'dry', name: 'Dry Weather' },
  { id: 'wet', name: 'Wet Weather' },
  { id: 'allWeather', name: 'All Weather' },
];

const features = [
  { id: 'fingerSave', name: 'Finger Save' },
  { id: 'latex', name: 'Premium Latex' },
];

const sizes = [
  7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11
];

const priceRanges = [
  { id: 'under50', name: 'Under €50', min: 0, max: 49.99 },
  { id: '50-100', name: '€50 - €100', min: 50, max: 99.99 },
  { id: '100-150', name: '€100 - €150', min: 100, max: 149.99 },
  { id: 'over150', name: 'Over €150', min: 150, max: 10000 }
];

const FootballGloves = () => {
  const [sortBy, setSortBy] = useState('Recommended');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  const totalArticles = 157;

  const goalkeepers = [
    { 
      id: 'courtois', 
      name: 'Thibaut Courtois', 
      image: '/images/idols/courtois.jpg', 
      brand: 'adidas',
      gloveName: 'Predator Pro Hybrid'
    },
    { 
      id: 'alisson', 
      name: 'Alisson Becker', 
      image: '/images/idols/alisson.webp', 
      brand: 'nike',
      gloveName: 'Nike Goalkeeper Mercurial Touch Elite'
    },
    { 
      id: 'oblak', 
      name: 'Jan Oblak', 
      image: '/images/idols/oblak.jpg', 
      brand: 'puma',
      gloveName: 'Puma FUTURE Ultimate'
    },
    { 
      id: 'neuer', 
      name: 'Manuel Neuer', 
      image: '/images/idols/manuel.jpg', 
      brand: 'adidas',
      gloveName: 'adidas Predator Pro Hybrid'
    },
  ];

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'brand':
        setSelectedBrands(prev => 
          prev.includes(value) 
            ? prev.filter(brand => brand !== value)
            : [...prev, value]
        );
        break;
      case 'price':
        setSelectedPriceRanges(prev => 
          prev.includes(value) 
            ? prev.filter(price => price !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  const filteredGloves = useMemo(() => {
    return gloves.filter(glove => {
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(glove.brand);
      
      // Check if glove price matches any of the selected price ranges
      const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
        if (range === 'under-50') return glove.price < 50;
        if (range === '50-100') return glove.price >= 50 && glove.price <= 100;
        if (range === '100-150') return glove.price > 100 && glove.price <= 150;
        if (range === 'over-150') return glove.price > 150;
        return false;
      });

      return matchesBrand && matchesPrice;
    });
  }, [selectedBrands, selectedPriceRanges]);

  const sortedGloves = useMemo(() => {
    switch (sortBy) {
      case 'PriceLowHigh':
        return [...filteredGloves].sort((a, b) => a.price - b.price);
      case 'PriceHighLow':
        return [...filteredGloves].sort((a, b) => b.price - a.price);
      case 'Newest':
        return [...filteredGloves].sort((a, b) => b.id - a.id);
      default:
        return filteredGloves;
    }
  }, [filteredGloves, sortBy]);

  const paginatedGloves = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedGloves.slice(startIndex, startIndex + productsPerPage);
  }, [sortedGloves, currentPage]);

  const totalPages = Math.ceil(sortedGloves.length / productsPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      // Scroll to top of products section
      document.querySelector('.fb-store-products-section').scrollIntoView({ behavior: 'smooth' });
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      document.querySelector('.fb-store-products-section').scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler to reset all filters
  const handleSeeAllGloves = (e) => {
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setCurrentPage(1);
  };

  return (
    <section className="fb-store-football-gloves-page">
      <div className="fb-store-container">
        <div className="fb-store-header-section">
          <div className="fb-store-header-content-with-image">
            <div className="fb-store-header-content">
              <h1 className="fb-store-main-title">GOALKEEPER GLOVES</h1>
              
              <p className="fb-store-intro-text">
                To choose the right goalkeeper gloves for you, you'll need to consider the weather conditions you play in, your playing style, and your preferences for cut type and grip. Whether you need finger protection, premium latex for wet conditions, or a specific cut style that fits your hand perfectly, we have options for all keepers. Our collection includes all the top goalkeeper gloves on the market, from professional match gloves to training options for men, women, and youth. All gloves come with different cuts, grip types, and weather suitability. If you're not sure which gloves to buy, we have a recommendation tool to offer what you need based on your playing requirements.
              </p>
              
              <div className="fb-store-interests">
                <p>You may be interested in:</p>
                <div className="fb-store-interest-links">
                  <Link to="/glove-recommender" className="fb-store-interest-link">Glove recommender</Link>
                  <Link to="/gloves-on-sale" className="fb-store-interest-link">Gloves on sale</Link>
                  <Link to="/goalkeeper-accessories" className="fb-store-interest-link">Goalkeeper accessories</Link>
                </div>
              </div>
            </div>
            <div className="fb-store-header-image-cover">
              <img src="/images/slider/glovescover/1.jpg" alt="Goalkeeper Gloves Cover" />
            </div>
          </div>
          
          {/* Search box removed as requested */}
        </div>
        
        <div className="fb-store-filters-section">
          <div className="fb-store-filter-sidebar">
            <div className="fb-store-filter-category">
              <h3 className="fb-store-filter-title">Brand <span className="fb-store-arrow">▼</span></h3>
              <div className="fb-store-filter-options">
                {brands.map(brand => (
                  <label key={brand.id} className="fb-store-filter-option">
                    <input 
                      type="checkbox" 
                      name="brand" 
                      value={brand.id}
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => handleFilterChange('brand', brand.id)}
                    />
                    <span className="fb-store-filter-text">
                      <img src={brand.logo} alt={brand.name} className="fb-store-filter-brand-logo" />
                      {brand.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="fb-store-filter-category">
              <h3 className="fb-store-filter-title">Price <span className="fb-store-arrow">▼</span></h3>
              <div className="fb-store-filter-options">
                <label className="fb-store-filter-option">
                  <input 
                    type="checkbox" 
                    name="price" 
                    value="under-50"
                    checked={selectedPriceRanges.includes('under-50')}
                    onChange={() => handleFilterChange('price', 'under-50')}
                  />
                  <span className="fb-store-filter-text">Under €50</span>
                </label>
                <label className="fb-store-filter-option">
                  <input 
                    type="checkbox" 
                    name="price" 
                    value="50-100"
                    checked={selectedPriceRanges.includes('50-100')}
                    onChange={() => handleFilterChange('price', '50-100')}
                  />
                  <span className="fb-store-filter-text">€50 - €100</span>
                </label>
                <label className="fb-store-filter-option">
                  <input 
                    type="checkbox" 
                    name="price" 
                    value="100-150"
                    checked={selectedPriceRanges.includes('100-150')}
                    onChange={() => handleFilterChange('price', '100-150')}
                  />
                  <span className="fb-store-filter-text">€100 - €150</span>
                </label>
                <label className="fb-store-filter-option">
                  <input 
                    type="checkbox" 
                    name="price" 
                    value="over-150"
                    checked={selectedPriceRanges.includes('over-150')}
                    onChange={() => handleFilterChange('price', 'over-150')}
                  />
                  <span className="fb-store-filter-text">Over €150</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="fb-store-products-section">
            <div className="fb-store-sorting">
              <span className="fb-store-sort-text">Sort by:</span>
              <select 
                className="fb-store-sort-select" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Recommended">Recommended</option>
                <option value="PriceLowHigh">Price: Low to High</option>
                <option value="PriceHighLow">Price: High to Low</option>
                <option value="Newest">Newest</option>
              </select>
              
              <span className="fb-store-total-articles">Total articles: {sortedGloves.length}</span>
            </div>
            
            <div className="fb-store-products-grid">
              {paginatedGloves.map((glove) => (
                <div className="fb-store-product-card" key={glove.id}>
                  <Link to={`/football-gloves/${glove.id}`} className="fb-store-product-link">
                    <div className="fb-store-product-image">
                      <img src={glove.image} alt={glove.name} />
                      <div className="fb-store-brand-logo">
                        <img src={glove.brandLogo} alt={glove.brand} />
                      </div>
                      {glove.tag && <span className={`fb-store-product-tag ${glove.tag?.replace(/\s+/g, '-').toLowerCase()}`}>{glove.tag}</span>}
                    </div>
                    
                    <div className="fb-store-product-info">
                      <h3 className="fb-store-product-name">{glove.name}</h3>
                      <div className="fb-store-product-price">€{glove.price}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="fb-store-pagination">
              <button 
                className={`fb-store-pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="fb-store-pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                className={`fb-store-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Pro Goalkeepers Section */}
        <div className="fb-store-idols-boots-section">
          <h2 className="fb-store-section-title">Pro Goalkeeper Gloves</h2>
          <div className="fb-store-idols-boots-grid">
            {goalkeepers.map(goalkeeper => (
              <Link to={`/idol-boots/${goalkeeper.id}`} key={goalkeeper.id} className="fb-store-idol-boot">
                <div className="fb-store-idol-image">
                  <img src={goalkeeper.image} alt={goalkeeper.name} className="fb-store-idol-grid-image" />
                  <img 
                    src={`/images/brand-logos/${goalkeeper.brand}.jpg`} 
                    alt={goalkeeper.brand} 
                    className="fb-store-idol-brand-logo" 
                  />
                </div>
                <div className="fb-store-idol-info">
                  <h3 className="fb-store-idol-name">{goalkeeper.name}</h3>
                  <p className="fb-store-idol-boot-name">{goalkeeper.gloveName}</p>
                  <span className="fb-store-idol-brand">{goalkeeper.brand.toUpperCase()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FootballGloves; 