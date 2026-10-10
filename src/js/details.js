import "../style.css";
import ApiService from "./apiService.js";

const imageBaseURL = "https://image.tmdb.org/t/p/w500";

const detailsContainer =
  document.querySelector("#details-app");

const parameters = new URLSearchParams(
  window.location.search,
);

const contentId = parameters.get("id");
const mediaType = parameters.get("type");

const api = new ApiService();

function detailsTemplate(content) {
  const title =
    content.title ||
    content.name ||
    "Title unavailable";

  const releaseDate =
    content.release_date ||
    content.first_air_date ||
    "Unknown";

  const runtime = content.runtime
    ? `${content.runtime} minutes`
    : content.episode_run_time?.length
      ? `${content.episode_run_time[0]} minutes`
      : "Runtime unavailable";

  const rating =
    typeof content.vote_average === "number"
      ? content.vote_average.toFixed(1)
      : "Not rated";

  const genres = content.genres?.length
    ? content.genres
        .map((genre) => genre.name)
        .join(", ")
    : "Genres unavailable";

  const posterURL = content.poster_path
    ? `${imageBaseURL}${content.poster_path}`
    : "/images/poster-placeholder.svg";

  return `
    <main class="details-container">
       <a href="/" class="back-link">
        ← Back to MovieHub
       </a>

      <article class="details-card">
        <img src="${posterURL}" alt="${title} poster" class="details-card__poster" loading="lazy" />

        <div class="details-card__content">
          <h1>${title}</h1>

          <div class="details-card__facts">
            <span>⭐ ${rating}</span>
            <span>${releaseDate}</span>
            <span>${runtime}</span>
          </div>

          <p>
            <strong>Genres:</strong>
            ${genres}
          </p>

          <section>
            <h2>Overview</h2>

            <p>
              ${
                content.overview ||
                "No overview is currently available."
              }
            </p>
          </section>
        </div>
      </article>
    </main>
  `;
}

async function loadContentDetails() {
  if (!contentId || !mediaType) {
    detailsContainer.innerHTML = `
      <main class="details-container">
        <p class="error-message">
          The content details could not be identified.
        </p>

        /
          Return to MovieHub
        </a>
      </main>
    `;

    return;
  }

  detailsContainer.innerHTML = `
    <main class="details-container">
      <p class="status-message">
        Loading details...
      </p>
    </main>
  `;

  try {
    const content = await api.getContentDetails(
      contentId,
      mediaType,
    );

    detailsContainer.innerHTML =
      detailsTemplate(content);
  } catch (error) {
    console.error(
      "Unable to load content details:",
      error,
    );

    detailsContainer.innerHTML = `
      <main class="details-container">
        <p class="error-message">
          We could not load the selected content.
          Please try again later.
        </p>

        /
          Return to MovieHub
        </a>
      </main>
    `;
  }
}

loadContentDetails();