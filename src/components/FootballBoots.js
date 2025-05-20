import React, { useState, useMemo } from 'react';
import './FootballBoots.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const boots = [
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

const brands = [
  { id: 'adidas', name: 'Adidas', logo: '/images/brand-logos/adidas.jpg' },
  { id: 'nike', name: 'Nike', logo: '/images/brand-logos/nike.jpg' },
  { id: 'puma', name: 'Puma', logo: '/images/brand-logos/puma.jpg' },
  { id: 'under-armour', name: 'Under Armour', logo: '/images/brand-logos/under-armour.jpg' },
  { id: 'mizuno', name: 'Mizuno', logo: '/images/brand-logos/mizuno.png' },
  { id: 'skechers', name: 'Skechers', logo: '/images/brand-logos/skechers.jpg' },
];

const soleTypes = [
  { id: 'ag', name: 'AG Boots - Artificial Turf' },
  { id: 'fg', name: 'FG Boots - Natural Grass' },
  { id: 'fg-ag', name: 'FG/AG Boots - Natural and artificial grass' },
  { id: 'mg', name: 'MG Boots - Multi-lug' },
  { id: 'sg', name: 'SG Boots - Wet Natural Grass' },
  { id: 'turf', name: 'Turf Boots - Carpet / Cement' },
  { id: 'fg-mg', name: 'FG/MG Boots - Hard Ground' },
];

const materialTypes = [
  { id: 'leather', name: 'Leather Boots' },
  { id: 'synthetic', name: 'Synthetic Boots' },
];

const features = [
  { id: 'retro', name: 'Retro' },
  { id: 'limited', name: 'Limited edition' },
];

const sizes = [
  20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40
];

const priceRanges = [
  { id: 'under100', name: 'Under €100', min: 0, max: 99.99 },
  { id: '100-200', name: '€100 - €200', min: 100, max: 199.99 },
  { id: '200-300', name: '€200 - €300', min: 200, max: 299.99 },
  { id: 'over300', name: 'Over €300', min: 300, max: 10000 }
];

const FootballBoots = () => {
  const [sortBy, setSortBy] = useState('Recommended');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSoleTypes, setSelectedSoleTypes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  // Search box state variables removed

  const totalArticles = 1351;

  const idolBoots = [
    { 
      id: 'messi', 
      name: 'Lionel Messi', 
      image: '/images/idols/messi.webp', 
      brand: 'adidas',
      bootName: 'F50 Elite FG Messi'
    },
    { 
      id: 'ronaldo', 
      name: 'Cristiano Ronaldo', 
      image: '/images/idols/ronaldo.jpg', 
      brand: 'nike',
      bootName: 'Nike Air Zoom Mercurial Vapor 15 CR7'
    },
    { 
      id: 'mbappe', 
      name: 'Kylian Mbappé', 
      image: '/images/idols/mbappe.jpg', 
      brand: 'nike',
      bootName: 'Nike Air Zoom Mercurial Superfly 10 Elite'
    },
    { 
      id: 'haaland', 
      name: 'Erling Haaland', 
      image: '/images/idols/haaland.jpg', 
      brand: 'nike',
      bootName: 'Nike Phantom Luna II Elite FG'
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
      case 'sole':
        setSelectedSoleTypes(prev => 
          prev.includes(value) 
            ? prev.filter(sole => sole !== value)
            : [...prev, value]
        );
        break;
      case 'material':
        setSelectedMaterials(prev => 
          prev.includes(value) 
            ? prev.filter(material => material !== value)
            : [...prev, value]
        );
        break;
      case 'feature':
        setSelectedFeatures(prev => 
          prev.includes(value) 
            ? prev.filter(feature => feature !== value)
            : [...prev, value]
        );
        break;
      case 'size':
        setSelectedSizes(prev => 
          prev.includes(value) 
            ? prev.filter(size => size !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  const filteredBoots = useMemo(() => {
    return boots.filter(boot => {
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(boot.brand);
      const matchesSole = selectedSoleTypes.length === 0 || selectedSoleTypes.includes(boot.soleType);
      const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(boot.material);
      const matchesFeature = selectedFeatures.length === 0 || selectedFeatures.includes(boot.feature);
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(boot.size);
      const matchesPrice = !selectedPrice || (boot.price >= selectedPrice.min && boot.price <= selectedPrice.max);
      const matchesColor = !selectedColor || boot.color === selectedColor;

      return matchesBrand && matchesSole && matchesMaterial && matchesFeature && matchesSize && matchesPrice && matchesColor;
    });
  }, [selectedBrands, selectedSoleTypes, selectedMaterials, selectedFeatures, selectedSizes, selectedPrice, selectedColor]);

  const sortedBoots = useMemo(() => {
    switch (sortBy) {
      case 'PriceLowHigh':
        return [...filteredBoots].sort((a, b) => a.price - b.price);
      case 'PriceHighLow':
        return [...filteredBoots].sort((a, b) => b.price - a.price);
      case 'Newest':
        return [...filteredBoots].sort((a, b) => b.id - a.id);
      default:
        return filteredBoots;
    }
  }, [filteredBoots, sortBy]);

  const paginatedBoots = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedBoots.slice(startIndex, startIndex + productsPerPage);
  }, [sortedBoots, currentPage]);

  const totalPages = Math.ceil(sortedBoots.length / productsPerPage);

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
  const handleSeeAllBoots = (e) => {
    setSelectedBrands([]);
    setSelectedSoleTypes([]);
    setSelectedMaterials([]);
    setSelectedFeatures([]);
    setSelectedSizes([]);
    setSelectedPrice('');
    setSelectedColor('');
  };

  return (
  <section className="fb-store-football-boots-page">
    <div className="fb-store-container">
        <div className="fb-store-header-section">
          <div className="fb-store-header-content-with-image">
            <div className="fb-store-header-content">
              <h1 className="fb-store-main-title">FOOTBALL BOOTS</h1>
              
              <p className="fb-store-intro-text">
                To choose the right soccer cleat for you, you'll need to consider the turf or ground you play on, your skills, and your technical 
                characteristics. Choosing a sole that guarantees good traction on the field you play on or a boot with the weight and material 
                characteristics that best suit your characteristics is essential. Here you'll find all the soccer cleats on the market, from those made of 
                natural leather to ultralight and synthetic boots, as well as sock-like laceless boots for men, women, and children. All of them come with all 
                types of soles and available ranges. Even if you don't know which cleats to buy, we have a recommendation tool to offer you what you 
                need based on your needs on the field.
              </p>
              
              <div className="fb-store-interests">
                <p>You may be interested in:</p>
                <div className="fb-store-interest-links">
                  <Link to="/boot-recommender" className="fb-store-interest-link">Boot recommender</Link>
                  <Link to="/boots-on-sale" className="fb-store-interest-link">Boots on sale</Link>
                  <Link to="/accessories" className="fb-store-interest-link">Accessories for football boots</Link>
                </div>
              </div>
            </div>
            <div className="fb-store-header-image-cover">
              <img src="/images/slider/bootcover/1.jpg" alt="Football Boots Cover" />
            </div>
          </div>
          
          {/* Search box removed as requested */}
        </div>
        
        <div className="fb-store-filters-section">
          <div className="fb-store-filter-sidebar">
            <div className="fb-store-filter-category">
              <h3 className="fb-store-filter-title">Football boots <span className="fb-store-arrow">▼</span></h3>
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
                {priceRanges.map(range => (
                  <label key={range.id} className="fb-store-filter-option">
                    <input 
                      type="checkbox" 
                      name="price" 
                      value={range.id}
                      checked={selectedPrice && selectedPrice.min === range.min && selectedPrice.max === range.max}
                      onChange={() => {
                        if (selectedPrice && selectedPrice.min === range.min && selectedPrice.max === range.max) {
                          setSelectedPrice('');
                        } else {
                          setSelectedPrice({ min: range.min, max: range.max });
                        }
                      }}
                    />
                    <span className="fb-store-filter-text">{range.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Removed filters for sole type, material type, special features, and size as requested */}
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
              
              <span className="fb-store-total-articles">Total articles: {sortedBoots.length}</span>
            </div>
            
            <div className="fb-store-products-grid">
              {paginatedBoots.map((boot, index) => (
                <div className="fb-store-product-card" key={boot.id}>
                  <Link to={`/football-boots/${boot.id}`} className="fb-store-product-link">
                    <div className="fb-store-product-image">
                      <img src={boot.image} alt={boot.name} />
                      <div className="fb-store-brand-logo">
                        <img src={boot.brandLogo} alt={boot.brand} />
                      </div>
                      {boot.tag && <span className={`fb-store-product-tag ${boot.tag.replace(/\s+/g, '-').toLowerCase()}`}>{boot.tag}</span>}
                    </div>
                    
                    <div className="fb-store-product-info">
                      <h3 className="fb-store-product-name">{boot.name}</h3>
                      <div className="fb-store-product-price">€{boot.price}</div>
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

        {/* Idol Boots Section */}
        <div className="fb-store-idols-boots-section">
          <h2 className="fb-store-section-title">Idol Boots</h2>
          <div className="fb-store-idols-boots-grid">
            {idolBoots.map(idol => (
              <Link to={`/idol-boots/${idol.id}`} key={idol.id} className="fb-store-idol-boot">
                <div className="fb-store-idol-image">
                  <img src={idol.image} alt={idol.name} className="fb-store-idol-grid-image" />
                  <img 
                    src={`/images/brand-logos/${idol.brand}.jpg`} 
                    alt={idol.brand} 
                    className="fb-store-idol-brand-logo" 
                  />
                </div>
                <div className="fb-store-idol-info">
                  <h3 className="fb-store-idol-name">{idol.name}</h3>
                  <p className="fb-store-idol-boot-name">{idol.bootName}</p>
                  <span className="fb-store-idol-brand">{idol.brand.toUpperCase()}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  </section>
);
};

export default FootballBoots;