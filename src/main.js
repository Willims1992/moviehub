import ApiService from "./js/apiService.js";
import "./style.css";
const apiService = new ApiService();
console.log(apiService);


document.querySelector("#app").innerHTML = `
  <header>
    <h1>MovieHub</h1>
    <p>Discover movies and TV shows</p>
  </header>

  <section class="search-section">
    <input
      type="text"
      id="search-input"
      placeholder="Search movies or TV shows..."
    />
  </section>

  <section>
    <h2>Trending Movies</h2>
    <div id="trending-container"></div>
  </section>
`;
