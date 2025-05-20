import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './IdolBoots.css';

const idolData = {
  messi: {
    name: 'Leo Messi',
    image: '/images/idols/1.webp',
    mainBoot: {
      id: 27,
      name: 'Puma Future Ultimate 4',
      image: '/images/footballboots/27/main.webp',
      price: 269.99,
      brand: 'adidas',
    },
  },
  ronaldo: {
    name: 'Cristiano Ronaldo',
    image: '/images/idols/2.webp',
    mainBoot: {
      id: 31,
      name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite AG-Pro',
      image: '/images/footballboots/31/main.webp',
      price: 289.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg'
    },
  },
  mbappe: {
    name: 'Kylian Mbappé',
    image: '/images/idols/3.webp',
    mainBoot: {
      id: 2,
      name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite KM FG',
      image: '/images/footballboots/2/main.webp',
      price: 269.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg',
    },
  },
  haaland: {
    name: 'Erling Haaland',
    image: '/images/idols/4.webp',
    mainBoot: {
      id: 8,
      name: 'Bota Nike Phantom Luna II Elite FG',
      image: '/images/footballboots/8/main.webp',
      price: 249.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg',
    },
  },

  yamal: {
    name: 'Lamine Yamal',
    image: '/images/idols/5.webp',
    mainBoot: {
      id: 32,
      name: 'Bota adidas F50 Elite LL AG',
      image: '/images/footballboots/32/main.webp',
      price: 269.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg',
    },
  },
  Bellingham: {
    name: 'Bellingham',
    image: '/images/idols/6.webp',
    mainBoot: {
      id: 13,
      name: 'Bota adidas Predator Elite FT SG Bellingham',
      image: '/images/footballboots/13/main.webp',
      price: 269.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg',
    },
  },

  vinicius: {
    name: 'Vinicius Junior',
    image: '/images/idols/7.webp',
    mainBoot: {
      id: 31,
      name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite AG-Pro',
      image: '/images/footballboots/31/main.webp',
      price: 269.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg',
    },
  },
  DeBruyne: {
    name: 'Kevin De Bruyne',
    image: '/images/idols/8.webp',
    mainBoot: {
      id: 8,
      name: 'Bota Nike Phantom Luna II Elite FG',
      image: '/images/footballboots/8/main.webp',
      price: 249.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg',
    },
  },
Pedri: {
    name: 'Pedri',
    image: '/images/idols/9.webp',
    mainBoot: {
      id: 13,
      name: 'Bota adidas Predator Elite FT SG',
      image: '/images/footballboots/13/main.webp',
      price: 219.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg',
    },
  },

  Salah: {
    name: 'Mohamed Salah',
    image: '/images/idols/10.webp',
    mainBoot: {
      id: 32,
      name: 'Bota adidas F50 Elite LL AG',
      image: '/images/footballboots/32/main.webp',
      price: 269.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg',
    },
  },
  Neymar: {
    name: 'Neymar Jr',
    image: '/images/idols/11.webp',
    mainBoot: {
      id: 33,
      name: 'Bota Puma Future 8 Ultimate FG',
      image: '/images/footballboots/33/main.webp',
      price: 194.99,
      brand: 'puma',
      brandLogo: '/images/brand-logos/puma.jpg',
    },
  },
  VanDijk: {
    name: 'Virgil van Dijk',
    image: '/images/idols/12.webp',
    mainBoot: {
      id: 34,
      name: 'Bota Nike Tiempo Legend 10 Elite FG',
      image: '/images/footballboots/34/main.webp',
      price: 179.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg',
    },
  },
  LukaModric: {
    name: 'Luka Modric',
    image: '/images/idols/13.webp',
    mainBoot: {
      id: 35,
      name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite FG',
      image: '/images/footballboots/35/main.webp',
      price: 249.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg',
    },
  },
  julian_alvarez: {
    name: 'Julian Alvarez',
    image: '/images/idols/14.webp',
    mainBoot: {
      id: 36,
      name: 'Bota adidas F50 Elite FG 2010',
      image: '/images/footballboots/36/main.webp',
      price: 259.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg',
    },
    
  },
  dani_olmo: {
    name: 'Dani Olmo',
    image: '/images/idols/15.webp',
    mainBoot: {
      id: 32,
      name: 'Bota adidas F50 Elite LL AG',
      image: '/images/footballboots/32/main.webp',
      price: 269.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg',
    },
    
  },
  Lautaro_Martinez: {
    name: 'Lautaro Martinez',
    image: '/images/idols/17.webp',
    mainBoot: {
      id: 31,
      name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite AG-Pro',
      image: '/images/footballboots/31/main.webp',
      price: 289.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg',
    },
    
  },
  Nico_Williams: {
    name: 'Nico Williams',
    image: '/images/idols/16.webp',
    mainBoot: {
      id: 31,
      name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite AG-Pro',
      image: '/images/footballboots/31/main.webp',
      price: 289.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg',
    },
    
  },
  Kane: {
    name: 'Harry Kane',
    image: '/images/idols/18.webp',
    mainBoot: {
      id: 12,
      name: 'Bota Skechers Skx_1.5 Elite FG',
      image: '/images/footballboots/37/main.webp',
      price: 269.99,
      brand: 'nike',
    },
    
  },

  RobertLewandowsk: {
    name: 'RobertLewandowsk',
    image: '/images/idols/19.webp',
    mainBoot: {
      id: 12,
      name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite AG-Pro',
      image: '/images/footballboots/31/main.webp',
      price: 269.99,
      brand: 'nike',
    },
    
  },

  Rodri: {
    name: 'Rodri',
    image: '/images/idols/20.webp',
    mainBoot: {
      id: 12,
      name: 'Bota Nike Phantom Luna II Elite FG',
      image: '/images/footballboots/8/main.webp',
      price: 269.99,
      brand: 'nike',
    },
    
  },
  Rodrygo: {
    name: 'Rodrygo',
    image: '/images/idols/21.webp',
    mainBoot: {
      id: 12,
      name: 'Bota Nike Air Zoom Mercurial Vapor 16 Elite AG-Pro',
      image: '/images/footballboots/31/main.webp',
      price: 269.99,
      brand: 'nike',
    },
  },
  courtois: {
    name: 'Thibaut Courtois',
    image: '/images/idols/24.jpg',
    mainBoot: {
      id: 1,
      name: 'adidas Predator Pro Hybrid',
      image: '/images/footballgloves/1/main.jpg',
      price: 119.99,
      brand: 'adidas',
      brandLogo: '/images/brand-logos/adidas.jpg',
      isGlove: true
    },
  },
  alisson: {
    name: 'Alisson Becker',
    image: '/images/idols/22.webp',
    mainBoot: {
      id: 2,
      name: 'Nike Goalkeeper Mercurial Touch Elite',
      image: '/images/footballgloves/2/main.jpg',
      price: 129.99,
      brand: 'nike',
      brandLogo: '/images/brand-logos/nike.jpg',
      isGlove: true
    },
  },
  oblak: {
    name: 'Jan Oblak',
    image: '/images/idols/23.webp',
    mainBoot: {
      id: 7,
      name: 'Puma FUTURE Ultimate',
      image: '/images/footballgloves/7/main.jpg',
      price: 79.99,
      brand: 'puma',
      brandLogo: '/images/brand-logos/puma.jpg',
      isGlove: true
    },
  },
  neuer: {
    name: 'Manuel Neuer',
    image: '/images/idols/25.jpg',
    mainBoot: {
      id: 6,
      name: 'Uhlsport Hyperact Supergrip+',
      image: '/images/footballgloves/6/main.jpg',
      price: 99.99,
      brand: 'uhlsport',
      brandLogo: '/images/brand-logos/uhlsport.jpg',
      isGlove: true
    },
  },
};



