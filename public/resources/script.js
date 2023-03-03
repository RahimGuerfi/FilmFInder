const MIN_PAGE = 1;
const MAX_PAGE = 200;
const playBtn = document.getElementById("playBtn");
const loader = document.getElementById("loader");

const getGenres = async () => {
  const response = await fetch("/api/getGenres");
  const genres = await response.json();
  return genres;
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const page = Math.floor(Math.random() * MAX_PAGE + MIN_PAGE);

  const response = await fetch("/api/getMovies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      genre: selectedGenre,
      page: page,
    }),
  });
  const movies = await response.json();
  return movies;
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;

  const response = await fetch("/api/getMovieInfo/" + movieId);
  const movieInfo = await response.json();
  return movieInfo;
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }

  playBtn.disabled = true;
  loader.style.display = "flex";
  hideBtns();

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);

  playBtn.disabled = false;
  loader.style.display = "none";
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
