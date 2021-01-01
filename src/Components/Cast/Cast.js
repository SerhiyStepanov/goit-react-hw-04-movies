import { useEffect, useState } from "react";
import { ApiServiceDetailsCredits } from "../ApiService/ApiService";

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
    <ul>
      Cast :
      {cast.map((el) => {
        return <li key={el.id}>{el.name}</li>;
      })}
    </ul>
  );
}
