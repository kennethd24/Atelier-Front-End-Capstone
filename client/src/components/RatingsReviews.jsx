import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SortBy from './ratingsReviews_components/SortBy';
import ReviewList from './ratingsReviews_components/ReviewList';

const RatingsReviews = (props) => {
  const { currentItem, reviewsCount, rating } = props;
  const { id, name } = currentItem;
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);

  const getCountReviews = () => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/reviews2/${id}/${count}`)
        .then((results) => {
          const countReviews = results.data.results;
          setReviews(countReviews);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getCountReviews();
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
          (ID is equal to &nbsp;
          {id}
          )
          {/* <Ratings ratings={ratings}/> */}
        </div>
        <div className="reviewList">
          Review List
          <br />
          (Product name is &nbsp;
          {name}
          )
          <br />
          {(reviewsCount < 1) ?
            <button type="submit">Submit a new review!</button>
            : (
              <span>
                <div className="sortBy-container">
                  <SortBy totalReviews={reviewsCount} />
                </div>
                <div className="reviews-container">
                  {reviews.slice(0).reverse().map((review) => (
                    <ReviewList rating={rating} review={review} key={review.review_id} />
                  ))}
                </div>
                <div className="buttons-container">
                  {(count > 1 && count < reviewsCount) ?
                    <button type="button" onClick={() => setCount(count + 2)}>More Reviews</button>
                    :
                    null}
                  <button type="button">Add Review</button>
                </div>
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
