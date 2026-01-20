import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

function MovieCard({ movie }) {
  return (
    <>
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="card-border">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <img
            src={movie.Poster}
            alt={movie.Title}
            onError={(e) => {
              e.currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/330px-No_image_available.svg.png";
            }}
            loading="lazy"
          />
        </div>
      </Link>
    </>
  );
}
export default MovieCard;
