import { useEffect, useState } from "react";
import ApiServiceHome from "../ApiService";
// import s from "./HomePage.module.css"

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    ApiServiceHome().then(setMovies).catch(error);
  }, []);
  return (
    <>
      <h1>HomePage</h1>
      <ul>
        {movies &&
          movies.map((movie) => {
            <li key={movie.id}>{movie}</li>;
          })}
      </ul>
    </>
  );
}
