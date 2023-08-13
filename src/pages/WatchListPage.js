import React, { useContext } from "react";
import { ContextMovies } from "../context/MoviesContext";
import { useNavigate } from "react-router-dom";

export const WatchListPage = () => {
  const navigate = useNavigate();
  const { moviesList, removeFromWatchList } = useContext(ContextMovies);
  const watchList = moviesList.filter(({ isWatchList }) => isWatchList);
  return (
    <main className="movies-wrapper">
      {watchList.length > 0 ? (
        watchList?.map((movie) => (
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
            <button
              onClick={() => removeFromWatchList(movie.id)}
              className="add-to-watch-list-btn"
            >
              Remove from Watch List
            </button>
          </div>
        ))
      ) : (
        <p>
          <strong>No Movies Found ¯\_(ツ)_/¯ </strong>
        </p>
      )}
    </main>
  );
};
