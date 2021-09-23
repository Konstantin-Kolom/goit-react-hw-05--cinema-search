import { useEffect, useState } from 'react';
import {
  Route,
  NavLink,
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';

import { NotFondView } from '../views/NotFondView';
import { Cast } from '../components/Cats/Cast';
import { Reviews } from '../components/Reviews/Reviews';

import * as fetchApi from '../utilits/muvie-api';

export function MovieDetailsPage() {
  const [movie, setMuvie] = useState('');
  const [error, setError] = useState(false);

  const { url, path } = useRouteMatch();
  const { muvieid } = useParams();
  const location = useLocation();
  const history = useHistory();

  function handleClick() {
    history.push(location.state?.from ? location.state.from : '/');
  }

  useEffect(() => {
    fetchApi
      .fetchMovieId(muvieid)
      .then(data => {
        setMuvie(data);
      })
      .catch(() => setError(true));
  }, [muvieid]);

  const { name, title, poster_path, vote_average, overview, genres } = movie;

  if (movie !== '') {
    return (
      <div>
        <button type="button" onClick={handleClick}>
          Go back
        </button>

        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt="poster"
              loading="lazy"
            />
            <h2 className="title">
              {name}
              {title}
            </h2>
            <p>User score: {vote_average * 10}%</p>
            <p>Overview: {overview}</p>
            <p>
              Genres:
              {genres.map(genre => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </p>
          </div>

          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: location.state.from },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: location.state.from },
                  }}
                >
                  Reviews
                </NavLink>
              </li>

              <Route path={`${path}/cast`}>
                <Cast />
              </Route>

              <Route path={`${path}/reviews`}>
                <Reviews />
              </Route>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (movie === '' && error === false) {
    return <h1>Loading</h1>;
  }

  if (movie === '' && error === true) {
    return (
      <>
        <button type="button" onClick={handleClick}>
          Go back
        </button>
        <NotFondView />
      </>
    );
  }
}
