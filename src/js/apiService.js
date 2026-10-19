export default class ApiService {
  constructor() {
    this.baseURL = "https://api.themoviedb.org/3";
    this.token = import.meta.env.VITE_TMDB_TOKEN;
    console.log("TMDB TOKEN:", this.token);
  }

  async getTrendingMovies() {
    const response = await fetch(
      `${this.baseURL}/trending/movie/day`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `TMDb request failed with status ${response.status}`,
      );
    }

    const data = await response.json();
    return data.results;
  }

  async searchContent(searchTerm) {
    const encodedSearchTerm =
      encodeURIComponent(searchTerm);

    const response = await fetch(
      `${this.baseURL}/search/multi?query=${encodedSearchTerm}&include_adult=false`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Search request failed with status ${response.status}`,
      );
    }

    const data = await response.json();

    return data.results.filter(
      (item) =>
        item.media_type === "movie" ||
        item.media_type === "tv",
    );
  }

  async getContentDetails(id, mediaType) {
    const response = await fetch(
      `${this.baseURL}/${mediaType}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Details request failed with status ${response.status}`,
      );
    }

    return response.json();
  }

  async getContentVideos(id, mediaType) {
  const response = await fetch(
    `${this.baseURL}/${mediaType}/${id}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Videos request failed with status ${response.status}`,
    );
  }

  const data = await response.json();
  return data.results;
 }
}
