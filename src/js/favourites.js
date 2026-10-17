import { getFavorites } from "./storage.js";

const favoritesContainer = document.querySelector("#favorites-container");

function displayFavorites() {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = `
      <p>No favorite movies yet.</p>
    `;
    return;
  }

  favoritesContainer.innerHTML = favorites
    .map(
      (movie) => `
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />

        <h3>${movie.title}</h3>

        <p>
          ⭐ ${movie.vote_average}
        </p>
      </div>
    `
    )
    .join("");
}

displayFavorites();