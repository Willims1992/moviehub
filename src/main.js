import "./style.css";
import ApiService from "./js/apiService.js";
import { renderMovieList } from "./js/movieList.js";

document.querySelector("#app").innerHTML = `
  <main class="container">
    <header class="hero">
      <h1>MovieHub</h1>
      <p>Discover movies and TV shows</p>
    </header>

    <section class="search-section">
  <form id="search-form" class="search-form">
    <label class="visually-hidden" for="search-input">
      Search movies or TV shows
    </label>

    <input
      type="search"
      id="search-input"
      placeholder="Search movies or TV shows..."
      autocomplete="off"
      required
    />

    <button type="submit">Search</button>
  </form>
</section>

    <section class="trending-section">
      <h2 id="content-title">Trending Movies</h2>

      <div id="trending-container" class="movie-grid">
        <p>Loading trending movies...</p>
      </div>
    </section>
  </main>
`;

const api = new ApiService();

const trendingContainer = document.querySelector(
  "#trending-container",
);

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const contentTitle = document.querySelector("#content-title");

async function loadTrendingMovies() {
  try {
    const movies = await api.getTrendingMovies();
    renderMovieList(movies, trendingContainer);
  } catch (error) {
    console.error("Unable to load trending movies:", error);

    trendingContainer.innerHTML = `
      <p class="error-message">
        We could not load trending movies. Please try again later.
      </p>
    `;
  }
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    return;
  }

  contentTitle.textContent =
    `Search Results for "${searchTerm}"`;

  trendingContainer.innerHTML = `
    <p class="status-message">Searching...</p>
  `;

  try {
    const results = await api.searchContent(searchTerm);

    if (results.length === 0) {
      trendingContainer.innerHTML = `
        <p class="status-message">
          No movies or TV shows were found for
          "${searchTerm}".
        </p>
      `;

      return;
    }

    renderMovieList(results, trendingContainer);
  } catch (error) {
    console.error("Unable to search:", error);

    trendingContainer.innerHTML = `
      <p class="error-message">
        We could not complete the search.
        Please try again later.
      </p>
    `;
  }
});

loadTrendingMovies();
