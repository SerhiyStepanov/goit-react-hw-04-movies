import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiServiceSearch } from "../ApiService/ApiService";
import s from "./MoviesPage.module.css";
import defauItImage from "../Default/default.jpg";

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
      .catch(error);
    setError(error);
  }, [query, error]);

  return (
    <div className={s.Container}>
      <label className={s.Label}>
        <input
          type="text"
          value={query}
          onChange={searchMovieByName}
          placeholder="Search movie"
          className={s.Input}
        />
      </label>

      {search.length > 0 && (
        <ul className={s.HomePageUl}>
          {search.map((movie) => {
            const IMAGEURL = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            return (
              <li key={movie.id} className={s.CardList}>
                <Link to={`/movies/${movie.id}`}>
                  <div className={s.Card}>
                    <img
                      className={s.CardImage}
                      src={movie.poster_path ? IMAGEURL : defauItImage}
                      alt=""
                    />
                    <div className={s.CardContent}>
                      <p className={s.Title}>{movie.title}</p>
                    </div>
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
