import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as fetchApi from '../../utilits/muvie-api';

export function Cast() {
  const [actors, setActors] = useState([]);
  const { muvieid } = useParams();

  //   const history = useHistory();

  //   function handleClick() {
  //     console.log('fff');
  //     history.push(`/movies/${muvieid}`);
  //   }

  useEffect(() => {
    fetchApi.fetchActors(muvieid).then(actor => {
      const data = actor.cast;
      setActors(data);
    });
  }, [muvieid]);

  return (
    <>
      {/* <button type="button" onClick={handleClick}>
        Hide additional information
      </button> */}
      {actors.map(actor => (
        <div key={actor.id}>
          <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt="poster" />
          <h3>{actor.name}</h3>
          <p>Character: {actor.character}</p>
        </div>
      ))}
    </>
  );
}
