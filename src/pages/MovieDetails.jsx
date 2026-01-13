import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../services/api.js";
import { useQuery } from "@tanstack/react-query";

function MovieDetails() {
  const { imdbID } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetail(imdbID),
  });

  if (isLoading) {
    return <p>🔄 Loading movie details ...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  if (data) {
    console.log(data);
  }
  return <></>;
}
export default MovieDetails;
