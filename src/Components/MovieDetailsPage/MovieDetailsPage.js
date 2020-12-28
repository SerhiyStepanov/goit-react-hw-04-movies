import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiServiceDetails } from "../ApiService/ApiService";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {});
  return (
    <>
      <h1>MovieDetailsPage</h1>
    </>
  );
}
