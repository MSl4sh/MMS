import React from 'react';
import { Link } from 'react-router-dom';

// Import des données pour les compteurs
import hotelsData from '../data/hotels.json';
import partnerHotelsData from '../data/partner-hotels.json';
import externalAccommodations from '../data/external_accomodation.json';
import restaurantsData from '../data/restaurants.json';

const Home: React.FC = () => {
  // Compteurs pour les statistiques
  const hebergementCount = hotelsData.hotels.length + 
                          partnerHotelsData.hotels.length + 
                          (externalAccommodations as any).accommodations.length;
  const restaurantCount = restaurantsData.restaurants.length;
  const activiteCount = 0; // À définir plus tard selon vos besoins
  return (
    <div className="min-h-screen bg-snowDrift dark:bg-darkBg transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-snowDrift dark:bg-darkBg overflow-hidden transition-colors duration-300">
        {/* Formes décoratives */}
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-20 right-20 w-72 h-72 bg-fairyGold/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-48 h-48 bg-mistyMauve/15 rounded-full blur-2xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-1/4 h-full">
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-cloudSand/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu principal */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-fairyGold/10 rounded-full">
                  <span className="text-fairyGold font-medium text-sm">✨ Planificateur de séjour Disney</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-charcoalWaltz dark:text-darkText leading-tight transition-colors duration-300">
                  Votre séjour 
                  <span className="text-fairyGold"> magique</span>
                  <br />commence ici
                </h1>
                
                <p className="text-lg lg:text-xl text-stoneGray dark:text-darkSecondary leading-relaxed max-w-xl transition-colors duration-300">
                  Découvrez, comparez et planifiez votre séjour parfait à Disneyland Paris. 
                  Hébergements, restaurants et budget, tout en un seul endroit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/hebergements"
                  className="inline-flex items-center justify-center bg-fairyGold hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <img 
                    src="/icons/hebergment-icon.png" 
                    alt="Hébergements" 
                    className="w-5 h-5 mr-3 filter brightness-0 invert"
                  />
                  Explorer les hébergements
                </Link>
                <Link
                  to="/restaurants"
                  className="inline-flex items-center justify-center border-2 border-mistyMauve text-mistyMauve hover:bg-mistyMauve hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 group"
                >
                  <img 
                    src="/icons/restaurant-icon.png" 
                    alt="Restaurants" 
                    className="w-5 h-5 mr-3 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-200"
                  />
                  Découvrir les restaurants
                </Link>
              </div>
            </div>

            {/* Élément visuel */}
            <div className="relative">
              <div className="relative z-10">
                {/* Carte principale */}
                <div className="bg-white dark:bg-darkCard rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <img src="/MyMagicStay-logo.png" alt="My Magic Stay" className="w-12 h-12 object-contain mr-4"/>
                    <div>
                      <h3 className="font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">My Magic Stay</h3>
                      <p className="text-sm text-stoneGray dark:text-darkSecondary transition-colors duration-300">Planificateur de séjour</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-cloudSand dark:bg-darkBg rounded-lg transition-colors duration-300">
                      <div className="w-10 h-10 bg-fairyGold rounded-lg flex items-center justify-center mr-3 p-2">
                        <img 
                          src="/icons/hebergment-icon.png" 
                          alt="Hébergement" 
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-charcoalWaltz dark:text-darkText text-sm transition-colors duration-300">Disneyland Hotel</div>
                        <div className="text-xs text-stoneGray dark:text-darkSecondary transition-colors duration-300">5★ • 750€/nuit</div>
                      </div>
                      <div className="text-fairyGold text-sm">✓</div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-cloudSand dark:bg-darkBg rounded-lg transition-colors duration-300">
                      <div className="w-10 h-10 bg-mistyMauve rounded-lg flex items-center justify-center mr-3 p-2">
                        <img 
                          src="/icons/restaurant-icon.png" 
                          alt="Restaurant" 
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-charcoalWaltz dark:text-darkText text-sm transition-colors duration-300">Auberge de Cendrillon</div>
                        <div className="text-xs text-stoneGray dark:text-darkSecondary transition-colors duration-300">Character dining • 89€</div>
                      </div>
                      <div className="text-fairyGold text-sm">✓</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-cloudSand dark:border-darkBorder transition-colors duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stoneGray dark:text-darkSecondary transition-colors duration-300">Budget total</span>
                      <span className="text-xl font-bold text-charcoalWaltz dark:text-darkText transition-colors duration-300">2,890€</span>
                    </div>
                  </div>
                </div>

                {/* Cartes flottantes */}
                <div className="absolute -top-4 -right-4 bg-fairyGold text-white p-4 rounded-xl shadow-lg transform -rotate-12">
                  <div className="text-sm font-medium">3 nuits</div>
                  <div className="text-xs opacity-90">2 adultes</div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-mistyMauve text-white p-4 rounded-xl shadow-lg transform rotate-12">
                  <div className="text-sm font-medium">✨ Magique</div>
                  <div className="text-xs opacity-90">Séjour planifié</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoalWaltz dark:text-darkText mb-4 transition-colors duration-300">
              Pourquoi choisir Magic My Stay ?
            </h2>
            <p className="text-lg text-stoneGray dark:text-darkSecondary max-w-2xl mx-auto transition-colors duration-300">
              Nous vous accompagnons dans la recherche de votre hébergement idéal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Hébergements référencés */}
            <Link 
              to="/hebergements"
              className="bg-white dark:bg-darkCard p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-fairyGold rounded-lg flex items-center justify-center mb-4 p-3 group-hover:bg-mistyMauve transition-colors duration-200">
                <img 
                  src="/icons/hebergment-icon.png" 
                  alt="Hébergements" 
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl font-bold text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                {hebergementCount}
              </h3>
              <h4 className="text-lg font-semibold text-charcoalWaltz dark:text-darkText mb-3 group-hover:text-fairyGold transition-colors duration-200">
                Hébergements référencés
              </h4>
              <p className="text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                Logements vérifiés et sélectionnés pour votre séjour magique
              </p>
            </Link>

            {/* Restaurants référencés */}
            <Link 
              to="/restaurants"
              className="bg-white dark:bg-darkCard p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-mistyMauve rounded-lg flex items-center justify-center mb-4 p-3 group-hover:bg-fairyGold transition-colors duration-200">
                <img 
                  src="/icons/restaurant-icon.png" 
                  alt="Restaurants" 
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl font-bold text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                {restaurantCount}
              </h3>
              <h4 className="text-lg font-semibold text-charcoalWaltz dark:text-darkText mb-3 group-hover:text-fairyGold transition-colors duration-200">
                Restaurants référencés
              </h4>
              <p className="text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                Tables gourmandes pour tous les goûts et tous les budgets
              </p>
            </Link>

            {/* Activités référencées */}
            <div className="bg-white dark:bg-darkCard p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-fairyGold rounded-lg flex items-center justify-center mb-4 p-3">
                <img 
                  src="/icons/user-group-icon.png" 
                  alt="Activités" 
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl font-bold text-charcoalWaltz dark:text-darkText mb-2 transition-colors duration-300">
                {activiteCount}
              </h3>
              <h4 className="text-lg font-semibold text-charcoalWaltz dark:text-darkText mb-3 transition-colors duration-300">
                Activités référencées
              </h4>
              <p className="text-stoneGray dark:text-darkSecondary transition-colors duration-300">
                Expériences uniques et sorties pour toute la famille
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
              <section className="bg-cloudSand dark:bg-darkCard py-16 transition-colors duration-300">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoalWaltz dark:text-darkText mb-4 transition-colors duration-300">
              Prêt pour l'aventure ?
            </h2>
            <p className="text-lg text-stoneGray dark:text-darkSecondary mb-8 max-w-2xl mx-auto transition-colors duration-300">
              Rejoignez des milliers de familles qui ont déjà trouvé leur hébergement parfait
            </p>
            <Link
              to="/hebergements"
              className="bg-fairyGold hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block"
            >
              Trouver mon hébergement
            </Link>
          </div>
        </section>
    </div>
  );
};

export default Home; 