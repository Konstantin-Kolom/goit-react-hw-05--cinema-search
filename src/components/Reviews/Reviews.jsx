import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SpinnerLoader } from '../Loader/Loader';

import * as fetchApi from '../../utilits/muvie-api';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { muvieid } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchApi
      .fetchReviews(muvieid)
      .then(review => {
        const data = review.results;
        if (review.results.length === 0) {
          setError(true);
        }
        setReviews(data);
      })
      .finally(() => setLoading(false));
  }, [muvieid]);

  return (
    <>
      {reviews.length > 0 && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      {loading && <SpinnerLoader />}

      {error && <h2>Sorry. We don't heve any reviews for this movie </h2>}
    </>
  );
}
