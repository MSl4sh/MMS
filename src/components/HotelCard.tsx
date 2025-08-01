import React from 'react';
import { useTripContext } from '../context/TripContext';

export interface Hotel {
  id: string;
  name: string;
  type: string;
  accommodation_category?: string;
  stars: number;
  price_per_night_eur: number;
  address: string;
  phone: string;
  website_url: string;
  image_url: string;
  distance_to_park: string;
  features: string[];
  rating: number;
  description: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const { addHotel, removeHotel, isHotelSelected } = useTripContext();
  const isSelected = isHotelSelected(hotel.id);

  const handleToggleSelection = () => {
    if (isSelected) {
      removeHotel(hotel.id);
    } else {
      addHotel(hotel);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Disney':
        return 'bg-fairyGold text-white';
      case 'Partner':
        return 'bg-mistyMauve text-white';
      case 'External':
        return 'bg-stoneGray text-white';
      default:
        return 'bg-cloudSand text-charcoalWaltz';
    }
  };

  const renderStars = (stars: number) => {
    if (stars === 0) return null;
    
    return (
      <div className="flex items-center">
        {[...Array(stars)].map((_, i) => (
          <span key={i} className="text-fairyGold text-sm">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-darkCard rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={hotel.image_url}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(hotel.type)}`}>
            {hotel.type}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-darkCard/90 backdrop-blur-sm px-2 py-1 rounded-full transition-colors duration-300">
          <div className="flex items-center space-x-1">
            <span className="text-fairyGold text-sm">★</span>
            <span className="text-xs font-medium text-charcoalWaltz dark:text-darkText transition-colors duration-300">{hotel.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-charcoalWaltz dark:text-darkText leading-tight transition-colors duration-300">
              {hotel.name}
            </h3>
            {renderStars(hotel.stars)}
          </div>
          <p className="text-sm text-stoneGray dark:text-darkSecondary mb-2 transition-colors duration-300">{hotel.distance_to_park}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-stoneGray dark:text-darkSecondary mb-4 line-clamp-2 transition-colors duration-300">
          {hotel.description}
        </p>

        {/* Features */}
        <div className="mb-4 flex-1">
          <div className="flex flex-wrap gap-1">
            {hotel.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-cloudSand dark:bg-darkBg text-charcoalWaltz dark:text-darkText text-xs rounded-full transition-colors duration-300"
              >
                {feature}
              </span>
            ))}
            {hotel.features.length > 3 && (
              <span className="px-2 py-1 bg-cloudSand dark:bg-darkBg text-charcoalWaltz dark:text-darkText text-xs rounded-full transition-colors duration-300">
                +{hotel.features.length - 3} autres
              </span>
            )}
          </div>
        </div>

        {/* Footer - Always at bottom */}
        <div className="mt-auto pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                {hotel.price_per_night_eur}€
              </div>
              <div className="text-xs text-stoneGray dark:text-darkSecondary transition-colors duration-300">par nuit</div>
            </div>
            <button className="bg-stoneGray dark:bg-darkBorder hover:bg-charcoalWaltz dark:hover:bg-darkText text-white px-4 py-2 rounded-md font-medium transition-colors duration-200" onClick={()=>window.open(hotel.website_url, '_blank')}>
              Voir détails
            </button>
          </div>
          <button 
            onClick={handleToggleSelection}
            className={`w-full py-2 rounded-md font-medium transition-colors duration-200 ${
              isSelected 
                ? 'bg-mistyMauve hover:bg-purple-600 text-white' 
                : 'bg-fairyGold hover:bg-yellow-600 text-white'
            }`}
          >
            {isSelected ? '✓ Ajouté au séjour' : '+ Ajouter à mon séjour'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard; 