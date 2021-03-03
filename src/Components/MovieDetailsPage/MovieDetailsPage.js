import { useEffect, useState } from "react";
import { NavLink, Route, useParams, useRouteMatch } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { ApiServiceDetails } from "../ApiService/ApiService";
import Modal from "../Modal/Modal";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import Loader from "../Loader/Loader";
import s from "./MovieDetailsPage.module.css";
import defauItImage from "../Default/default.jpg";
import GoToTop from "../Button/GoToTop";

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const { moviesId } = useParams();
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);

  const btnGoodIncrement = () => {
    setGood((state) => state + 1);
  };

  const btnBadIncrement = () => {
    setBad((state) => state + 1);
  };

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
  }, [moviesId, error]);

  const IMAGEURL = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const showModal = (IMAGEURL) => {
    setModal(true);
    setModalImage(IMAGEURL);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className={s.Container}>
      {status === "idle" && <h1>MovieDetailsPage</h1>}
      {status === "pending " && <Loader />}
      {status === "rejected " && <b>error</b>}
      {status === "resolved" && (
        <>
          <div className={s.CardContainer}>
            <div className={s.CardImage}>
              <div className={s.image} onClick={() => showModal(IMAGEURL)}>
                <img src={movie.poster_path ? IMAGEURL : defauItImage} alt="" />
              </div>
              <div className={s.btnContainer}>
                <button
                  type="button"
                  className={s.btnGood}
                  onClick={btnGoodIncrement}
                >
                  <FaRegThumbsUp style={{ color: "#19324b", fontSize: 20 }} />
                  <span
                    style={{ color: "#19324b", fontSize: 20, fontWeight: 600 }}
                  >
                    {good}
                  </span>
                </button>
                <button
                  type="button"
                  className={s.btnBad}
                  onClick={btnBadIncrement}
                >
                  <FaRegThumbsDown style={{ color: "#19324b", fontSize: 20 }} />
                  <span
                    style={{ color: "#19324b", fontSize: 20, fontWeight: 600 }}
                  >
                    {bad}
                  </span>
                </button>
              </div>
            </div>
            <div className={s.CardContent}>
              <h4 className={s.CardTitle}>{movie.title}</h4>
              <p className={s.Text}>
                Overview: <span className={s.TextSpan}>{movie.overview}</span>
              </p>
              <p className={s.Text}>
                Release:{" "}
                <span className={s.TextSpan}>{movie.release_date}</span>
              </p>
              <p className={s.Text}>
                Runtime:
                <span className={s.TextSpan}> {movie.runtime} min.</span>
              </p>
              {movie.budget > 0 && (
                <p className={s.Text}>
                  Budget: <span className={s.TextSpan}>{movie.budget}</span>
                </p>
              )}
              {movie.vote_average > 0 && (
                <p className={s.Text}>
                  Average:{" "}
                  <span className={s.TextSpan}>{movie.vote_average}</span>
                </p>
              )}
              <p className={s.Text}>
                Languages:{" "}
                <span className={s.TextSpan}>
                  {movie.spoken_languages[0].name}
                </span>
              </p>
              {movie.genres !== "" && (
                <p className={s.CardGenresList}>
                  Genres:
                  <span className={s.CardGenres}>
                    {movie.genres.map((el) => el.name).join(", ")}.
                  </span>
                </p>
              )}
            </div>
          </div>
          {modal && (
            <Modal closeModal={closeModal}>
              {<img src={modalImage} alt="" />}
            </Modal>
          )}

          <hr style={{ marginTop: "24px", marginBottom: "24px" }} />
        </>
      )}

      <NavLink
        to={`${url}/cast`}
        className={s.link}
        activeClassName={s.activLink}
      >
        Cast
      </NavLink>

      <NavLink
        to={`${url}/reviews`}
        className={s.link}
        activeClassName={s.activLink}
      >
        Reviews
      </NavLink>

      <Route path={`${path}/cast`}>
        {moviesId && <Cast moviesId={moviesId} />}
      </Route>

      <Route path={`${path}/reviews`}>
        {moviesId && <Reviews moviesId={moviesId} />}
      </Route>

      <GoToTop />
    </div>
  );
}
