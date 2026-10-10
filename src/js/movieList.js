const imageBaseURL = "https://image.tmdb.org/t/p/w500";

function movieCardTemplate(movie) {
  const title = movie.title || movie.name || "Title unavailable";

  const releaseDate =
    movie.release_date || movie.first_air_date || "";

  const releaseYear = releaseDate
    ? releaseDate.slice(0, 4)
    : "Unknown";

  const posterURL = movie.poster_path
    ? `${imageBaseURL}${movie.poster_path}`
    : "/images/poster-placeholder.svg";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "Not rated";

  return `
    <article class="movie-card">
        <img src="${posterURL}" alt="Poster for ${title}" class="movie-card__poster" loading="lazy" />

      <div class="movie-card__content">
        <h3 class="movie-card__title">${title}</h3>

        <div class="movie-card__information">
          <span>${releaseYear}</span>
          <span>⭐ ${rating}</span>
        </div>
      </div>
    </article>
  `;
}

export function renderMovieList(movies, container) {
  container.innerHTML = movies
    .map(movieCardTemplate)
    .join("");
}