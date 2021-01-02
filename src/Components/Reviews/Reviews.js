import { useEffect, useState } from "react";
import { ApiServiceDetailsReviews } from "../ApiService/ApiService";
import s from "./Reviews.module.css";

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
      .catch(error);
    setError(error);
  }, [moviesId, error]);

  return (
    <>
      <h3 className={s.ReviewsListTitle}>Reviews</h3>
      <ul className={s.reviewsList}>
        {reviews &&
          reviews.map((el) => {
            return (
              <li key={el.id} className={s.reviewsItem}>
                <h4 className={s.reviewsTitle}>{el.author}</h4>
                <p className={s.reviewsText}>{el.content}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
}
