const MIN_PAGE = 1;
const MAX_PAGE = 200;
const tmdbKey = "e6e5a595cb0c44dea1c5228aabb1f741";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = "?api_key=" + tmdbKey;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.genres;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const page = Math.floor(Math.random() * MAX_PAGE + MIN_PAGE);
  const requestParams =
    "?api_key=" + tmdbKey + "&with_genres=" + selectedGenre + "&page=" + page;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = "/movie/" + movieId;
  const requestParams = "?api_key=" + tmdbKey;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }

  playBtn.disabled = true;

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);

  playBtn.disabled = false;
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
