import { Fragment } from "react";
import { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Loader from "./Components/Loader/Loader";
import "./App.css";
// import HomePage from "./Components/HomePage";
const HomePage = lazy(() => import("./Components/HomePage/HomePage.js"));
// import MoviesPage from "./Components/MoviesPage";
const MoviesPage = lazy(() => import("./Components/MoviesPage/MoviesPage.js"));
// import MovieDetailsPage from "./Components/MovieDetailsPage";
const MovieDetailsPage = lazy(() =>
  import("./Components/MovieDetailsPage/MovieDetailsPage.js")
);

export default function App() {
  return (
    <Fragment>
      <Navigation />

      <hr
        style={{
          color: "var(--acсent-color)",
          marginLeft: "24px",
          marginRight: "24px",
        }}
      />
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </Fragment>
  );
}
