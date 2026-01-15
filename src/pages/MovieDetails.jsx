import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../services/api.js";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function MovieDetails() {
  const { imdbID } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie", imdbID],
    queryFn: () => fetchMovieDetail(imdbID),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <p>🔄 Loading movie details ...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home">Return</Link>
          </li>
          <li>
            <button>Watchlist</button>
          </li>
        </ul>
      </nav>
      <section className="header">
        <h1>
          {data.Title} ({data.Year})
        </h1>
        <img
          src={data.Poster}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/330px-No_image_available.svg.png";
          }}
        />
      </section>
      <section className="about">
        <p>
          <b>Actors: </b> {data.Actors}
        </p>
        <div>
          <b>Rating</b>{" "}
          <ul>
            {data.Ratings.map((r) => (
              <li key={r.Source}>
                {r.Source}: {r.Value}
              </li>
            ))}
          </ul>
        </div>
        <p>
          <b>Plot:</b> {data.Plot}
        </p>
        <p>
          <b>Runtime: </b>
          {data.Runtime}
        </p>
        <p>
          <b>Release data: </b>
          {data.Released}
        </p>
      </section>
    </>
  );
}
export default MovieDetails;
