import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { API_KEY, URL } from '../utilits/api-utils';

export function MovieDetailsPage({ idMuvie }) {
  const [movie, setMuvie] = useState('');
  //   const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${URL}movie/${idMuvie}?api_key=${API_KEY}&language=en-US`).then(response => {
      if (response.ok) {
        return response.json().then(mov => {
          const data = mov;
          //  if (data.length > 0) {
          setMuvie(data);
          //  }
        });
        //  .catch(() => setError(true));
        //  .finally(() => this.setState({ loading: false }));
      }
      return Promise.reject(new Error(`Erorr loading....`));
    });
  }, [idMuvie]);
  const { name, title, poster_path, vote_average, overview, genres } = movie;

  if (movie !== '') {
    return (
      <div>
        <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="poster" loading="lazy" />
        <h2 className="title">
          {name}
          {title}
        </h2>
        <p>User score: {vote_average * 10}%</p>
        <p>Overview: {overview}</p>
        <p>
          Genres:{' '}
          {genres.map(genre => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </p>
        <p></p>
        <p></p>
        <div>
          <h3>Additional information</h3>
          <div>
            <Link>Cast</Link>
            <Link>Reviews</Link>
          </div>
        </div>
      </div>
    );
  }

  if (movie === '') {
    return <h1>Loading</h1>;
  }

  //   if (error === true) {
  //     console.log('ddd');
  //     return <h1>Sorry</h1>;
  //   }
}
