import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as fetchApi from '../../utilits/muvie-api';

export function Cast() {
  const { muvieid } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetchApi.fetchActors(muvieid).then(actor => {
      const data = actor.cast;
      setActors(data);
    });
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
      {actors.length === 0 && <p>We have no information about the actors for this movie </p>}
    </>
  );
}
