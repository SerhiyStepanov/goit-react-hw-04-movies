import { useEffect, useState } from "react";
import { ApiServiceDetailsCredits } from "../ApiService/ApiService";
import defaultAvatar from "../Default/avatar.jpg";
import s from "./Cast.module.css";

export default function Cast({ moviesId }) {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!moviesId) {
      return;
    }
    ApiServiceDetailsCredits(moviesId)
      .then((data) => {
        setCast(data.cast);
      })
      .catch(error);
    setError(error);
  }, [moviesId, error]);
  return (
    <>
      <h3 className={s.CastListTitle}>Cast </h3>
      <ul className={s.CastList}>
        {cast.map((el) => {
          return (
            <li key={el.id} className={s.CastCard}>
              <div>
                <img
                  className={s.CastCardImage}
                  src={
                    el.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${el.profile_path}`
                      : defaultAvatar
                  }
                  alt=""
                />
                <p className={s.CastCardText}> {el.name}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
