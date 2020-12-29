import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiServiceDetails } from "../ApiService/ApiService";
// import s from "./MovieDetailsPage.module.css";

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
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
            width="240px"
          />
          <h4>{movie.title}</h4>
          <p>{movie.id}</p>
        </>
      )}
    </>
  );
}
