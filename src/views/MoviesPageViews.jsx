import { useState, useEffect } from 'react';

import * as fetchApi from '../utilits/muvie-api';
import { ListMovies } from '../components/ListMovies/ListMovies';
import { useHistory, useLocation } from 'react-router';
import { SpinnerLoader } from '../components/Loader/Loader.jsx';

import s from './css/MoviesPage.module.css';

export default function MoviesPageViews() {
  const [value, setValue] = useState('');
  const [listMuvies, setListMuvies] = useState('');
  const [loading, setLoading] = useState(false);

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
    setListMuvies('');
  };

  useEffect(() => {
    if (searchlData !== null) {
      setLoading(true);
      fetchApi
        .fetchSearchMovies(searchlData)
        .then(movie => {
          const data = movie.results;
          setListMuvies(data);
        })
        .finally(() => setLoading(false));
    }
  }, [searchlData]);

  return (
    <>
      <form onSubmit={hendleSubmit} className={s.searchForm}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search muvie"
          value={value}
          onChange={hendleChange}
          className={s.input}
        />
        <button type="submit" className={s.button}>
          <span>Search</span>
        </button>
      </form>

      {listMuvies !== '' && (
        <div>
          <p>
            The result of a list of films by title:{' '}
            <span className={s.searcText}> "{searchlData}"</span>
          </p>
          <ul>
            <ListMovies list={listMuvies} />
          </ul>
        </div>
      )}

      {loading && <SpinnerLoader />}
    </>
  );
}
