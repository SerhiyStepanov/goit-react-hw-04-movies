import { Switch, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import HomePage from "./Components/HomePage";
import MoviesPage from "./Components/MoviesPage";
import MovieDetailsPage from "./Components/MovieDetailsPage";
import "./App.css";

export default function App() {
  return (
    <div>
      <Navigation />

      <hr />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>

        <Route>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}
