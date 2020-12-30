import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiServiceSearch } from "../ApiService/ApiService";
import Loader from "../Loader/Loader";
import s from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const [error, setError] = useState(null);

  const searchMovieByName = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    ApiServiceSearch(query)
      .then((data) => {
        setSearch(data.results);
      })
      .catch((error) => {
        setError(error);
      });
  }, [query]);
  return (
    <div className={s.Container}>
      <label className={s.Label}>
        <input
          type="text"
          value={query}
          onChange={searchMovieByName}
          placeholder="search movie"
          className={s.Input}
        />
      </label>

      {search.length > 0 && (
        <ul>
          {search.map((movie) => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
