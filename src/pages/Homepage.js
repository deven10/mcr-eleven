import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ContextMovies } from "../context/MoviesContext";
import { AddNewMovieModal } from "../context/AddNewMovieModal";

export const Homepage = () => {
  const navigate = useNavigate();
  const { moviesList, removeFromWatchList, addToWatchList, searchText } =
    useContext(ContextMovies);
  console.log(moviesList);

  const listOfGenre = moviesList.map((movie) => movie.genre);
  console.log("genre list : ", listOfGenre);

  const [selectedRating, setSelectedRating] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const filterBySearch = (dataset) => {
    if (searchText === "") {
      return dataset;
    } else {
      const temp = moviesList.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchText.toLowerCase()) ||
          movie.cast.toString().toLowerCase().includes(searchText.toLowerCase())
      );

      return temp;
    }
  };

  const filterByGenre = (dataset) => {
    return dataset;
  };
  const filterByYear = (dataset) => {
    if (selectedYear === "") {
      return dataset;
    } else {
      return dataset.filter(({ year }) => +year === +selectedYear);
    }
  };
  const filterByRating = (dataset) => {
    if (selectedRating === "") {
      return dataset;
    } else {
      return dataset.filter(({ rating }) => +rating === +selectedRating);
    }
  };

  const searchFilter = filterBySearch(moviesList);
  const genreFilter = filterByGenre(searchFilter);
  const yearFilter = filterByYear(genreFilter);
  const ratingFilter = filterByRating(yearFilter);

  return (
    <div className="home-page-wrapper">
      <header className="header">
        <p className="header-title">Movies</p>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="select"
          name="genre"
          id="genre"
        ></select>
        <select
          className="select"
          name="release-year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          id="release-year"
        >
          <option value="">Select a Year</option>
          {Array.from({ length: 2024 - 1990 }, (_, index) => (
            <option key={1990 + index} value={1990 + index}>
              {1990 + index}
            </option>
          ))}
        </select>
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="select"
          name="rating"
          id="rating"
        >
          <option value="">Select a Rating</option>
          <option value="10">10 Rating</option>
          <option value="9">9 Rating</option>
          <option value="8">8 Rating</option>
          <option value="7">7 Rating</option>
          <option value="6">6 Rating</option>
          <option value="5">5 Rating</option>
          <option value="4">4 Rating</option>
          <option value="3">3 Rating</option>
          <option value="2">2 Rating</option>
          <option value="1">1 Rating</option>
        </select>
        <AddNewMovieModal />
      </header>
      <main className="movies-wrapper">
        {ratingFilter?.map((movie) => (
          <div key={movie.id} className="card">
            <img
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="movie-img"
              src={movie.imageURL}
              alt={movie.title}
            />
            <p
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="movie-title"
            >
              {movie.title}
            </p>
            <p
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="movie-description"
            >
              {movie.summary}
            </p>
            {movie.isWatchList ? (
              <button
                onClick={() => removeFromWatchList(movie.id)}
                className="add-to-watch-list-btn"
              >
                Remove from Watch List
              </button>
            ) : (
              <button
                onClick={() => addToWatchList(movie.id)}
                className="add-to-watch-list-btn"
              >
                Add to Watch List
              </button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};
