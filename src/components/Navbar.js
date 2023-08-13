import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContextMovies } from "../context/MoviesContext";

export const Navbar = () => {
  const { searchText, setSearchText } = useContext(ContextMovies);
  const styling = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#525252" : "",
    };
  };
  return (
    <div className="navbar-wrapper">
      <p className="logo">IMDB</p>
      <input
        className="searchbox"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search movies by title, cast and director... "
      />
      <div className="nav-links">
        <NavLink style={styling} className="link" to="/">
          Movies
        </NavLink>
        <NavLink style={styling} className="link" to="watch-list">
          Watch List
        </NavLink>
      </div>
    </div>
  );
};
