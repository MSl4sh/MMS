/**
 * Utilitaire pour obtenir les chemins d'assets publics
 * Fonctionne avec GitHub Pages qui sert l'app depuis un sous-dossier
 */
export const getPublicUrl = (path: string): string => {
  // process.env.PUBLIC_URL est défini dans package.json (homepage)
  // Il sera "/MMS" en production sur GitHub Pages
  const publicUrl = process.env.PUBLIC_URL || '';
  // Enlever le slash initial du path s'il existe pour éviter les doubles slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${publicUrl}${cleanPath}`;
};

