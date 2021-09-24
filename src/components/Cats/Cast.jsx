import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { SpinnerLoader } from '../Loader/Loader';

import * as fetchApi from '../../utilits/muvie-api';

export default function Cast() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { muvieid } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchApi
      .fetchActors(muvieid)
      .then(actor => {
        if (actor.length === 0) {
          setError(true);
        }
        const data = actor.cast;
        setActors(data);
      })
      .finally(() => setLoading(false));
  }, [muvieid]);

  return (
    <>
      {actors.map(actor => (
        <div key={actor.id}>
          <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt="poster" />
          <h3>{actor.name}</h3>
          <p>Character: {actor.character}</p>
        </div>
      ))}

      {loading && <SpinnerLoader />}

      {error && <h2>Sorry. We have no information about the actors for this movie </h2>}
    </>
  );
}
