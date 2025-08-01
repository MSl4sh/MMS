import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Hotel } from '../components/HotelCard';
import { Restaurant } from '../components/RestaurantCard';

export interface TripDates {
  checkIn: string;
  checkOut: string;
  nights: number;
}

export interface TripState {
  selectedHotels: Hotel[];
  selectedRestaurants: Restaurant[];
  dates: TripDates;
  guests: number;
}

interface TripContextType {
  trip: TripState;
  addHotel: (hotel: Hotel) => void;
  removeHotel: (hotelId: string) => void;
  addRestaurant: (restaurant: Restaurant) => void;
  removeRestaurant: (restaurantId: string) => void;
  updateDates: (checkIn: string, checkOut: string) => void;
  updateGuests: (guests: number) => void;
  getTotalBudget: () => number;
  clearTrip: () => void;
  isHotelSelected: (hotelId: string) => boolean;
  isRestaurantSelected: (restaurantId: string) => boolean;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [trip, setTrip] = useState<TripState>({
    selectedHotels: [],
    selectedRestaurants: [],
    dates: {
      checkIn: '',
      checkOut: '',
      nights: 0
    },
    guests: 2
  });

  const addHotel = (hotel: Hotel) => {
    setTrip(prev => ({
      ...prev,
      selectedHotels: [...prev.selectedHotels.filter(h => h.id !== hotel.id), hotel]
    }));
  };

  const removeHotel = (hotelId: string) => {
    setTrip(prev => ({
      ...prev,
      selectedHotels: prev.selectedHotels.filter(h => h.id !== hotelId)
    }));
  };

  const addRestaurant = (restaurant: Restaurant) => {
    setTrip(prev => ({
      ...prev,
      selectedRestaurants: [...prev.selectedRestaurants.filter(r => r.id !== restaurant.id), restaurant]
    }));
  };

  const removeRestaurant = (restaurantId: string) => {
    setTrip(prev => ({
      ...prev,
      selectedRestaurants: prev.selectedRestaurants.filter(r => r.id !== restaurantId)
    }));
  };

  const updateDates = (checkIn: string, checkOut: string) => {
    const nights = checkIn && checkOut 
      ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
      : 0;
    
    setTrip(prev => ({
      ...prev,
      dates: { checkIn, checkOut, nights }
    }));
  };

  const updateGuests = (guests: number) => {
    setTrip(prev => ({ ...prev, guests }));
  };

  const getTotalBudget = (): number => {
    const hotelCost = trip.selectedHotels.reduce((sum, hotel) => 
      sum + (hotel.price_per_night_eur * trip.dates.nights), 0
    );
    
    const restaurantCost = trip.selectedRestaurants.reduce((sum, restaurant) => 
      sum + (restaurant.average_price * trip.guests * trip.dates.nights), 0
    );
    
    return hotelCost + restaurantCost;
  };

  const clearTrip = () => {
    setTrip({
      selectedHotels: [],
      selectedRestaurants: [],
      dates: { checkIn: '', checkOut: '', nights: 0 },
      guests: 2
    });
  };

  const isHotelSelected = (hotelId: string): boolean => {
    return trip.selectedHotels.some(hotel => hotel.id === hotelId);
  };

  const isRestaurantSelected = (restaurantId: string): boolean => {
    return trip.selectedRestaurants.some(restaurant => restaurant.id === restaurantId);
  };

  const value: TripContextType = {
    trip,
    addHotel,
    removeHotel,
    addRestaurant,
    removeRestaurant,
    updateDates,
    updateGuests,
    getTotalBudget,
    clearTrip,
    isHotelSelected,
    isRestaurantSelected
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}; 