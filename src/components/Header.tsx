import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import ThemeToggle from './ThemeToggle';
import { getPublicUrl } from '../utils/publicUrl';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { trip } = useTripContext();
  
  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/hebergements', label: 'Hébergements' },
    { path: '/restaurants', label: 'Restaurants' },
    { path: '/mon-sejour', label: 'Mon Séjour' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-darkCard shadow-sm border-b border-cloudSand dark:border-darkBorder sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0" onClick={closeMobileMenu}>
            <img src={getPublicUrl('/MyMagicStay-logo.png')} alt="Magic My Stay" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"/>
            <span className="text-lg sm:text-xl font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">My Magic Stay</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative ${
                  location.pathname === item.path
                    ? 'text-fairyGold bg-cloudSand dark:bg-darkBg'
                    : 'text-stoneGray dark:text-darkSecondary hover:text-charcoalWaltz dark:hover:text-darkText hover:bg-cloudSand dark:hover:bg-darkBg'
                }`}
              >
                {item.label}
                {item.path === '/mon-sejour' && (trip.selectedHotels.length + trip.selectedRestaurants.length) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-fairyGold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {trip.selectedHotels.length + trip.selectedRestaurants.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center space-x-2 lg:space-x-4">
            <ThemeToggle />
            <button className="bg-fairyGold hover:bg-yellow-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-md font-medium transition-colors duration-200 text-sm lg:text-base">
              Connexion
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:lg:hidden p-2 rounded-md text-stoneGray dark:text-darkSecondary hover:text-charcoalWaltz dark:hover:text-darkText hover:bg-cloudSand dark:hover:bg-darkBg transition-colors duration-200"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-cloudSand dark:border-darkBorder bg-white dark:bg-darkCard transition-colors duration-300">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 relative ${
                    location.pathname === item.path
                      ? 'text-fairyGold bg-cloudSand dark:bg-darkBg'
                      : 'text-stoneGray dark:text-darkSecondary hover:text-charcoalWaltz dark:hover:text-darkText hover:bg-cloudSand dark:hover:bg-darkBg'
                  }`}
                >
                  {item.label}
                  {item.path === '/mon-sejour' && (trip.selectedHotels.length + trip.selectedRestaurants.length) > 0 && (
                    <span className="absolute top-2 right-3 bg-fairyGold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {trip.selectedHotels.length + trip.selectedRestaurants.length}
                    </span>
                  )}
                </Link>
              ))}
              
              {/* Mobile Actions */}
              <div className="flex items-center space-x-3 px-3 py-3 border-t border-cloudSand dark:border-darkBorder mt-3">
                <ThemeToggle className="mr-2" />
                <button className="bg-fairyGold hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex-1">
                  Connexion
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 