import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiServiceDetails } from "../ApiService/ApiService";

export default function MovieDetailsPage() {
  const { movieId } = useParams(null);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  console.log(movie);

  useEffect(() => {
    if (!movie) {
      return;
    }

    ApiServiceDetails(movieId)
      .then((data) => setMovie(data))
      .catch(error);
  }, [movie]);
  return (
    <>
      <h1>MovieDetailsPage</h1>
      {movie && (
        <>
          <p>{movie.id}</p>
          <h3>{movie.title}</h3>
          <img src={movie.homepage} />
        </>
      )}
    </>
  );
}
