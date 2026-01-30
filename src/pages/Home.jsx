import SearchBar from "../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "../services/api.js";
import { useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import { Link } from "react-router-dom";
import MovieList from "../components/MovieList.jsx";
import "../styles/Home.css";
import { Helmet } from "react-helmet-async";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleWatchlist, setToggleWatchlist] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  function openWatchlist() {
    if (toggleWatchlist) {
      setToggleWatchlist(false);
    } else {
      setToggleWatchlist(true);
    }
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: () => fetchMovie(searchTerm),
    enabled: !!searchTerm,
  });

  if (isLoading) {
    return <p>🔄 Loading movies ...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  const sortedData = data
    ? [...data].sort((a, b) =>
        sortOrder === "asc" ? b.Year - a.Year : a.Year - b.Year,
      )
    : [];

  return (
    <>
      <Helmet>
        <title>Movie Search App | React & OMDb API</title>
        <meta
          name="description"
          content="Search movies using the OMDb API. Find ratings, plot and release year."
        />
      </Helmet>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <button onClick={openWatchlist}>Watchlist</button>
          </li>
        </ul>
      </nav>
      {toggleWatchlist && <MovieList />}
      <section className="hero">
        <h1>Movie search engine</h1>
        <h5>Powered by OMDB</h5>
      </section>
      <section className="searchMovie">
        <SearchBar onSearch={setSearchTerm} />
      </section>
      <section className="movie-sort">
        <select
          name="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option name="asc" value="asc">
            Newest Release
          </option>
          <option name="desc" value="desc">
            Oldest Release
          </option>
        </select>
      </section>
      <section className="movie-response">
        {sortedData.map((film) => (
          <MovieCard key={film.imdbID} movie={film} />
        ))}
      </section>
    </>
  );
}
export default Home;
