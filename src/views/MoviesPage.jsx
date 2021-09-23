import { useState, useEffect } from 'react';

import * as fetchApi from '../utilits/muvie-api';
import { ListMovies } from '../components/ListMovies/ListMovies';
import { useHistory, useLocation } from 'react-router';

export function MoviesPage() {
  const [value, setValue] = useState('');

  const [listMuvies, setListMuvies] = useState('');

  const location = useLocation();
  const history = useHistory();

  const searchUrlData = location.search;
  const searchlData = new URLSearchParams(searchUrlData).get('query');

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
    history.push({ ...location, search: `query=${value}` });
    setValue('');
  };

  useEffect(() => {
    if (searchlData !== null) {
      fetchApi.fetchSearchMovies(searchlData).then(movie => {
        const data = movie.results;
        setListMuvies(data);
      });
    }
  }, [searchlData]);

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
    </>
  );
}
