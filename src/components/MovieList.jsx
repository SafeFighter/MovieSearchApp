import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/MovieList.css";

function MovieList() {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function deleteMovie(index) {
    setWatchlist(watchlist.filter((_, i) => i !== index));
  }

  return (
    <>
      <div className="watchlist">
        <h4>My Watchlist</h4>
        <ul>
          {watchlist.map((movie, index) => (
            <li key={index}>
              <Link to={`/movie/${movie.id}`}>{movie.name} </Link>
              <button onClick={() => deleteMovie(index)}>❌</button>{" "}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MovieList;
