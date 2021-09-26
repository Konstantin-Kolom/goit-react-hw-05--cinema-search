import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Navigation } from './components/Novigation/Novigation.jsx';
import { SpinnerLoader } from './components/Loader/Loader.jsx';
import s from './App.module.css';

const HomePageViews = lazy(() =>
  import('./views/HomePageViews.jsx' /* webpackChunkName: "Home-views" */),
);
const MoviesPageViews = lazy(() =>
  import('./views/MoviesPageViews.jsx' /* webpackChunkName: "movies-views" */),
);
const MovieDetailsPageViews = lazy(
  () => import('./views/MovieDetailsPageViews.jsx') /* webpackChunkName: "details-views" */,
);

function App() {
  return (
    <>
      <header className="App-header">
        <Navigation />
      </header>

      <main className={s.continer}>
        <Suspense fallback={<SpinnerLoader />}>
          <Switch>
            <Route exact path="/">
              <HomePageViews />
            </Route>

            <Route path="/movies/:muvieid">
              <MovieDetailsPageViews />
            </Route>

            <Route exact path="/movies">
              <MoviesPageViews />
            </Route>

            {/* <Route path="*"> */}
            <Redirect from="*" to="/">
              <HomePageViews />
            </Redirect>
            {/* </Route> */}
          </Switch>
        </Suspense>
      </main>
    </>
  );
}

export default App;
