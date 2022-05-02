import "../index.css";
import { Button } from "@mui/material";
import { useState } from "react";
import { DUMMY_MOVIES } from "./Movies";
import MovieDetails from "./MovieDetails";

import ImportExportIcon from '@mui/icons-material/ImportExport';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const MovieList = (props) => {

  const [name, setName] = useState("");
  const [foundMovies, setFoundMovies] = useState(DUMMY_MOVIES);
  const [showDetails, setShowDetails] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [sortActive, setSortActive] = useState("rawData");
  const [selected, setSelected] = useState(0);

  const sortButtonHandler = () => {
    if (sortActive === "rawData") {
      setSortActive("sortAZ");
    }
    if (sortActive === "sortAZ") {
      setSortActive("sortZA");
    }
    if (sortActive === "sortZA") {
      setSortActive("sortAZ");
    }
  };

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = DUMMY_MOVIES.filter((movie) => {
        return movie.title.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundMovies(results);
    } else {
      setFoundMovies(DUMMY_MOVIES);
    }
    setName(keyword);
  };

  const moviesHandler = (key) => {
    setShowDetails(true);
    setSelected(key);
    movieDetails.splice(0, movieDetails.length);
    const updatedMovieDetails = DUMMY_MOVIES.filter(
      (movie) => key === movie.id
    );
    setMovieDetails(updatedMovieDetails);
  };


  let content;
  if (sortActive === "sortAZ") {
    content =
      foundMovies && foundMovies.length > 0 ? (
        foundMovies
          .sort((a, b) => (a.title > b.title ? 1 : -1))
          .map((movie) => (
            <Button
              key={movie.id}
              style={{ margin: "2px" }}
              // className={activeButton === movie.id ? `${classes.activeButton}` : ""}
              variant= {movie.id === selected ? "contained" : "outlined" }
              onClick={() => moviesHandler(movie.id)}
            >
              {movie.title}
            </Button>
          ))
      ) : (
        <h2>No Movies Found.</h2>
      );
  } else if (sortActive === "rawData") {
    content =
      foundMovies && foundMovies.length > 0 ? (
        foundMovies.map((movie) => (
          <Button
            key={movie.id}
            style={{ margin: "2px" }}
            variant= {movie.id === selected ? "contained" : "outlined" }
            onClick={() => moviesHandler(movie.id)}
          >
            {movie.title}
          </Button>
        ))
      ) : (
        <h2>No Movies Found.</h2>
      );
  } else {
    content =
      foundMovies && foundMovies.length > 0 ? (
        foundMovies
          .sort((a, b) => (a.title < b.title ? 1 : -1))
          .map((movie) => (
            <Button
              key={movie.id}
              style={{ margin: "2px" }}
              variant= {movie.id === selected ? "contained" : "outlined" }
              onClick={() => moviesHandler(movie.id)}
            >
              {movie.title}
            </Button>
          ))
      ) : (
        <h2>No Movies Found.</h2>
      );
  }

  return (
    <div>
      <div className="flexContainer">
        <input
          type="search"
          value={name}
          onChange={filter}
          className="input"
          placeholder="Search"
        />
        {sortActive === 'rawData' && <button className="sort-button" onClick={sortButtonHandler}><ImportExportIcon/></button>}
        {sortActive === 'sortAZ' && <button className="sort-button" onClick={sortButtonHandler}><KeyboardDoubleArrowUpIcon/></button>}
        {sortActive === 'sortZA' && <button className="sort-button" onClick={sortButtonHandler}><KeyboardDoubleArrowDownIcon/></button>}
      </div>
      <div className="buttons-details">
        <div className="movie-list">{content}</div>
        <div>{showDetails && <MovieDetails theme={props.theme} items={movieDetails} />}</div>
      </div>
    </div>
  );
};

export default MovieList;


