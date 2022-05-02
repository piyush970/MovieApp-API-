import "../index.css";

const MovieDetails = (props) => {
  return (
    <ul>
      {props.items.map((movie) => (
        <div className="image-movie-details">
          <div>
            <img
              style={{height: '330px', width: '250px'}}
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt=""
            />
          </div>
          <div className="movie-details">
            <li style={{fontSize: '150%'}}><b>{movie.title}</b></li>
            <hr />
            <li>Release Date: {movie.release_date}</li>
            <hr />
            <li>IMDB : {movie.vote_average}</li>
            <hr />
            <li>{movie.overview}</li>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default MovieDetails;
