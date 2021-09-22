import { useEffect, useState } from 'react';

// import moviesApiPopular from '../utilits/muvie-api';
import { API_KEY, URL } from '../utilits/api-utils';
import { ListMovies } from '../components/ListMovies/ListMovies';

export function HomePage({ dataIdVideo }) {
  const [listMuvies, setListMuvies] = useState([]);

  const searchID = data => {
    dataIdVideo(data);
  };

  useEffect(() => {
    fetch(`${URL}trending/all/day?api_key=${API_KEY}`).then(response => {
      if (response.ok) {
        return response.json().then(movies => {
          const data = movies.results;
          if (data.length > 0) {
            setListMuvies(data);
          }
          //  else {
          // this.setState({ error: true });
          //  }
        });
        //  .catch(() => this.setState({ error: true }))
        //  .finally(() => this.setState({ loading: false }));
      }
      return Promise.reject(new Error(`Erorr loading....`));
    });
  }, []);

  if (listMuvies.length > 0) {
    return (
      <ul>
        <ListMovies list={listMuvies} searchID={searchID} />
      </ul>
    );
  }

  if (listMuvies.length === 0) {
    return <h1>Loading</h1>;
  }
}
