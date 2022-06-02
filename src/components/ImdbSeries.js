import React, { useState, useEffect, useCallback } from "react";
import "../index.css";

import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ImdbSeries = () => {
  const [Movies, setMovies] = useState([]);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://imdb-api.com/en/API/Top250TVs/k_yip52iqe/",
        {
          method: "GET",
          headers: {},
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      // console.log(data);

      const transformedMovies = data.items.map((movieData) => {
        return {
          id: movieData.id,
          title: movieData.title,
          image: movieData.image,
          imdb: movieData.imDbRating,
          rank: movieData.rank,
          releaseYear: movieData.year,
          votes: movieData.imDbRatingCount,
        };
      });
      setMovies(transformedMovies);
      // setMovies(Fetch_Movies);
      console.log(transformedMovies);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   fetchMoviesHandler();
  // }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="imdb">
      <div>
        <Button variant="contained" onClick={fetchMoviesHandler}>
          Fetch Series
        </Button>
      </div>
      <div>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Rank</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Image</StyledTableCell>

                <StyledTableCell align="left">IMDB Rating</StyledTableCell>
                <StyledTableCell align="left">Release Year</StyledTableCell>
                <StyledTableCell align="left">Votes</StyledTableCell>
                {/* <StyledTableCell>ID</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Movies.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.rank}</StyledTableCell>
                  <StyledTableCell align="left">{row.title}</StyledTableCell>
                  <StyledTableCell align="left">
                    <img className="movie-image" src={row.image} alt="image" />{" "}
                  </StyledTableCell>

                  <StyledTableCell align="left">{row.imdb}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.releaseYear}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.votes}</StyledTableCell>
                  {/* <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ImdbSeries;
