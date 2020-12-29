import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ApiServiceHome } from "../ApiService/ApiService";
// import s from "./HomePage.module.css"

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
    <>
      {status === "idle" && <h1>HomePage</h1>}
      {status === "pending" && <b>loaded</b>}
      {status === "rejected" && <b>{error}</b>}
      {status === "resolved" && (
        <ul>
          {movies.map((movie) => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
