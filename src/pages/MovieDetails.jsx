import { useParams, Link } from "react-router-dom";
import { fetchMovieDetail } from "../services/api.js";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import MovieList from "../components/MovieList.jsx";
import "../styles/MovieDetail.css";
import { Helmet } from "react-helmet-async";

function MovieDetails() {
  const { imdbID } = useParams();

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [toggleWatchlist, setToggleWatchlist] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie", imdbID],
    queryFn: () => fetchMovieDetail(imdbID),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchList() {
    const exists = watchlist.some((movie) => movie.id === imdbID);
    if (exists) return alert("Movie is already on watchlist");

    const newMovie = {
      id: imdbID,
      name: data.Title,
    };

    setWatchlist([...watchlist, newMovie]);
  }

  if (isLoading) return <p>🔄 Loading movie details...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <Helmet>
        <title>
          {data.Title} ({data.Year}) | Movie Search App
        </title>
        <meta
          name="description"
          content={`Details and ratings for ${data.Title} (${data.Year}).`}
        />
        <meta property="og:image" content={data.Poster} />
      </Helmet>
      <nav>
        <ul>
          <li>
            <Link to="/home">⬅ Return</Link>
          </li>
          <li>
            <button onClick={() => setToggleWatchlist(!toggleWatchlist)}>
              Watchlist
            </button>
          </li>
        </ul>
      </nav>

      {toggleWatchlist && <MovieList />}

      <div className="movie-layout">
        <section className="movie-main">
          <img
            className="movie-poster"
            src={data.Poster}
            alt={data.Title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/330px-No_image_available.svg.png";
            }}
          />

          <button className="watchlist-btn" onClick={addToWatchList}>
            ➕ Add to Watchlist
          </button>
        </section>

        <section className="movie-info">
          <h1>
            {data.Title} <span>({data.Year})</span>
          </h1>

          <p className="plot">{data.Plot}</p>

          <div className="info-grid">
            <div>
              <b>Actors:</b>
              <br />
              {data.Actors}
            </div>
            <div>
              <b>Genre:</b>
              <br />
              {data.Genre}
            </div>
            <div>
              <b>Runtime:</b>
              <br />
              {data.Runtime}
            </div>
            <div>
              <b>Released:</b>
              <br />
              {data.Released}
            </div>
          </div>

          <div className="ratings">
            <h3>Ratings</h3>
            <ul>
              {data.Ratings.map((r) => (
                <li key={r.Source}>
                  <span>{r.Source}</span>
                  <span>{r.Value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

export default MovieDetails;
