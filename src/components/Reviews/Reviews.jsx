import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as fetchApi from '../../utilits/muvie-api';

export function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { muvieid } = useParams();
  const [error, setError] = useState(false);

  // useEffect

  useEffect(() => {
    fetchApi.fetchReviews(muvieid).then(review => {
      const data = review.results;
      setReviews(data);
    });
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

      {reviews.length === 0 && <h2>Sorry. We don't heve any reviews for this movie </h2>}
    </>
  );
}
