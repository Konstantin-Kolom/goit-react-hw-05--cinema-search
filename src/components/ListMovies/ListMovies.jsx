import { Link, useLocation } from 'react-router-dom';
import s from './ListMovies.module.css';

export function ListMovies({ list }) {
  const location = useLocation();

  return (
    <>
      {list.map(({ id, name, title }) => (
        <li key={id} id={id} className={s.item}>
          <Link
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
            className={s.link}
          >
            {name}
            {title}
          </Link>
        </li>
      ))}
    </>
  );
}
