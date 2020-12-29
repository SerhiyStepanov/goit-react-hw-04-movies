import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiServiceDetails } from "../ApiService/ApiService";

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  console.log(moviesId);

  useEffect(() => {
    ApiServiceDetails(moviesId)
      .then((data) => {
        setMovie(data);
      })
      .catch(setError(error));
  }, []);
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
