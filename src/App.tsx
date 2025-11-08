import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Accommodations from './pages/Accommodations';
import Restaurants from './pages/Restaurants';
import MyTrip from './pages/MyTrip';

function App() {
  return (
    <ThemeProvider>
      <TripProvider>
        <Router>
          <div className="min-h-screen bg-snowDrift dark:bg-darkBg font-sans transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hebergements" element={<Accommodations />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/mon-sejour" element={<MyTrip />} />
              {/* Redirection vers l'accueil pour toutes les routes non trouvées */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </TripProvider>
    </ThemeProvider>
  );
}

export default App;
