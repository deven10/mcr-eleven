import React, { createContext, useState, useEffect } from "react";
import { movies } from "../data/Data";

export const ContextMovies = createContext();

export const MoviesContext = ({ children }) => {
  const [moviesList, setMoviesList] = useState(movies);

  const [searchText, setSearchText] = useState("");

  if (!localStorage.getItem("allMoviesData")) {
    localStorage.setItem("allMoviesData", JSON.stringify(moviesList));
  }

  useEffect(() => {
    if (localStorage.getItem("allMoviesData")) {
      const temp = JSON.parse(localStorage.getItem("allMoviesData"));
      setMoviesList(() => [...temp]);
    }
  }, []);

  const addNewMovie = (movieDetails) => {
    const allMoviesData = JSON.parse(localStorage.getItem("allMoviesData"));
    allMoviesData.push({ ...movieDetails });
    localStorage.setItem("allMoviesData", JSON.stringify(allMoviesData));
    setMoviesList((prev) => [...prev, { ...movieDetails }]);
  };

  const addToWatchList = (movieID) => {
    const temp = moviesList.map((movie) =>
      +movie.id === +movieID ? { ...movie, isWatchList: true } : movie
    );
    localStorage.setItem("allMoviesData", JSON.stringify(temp));
    setMoviesList(() => temp);
  };

  const removeFromWatchList = (movieID) => {
    const temp = moviesList.map((movie) =>
      +movie.id === +movieID ? { ...movie, isWatchList: false } : movie
    );
    localStorage.setItem("allMoviesData", JSON.stringify(temp));
    setMoviesList(() => temp);
  };

  return (
    <ContextMovies.Provider
      value={{
        moviesList,
        addNewMovie,
        removeFromWatchList,
        addToWatchList,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </ContextMovies.Provider>
  );
};
