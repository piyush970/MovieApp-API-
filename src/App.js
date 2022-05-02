import React, { useState, useCallback, useEffect } from "react";
import MovieList from "./components/MovieList";
import Imdb from "./components/Imdb";
import ImdbSeries from "./components/ImdbSeries";
import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import SwitchTo from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App(props) {
  const [darkMode, setDarkMode] = useState(false);
  const [toggleLinks, setToggleLinks] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const imdbLinksToggle = () => {
    setToggleLinks(true);
  };

  const imdbLinksToggleFalse = () => {
    setToggleLinks(false);
  };

  const style = {
    textDecoration: "none",
    color: darkMode ? "white" : "black",
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Router>
          <div>
            <AppBar>
              <ul className="nav-links">
                <li>
                  <Link style={style} onClick={imdbLinksToggleFalse} to="/">
                    Movie App
                  </Link>
                </li>
                <li>
                  <Link style={style} onClick={imdbLinksToggleFalse} to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <button
                          style={{
                            color: darkMode ? "white" : "black",
                            background: darkMode ? "#121212" : "#1976d2",
                            border: "none",
                            fontSize: "22px",
                            fontFamily : 'Times New Roman'
                          }}
                          onClick={imdbLinksToggle}
                          {...bindTrigger(popupState)}
                        >
                          IMDB
                        </button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/imdb" style={style}>
                              Top 250 Movies
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/ImdbShows" style={style}>Top Webshows</Link>
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>Logout</MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </li>
                
                <div className="right-switch">
                  <SwitchTo
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                </div>
              </ul>
            </AppBar>

            <Routes>
              <Route path="/imdb" element={<Imdb />} />
              <Route path="/imdbShows" element={<ImdbSeries />} />

              <Route
                path="/"
                element={
                  <React.Fragment>
                    <div className="App">
                      <div className="header"></div>
                      <MovieList />
                    </div>
                  </React.Fragment>
                }
              />
            </Routes>
          </div>
        </Router>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
