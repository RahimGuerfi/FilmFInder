const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting app at http://localhost:${port}`);
});
app.use(bodyParser.json());
app.use(express.static("public"));

//index.js
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

//Api base url
const tmdbBaseUrl = "https://api.themoviedb.org/3";

//Get genres route
app.get("/api/getGenres", async (req, res) => {
  const genreRequestEndpoint = "/genre/movie/list";
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint;

  const api_key = process.env.API_KEY;

  const apiResponse = await fetch(urlToFetch, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + api_key,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  const jsonResponse = await apiResponse.json();
  const data = jsonResponse.genres;
  res.json(data);
});

//Get movies route
app.post("/api/getMovies", async (req, res) => {
  const { genre, page } = req.body;
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = "?with_genres=" + genre + "&page=" + page;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  const api_key = process.env.API_KEY;

  const apiResponse = await fetch(urlToFetch, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + api_key,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  const jsonResponse = await apiResponse.json();
  const data = jsonResponse.results;
  res.json(data);
});

//Get movieInfo route
//Get genres route
app.get("/api/getMovieInfo/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const movieEndpoint = "/movie/" + movieId;
  const urlToFetch = tmdbBaseUrl + movieEndpoint;

  const api_key = process.env.API_KEY;

  const apiResponse = await fetch(urlToFetch, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + api_key,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  const data = await apiResponse.json();
  res.json(data);
});
