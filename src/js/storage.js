const FAVORITES_KEY = "moviehub-favorites";

export function getFavorites() {
  return JSON.parse(
    localStorage.getItem(FAVORITES_KEY)
  ) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}

export function addFavorite(movie) {
  const favorites = getFavorites();

  const exists = favorites.some(
    item => item.id === movie.id
  );

  if (!exists) {
    favorites.push(movie);
    saveFavorites(favorites);
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(
    movie => movie.id !== id
  );

  saveFavorites(favorites);
}
