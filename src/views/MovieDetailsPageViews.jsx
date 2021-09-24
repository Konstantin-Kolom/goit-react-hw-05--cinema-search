import { useEffect, useState } from 'react';
import {
  Route,
  NavLink,
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';

import { lazy, Suspense } from 'react';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import { SpinnerLoader } from '../components/Loader/Loader';

import { NotFondView } from './NotFondView';

import * as fetchApi from '../utilits/muvie-api';
import s from './css/MovieDetailsPage.module.css';

const Cast = lazy(() => import('../components/Cats/Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../components/Reviews/Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPageViews() {
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
        <button type="button" onClick={handleClick} className={s.button}>
          <HiOutlineArrowCircleLeft size="20px" /> <span className={s.buttonText}> Go back</span>
        </button>

        <div>
          <div className={s.boxCard}>
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt="poster"
              loading="lazy"
              className={s.img}
            />
            <div>
              <h2 className="title">
                {name}
                {title}
              </h2>
              <p>User score: {vote_average * 10}%</p>
              <h3>Overview:</h3> <p>{overview}</p>
              <h4>Genres: </h4>
              <p>
                {genres.map(genre => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </p>
            </div>
          </div>

          <div>
            <h4>Additional information</h4>
            <ul>
              <Suspense fallback={<SpinnerLoader />}>
                <li>
                  <NavLink
                    to={{
                      pathname: `${url}/cast`,
                      state: { from: location.state.from },
                    }}
                    className={s.link}
                    activeClassName={s.linkActive}
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
                    className={s.link}
                    activeClassName={s.linkActive}
                  >
                    Reviews
                  </NavLink>
                </li>
              </Suspense>

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
    return <SpinnerLoader />;
  }

  if (movie === '' && error === true) {
    return (
      <>
        <button type="button" onClick={handleClick} className={s.button}>
          <HiOutlineArrowCircleLeft size="20px" /> <span className={s.buttonText}> Go back</span>
        </button>
        <NotFondView />
      </>
    );
  }
}
