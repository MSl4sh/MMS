import React, { useState, useEffect } from 'react';
import RestaurantCard, { Restaurant } from '../components/RestaurantCard';

// Import des données
import restaurantsData from '../data/restaurants.json';

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPark, setSelectedPark] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Charger les données
  useEffect(() => {
    setRestaurants(restaurantsData.restaurants);
    setFilteredRestaurants(restaurantsData.restaurants);
  }, []);

  // Appliquer les filtres
  useEffect(() => {
    let filtered = restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All' || restaurant.type === selectedType;
      const matchesPark = selectedPark === 'All' || restaurant.park === selectedPark;
      const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
      const matchesPrice = restaurant.average_price >= priceRange.min && 
                          restaurant.average_price <= priceRange.max;
      const matchesRating = restaurant.rating >= minRating;

      return matchesSearch && matchesType && matchesPark && matchesCuisine && matchesPrice && matchesRating;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.average_price - b.average_price;
        case 'price_desc':
          return b.average_price - a.average_price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredRestaurants(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [restaurants, searchTerm, selectedType, selectedPark, selectedCuisine, priceRange, minRating, sortBy]);

  // Obtenir les valeurs uniques pour les filtres
  const restaurantTypes = ['All', ...Array.from(new Set(restaurants.map(r => r.type)))];
  const parks = ['All', ...Array.from(new Set(restaurants.map(r => r.park)))];
  const cuisines = ['All', ...Array.from(new Set(restaurants.map(r => r.cuisine)))];

  // Calculs pour la pagination
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRestaurants = filteredRestaurants.slice(startIndex, endIndex);

  // Composant de pagination
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        {/* Bouton Précédent */}
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
            currentPage === 1
              ? 'bg-cloudSand text-stoneGray cursor-not-allowed'
              : 'bg-white text-charcoalWaltz hover:bg-fairyGold hover:text-white border border-stoneGray'
          }`}
        >
          ← Précédent
        </button>

        {/* Première page */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-2 rounded-md font-medium bg-white text-charcoalWaltz hover:bg-fairyGold hover:text-white border border-stoneGray transition-colors duration-200"
            >
              1
            </button>
            {startPage > 2 && <span className="text-stoneGray">...</span>}
          </>
        )}

        {/* Numéros de page */}
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
              currentPage === number
                ? 'bg-fairyGold text-white'
                : 'bg-white text-charcoalWaltz hover:bg-fairyGold hover:text-white border border-stoneGray'
            }`}
          >
            {number}
          </button>
        ))}

        {/* Dernière page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-stoneGray">...</span>}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-2 rounded-md font-medium bg-white text-charcoalWaltz hover:bg-fairyGold hover:text-white border border-stoneGray transition-colors duration-200"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Bouton Suivant */}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
            currentPage === totalPages
              ? 'bg-cloudSand text-stoneGray cursor-not-allowed'
              : 'bg-white text-charcoalWaltz hover:bg-fairyGold hover:text-white border border-stoneGray'
          }`}
        >
          Suivant →
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-snowDrift dark:bg-darkBg py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-mistyMauve rounded-lg flex items-center justify-center mr-4 p-2">
              <img 
                src="/icons/restaurant-icon.png" 
                alt="Restaurants" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
              Restaurants
            </h1>
          </div>
          <p className="text-lg text-stoneGray dark:text-darkSecondary max-w-2xl mx-auto transition-colors duration-300">
            Découvrez notre sélection de restaurants pour votre séjour magique
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white dark:bg-darkCard rounded-lg shadow-sm p-6 mb-8 transition-colors duration-300">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-mistyMauve rounded-lg flex items-center justify-center mr-3 p-1">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
              Filtres de recherche
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recherche */}
            <div>
              <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Rechercher
              </label>
              <input
                type="text"
                placeholder="Nom ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Type de service
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
              >
                {restaurantTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'Tous les types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Parc */}
            <div>
              <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Parc
              </label>
              <select
                value={selectedPark}
                onChange={(e) => setSelectedPark(e.target.value)}
                className="w-full px-3 py-2 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
              >
                {parks.map(park => (
                  <option key={park} value={park}>
                    {park === 'All' ? 'Tous les parcs' : park}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine */}
            <div>
              <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Type de cuisine
              </label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-3 py-2 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine === 'All' ? 'Toutes les cuisines' : cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Prix max */}
            <div>
              <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Prix max par personne
              </label>
              <input
                type="number"
                placeholder="100"
                value={priceRange.max === 200 ? '' : priceRange.max}
                onChange={(e) => setPriceRange(prev => ({
                  ...prev,
                  max: e.target.value ? parseInt(e.target.value) : 200
                }))}
                className="w-full px-3 py-2 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
              />
            </div>

            {/* Note minimum */}
            <div>
              <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Note minimum
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
              >
                <option value={0}>Toutes les notes</option>
                <option value={3}>3★ et plus</option>
                <option value={4}>4★ et plus</option>
                <option value={4.5}>4.5★ et plus</option>
              </select>
            </div>
          </div>

          {/* Tri et résultats */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-cloudSand dark:border-darkBorder transition-colors duration-300">
            <div className="mb-4 sm:mb-0">
              <span className="text-sm text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                {filteredRestaurants.length} restaurant{filteredRestaurants.length > 1 ? 's' : ''} trouvé{filteredRestaurants.length > 1 ? 's' : ''}
                {filteredRestaurants.length > itemsPerPage && (
                  <span className="ml-2">
                    (page {currentPage} sur {totalPages})
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                Trier par:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
              >
                <option value="name">Nom</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="rating">Note</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grille des restaurants */}
        {filteredRestaurants.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
            <Pagination />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-darkCard rounded-lg p-8 shadow-sm transition-colors duration-300">
              <span className="text-4xl mb-4 block">🍽️</span>
              <h3 className="text-xl font-semibold text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Aucun restaurant trouvé
              </h3>
              <p className="text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants; 