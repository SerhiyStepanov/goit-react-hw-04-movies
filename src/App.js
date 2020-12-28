import { Switch, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import HomePage from "./Components/HomePage";
import MoviesPage from "./Components/MoviesPage";
import MovieDetailsPage from "./Components/MovieDetailsPage";
import "./App.css";
import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      {/* <Navigation /> */}

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
      </Switch>
    </Fragment>
  );
}
