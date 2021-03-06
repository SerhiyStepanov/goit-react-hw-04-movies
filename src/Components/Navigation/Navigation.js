import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={s.Navigation}>
      <NavLink exact to="/" className={s.link} activeClassName={s.activLink}>
        Home
      </NavLink>

      <NavLink
        exact
        to="/movies"
        className={s.link}
        activeClassName={s.activLink}
      >
        Search
      </NavLink>
    </nav>
  );
}
