import { useEffect, useState } from "react";
import { ApiServiceDetailsCredits } from "../ApiService/ApiService";
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
      .catch((error) => setError(error));
  }, [moviesId]);
  return (
    <ul className={s.CastList}>
      Cast :
      {cast.map((el) => {
        return (
          <li key={el.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${el.profile_path}`}
              alt=""
              className=""
              width="60px"
            />
            <p>{el.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