const IdolBoots = () => {
  const { idolName } = useParams();

  // Separate goalkeepers and field players
  const fieldPlayers = Object.entries(idolData).filter(([_, player]) => !player.mainBoot.isGlove);
  const goalkeepers = Object.entries(idolData).filter(([_, player]) => player.mainBoot.isGlove);

  // Function to get related players based on player type
  const getRelatedPlayers = (currentId, isGoalkeeper) => {
    return (isGoalkeeper ? goalkeepers : fieldPlayers)
      .filter(([key]) => key !== currentId)
      .map(([key, playerData]) => ({ key, ...playerData }));
  };

  // If no specific idol is selected, show all idols
  if (!idolName) {
    return (
      <section className="fb-store-idol-boots-section">
        <div className="fb-store-container">
          <div className="fb-store-idol-boots-breadcrumb">
            <Link to="/">Home</Link> / Idols & Boots
          </div>
          
          <h1 className="fb-store-idol-boots-title">
            FOOTBALL IDOLS AND THEIR BOOTS
          </h1>
          
          <div className="fb-store-related-players" style={{ marginTop: '2rem' }}>
            {fieldPlayers.map(([key, playerData]) => (
              <Link 
                to={`/idol-boots/${key}`} 
                key={key} 
                className="fb-store-related-player-card"
              >
                <img 
                  src={playerData.image} 
                  alt={playerData.name} 
                  className="fb-store-related-player-image"
                />
                <div className="fb-store-related-player-info">
                  <span className="fb-store-related-player-name">{playerData.name}</span>
                  <span className="fb-store-related-player-boot">
                    {playerData.mainBoot.name}
                  </span>
                  <span className="fb-store-related-player-price">
                    {playerData.mainBoot.price.toLocaleString('en-US', { 
                      style: 'currency', 
                      currency: 'EUR',
                      minimumFractionDigits: 2
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const idol = idolData[idolName];

  if (!idol) {
    return (
      <div className="fb-store-idol-not-found">
        <div className="fb-store-container">
          <h2>Player Not Found</h2>
          <p>We couldn't find information for this player.</p>
          <Link to="/idol-boots" className="fb-store-btn-primary">Browse All Players</Link>
        </div>
      </div>
    );
  }

  // Get related players based on whether current player is a goalkeeper
  const relatedPlayers = getRelatedPlayers(idolName, idol.mainBoot.isGlove);

  return (
    <section className="fb-store-idol-boots-section">
      <div className="fb-store-container">
        <div className="fb-store-idol-boots-breadcrumb">
          <Link to="/">Home</Link> / 
          <Link to={idol.mainBoot.isGlove ? "/football-gloves" : "/football-boots"}>
            {idol.mainBoot.isGlove ? 'Goalkeeper Gloves' : 'Football Boots'}
          </Link> / {idol.name}
        </div>
        
        <h1 className="fb-store-idol-boots-title">
          {idol.mainBoot.isGlove ? 
            `THE GLOVES OF ` : 
            `THE BOOTS OF `}
          <span className="fb-store-idol-name">{idol.name.toUpperCase()}</span>
        </h1>
        
        <div className="fb-store-idol-boots-showcase">
          <div className="fb-store-idol-image-container">
            <img 
              src={idol.image} 
              alt={idol.name} 
              className="fb-store-idol-image"
            />
            <div className="fb-store-idol-badge">
              <span className="fb-store-idol-badge-text">PRO CHOICE</span>
            </div>
          </div>
          
          <div className="fb-store-boot-details">
            {idol.mainBoot.brandLogo && (
              <div className="fb-store-boot-brand">
                <img 
                  src={idol.mainBoot.brandLogo} 
                  alt={idol.mainBoot.brand} 
                  className="fb-store-boot-brand-logo"
                />
                <div className="fb-store-boot-brand-tag">{idol.mainBoot.brand.toUpperCase()}</div>
              </div>
            )}
            <h2 className="fb-store-boot-name">{idol.mainBoot.name}</h2>
            <div className="fb-store-boot-price">
              {idol.mainBoot.price.toLocaleString('en-US', { 
                style: 'currency', 
                currency: 'EUR',
                minimumFractionDigits: 2
              })}
            </div>
            
            <div className="fb-store-boot-image-container">
              <div className="fb-store-boot-image-wrapper">
                <img 
                  src={idol.mainBoot.image} 
                  alt={idol.mainBoot.name} 
                  className={`fb-store-boot-image ${idol.mainBoot.isGlove ? 'fb-store-glove-image' : ''}`}
                />
              </div>
            </div>
            <Link 
              className="fb-store-boot-view-btn" 
              to={idol.mainBoot.isGlove ? `/football-gloves/${idol.mainBoot.id}` : `/football-boots/${idol.mainBoot.id}`}
            >
              View Details
            </Link>
          </div>
        </div>
        
        <div className="fb-store-related-section">
          <h3 className="fb-store-related-title">
            {idol.mainBoot.isGlove ? 'More Pro Goalkeeper Gloves' : 'More Pro Player Boots'}
          </h3>
          <div className="fb-store-related-players">
            {relatedPlayers.map((playerData) => (
              <Link 
                to={`/idol-boots/${playerData.key}`} 
                key={playerData.key} 
                className={`fb-store-related-player-card ${idol.mainBoot.isGlove ? 'fb-store-goalkeeper-card' : ''}`}
              >
                <img 
                  src={playerData.image} 
                  alt={playerData.name} 
                  className="fb-store-related-player-image"
                />
                <div className="fb-store-related-player-info">
                  <span className="fb-store-related-player-name">{playerData.name}</span>
                  <span className="fb-store-related-player-boot">{playerData.mainBoot.brand}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdolBoots;