import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiServiceDetailsReviews } from "../ApiService/ApiService";

export default function Reviews({ moviesId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!moviesId) {
      return;
    }
    ApiServiceDetailsReviews(moviesId)
      .then((data) => {
        setReviews(data.results);
      })
      .catch((error) => setError(error));
  }, [moviesId]);
  return (
    <ul>
      {reviews.map((el) => {
        return (
          <li key={el.id}>
            <h4>{el.author}</h4>
            <p>{el.content}</p>
          </li>
        );
      })}
    </ul>
  );
}
