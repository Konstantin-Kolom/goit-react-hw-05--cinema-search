import { URL, API_KEY } from './api-utils';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok ? await response.json() : Promise.reject(new Error('Not found'));
}

// Популярные за день
export function fetchPopularDay() {
  return fetchWithErrorHandling(`${URL}trending/all/day?api_key=${API_KEY}`);
}

// По ключевому слову
export function fetchSearchMovies(searchValue) {
  return fetchWithErrorHandling(
    `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`,
  );
}

// Один фильм по ID
export function fetchMovieId(id) {
  return fetchWithErrorHandling(`${URL}movie/${id}?api_key=${API_KEY}&language=en-US`);
}

// Актерский состав фильма
export function fetchActors(muvieid) {
  return fetchWithErrorHandling(`${URL}movie/${muvieid}/credits?api_key=${API_KEY}&language=en-US`);
}

// Отзывы
export function fetchReviews(muvieid) {
  return fetchWithErrorHandling(
    `${URL}movie/${muvieid}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
}
