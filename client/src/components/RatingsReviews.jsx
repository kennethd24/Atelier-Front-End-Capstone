import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReviewList from './RatingsReviews/ReviewList.jsx';

const RatingsReviews = (props) => {
  const { currentItem } = props;
  const { id, name } = currentItem;
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [totalReviews, setTotalReviews] = useState(0);

  const getReviews = () => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/reviews2/${id}/${count}`)
        .then((results) => {
          const allReviews = results.data.results;
          setReviews(allReviews);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getTotalReviews = () => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/reviews2/${id}/1000`)
        .then((results) => {
          console.log('hi from inside getTotalReviews', results.data)
          // const allReviews = results.data.results;
          setTotalReviews(results.data.results.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getReviews();
    getTotalReviews();
  }, [id, count]);

  return (
    <div className="ratingsReview-container">
      <div className="ratingsReview-title">
        Ratings & Reviews
      </div>
      <div className="ratingsReviewList-container">
        <div className="ratings">
          Ratings (ID is equal to
          &nbsp;
          {id}
          )
          {/* <Ratings ratings={ratings}/> */}
        </div>
        <div className="reviewList">
          Review List (Product name is
          &nbsp;
          {name}
          )
          <br />
          {totalReviews}
          {' '}
          reviews, sorted by
          &nbsp;
          <select>
            <option>Newest</option>
            <option>Helpful</option>
            <option>Relevant</option>
          </select>
          <div className="reviews-container">
            {reviews.map((review) => (
              <ReviewList review={review} key={review.review_id} />
            ))}
          </div>
          <button onClick={() => setCount(count + 2)}>More Reviews</button>
          <button>Add Review</button>
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
