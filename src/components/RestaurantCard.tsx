import React from 'react';
import { useTripContext } from '../context/TripContext';

export interface Restaurant {
  id: string;
  name: string;
  type: string;
  park: string;
  land: string;
  cuisine: string;
  price_range: string;
  average_price: number;
  rating: number;
  description: string;
  image_url: string;
  features: string[];
  opening_hours: string;
  reservation_required: boolean;
  kid_friendly: boolean;
  dress_code: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { addRestaurant, removeRestaurant, isRestaurantSelected } = useTripContext();
  const isSelected = isRestaurantSelected(restaurant.id);

  const handleToggleSelection = () => {
    if (isSelected) {
      removeRestaurant(restaurant.id);
    } else {
      addRestaurant(restaurant);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Table Service':
        return 'bg-fairyGold text-white';
      case 'Quick Service':
        return 'bg-mistyMauve text-white';
      case 'Snack':
        return 'bg-stoneGray text-white';
      default:
        return 'bg-cloudSand text-charcoalWaltz';
    }
  };

  const getPriceRangeStars = (priceRange: string) => {
    const stars = priceRange.length;
    return (
      <div className="flex items-center">
        {[...Array(4)].map((_, i) => (
          <span key={i} className={`text-sm ${i < stars ? 'text-fairyGold' : 'text-cloudSand'}`}>
            €
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-darkCard rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(restaurant.type)}`}>
            {restaurant.type}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-darkCard/90 backdrop-blur-sm px-2 py-1 rounded-full transition-colors duration-300">
          <div className="flex items-center space-x-1">
            <span className="text-fairyGold text-sm">★</span>
            <span className="text-xs font-medium text-charcoalWaltz dark:text-darkText transition-colors duration-300">{restaurant.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-charcoalWaltz dark:text-darkText leading-tight transition-colors duration-300">
              {restaurant.name}
            </h3>
            {getPriceRangeStars(restaurant.price_range)}
          </div>
          <div className="flex items-center justify-between text-sm text-stoneGray dark:text-darkSecondary mb-2 transition-colors duration-300">
            <span>{restaurant.park} • {restaurant.land}</span>
            <span className="text-xs font-medium bg-cloudSand dark:bg-darkBg px-2 py-1 rounded text-charcoalWaltz dark:text-darkText transition-colors duration-300">
              {restaurant.cuisine}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-stoneGray dark:text-darkSecondary mb-4 line-clamp-2 transition-colors duration-300">
          {restaurant.description}
        </p>

        {/* Features */}
        <div className="mb-4 flex-1">
          <div className="flex flex-wrap gap-1">
            {restaurant.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-cloudSand dark:bg-darkBg text-charcoalWaltz dark:text-darkText text-xs rounded-full transition-colors duration-300"
              >
                {feature}
              </span>
            ))}
            {restaurant.features.length > 3 && (
              <span className="px-2 py-1 bg-cloudSand dark:bg-darkBg text-charcoalWaltz dark:text-darkText text-xs rounded-full transition-colors duration-300">
                +{restaurant.features.length - 3} autres
              </span>
            )}
          </div>
        </div>

        {/* Info supplémentaires */}
        <div className="mb-4 text-xs text-stoneGray dark:text-darkSecondary space-y-1 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <span>🕒 {restaurant.opening_hours}</span>
            {restaurant.reservation_required && (
              <span className="bg-mistyMauve text-white px-2 py-1 rounded text-xs">
                Réservation obligatoire
              </span>
            )}
          </div>
        </div>

        {/* Footer - Always at bottom */}
        <div className="mt-auto pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                {restaurant.average_price}€
              </div>
              <div className="text-xs text-stoneGray dark:text-darkSecondary transition-colors duration-300">par personne</div>
            </div>
            <button className="bg-stoneGray dark:bg-darkBorder hover:bg-charcoalWaltz dark:hover:bg-darkText text-white px-4 py-2 rounded-md font-medium transition-colors duration-200">
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

export default RestaurantCard; 