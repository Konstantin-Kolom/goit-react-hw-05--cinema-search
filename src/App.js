import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navigation } from './components/Novigation/Novigation.jsx';
import { HomePage } from './views/HomePage.jsx';
import { MoviesPage } from './views/MoviesPage.jsx';
import { MovieDetailsPage } from './views/MovieDetailsPage';

function App() {
  const [idMuvie, setIdMuvie] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const dataIdVideo = dataId => {
    setIdMuvie(dataId);
  };

  const formSubmit = searchData => {
    setSearchValue(searchData);
  };

  return (
    <>
      <header className="App-header">
        <Navigation />
      </header>

      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage dataIdVideo={dataIdVideo} />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage onSubmit={formSubmit} />
          </Route>

          <Route path={`/movies/${idMuvie}`}>
            <MovieDetailsPage idMuvie={idMuvie} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
