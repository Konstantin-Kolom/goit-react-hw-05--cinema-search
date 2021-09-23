import { Link, useLocation } from 'react-router-dom';

export function ListMovies({ list }) {
  const location = useLocation();

  return (
    <>
      {list.map(({ id, name, title }) => (
        <li key={id} id={id}>
          <Link
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
          >
            {name}
            {title}
          </Link>
        </li>
      ))}
    </>
  );
}
