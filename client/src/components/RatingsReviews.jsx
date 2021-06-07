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
      axios.get(`/api/reviews2/${id}/100000`)
        .then((results) => {
          const totalReviewsArrLength = results.data.results.length;
          setTotalReviews(totalReviewsArrLength);
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
          Ratings
          <br />
          (ID is equal to
          &nbsp;
          {id}
          )
          {/* <Ratings ratings={ratings}/> */}
        </div>
        <div className="reviewList">
          Review List
          <br />
          (Product name is
          &nbsp;
          {name}
          )
          <br />
          {(totalReviews < 1) ?
            <button>Submit a new review!</button>
            : (
              <span>
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
                <div>
                  {(count > 1 && count < totalReviews) ?
                    <button onClick={() => setCount(count + 2)}>More Reviews</button>
                    :
                    null}
                  <button>Add Review</button>
                </div>
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
