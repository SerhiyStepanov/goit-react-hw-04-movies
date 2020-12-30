import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiServiceDetails } from "../ApiService/ApiService";
import Loader from "../Loader/Loader";
import s from "./MovieDetailsPage.module.css";

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
    <div className={s.Container}>
      {status === "idle" && <h1>MovieDetailsPage</h1>}
      {status === "pending " && <Loader />}
      {status === "rejected " && <b>error</b>}
      {status === "resolved" && (
        <>
          <div className={s.CardContainer}>
            <div className={s.CardImage}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
            </div>
            <div className={s.CardContent}>
              <h4 className={s.CardTitle}>{movie.title}</h4>
              <p className={s.Text}>Release : {movie.release_date}</p>
              <p className={s.Text}>Budget : {movie.budget}</p>
              <p className={s.Text}>Id : {movie.id}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
