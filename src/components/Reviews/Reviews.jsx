import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as fetchApi from '../../utilits/muvie-api';

export function Reviews() {
  const [reviews, setReviews] = useState([]);

  const { muvieid } = useParams();

  useEffect(() => {
    fetchApi.fetchReviews(muvieid).then(review => {
      const data = review.results;
      setReviews(data);
    });
  }, [muvieid]);

  //   const { author, content } = reviews;

  return (
    <>
      {/* <button type="button">Hide additional information</button> */}
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
