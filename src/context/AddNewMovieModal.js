import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { ContextMovies } from "./MoviesContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
};

export const AddNewMovieModal = () => {
  const { moviesList, addNewMovie } = useContext(ContextMovies);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [movieDetails, setMovieDetails] = useState({
    id: +moviesList.length + 1,
    title: "",
    year: "",
    genre: "",
    rating: "",
    director: "",
    cast: "",
    writer: "",
    summary: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "genre") {
      setMovieDetails((prev) => ({ ...prev, genre: value.split(",") }));
    } else if (name === "cast") {
      setMovieDetails((prev) => ({ ...prev, cast: value.split(",") }));
    } else {
      setMovieDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const clear = () =>
    setMovieDetails({
      id: +moviesList.length + 1,
      title: "",
      year: "",
      genre: "",
      rating: "",
      writer: "",
      director: "",
      cast: "",
      summary: "",
      imageURL: "",
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      movieDetails.title === "" ||
      movieDetails.genre === "" ||
      movieDetails.summary === "" ||
      movieDetails.year === "" ||
      movieDetails.rating === "" ||
      movieDetails.imageURL === "" ||
      movieDetails.cast === "" ||
      movieDetails.director === "" ||
      movieDetails.writer === ""
    ) {
      alert("Please fill all the Fields");
    } else {
      addNewMovie(movieDetails);
      clear();
      handleClose();
      alert("New Movie Added 🚀");
    }
  };

  return (
    <div>
      <Button className="add-new-movie-btn" onClick={handleOpen}>
        Add New Movie
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Movie Details
          </Typography>
          <form
            className="new-movie-form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="group">
              <label className="form-label" htmlFor="title">
                Movie Title:
              </label>
              <input
                value={movieDetails.title}
                onChange={(e) => handleChange(e)}
                name="title"
                className="form-input"
                type="text"
              />
            </div>
            <div className="group">
              <label className="form-label" htmlFor="genre">
                Genre Name:
              </label>
              <input
                value={movieDetails.genre}
                onChange={(e) => handleChange(e)}
                name="genre"
                className="form-input"
                type="text"
                placeholder="Add genre's separated by comma's"
              />
            </div>
            <div className="group">
              <label className="form-label" htmlFor="cast">
                Cast:
              </label>
              <input
                value={movieDetails.cast}
                onChange={(e) => handleChange(e)}
                name="cast"
                className="form-input"
                type="text"
                placeholder="Add Cast members separated by comma's"
              />
            </div>
            <div className="group">
              <label className="form-label" htmlFor="writer">
                Writer:
              </label>
              <input
                value={movieDetails.writer}
                onChange={(e) => handleChange(e)}
                name="writer"
                className="form-input"
                type="text"
              />
            </div>
            <div className="group">
              <label className="form-label" htmlFor="director">
                Director:
              </label>
              <input
                value={movieDetails.director}
                onChange={(e) => handleChange(e)}
                name="director"
                className="form-input"
                type="text"
              />
            </div>
            <div className="group">
              <label className="form-label" htmlFor="summary">
                Summary:
              </label>
              <textarea
                value={movieDetails.summary}
                onChange={(e) => handleChange(e)}
                className="form-input"
                name="summary"
                id="summary"
              ></textarea>
            </div>
            <div className="group">
              <label className="form-label" htmlFor="year">
                Year:
              </label>
              <select
                className="form-input"
                value={movieDetails.year}
                onChange={(e) => handleChange(e)}
                name="year"
                id="year"
              >
                {Array.from({ length: 2024 - 1990 }, (_, index) => (
                  <option key={1990 + index} value={1990 + index}>
                    {1990 + index}
                  </option>
                ))}
              </select>
            </div>
            <div className="group">
              <label className="form-label" htmlFor="rating">
                Rating:
              </label>
              <select
                className="form-input"
                value={movieDetails.rating}
                onChange={(e) => handleChange(e)}
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
            </div>
            <div className="group">
              <label className="form-label" htmlFor="imageURL">
                Image URL:
              </label>
              <input
                value={movieDetails.imageURL}
                onChange={(e) => handleChange(e)}
                name="imageURL"
                className="form-input"
                type="text"
              />
            </div>
            <div className="group">
              <button className="add-to-watch-list-btn" type="submit">
                Add New Movie
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
