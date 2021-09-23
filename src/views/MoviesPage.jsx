import { useState, useEffect } from 'react';

import * as fetchApi from '../utilits/muvie-api';
import { ListMovies } from '../components/ListMovies/ListMovies';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

export function MoviesPage() {
  const [value, setValue] = useState('');
  //   const [searchValue, setSearchValue] = useState('');
  const [listMuvies, setListMuvies] = useState('');

  const location = useLocation();
  const history = useHistory();
  //   console.log(history);
  //   console.log(location);

  //   const { url } = useRouteMatch();
  //   console.log(url);

  const hendleChange = e => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  const hendleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      alert('Please, enter movie title.');
      return;
    }
    //  setSearchValue(value);
    history.push({ ...location, search: `query=${value}` });
    setValue('');
  };

  const searchUrlData = location.search;

  const searchlData = new URLSearchParams(searchUrlData).get('query');

  //   useEffect(() => {
  //     if (searchValue !== '') {
  //       fetchApi.fetchSearchMovies(searchValue).then(movie => {
  //         const data = movie.results;
  //         setListMuvies(data);
  //       });
  //     }
  //   }, [searchValue]);

  useEffect(() => {
    if (searchlData !== null) {
      fetchApi.fetchSearchMovies(searchlData).then(movie => {
        const data = movie.results;
        setListMuvies(data);
      });
    }
  }, [searchlData]);

  //   console.log(`${url}${searchUrlData}`);

  return (
    <>
      <form onSubmit={hendleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search muvie"
          value={value}
          onChange={hendleChange}
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>

      {/* <Route path={`${url}/${searchUrlData}`}> */}
      {listMuvies !== '' && (
        <div>
          <p>
            The result of a list of films by title: <span> {searchlData}</span>
          </p>
          <ul>
            <ListMovies list={listMuvies} />
          </ul>
        </div>
      )}
      {/* </Route> */}
    </>
  );
}
