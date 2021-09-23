import { useEffect, useState } from 'react';

import * as fetchApi from '../utilits/muvie-api';
import { ListMovies } from '../components/ListMovies/ListMovies';

export function HomePage() {
  const [listMuvies, setListMuvies] = useState([]);

  useEffect(() => {
    fetchApi.fetchPopularDay().then(movies => {
      const data = movies.results;
      setListMuvies(data);
    });
  }, []);

  if (listMuvies.length > 0) {
    return (
      <ul>
        <ListMovies list={listMuvies} />
      </ul>
    );
  }

  if (listMuvies.length === 0) {
    return <h1>Loading</h1>;
  }
}
