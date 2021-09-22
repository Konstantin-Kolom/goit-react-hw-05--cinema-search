import { Link } from 'react-router-dom';

export function ListMovies({ list, searchID }) {
  const hendleClick = e => {
    searchID(e.target.parentNode.getAttribute('id'));
  };

  return (
    <>
      {list.map(({ id, name, title }) => (
        <Link key={id} id={id} to={`/movies/${id}`} onClick={hendleClick}>
          <li>
            {name}
            {title}
          </li>
        </Link>
      ))}
    </>
  );
}
