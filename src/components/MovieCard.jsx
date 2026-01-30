import { Link } from "react-router-dom";
import "../styles/MovieCard.css";
import Tilt from "react-vanilla-tilt";

function MovieCard({ movie }) {
  return (
    <>
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="card-border">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <Tilt
            options={{
              max: 80,
              scale: 1.05,
              speed: 400,
              glare: true,
              "max-glare": 0.3,
            }}
            style={{ background: "transparent", display: "inline-block" }}
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              onError={(e) => {
                e.currentTarget.src =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/330px-No_image_available.svg.png";
              }}
              loading="lazy"
            />
          </Tilt>
        </div>
      </Link>
    </>
  );
}
export default MovieCard;
