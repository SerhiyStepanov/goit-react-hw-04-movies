import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiServiceDetails } from "../ApiService/ApiService";

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!moviesId) {
      return;
    }
    setStatus("pending");

    ApiServiceDetails(moviesId)
      .then((data) => {
        setMovie(data);
        setStatus("resolved");
      })
      .catch(error);
    setError(error);
    setStatus("rejected");
  }, []);
  return (
    <>
      {status === "idle" && <h1>MovieDetailsPage</h1>}
      {status === "pending " && <b>loaded</b>}
      {status === "rejected " && <b>error</b>}
      {status === "resolved" && (
        <>
          <h3>{movie.title}</h3>
          <p>{movie.id}</p>

          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
          />
        </>
      )}
    </>
  );
}
