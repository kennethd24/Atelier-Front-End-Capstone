import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SortBy from './ratingsReviews_components/SortBy';
import ReviewList from './ratingsReviews_components/ReviewList';
import Ratings from './ratingsReviews_components/Ratings';
import NewReview from './ratingsReviews_components/NewReview';

const RatingsReviews = (props) => {
  const {
    currentItem, reviewsCount, rating, metaData,
  } = props;
  const { id, name } = currentItem;
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [sortState, setSortState] = useState('relevant');
  const [modalNewReview, setModalNewReview] = useState(false);

  const getCountReviews = () => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/reviews2/${id}/${count}/${sortState}`)
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
  }, [count, sortState, setSortState]);

  useEffect(() => {
    setReviews([]);
    setCount(2);
    getCountReviews();
  }, [id]);

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
          <Ratings rating={rating} metaData={metaData} />
        </div>
        <div className="reviewList">
          Review List
          <br />
          (Product name is &nbsp;
          {name}
          )
          <br />
          {(reviewsCount < 1) ?
            <button type="button" onClick={() => setModalNewReview(true)}>Submit a new review!</button>
            : (
              <span>
                <div className="sortBy-container">
                  <SortBy totalReviews={reviewsCount} setSortState={setSortState} />
                </div>
                <div className="reviews-container">
                  {reviews.map((review) => (
                    <ReviewList
                      rating={rating}
                      review={review}
                      key={review.review_id}
                      getCountReviews={getCountReviews}
                    />
                  ))}
                </div>
                <div className="buttons-container">
                  {(count > 1 && count < reviewsCount) ?
                    <button type="button" onClick={() => setCount(count + 2)}>More Reviews</button>
                    :
                    null}
                  <button type="button" onClick={() => setModalNewReview(true)}>Add Review</button>

                  <NewReview
                    show={modalNewReview}
                    onHide={() => setModalNewReview(false)}
                    name={name}
                    characteristics={metaData.characteristics}
                  />
                </div>
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
