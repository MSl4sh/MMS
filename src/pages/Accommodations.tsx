import React, { useState, useEffect } from 'react';
import HotelCard, { Hotel } from '../components/HotelCard';
import { getPublicUrl } from '../utils/publicUrl';

// Import des données
import hotelsData from '../data/hotels.json';
import partnerHotelsData from '../data/partner-hotels.json';
import externalAccommodations from '../data/external_accomodation.json';

const Accommodations: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAccommodationCategory, setSelectedAccommodationCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Combiner toutes les données
  useEffect(() => {
    const allHotels = [
      ...hotelsData.hotels,
      ...partnerHotelsData.hotels,
      ...(externalAccommodations as any).accommodations
    ];
    setHotels(allHotels);
    setFilteredHotels(allHotels);
  }, []);

  // Appliquer les filtres
  useEffect(() => {
    let filtered = hotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hotel.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All' || hotel.type === selectedType;
      const matchesAccommodationCategory = selectedAccommodationCategory === 'All' || 
                                         hotel.accommodation_category === selectedAccommodationCategory;
      const matchesPrice = hotel.price_per_night_eur >= priceRange.min && 
                          hotel.price_per_night_eur <= priceRange.max;
      const matchesRating = hotel.rating >= minRating;

      return matchesSearch && matchesType && matchesAccommodationCategory && matchesPrice && matchesRating;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price_per_night_eur - b.price_per_night_eur;
        case 'price_desc':
          return b.price_per_night_eur - a.price_per_night_eur;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredHotels(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [hotels, searchTerm, selectedType, selectedAccommodationCategory, priceRange, minRating, sortBy]);

  const hotelTypes = ['All', 'Disney', 'Partner', 'External'];
  const accommodationCategories = ['All', 'hotel', 'private_rental'];

  // Calculs pour la pagination
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHotels = filteredHotels.slice(startIndex, endIndex);

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
              ? 'bg-cloudSand dark:bg-darkBorder text-stoneGray dark:text-darkSecondary cursor-not-allowed'
              : 'bg-white dark:bg-darkCard text-charcoalWaltz dark:text-darkText hover:bg-fairyGold hover:text-white border border-stoneGray dark:border-darkBorder'
          }`}
        >
          ← Précédent
        </button>

        {/* Première page */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-2 rounded-md font-medium bg-white dark:bg-darkCard text-charcoalWaltz dark:text-darkText hover:bg-fairyGold hover:text-white border border-stoneGray dark:border-darkBorder transition-colors duration-200"
            >
              1
            </button>
            {startPage > 2 && <span className="text-stoneGray dark:text-darkSecondary transition-colors duration-300">...</span>}
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
                : 'bg-white dark:bg-darkCard text-charcoalWaltz dark:text-darkText hover:bg-fairyGold hover:text-white border border-stoneGray dark:border-darkBorder'
            }`}
          >
            {number}
          </button>
        ))}

        {/* Dernière page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-stoneGray dark:text-darkSecondary transition-colors duration-300">...</span>}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-2 rounded-md font-medium bg-white dark:bg-darkCard text-charcoalWaltz dark:text-darkText hover:bg-fairyGold hover:text-white border border-stoneGray dark:border-darkBorder transition-colors duration-200"
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
              ? 'bg-cloudSand dark:bg-darkBorder text-stoneGray dark:text-darkSecondary cursor-not-allowed'
              : 'bg-white dark:bg-darkCard text-charcoalWaltz dark:text-darkText hover:bg-fairyGold hover:text-white border border-stoneGray dark:border-darkBorder'
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
            <div className="w-12 h-12 bg-fairyGold rounded-lg flex items-center justify-center mr-4 p-2">
              <img 
                src={getPublicUrl('/icons/hebergment-icon.png')} 
                alt="Hébergements" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
              Hébergements
            </h1>
          </div>
          <p className="text-lg text-stoneGray dark:text-darkSecondary max-w-2xl mx-auto transition-colors duration-300">
            Découvrez notre sélection d'hébergements pour votre séjour magique
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white dark:bg-darkCard rounded-lg shadow-sm p-6 mb-8 transition-colors duration-300">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-fairyGold rounded-lg flex items-center justify-center mr-3 p-1">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
              Filtres de recherche
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                Type d'hébergement
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
              >
                {hotelTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'Tous les types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Catégorie d'hébergement */}
            <div>
              <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Catégorie
              </label>
              <select
                value={selectedAccommodationCategory}
                onChange={(e) => setSelectedAccommodationCategory(e.target.value)}
                className="w-full px-3 py-2 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
              >
                {accommodationCategories.map(category => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'Toutes catégories' : 
                     category === 'hotel' ? 'Hôtels' : 'Locations privées'}
                  </option>
                ))}
              </select>
            </div>

            {/* Prix max */}
            <div>
              <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Prix max par nuit
              </label>
              <input
                type="number"
                placeholder="500"
                value={priceRange.max === 1000 ? '' : priceRange.max}
                onChange={(e) => setPriceRange(prev => ({
                  ...prev,
                  max: e.target.value ? parseInt(e.target.value) : 1000
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
                {filteredHotels.length} hébergement{filteredHotels.length > 1 ? 's' : ''} trouvé{filteredHotels.length > 1 ? 's' : ''}
                {filteredHotels.length > itemsPerPage && (
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

        {/* Grille des hôtels */}
        {filteredHotels.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
            <Pagination />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-darkCard rounded-lg p-8 shadow-sm transition-colors duration-300">
              <span className="text-4xl mb-4 block">🏨</span>
              <h3 className="text-xl font-semibold text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                Aucun hébergement trouvé
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

export default Accommodations; 