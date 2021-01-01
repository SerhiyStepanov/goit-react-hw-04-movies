import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useRouterMatch } from "react-router-dom";
import { ApiServiceDetails } from "../ApiService/ApiService";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import Loader from "../Loader/Loader";
import s from "./MovieDetailsPage.module.css";
import defauItImage from "../Default/default.jpg";

export default function MovieDetailsPage() {
  const { url } = useRouteMatch;
  const { moviesId } = useParams();
  const [movie, setMovie] = useState([]);
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

  const IMAGEURL = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <div className={s.Container}>
      {status === "idle" && <h1>MovieDetailsPage</h1>}
      {status === "pending " && <Loader />}
      {status === "rejected " && <b>error</b>}
      {status === "resolved" && (
        <>
          <div className={s.CardContainer}>
            <div className={s.CardImage}>
              <img src={movie.poster_path ? IMAGEURL : defauItImage} alt="" />
            </div>
            <div className={s.CardContent}>
              <h4 className={s.CardTitle}>{movie.title}</h4>
              <p className={s.Text}>Overview : {movie.overview}</p>
              <p className={s.Text}>Release : {movie.release_date}</p>
              <p className={s.Text}>Budget : {movie.budget}</p>
              <p className={s.Text}>Id : {movie.id}</p>
              <ul className={s.CardGenresList}>
                Genres :
                {movie.genres.map((el) => {
                  return (
                    <li key={el.id} className={s.CardGenres}>
                      {el.name} <span className={s.CardGenresSpan}> ,</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <hr />
        </>
      )}

      <Route to={`${url}${moviesId}/cast`}>
        <Cast moviesId={moviesId} />
      </Route>

      {/* <Cast moviesId={moviesId} /> */}

      {/* <Reviews moviesId={moviesId} /> */}
    </div>
  );
}
