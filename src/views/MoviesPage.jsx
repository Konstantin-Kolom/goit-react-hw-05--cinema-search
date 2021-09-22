import { useState } from 'react';

export function MoviesPage({ onSubmit }) {
  const [value, setValue] = useState('');

  const hendleChange = e => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  const hendleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={hendleSubmit}>
      <button type="submit">
        <span>Search</span>
      </button>

      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search muvie"
        value={value}
        onChange={hendleChange}
      />
    </form>
  );
}
