import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ContextMovies } from "../context/MoviesContext";

export const SingleMoviePage = () => {
  const { movieID } = useParams();
  const { moviesList, removeFromWatchList, addToWatchList } =
    useContext(ContextMovies);

  const singleMovie = moviesList.find((movie) => +movie.id === +movieID);
  return (
    <div className="single-movie-wrapper">
      <img
        className="single-product-img"
        src={singleMovie?.imageURL}
        alt={singleMovie?.name}
      />
      <div className="movie-details">
        <h2>{singleMovie?.title}</h2>
        <p>{singleMovie?.summary}</p>
        <p>Year: {singleMovie?.year}</p>
        <p>Genre: {singleMovie?.genre.map((genre) => genre)}</p>
        <p>Rating: {singleMovie?.rating}</p>
        <p>Director: {singleMovie?.director}</p>
        <p>Writer: {singleMovie?.writer}</p>
        <p className="cast-p">
          Cast:{" "}
          {singleMovie?.cast.map((cast) => (
            <span> {cast}</span>
          ))}
        </p>
        {singleMovie.isWatchList ? (
          <button
            onClick={() => removeFromWatchList(singleMovie.id)}
            className="add-to-watch-list-btn"
          >
            Remove from Watch List
          </button>
        ) : (
          <button
            onClick={() => addToWatchList(singleMovie.id)}
            className="add-to-watch-list-btn"
          >
            Add to Watch List
          </button>
        )}
      </div>
    </div>
  );
};
