import React, { useState, useMemo, useEffect } from 'react';
import './TeamJerseys.css';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Sample jersey data for different leagues
const jerseys = {
  laliga: [
    // Real Madrid
    { id: 1, name: 'Real Madrid Home Kit 2024/25', image: '/images/jerseys/laliga/realmadrid/home.avif', price: 89.99, team: 'Real Madrid', teamLogo: '/images/team-logos/realmadrid.png', type: 'Home', description: 'Official Real Madrid home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 2, name: 'Real Madrid Away Kit 2024/25', image: '/images/jerseys/laliga/realmadrid/away.avif', price: 89.99, team: 'Real Madrid', teamLogo: '/images/team-logos/realmadrid.png', type: 'Away', description: 'Official Real Madrid away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // FC Barcelona
    { id: 3, name: 'FC Barcelona Home Kit 2024/25', image: '/images/jerseys/laliga/barcelona/home.avif', price: 89.99, team: 'FC Barcelona', teamLogo: '/images/team-logos/barcelona.png', type: 'Home', description: 'Official FC Barcelona home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 4, name: 'FC Barcelona Away Kit 2024/25', image: '/images/jerseys/laliga/barcelona/away.jpg', price: 89.99, team: 'FC Barcelona', teamLogo: '/images/team-logos/barcelona.png', type: 'Away', description: 'Official FC Barcelona away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Atletico de Madrid
    { id: 5, name: 'Atletico de Madrid Home Kit 2024/25', image: '/images/jerseys/laliga/atletico/home.jpg', price: 84.99, team: 'Atletico de Madrid', teamLogo: '/images/team-logos/atletico.png', type: 'Home', description: 'Official Atletico de Madrid home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 6, name: 'Atletico de Madrid Away Kit 2024/25', image: '/images/jerseys/laliga/atletico/away.avif', price: 84.99, team: 'Atletico de Madrid', teamLogo: '/images/team-logos/atletico.png', type: 'Away', description: 'Official Atletico de Madrid away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Athletic Club de Bilbao
    { id: 7, name: 'Athletic Club de Bilbao Home Kit 2024/25', image: '/images/jerseys/laliga/athletic/home.avif', price: 79.99, team: 'Athletic Club de Bilbao', teamLogo: '/images/team-logos/athletic.png', type: 'Home', description: 'Official Athletic Club de Bilbao home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 8, name: 'Athletic Club de Bilbao Away Kit 2024/25', image: '/images/jerseys/laliga/athletic/away.avif', price: 79.99, team: 'Athletic Club de Bilbao', teamLogo: '/images/team-logos/athletic.png', type: 'Away', description: 'Official Athletic Club de Bilbao away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Real Betis
    { id: 9, name: 'Real Betis Home Kit 2024/25', image: '/images/jerseys/laliga/betis/home.avif', price: 79.99, team: 'Real Betis', teamLogo: '/images/team-logos/betis.png', type: 'Home', description: 'Official Real Betis home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 10, name: 'Real Betis Away Kit 2024/25', image: '/images/jerseys/laliga/betis/away.avif', price: 79.99, team: 'Real Betis', teamLogo: '/images/team-logos/betis.png', type: 'Away', description: 'Official Real Betis away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // RCD Mallorca
    { id: 11, name: 'RCD Mallorca Home Kit 2024/25', image: '/images/jerseys/laliga/mallorca/home.webp', price: 74.99, team: 'RCD Mallorca', teamLogo: '/images/team-logos/mallorca.png', type: 'Home', description: 'Official RCD Mallorca home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 12, name: 'RCD Mallorca Away Kit 2024/25', image: '/images/jerseys/laliga/mallorca/away.jpeg', price: 74.99, team: 'RCD Mallorca', teamLogo: '/images/team-logos/mallorca.png', type: 'Away', description: 'Official RCD Mallorca away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Sevilla CF
    { id: 13, name: 'Sevilla CF Home Kit 2024/25', image: '/images/jerseys/laliga/sevilla/home.jpeg', price: 79.99, team: 'Sevilla CF', teamLogo: '/images/team-logos/sevilla.png', type: 'Home', description: 'Official Sevilla CF home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 14, name: 'Sevilla CF Away Kit 2024/25', image: '/images/jerseys/laliga/sevilla/away.jpg', price: 79.99, team: 'Sevilla CF', teamLogo: '/images/team-logos/sevilla.png', type: 'Away', description: 'Official Sevilla CF away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' }
  ],
  international: [
    // Inter Milan
    { id: 15, name: 'Inter Milan Home Kit 2024/25', image: '/images/jerseys/international/inter_milan/home.webp', price: 89.99, team: 'Inter Milan', teamLogo: '/images/team-logos/inter.png', type: 'Home', description: 'Official Inter Milan home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 16, name: 'Inter Milan Away Kit 2024/25', image: '/images/jerseys/international/inter_milan/away.webp', price: 89.99, team: 'Inter Milan', teamLogo: '/images/team-logos/inter.png', type: 'Away', description: 'Official Inter Milan away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // AC Milan
    { id: 17, name: 'AC Milan Home Kit 2024/25', image: '/images/jerseys/international/ac_milan/home.webp', price: 89.99, team: 'AC Milan', teamLogo: '/images/team-logos/acmilan.png', type: 'Home', description: 'Official AC Milan home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 18, name: 'AC Milan Away Kit 2024/25', image: '/images/jerseys/international/ac_milan/away.jpg', price: 89.99, team: 'AC Milan', teamLogo: '/images/team-logos/acmilan.png', type: 'Away', description: 'Official AC Milan away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Juventus
    { id: 19, name: 'Juventus Home Kit 2024/25', image: '/images/jerseys/international/juventus/home.jpeg', price: 89.99, team: 'Juventus', teamLogo: '/images/team-logos/juventus.png', type: 'Home', description: 'Official Juventus home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 20, name: 'Juventus Away Kit 2024/25', image: '/images/jerseys/international/juventus/away.webp', price: 89.99, team: 'Juventus', teamLogo: '/images/team-logos/juventus.png', type: 'Away', description: 'Official Juventus away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Chelsea FC
    { id: 21, name: 'Chelsea FC Home Kit 2024/25', image: '/images/jerseys/international/chelsea/home.jpeg', price: 94.99, team: 'Chelsea FC', teamLogo: '/images/team-logos/chelsea.png', type: 'Home', description: 'Official Chelsea FC home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 22, name: 'Chelsea FC Away Kit 2024/25', image: '/images/jerseys/international/chelsea/away.jpeg', price: 94.99, team: 'Chelsea FC', teamLogo: '/images/team-logos/chelsea.png', type: 'Away', description: 'Official Chelsea FC away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Manchester City FC
    { id: 23, name: 'Manchester City FC Home Kit 2024/25', image: '/images/jerseys/international/man_city/home.jpeg', price: 94.99, team: 'Manchester City FC', teamLogo: '/images/team-logos/mancity.png', type: 'Home', description: 'Official Manchester City FC home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 24, name: 'Manchester City FC Away Kit 2024/25', image: '/images/jerseys/international/man_city/away.jpeg', price: 94.99, team: 'Manchester City FC', teamLogo: '/images/team-logos/mancity.png', type: 'Away', description: 'Official Manchester City FC away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Arsenal FC
    { id: 25, name: 'Arsenal FC Home Kit 2024/25', image: '/images/jerseys/international/arsenal/home.jpeg', price: 94.99, team: 'Arsenal FC', teamLogo: '/images/team-logos/arsenal.png', type: 'Home', description: 'Official Arsenal FC home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 26, name: 'Arsenal FC Away Kit 2024/25', image: '/images/jerseys/international/arsenal/away.jpeg', price: 94.99, team: 'Arsenal FC', teamLogo: '/images/team-logos/arsenal.png', type: 'Away', description: 'Official Arsenal FC away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Liverpool FC
    { id: 27, name: 'Liverpool FC Home Kit 2024/25', image: '/images/jerseys/international/liverpool/home.jpg', price: 94.99, team: 'Liverpool FC', teamLogo: '/images/team-logos/liverpool.png', type: 'Home', description: 'Official Liverpool FC home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 28, name: 'Liverpool FC Away Kit 2024/25', image: '/images/jerseys/international/liverpool/away.jpeg', price: 94.99, team: 'Liverpool FC', teamLogo: '/images/team-logos/liverpool.png', type: 'Away', description: 'Official Liverpool FC away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Manchester United FC
    { id: 29, name: 'Manchester United FC Home Kit 2024/25', image: '/images/jerseys/international/man_utd/home.jpeg', price: 94.99, team: 'Manchester United FC', teamLogo: '/images/team-logos/man_utd.png', type: 'Home', description: 'Official Manchester United FC home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 30, name: 'Manchester United FC Away Kit 2024/25', image: '/images/jerseys/international/man_utd/away.jpeg', price: 94.99, team: 'Manchester United FC', teamLogo: '/images/team-logos/man_utd.png', type: 'Away', description: 'Official Manchester United FC away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // PSG
    { id: 31, name: 'PSG Home Kit 2024/25', image: '/images/jerseys/international/psg/home.jpeg', price: 94.99, team: 'PSG', teamLogo: '/images/team-logos/psg.png', type: 'Home', description: 'Official PSG home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 32, name: 'PSG Away Kit 2024/25', image: '/images/jerseys/international/psg/away.jpeg', price: 94.99, team: 'PSG', teamLogo: '/images/team-logos/psg.png', type: 'Away', description: 'Official PSG away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Bayern Munich
    { id: 33, name: 'Bayern Munich Home Kit 2024/25', image: '/images/jerseys/international/bayern/home.jpeg', price: 89.99, team: 'Bayern Munich', teamLogo: '/images/team-logos/bayern.png', type: 'Home', description: 'Official Bayern Munich home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 34, name: 'Bayern Munich Away Kit 2024/25', image: '/images/jerseys/international/bayern/away.jpeg', price: 89.99, team: 'Bayern Munich', teamLogo: '/images/team-logos/bayern.png', type: 'Away', description: 'Official Bayern Munich away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' }
  ],
  secondDivision: [
    // Real Zaragoza
    { id: 35, name: 'Real Zaragoza Home Kit 2024/25', image: '/images/jerseys/2ndlaliga/zaragoza/home.jpg', price: 69.99, team: 'Real Zaragoza', teamLogo: '/images/team-logos/zaragoza.png', type: 'Home', description: 'Official Real Zaragoza home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 36, name: 'Real Zaragoza Away Kit 2024/25', image: '/images/jerseys/2ndlaliga/zaragoza/away.jpg', price: 69.99, team: 'Real Zaragoza', teamLogo: '/images/team-logos/zaragoza.png', type: 'Away', description: 'Official Real Zaragoza away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // SD Huesca
    { id: 37, name: 'SD Huesca Home Kit 2024/25', image: '/images/jerseys/2ndlaliga/huesca/home.jpeg', price: 69.99, team: 'SD Huesca', teamLogo: '/images/team-logos/huesca.png', type: 'Home', description: 'Official SD Huesca home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 38, name: 'SD Huesca Away Kit 2024/25', image: '/images/jerseys/2ndlaliga/huesca/away.jpeg', price: 69.99, team: 'SD Huesca', teamLogo: '/images/team-logos/huesca.png', type: 'Away', description: 'Official SD Huesca away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Sporting de Gijón
    { id: 39, name: 'Sporting de Gijón Home Kit 2024/25', image: '/images/jerseys/2ndlaliga/sporting/home.jpeg', price: 69.99, team: 'Sporting de Gijón', teamLogo: '/images/team-logos/sporting.png', type: 'Home', description: 'Official Sporting de Gijón home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 40, name: 'Sporting de Gijón Away Kit 2024/25', image: '/images/jerseys/2ndlaliga/sporting/away.jpeg', price: 69.99, team: 'Sporting de Gijón', teamLogo: '/images/team-logos/sporting.png', type: 'Away', description: 'Official Sporting de Gijón away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Málaga CF
    { id: 41, name: 'Málaga CF Home Kit 2024/25', image: '/images/jerseys/2ndlaliga/malaga/home.jpeg', price: 69.99, team: 'Málaga CF', teamLogo: '/images/team-logos/malaga.png', type: 'Home', description: 'Official Málaga CF home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 42, name: 'Málaga CF Away Kit 2024/25', image: '/images/jerseys/2ndlaliga/malaga/away.jpeg', price: 69.99, team: 'Málaga CF', teamLogo: '/images/team-logos/malaga.png', type: 'Away', description: 'Official Málaga CF away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    
    // Granada CF
    { id: 43, name: 'Granada CF Home Kit 2024/25', image: '/images/jerseys/2ndlaliga/granada/home.jpeg', price: 69.99, team: 'Granada CF', teamLogo: '/images/team-logos/granada.png', type: 'Home', description: 'Official Granada CF home kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' },
    { id: 44, name: 'Granada CF Away Kit 2024/25', image: '/images/jerseys/2ndlaliga/granada/away.jpeg', price: 69.99, team: 'Granada CF', teamLogo: '/images/team-logos/granada.png', type: 'Away', description: 'Official Granada CF away kit for the 2024/25 season. High-quality, comfortable, and perfect for fans.' }
  ]
};

// Combined jerseys array for filtering
const allJerseys = [...jerseys.laliga, ...jerseys.international, ...jerseys.secondDivision];

// Add brands array for brand logos
const brands = [
  { id: 'adidas', name: 'Adidas', logo: '/images/brand-logos/adidas.jpg' },
  { id: 'nike', name: 'Nike', logo: '/images/brand-logos/nike.jpg' },
  { id: 'puma', name: 'Puma', logo: '/images/brand-logos/puma.jpg' },
  { id: 'under-armour', name: 'Under Armour', logo: '/images/brand-logos/under-armour.jpg' },
  { id: 'mizuno', name: 'Mizuno', logo: '/images/brand-logos/mizuno.png' }
];

// Define teams for filtering
const teams = [
  // LaLiga teams
  { id: 'real_madrid', name: 'Real Madrid', logo: '/images/team-logos/realmadrid.png', league: 'laliga', brand: 'adidas' },
  { id: 'barcelona', name: 'FC Barcelona', logo: '/images/team-logos/barcelona.png', league: 'laliga', brand: 'nike' },
  { id: 'atletico', name: 'Atletico de Madrid', logo: '/images/team-logos/atletico.png', league: 'laliga', brand: 'nike' },
  { id: 'athletic', name: 'Athletic Club de Bilbao', logo: '/images/team-logos/athletic.png', league: 'laliga', brand: 'nike' },
  { id: 'betis', name: 'Real Betis', logo: '/images/team-logos/betis.png', league: 'laliga', brand: 'hummel' }, // Hummel (not in brands array)
  { id: 'mallorca', name: 'RCD Mallorca', logo: '/images/team-logos/mallorca.png', league: 'laliga', brand: 'nike' },
  { id: 'sevilla', name: 'Sevilla CF', logo: '/images/team-logos/sevilla.png', league: 'laliga', brand: 'castore' }, // Castore (not in brands array)
  
  // International teams
  { id: 'inter', name: 'Inter Milan', logo: '/images/team-logos/inter.png', league: 'international', brand: 'nike' },
  { id: 'ac_milan', name: 'AC Milan', logo: '/images/team-logos/acmilan.png', league: 'international', brand: 'puma' },
  { id: 'juventus', name: 'Juventus', logo: '/images/team-logos/juventus.png', league: 'international', brand: 'adidas' },
  { id: 'chelsea', name: 'Chelsea FC', logo: '/images/team-logos/chelsea.png', league: 'international', brand: 'nike' },
  { id: 'man_city', name: 'Manchester City FC', logo: '/images/team-logos/mancity.png', league: 'international', brand: 'puma' },
  { id: 'arsenal', name: 'Arsenal FC', logo: '/images/team-logos/arsenal.png', league: 'international', brand: 'adidas' },
  { id: 'liverpool', name: 'Liverpool FC', logo: '/images/team-logos/liverpool.png', league: 'international', brand: 'nike' },
  { id: 'man_utd', name: 'Manchester United FC', logo: '/images/team-logos/man_utd.png', league: 'international', brand: 'adidas' },
  { id: 'psg', name: 'PSG', logo: '/images/team-logos/psg.png', league: 'international', brand: 'nike' },
  { id: 'bayern', name: 'Bayern Munich', logo: '/images/team-logos/bayern.png', league: 'international', brand: 'adidas' },
  
  // Second Division teams
  { id: 'zaragoza', name: 'Real Zaragoza', logo: '/images/team-logos/zaragoza.png', league: 'secondDivision', brand: null },
  { id: 'huesca', name: 'SD Huesca', logo: '/images/team-logos/huesca.png', league: 'secondDivision', brand: null },
  { id: 'sporting', name: 'Sporting de Gijón', logo: '/images/team-logos/sporting.png', league: 'secondDivision', brand: null },
  { id: 'malaga', name: 'Málaga CF', logo: '/images/team-logos/malaga.png', league: 'secondDivision', brand: null },
  { id: 'granada', name: 'Granada CF', logo: '/images/team-logos/granada.png', league: 'secondDivision', brand: null }
];

// Jersey types - removed Third Kit
const jerseyTypes = [
  { id: 'home', name: 'Home Kit' },
  { id: 'away', name: 'Away Kit' }
];

// Leagues for filtering
const leagues = [
  { id: 'laliga', name: 'LaLiga EA Sports' },
  { id: 'international', name: 'Top International Teams' },
  { id: 'secondDivision', name: '2nd LaLiga Hypermotion' }
];

// Sizes
const sizes = [
  'XS', 'S', 'M', 'L', 'XL', 'XXL'
];

const TeamJerseys = () => {
  const { teamId } = useParams();
  const location = useLocation();
  
  const [sortBy, setSortBy] = useState('Recommended');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  // State for search box
  const [searchTeam, setSearchTeam] = useState('');
  const [searchLeague, setSearchLeague] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchSize, setSearchSize] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  
  // Effect to handle URL parameters
  useEffect(() => {
    // If teamId is provided in URL, filter by that team
    if (teamId) {
      setSelectedTeams([teamId]);
    }
    
    // If we're on the "all" route, clear all filters
    if (location.pathname === '/team-jerseys/all') {
      handleSeeAllJerseys();
    }
  }, [teamId, location.pathname]);
  
  // Handler for search box 'Look for' button
  const handleSearchBox = (e) => {
    e.preventDefault();
    
    if (searchTeam) setSelectedTeams([searchTeam]);
    else setSelectedTeams([]);
    
    if (searchLeague) setSelectedLeagues([searchLeague]);
    else setSelectedLeagues([]);
    
    if (searchType) setSelectedTypes([searchType.toLowerCase()]);
    else setSelectedTypes([]);
    
    if (searchSize) setSelectedSizes([searchSize]);
    else setSelectedSizes([]);
    
    if (searchPrice) {
      if (searchPrice === '100+') setSelectedPrice({ min: 100, max: 10000 });
      else {
        const [min, max] = searchPrice.split('-');
        setSelectedPrice({ min: Number(min), max: Number(max) });
      }
    } else setSelectedPrice('');
  };
  
  // Handler to reset all filters
  const handleSeeAllJerseys = () => {
    setSelectedTeams([]);
    setSelectedLeagues([]);
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedPrice('');
    setSearchTeam('');
    setSearchLeague('');
    setSearchType('');
    setSearchSize('');
    setSearchPrice('');
  };
  
  // Handler for filter changes
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'team':
        setSelectedTeams(prev => 
          prev.includes(value) 
            ? prev.filter(team => team !== value)
            : [...prev, value]
        );
        break;
      case 'league':
        setSelectedLeagues(prev => 
          prev.includes(value) 
            ? prev.filter(league => league !== value)
            : [...prev, value]
        );
        break;
      case 'type':
        // Convert type to lowercase for consistent comparison
        const lowerCaseValue = value.toLowerCase();
        setSelectedTypes(prev => 
          prev.includes(lowerCaseValue) 
            ? prev.filter(type => type !== lowerCaseValue)
            : [...prev, lowerCaseValue]
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
  
  // Filter jerseys based on selected filters
  const filteredJerseys = useMemo(() => {
    return allJerseys.filter(jersey => {
      // Fix: Use team objects to find team by name and get its ID
      const teamObject = teams.find(t => t.name === jersey.team);
      const teamId = teamObject ? teamObject.id : '';
      
      const matchesTeam = selectedTeams.length === 0 || selectedTeams.includes(teamId);
      const league = teamObject ? teamObject.league : '';
      const matchesLeague = selectedLeagues.length === 0 || selectedLeagues.includes(league);
      
      // Fix: Case-insensitive type matching
      const jerseyType = jersey.type.toLowerCase();
      const matchesType = selectedTypes.length === 0 || selectedTypes.some(type => type.toLowerCase() === jerseyType);
      
      const matchesSize = selectedSizes.length === 0 || true; // We don't have size data in jerseys yet
      const matchesPrice = !selectedPrice || (jersey.price >= selectedPrice.min && jersey.price <= selectedPrice.max);
      
      return matchesTeam && matchesLeague && matchesType && matchesSize && matchesPrice;
    });
  }, [selectedTeams, selectedLeagues, selectedTypes, selectedSizes, selectedPrice]);
  
  // Sort jerseys based on selected sort option
  const sortedJerseys = useMemo(() => {
    switch (sortBy) {
      case 'PriceLowHigh':
        return [...filteredJerseys].sort((a, b) => a.price - b.price);
      case 'PriceHighLow':
        return [...filteredJerseys].sort((a, b) => b.price - a.price);
      case 'Newest':
        return [...filteredJerseys].sort((a, b) => b.id - a.id);
      default:
        return filteredJerseys;
    }
  }, [filteredJerseys, sortBy]);
  
  const paginatedJerseys = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedJerseys.slice(startIndex, startIndex + productsPerPage);
  }, [sortedJerseys, currentPage]);

  const totalPages = Math.ceil(sortedJerseys.length / productsPerPage);

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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTeams, selectedLeagues, selectedTypes, selectedSizes, selectedPrice, sortBy]);

  return (
    <section className="fb-store-team-jerseys-page">
      <div className="fb-store-container">
        <div className="fb-store-header-section">
          <div className="fb-store-header-content-with-image">
            <div className="fb-store-header-content">
              <h1 className="fb-store-main-title">TEAM JERSEYS</h1>
              
              <p className="fb-store-intro-text">
                Show your team colors with our authentic collection of football jerseys from top clubs around the world. 
                Our selection includes the latest home, away, and third kits from LaLiga, Premier League, Serie A, and more. 
                Each jersey is crafted with premium materials for comfort and durability, ensuring you look and feel your best 
                whether you're at the stadium or watching from home. Browse by team, league, or style to find the perfect jersey 
                to represent your favorite club.
              </p>
              
              <div className="fb-store-interests">
                <p>You may be interested in:</p>
                <div className="fb-store-interest-links">
                  <Link to="/personalized-jerseys" className="fb-store-interest-link">Personalized jerseys</Link>
                  <Link to="/jerseys-on-sale" className="fb-store-interest-link">Jerseys on sale</Link>
                  <Link to="/national-team-jerseys" className="fb-store-interest-link">National team jerseys</Link>
                </div>
              </div>
            </div>
            <div className="fb-store-header-image-cover">
              <img src="/images/slider/jerseycover/1.jpg" alt="Jersey Cover" />
            </div>
          </div>
          
          <div className="fb-store-search-box">
            <h3 className="fb-store-search-title">What jersey are you looking for?</h3>
            
            <form className="fb-store-filters-grid" onSubmit={handleSearchBox}>
              <div className="fb-store-filter">
                <select className="fb-store-select" value={searchTeam} onChange={e => setSearchTeam(e.target.value)}>
                  <option value="">Team</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="fb-store-filter">
                <select className="fb-store-select" value={searchLeague} onChange={e => setSearchLeague(e.target.value)}>
                  <option value="">League</option>
                  {leagues.map(league => (
                    <option key={league.id} value={league.id}>{league.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="fb-store-filter">
                <select className="fb-store-select" value={searchPrice} onChange={e => setSearchPrice(e.target.value)}>
                  <option value="">Price</option>
                  <option value="0-50">€0 - €50</option>
                  <option value="50-75">€50 - €75</option>
                  <option value="75-100">€75 - €100</option>
                  <option value="100+">€100+</option>
                </select>
              </div>
              
              {/* Size filter removed */}
              
              <div className="fb-store-filter fb-store-full-width">
                <select className="fb-store-select" value={searchType} onChange={e => setSearchType(e.target.value)}>
                  <option value="">Type of jersey</option>
                  {jerseyTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <button type="submit" className="fb-store-search-btn fb-store-full-width">
                Look for <FontAwesomeIcon icon={faSearch} style={{ color: '#000' }} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="fb-store-filters-section">
          <div className="fb-store-filter-sidebar">
            <div className="fb-store-filter-category">
              <h3 className="fb-store-filter-title">Teams <span className="fb-store-arrow">▼</span></h3>
              <div className="fb-store-filter-options">
                {leagues.map(league => (
                  <div key={league.id} className="fb-store-league-section">
                    <h4 className="fb-store-league-title">{league.name}</h4>
                    {teams
                      .filter(team => team.league === league.id)
                      .map(team => (
                        <label key={team.id} className="fb-store-filter-option">
                          <input 
                            type="checkbox" 
                            name="team" 
                            value={team.id}
                            id={`team-${team.id}`}
                            checked={selectedTeams.includes(team.id)}
                            onChange={() => handleFilterChange('team', team.id)}
                          />
                          <span className="fb-store-filter-text">
                            <img src={team.logo} alt={team.name} className="fb-store-filter-team-logo" />
                            {team.name}
                          </span>
                        </label>
                      ))
                    }
                  </div>
                ))}
              </div>
            </div>
            
            <div className="fb-store-filter-category">
              <h3 className="fb-store-filter-title">Leagues <span className="fb-store-arrow">▼</span></h3>
              <div className="fb-store-filter-options">
                {leagues.map(league => (
                  <label key={league.id} className="fb-store-filter-option">
                    <input 
                      type="checkbox" 
                      name="league" 
                      value={league.id}
                      checked={selectedLeagues.includes(league.id)}
                      onChange={() => handleFilterChange('league', league.id)}
                    />
                    <span className="fb-store-filter-text">{league.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="fb-store-filter-category">
              <h3 className="fb-store-filter-title">Jersey Type <span className="fb-store-arrow">▼</span></h3>
              <div className="fb-store-filter-options">
                {jerseyTypes.map(type => (
                  <label key={type.id} className="fb-store-filter-option">
                    <input 
                      type="checkbox" 
                      name="type" 
                      value={type.id}
                      id={`jersey-type-${type.id.toLowerCase()}`}
                      checked={selectedTypes.includes(type.id.toLowerCase())}
                      onChange={() => handleFilterChange('type', type.id)}
                    />
                    <span className="fb-store-filter-text">{type.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Size filter removed from sidebar */}
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
              
              <span className="fb-store-total-articles">Total articles: {sortedJerseys.length}</span>
            </div>
            
            <div className="fb-store-products-grid">
              {paginatedJerseys.map(jersey => {
                const teamObj = teams.find(t => t.name === jersey.team);
                return (
                  <div className="fb-store-product-card" key={jersey.id}>
                    <Link to={`/team-jerseys/${jersey.id}`} className="fb-store-product-link">
                      <div className="fb-store-product-image">
                        <img src={jersey.image} alt={jersey.name} />
                        <div className="fb-store-team-logo">
                          <img src={jersey.teamLogo} alt={jersey.team} />
                        </div>
                        {jersey.tag && <span className={`fb-store-product-tag ${jersey.tag.replace(/\s+/g, '-').toLowerCase()}`}>{jersey.tag}</span>}
                      </div>
                      
                      <div className="fb-store-product-info">
                        <h3 className="fb-store-product-name">{jersey.name}</h3>
                        <div className="fb-store-product-price">€{jersey.price}</div>
                      </div>
                    </Link>
                  </div>
                );
              })}
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
        
        {/* Featured Teams Section */}
        <div className="fb-store-featured-teams-section">
          <h2 className="fb-store-section-title">Featured Teams</h2>
          <div className="fb-store-featured-teams-grid">
            {leagues.map(league => (
              <div key={league.id} className="fb-store-league-container">
                <h3 className="fb-store-league-heading">{league.name}</h3>
                <div className="fb-store-teams-grid">
                  {teams
                    .filter(team => team.league === league.id)
                    .slice(0, 8) // Limit to 8 teams per league for display
                    .map(team => (
                      <Link to={`/team-jerseys/team/${team.id}`} key={team.id} className="fb-store-team-card">
                        <div className="fb-store-team-logo-container">
                          <img src={team.logo} alt={team.name} className="fb-store-team-logo-large" />
                        </div>
                        <h4 className="fb-store-team-name">{team.name}</h4>
                      </Link>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamJerseys;
export { jerseys };