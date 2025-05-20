import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';

// Sample featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'Bota adidas F50 Elite LL FG Son',
    image: '/images/footballboots/1/main.webp',
    price: 249.99,
    type: 'boot',
    brand: 'adidas',
    brandLogo: '/images/brand-logos/adidas.jpg',
    description: 'Experience unparalleled speed and control with the adidas F50 Elite. Designed for elite performance.',
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    color: 'Core Black / Solar Yellow',
    material: 'Synthetic'
  },
  {
    id: 1,
    name: 'adidas Predator Pro Hybrid',
    image: '/images/footballgloves/1/main.jpg',
    price: 119.99,
    type: 'glove',
    brand: 'adidas',
    brandLogo: '/images/brand-logos/adidas.jpg',
    description: 'Professional goalkeeper gloves with hybrid cut for maximum grip and control.',
    sizes: ['7', '8', '9', '10', '11'],
    color: 'Black / Solar Yellow',
    material: 'Latex'
  },
  {
    id: 1,
    name: 'Real Madrid Home Kit 2023/24',
    image: '/images/jerseys/laliga/realmadrid/home.avif',
    price: 89.99,
    type: 'jersey',
    team: 'Real Madrid',
    teamLogo: '/images/team-logos/realmadrid.png',
    description: 'Official Real Madrid home jersey for the 2023/24 season. Classic white design with modern details.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'White',
    material: '100% Recycled Polyester'
  },
  {
    id: 2,
    name: 'Nike Air Zoom Mercurial Vapor 16 Elite KM FG',
    image: '/images/footballboots/2/main.webp',
    price: 229.99,
    type: 'boot',
    brand: 'nike',
    brandLogo: '/images/brand-logos/nike.jpg',
    description: 'The latest Nike Mercurial Vapor, featuring Air Zoom technology for explosive speed.',
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    color: 'Bright Crimson / Metallic Silver',
    material: 'Synthetic'
  },
  {
    id: 2,
    name: 'Nike Goalkeeper Mercurial Touch Elite',
    image: '/images/footballgloves/2/main.jpg',
    price: 129.99,
    type: 'glove',
    brand: 'nike',
    brandLogo: '/images/brand-logos/nike.jpg',
    description: 'Elite goalkeeper gloves with Mercurial Touch technology.',
    sizes: ['7', '8', '9', '10', '11'],
    color: 'Black / Volt',
    material: 'Latex'
  },
  {
    id: 31,
    name: 'PSG Home Kit 2023/24',
    image: '/images/jerseys/international/psg/home.jpeg',
    price: 94.99,
    type: 'jersey',
    team: 'PSG',
    teamLogo: '/images/team-logos/psg.png',
    description: 'Official Paris Saint-Germain home jersey for the 2023/24 season. Elegant Parisian design.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Midnight Navy / White',
    material: '100% Recycled Polyester'
  },
  {
    id: 3,
    name: 'Nike Goalkeeper Phantom Elite',
    image: '/images/footballgloves/3/main.jpg',
    price: 119.99,
    type: 'glove',
    brand: 'nike',
    brandLogo: '/images/brand-logos/nike.jpg',
    description: 'Elite goalkeeper gloves with enhanced grip and control.',
    sizes: ['7', '8', '9', '10', '11'],
    color: 'Black / Volt',
    material: 'Latex'
  },
  {
    id: 3,
    name: 'Barcelona Home Kit 2023/24',
    image: '/images/jerseys/laliga/barcelona/home.avif',
    price: 89.99,
    type: 'jersey',
    team: 'Barcelona',
    teamLogo: '/images/team-logos/barcelona.png',
    description: 'Official FC Barcelona home jersey for the 2023/24 season.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Blue / Red',
    material: '100% Recycled Polyester'
  },
  {
    id: 3,
    name: 'Bota adidas Predator Elite FT FG Jude Bellingham',
    image: '/images/footballboots/3/main.webp',
    price: 199.99,
    type: 'boot',
    brand: 'adidas',
    brandLogo: '/images/brand-logos/adidas.jpg',
    description: 'Signature Jude Bellingham Predator boots with elite performance features.',
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    color: 'Core Black / Gold',
    material: 'Synthetic'
  },
  {
    id: 4,
    name: 'Bota Nike Air Zoom Mercurial Superfly 10 Elite',
    image: '/images/footballboots/4/main.webp',
    price: 259.99,
    type: 'boot',
    brand: 'nike',
    brandLogo: '/images/brand-logos/nike.jpg',
    description: 'Premium Nike Mercurial Superfly with advanced Air Zoom technology.',
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    color: 'Bright Crimson / Black',
    material: 'Synthetic'
  },
 
];

