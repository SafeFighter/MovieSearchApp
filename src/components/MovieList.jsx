import { useState, useEffect } from "react";

function MovieList() {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <>
      <div className="watchlist">
        <h4>My Watchlist</h4>
        <ul>
          {watchlist.map((movie) => (
            <li key={movie.key}>{movie.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MovieList;
