const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchMovie(movieName) {
  const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(
    movieName
  )}&apikey=${API_KEY}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Response status:${response.status}`);
  }
  const result = await response.json();

  if (result.Response === "False") {
    return [];
  }

  return result.Search ?? [];
}

export async function fetchMovieDetail(movieID) {
  const apiUrl = `https://www.omdbapi.com/?i=${encodeURIComponent(
    movieName
  )}&apikey=${API_KEY}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Response status:${response.status}`);
  }
  const result = await response.json();
  return result;
}
