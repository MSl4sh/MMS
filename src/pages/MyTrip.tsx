import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { Link } from 'react-router-dom';

const MyTrip: React.FC = () => {
  const { 
    trip, 
    removeHotel, 
    removeRestaurant, 
    updateDates, 
    updateGuests, 
    getTotalBudget,
    clearTrip 
  } = useTripContext();

  const [tempDates, setTempDates] = useState({
    checkIn: trip.dates.checkIn,
    checkOut: trip.dates.checkOut
  });

  const handleDatesChange = () => {
    updateDates(tempDates.checkIn, tempDates.checkOut);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isEmpty = trip.selectedHotels.length === 0 && trip.selectedRestaurants.length === 0;

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-snowDrift dark:bg-darkBg py-8 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-fairyGold rounded-lg flex items-center justify-center mr-4 p-2">
                <img 
                  src="/icons/calendar-icon.png" 
                  alt="Mon Séjour" 
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                Mon Séjour
              </h1>
            </div>
            <p className="text-lg text-stoneGray dark:text-darkSecondary max-w-2xl mx-auto transition-colors duration-300">
              Planifiez votre séjour magique à Disneyland Paris
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white dark:bg-darkCard rounded-lg p-8 shadow-sm max-w-md mx-auto transition-colors duration-300">
              <div className="w-16 h-16 bg-cloudSand dark:bg-darkBg rounded-full flex items-center justify-center mx-auto mb-4 p-3 transition-colors duration-300">
                <img 
                  src="/icons/calendar-icon.png" 
                  alt="Séjour vide" 
                  className="w-full h-full object-contain opacity-60"
                />
              </div>
              <h3 className="text-xl font-semibold text-charcoalWaltz dark:text-darkText mb-4 transition-colors duration-300">
                Votre séjour est vide
              </h3>
              <p className="text-stoneGray dark:text-darkSecondary mb-6 transition-colors duration-300">
                Commencez par ajouter des hébergements et restaurants à votre séjour
              </p>
              <div className="space-y-3">
                <Link
                  to="/hebergements"
                  className="flex items-center justify-center bg-fairyGold hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <div className="w-5 h-5 mr-3">
                    <img 
                      src="/icons/hebergment-icon.png" 
                      alt="Hébergement" 
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  Choisir un hébergement
                </Link>
                <Link
                  to="/restaurants"
                  className="flex items-center justify-center bg-mistyMauve hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <div className="w-5 h-5 mr-3">
                    <img 
                      src="/icons/restaurant-icon.png" 
                      alt="Restaurant" 
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  Choisir des restaurants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-snowDrift dark:bg-darkBg py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-fairyGold rounded-lg flex items-center justify-center mr-4 p-2">
              <img 
                src="/icons/calendar-icon.png" 
                alt="Mon Séjour" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
              Mon Séjour
            </h1>
          </div>
          <p className="text-lg text-stoneGray dark:text-darkSecondary max-w-2xl mx-auto transition-colors duration-300">
            Planifiez et budgétez votre séjour magique à Disneyland Paris
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration du séjour */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-darkCard rounded-lg shadow-sm p-6 sticky top-8 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-fairyGold rounded-lg flex items-center justify-center mr-3 p-1.5">
                  <img 
                    src="/icons/calendar-icon.png" 
                    alt="Configuration" 
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <h2 className="text-xl font-semibold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                  Configuration du séjour
                </h2>
              </div>

              {/* Dates */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 mr-2">
                    <img 
                      src="/icons/calendar-icon.png" 
                      alt="Dates" 
                      className="w-full h-full object-contain opacity-60"
                    />
                  </div>
                  <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                    Dates de séjour
                  </label>
                </div>

                {/* Date d'arrivée */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-stoneGray dark:text-darkSecondary mb-2 uppercase tracking-wider transition-colors duration-300">
                    Date d'arrivée
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={tempDates.checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setTempDates(prev => ({ ...prev, checkIn: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border border-stoneGray dark:border-darkBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText font-medium transition-colors duration-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4">
                      <img 
                        src="/icons/calendar-icon.png" 
                        alt="Calendrier" 
                        className="w-full h-full object-contain opacity-40"
                      />
                    </div>
                  </div>
                </div>

                {/* Date de départ */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-stoneGray dark:text-darkSecondary mb-2 uppercase tracking-wider transition-colors duration-300">
                    Date de départ
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={tempDates.checkOut}
                      min={tempDates.checkIn || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setTempDates(prev => ({ ...prev, checkOut: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border border-stoneGray dark:border-darkBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText font-medium transition-colors duration-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4">
                      <img 
                        src="/icons/calendar-icon.png" 
                        alt="Calendrier" 
                        className="w-full h-full object-contain opacity-40"
                      />
                    </div>
                  </div>
                </div>

                {/* Aperçu des dates */}
                {tempDates.checkIn && tempDates.checkOut && (
                  <div className="bg-cloudSand/50 dark:bg-darkBg/50 p-3 rounded-lg mb-4 transition-colors duration-300">
                    <div className="text-xs font-medium text-stoneGray dark:text-darkSecondary mb-1 uppercase tracking-wider transition-colors duration-300">
                      Durée du séjour
                    </div>
                    <div className="text-sm font-semibold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                      {(() => {
                        const checkIn = new Date(tempDates.checkIn);
                        const checkOut = new Date(tempDates.checkOut);
                        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
                        return `${nights} nuit${nights > 1 ? 's' : ''}`;
                      })()}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleDatesChange}
                  disabled={!tempDates.checkIn || !tempDates.checkOut}
                  className="w-full bg-fairyGold hover:bg-yellow-600 disabled:bg-stoneGray disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2">
                    <img 
                      src="/icons/calendar-icon.png" 
                      alt="Confirmer" 
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  Confirmer les dates
                </button>
              </div>

              {/* Nombre de voyageurs */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 mr-2">
                    <img 
                      src="/icons/user-group-icon.png" 
                      alt="Voyageurs" 
                      className="w-full h-full object-contain opacity-60"
                    />
                  </div>
                  <label className="block text-sm font-medium text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                    Nombre de voyageurs
                  </label>
                </div>
                <select
                  value={trip.guests}
                  onChange={(e) => updateGuests(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-stoneGray dark:border-darkBorder rounded-md focus:outline-none focus:ring-2 focus:ring-fairyGold focus:border-transparent bg-white dark:bg-darkBg text-charcoalWaltz dark:text-darkText transition-colors duration-300"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>
                      {num} personne{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Résumé des dates */}
              {trip.dates.checkIn && trip.dates.checkOut && (
                <div className="bg-cloudSand dark:bg-darkBg p-4 rounded-lg mb-6 transition-colors duration-300">
                  <h3 className="font-semibold text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">Résumé</h3>
                  <p className="text-sm text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                    <strong>Arrivée:</strong> {formatDate(trip.dates.checkIn)}
                  </p>
                  <p className="text-sm text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                    <strong>Départ:</strong> {formatDate(trip.dates.checkOut)}
                  </p>
                  <p className="text-sm text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                    <strong>Durée:</strong> {trip.dates.nights} nuit{trip.dates.nights > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                    <strong>Voyageurs:</strong> {trip.guests} personne{trip.guests > 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {/* Budget */}
              <div className="bg-fairyGold/10 dark:bg-fairyGold/5 p-4 rounded-lg mb-6 transition-colors duration-300">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 mr-2">
                    <img 
                      src="/icons/budget-icon.png" 
                      alt="Budget" 
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                  <h3 className="font-semibold text-charcoalWaltz dark:text-darkText transition-colors duration-300">Budget estimé</h3>
                </div>
                <div className="text-2xl font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                  {getTotalBudget().toLocaleString('fr-FR')}€
                </div>
                {trip.dates.nights > 0 && (
                  <p className="text-xs text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                    Pour {trip.dates.nights} nuit{trip.dates.nights > 1 ? 's' : ''} et {trip.guests} personne{trip.guests > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={clearTrip}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Vider le séjour
                </button>
              </div>
            </div>
          </div>

          {/* Liste des éléments sélectionnés */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hébergements */}
            {trip.selectedHotels.length > 0 && (
              <div className="bg-white dark:bg-darkCard rounded-lg shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-fairyGold rounded-lg flex items-center justify-center mr-3 p-1">
                    <img 
                      src="/icons/hebergment-icon.png" 
                      alt="Hébergements" 
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                    Hébergements sélectionnés ({trip.selectedHotels.length})
                  </h2>
                </div>
                <div className="space-y-4">
                  {trip.selectedHotels.map(hotel => (
                    <div key={hotel.id} className="border border-cloudSand dark:border-darkBorder rounded-lg p-4 transition-colors duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-charcoalWaltz dark:text-darkText transition-colors duration-300">{hotel.name}</h3>
                          <p className="text-sm text-stoneGray dark:text-darkSecondary mb-2 transition-colors duration-300">{hotel.distance_to_park}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-fairyGold">★ {hotel.rating}</span>
                            <span className="font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                              {hotel.price_per_night_eur}€/nuit
                            </span>
                            {trip.dates.nights > 0 && (
                              <span className="text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                                Total: {(hotel.price_per_night_eur * trip.dates.nights).toLocaleString('fr-FR')}€
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeHotel(hotel.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restaurants */}
            {trip.selectedRestaurants.length > 0 && (
              <div className="bg-white dark:bg-darkCard rounded-lg shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-mistyMauve rounded-lg flex items-center justify-center mr-3 p-1">
                    <img 
                      src="/icons/restaurant-icon.png" 
                      alt="Restaurants" 
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                    Restaurants sélectionnés ({trip.selectedRestaurants.length})
                  </h2>
                </div>
                <div className="space-y-4">
                  {trip.selectedRestaurants.map(restaurant => (
                    <div key={restaurant.id} className="border border-cloudSand dark:border-darkBorder rounded-lg p-4 transition-colors duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-charcoalWaltz dark:text-darkText transition-colors duration-300">{restaurant.name}</h3>
                          <p className="text-sm text-stoneGray dark:text-darkSecondary mb-2 transition-colors duration-300">
                            {restaurant.park} • {restaurant.land} • {restaurant.cuisine}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-fairyGold">★ {restaurant.rating}</span>
                            <span className="font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">
                              {restaurant.average_price}€/pers
                            </span>
                            {trip.dates.nights > 0 && (
                              <span className="text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                                Total: {(restaurant.average_price * trip.guests * trip.dates.nights).toLocaleString('fr-FR')}€
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeRestaurant(restaurant.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="bg-white dark:bg-darkCard rounded-lg shadow-sm p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold text-charcoalWaltz dark:text-darkText mb-4 transition-colors duration-300">
                Ajouter plus d'éléments
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/hebergements"
                  className="flex items-center p-4 border border-cloudSand dark:border-darkBorder rounded-lg hover:bg-cloudSand dark:hover:bg-darkBg transition-colors duration-200"
                >
                  <span className="text-2xl mr-3">🏨</span>
                  <div>
                    <div className="font-medium text-charcoalWaltz dark:text-darkText transition-colors duration-300">Hébergements</div>
                    <div className="text-sm text-stoneGray dark:text-darkSecondary transition-colors duration-300">Trouver plus d'options</div>
                  </div>
                </Link>
                <Link
                  to="/restaurants"
                  className="flex items-center p-4 border border-cloudSand dark:border-darkBorder rounded-lg hover:bg-cloudSand dark:hover:bg-darkBg transition-colors duration-200"
                >
                  <span className="text-2xl mr-3">🍽️</span>
                  <div>
                    <div className="font-medium text-charcoalWaltz dark:text-darkText transition-colors duration-300">Restaurants</div>
                    <div className="text-sm text-stoneGray dark:text-darkSecondary transition-colors duration-300">Découvrir plus de saveurs</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrip; 