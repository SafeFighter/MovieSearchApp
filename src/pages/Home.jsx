import SearchBar from "../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "../services/api.js";
import { useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import { Link } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <button>Watchlist</button>
          </li>
        </ul>
      </nav>
      <section className="hero">
        <h1>Movie search engine</h1>
        <h5>Powered by OMDB</h5>
      </section>
      <section className="searchMovie">
        <SearchBar onSearch={setSearchTerm} />
      </section>
      <section className="movie-response">
        {data?.map((film) => (
          <MovieCard key={film.imdbID} movie={film} />
        ))}
      </section>
    </>
  );
}
export default Home;