// Recommended products data
const recommendedProducts = {
  boots: [
    {
      id: 11,
      name: 'Bota adidas F50 League FG/MG Messi',
      image: '/images/footballboots/11/main.webp',
      price: 199.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg'
    },
    {
      id: 13,
      name: 'Bota adidas Predator Elite FT SG',
      image: '/images/footballboots/13/main.webp',
      price: 219.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg'
    },
    {
      id: 18,
      name: 'Bota adidas F50 Elite FG Two Horizons',
      image: '/images/footballboots/18/main.webp',
      price: 229.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg'
    },
    {
      id: 21,
      name: 'Nike Air Zoom Mercurial Vapor 15',
      image: '/images/footballboots/21/main.webp',
      price: 249.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg'
    }
  ],
  gloves: [
    {
      id: 6,
      name: 'Uhlsport Hyperact Supergrip+',
      image: '/images/footballgloves/6/main.jpg',
      price: 99.99,
      brand: 'uhlsport',
      brandLogo: '/images/brand-logos/adidas.jpg'
    },
    {
      id: 7,
      name: 'Puma FUTURE Ultimate',
      image: '/images/footballgloves/7/main.jpg',
      price: 79.99,
      brand: 'puma',
      brandLogo: '/images/brand-logos/puma.jpg'
    },
    {
      id: 3,
      name: 'Nike Goalkeeper Phantom Elite',
      image: '/images/footballgloves/3/main.jpg',
      price: 119.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg'
    },
    {
      id: 4,
      name: 'adidas Predator Pro Hybrid',
      image: '/images/footballgloves/4/main.jpg',
      price: 129.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg'
    }
  ]
};

const FeaturedProducts = () => {
  return (
    <>
      <section className="fb-store-featured-section">
        <div className="fb-store-container">
          <h2 className="fb-store-featured-title">Featured Products</h2>
          <div className="fb-store-featured-grid">
            {featuredProducts.map(product => (
              <div 
                key={`${product.type}-${product.id}`} 
                className="fb-store-featured-card"
                data-type={product.type}
              >
                <Link 
                  to={
                    product.type === 'boot' ? `/football-boots/${product.id}` :
                    product.type === 'glove' ? `/football-gloves/${product.id}` :
                    `/team-jerseys/${product.id}`
                  }
                  className="fb-store-featured-link"
                >
                  <div className="fb-store-featured-image">
                    <img src={product.image} alt={product.name} />
                    <div className="fb-store-featured-logo">
                      <img 
                        src={product.type === 'jersey' ? product.teamLogo : product.brandLogo} 
                        alt={product.type === 'jersey' ? product.team : product.brand}
                      />
                    </div>
                  </div>
                  <div className="fb-store-featured-info">
                    <h3 className="fb-store-featured-name">{product.name}</h3>
                    <div className="fb-store-featured-price">€{product.price}</div>
                    <div className="fb-store-featured-type">
                      {product.type === 'boot' ? 'Football Boot' :
                       product.type === 'glove' ? 'Goalkeeper Glove' :
                       'Team Jersey'}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products Sections */}
      <section className="fb-store-recommended-section">
        <div className="fb-store-container">
          <h2 className="fb-store-recommended-title">Recommended Football Boots</h2>
          <div className="fb-store-recommended-grid">
            {recommendedProducts.boots.map(boot => (
              <div 
                key={boot.id} 
                className="fb-store-recommended-card"
                data-type="boot"
              >
                <Link to={`/football-boots/${boot.id}`} className="fb-store-recommended-link">
                  <div className="fb-store-recommended-image">
                    <img src={boot.image} alt={boot.name} />
                    <div className="fb-store-recommended-logo">
                      <img src={boot.brandLogo} alt={boot.brand} />
                    </div>
                  </div>
                  <div className="fb-store-recommended-info">
                    <h3 className="fb-store-recommended-name">{boot.name}</h3>
                    <div className="fb-store-recommended-price">€{boot.price}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fb-store-recommended-section">
        <div className="fb-store-container">
          <h2 className="fb-store-recommended-title">Recommended Goalkeeper Gloves</h2>
          <div className="fb-store-recommended-grid">
            {recommendedProducts.gloves.map(glove => (
              <div 
                key={glove.id} 
                className="fb-store-recommended-card"
                data-type="glove"
              >
                <Link to={`/football-gloves/${glove.id}`} className="fb-store-recommended-link">
                  <div className="fb-store-recommended-image">
                    <img src={glove.image} alt={glove.name} />
                    <div className="fb-store-recommended-logo">
                      <img src={glove.brandLogo} alt={glove.brand} />
                    </div>
                  </div>
                  <div className="fb-store-recommended-info">
                    <h3 className="fb-store-recommended-name">{glove.name}</h3>
                    <div className="fb-store-recommended-price">€{glove.price}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;

// Export the featured products data so it can be used in the details component
export { featuredProducts };