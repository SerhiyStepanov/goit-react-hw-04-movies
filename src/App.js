import { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./Components/Navigation";
import HomePage from "./Components/HomePage";
import MoviesPage from "./Components/MoviesPage";
import MovieDetailsPage from "./Components/MovieDetailsPage";
import "./App.css";
import Cast from "./Components/Cast/Cast";

export default function App() {
  return (
    <Fragment>
      <Navigation />

      <hr />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:moviesId">
          <MovieDetailsPage />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
}
