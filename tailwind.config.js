// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/index.html',
  ],
  darkMode: 'class', // Activer le mode sombre basé sur la classe
  theme: {
    extend: {
      colors: {
        // Neutre & sobre avec petite touche Disney
        snowDrift:    '#FAF8F0',  // Fond principal clair
        stoneGray:    '#B2ADA3',  // Texte secondaire & fonds alternatifs
        charcoalWaltz:'#33312D',  // Titres & textes importants
        fairyGold:    '#D4AF37',  // Accent magique (CTA, hover, icônes)
        mistyMauve:   '#8C78B3',  // Liens, badges, détails féériques
        cloudSand:    '#F5F0E1',  // Cartes / modales / formulaires
        
        // Couleurs pour le mode sombre
        darkBg:       '#1A1A1A',  // Fond principal sombre
        darkCard:     '#2A2A2A',  // Cartes et conteneurs sombres
        darkText:     '#E5E5E5',  // Texte principal sombre
        darkSecondary:'#9CA3AF',  // Texte secondaire sombre
        darkBorder:   '#374151',  // Bordures sombres
      },
      fontFamily: {
        sans:  ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // ex. require('@tailwindcss/typography'),
    // require('tailwindcss-animate'),
  ],
}; 