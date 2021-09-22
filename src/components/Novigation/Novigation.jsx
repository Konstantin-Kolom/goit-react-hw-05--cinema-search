import { NavLink } from 'react-router-dom';
import s from './Novigation.module.css';

export const Navigation = () => {
  return (
    <nav>
      <NavLink exact to="/" className={s.navLink} activeClassName={s.navLinkActive}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.navLink} activeClassName={s.navLinkActive}>
        Movies
      </NavLink>
    </nav>
  );
};
