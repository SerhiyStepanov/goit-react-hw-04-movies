import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ApiServiceHome } from "../ApiService/ApiService";
import Loader from "../Loader/Loader";
import s from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const { url } = useRouteMatch();

  useEffect(() => {
    setStatus("pending");
    ApiServiceHome()
      .then((data) => {
        setMovies(data.results);
        setStatus("resolved");
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  }, []);
  return (
    <div className={s.HomePage}>
      {status === "idle" && <h1>HomePage</h1>}
      {status === "pending" && (
        <div style={{ textAlign: "center", marginTop: "30%" }}>
          <Loader />
        </div>
      )}
      {status === "rejected" && <b>{error}</b>}
      {status === "resolved" && (
        <ul className={s.HomePageUl}>
          {movies.map((movie) => {
            return (
              <li key={movie.id} className={s.CardList}>
                <Link to={`/movies/${movie.id}`} className={s.CardLink}>
                  <div className={s.Card}>
                    <img
                      className={s.CardImage}
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt=""
                    />
                    <p className={s.Title}>{movie.title}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
