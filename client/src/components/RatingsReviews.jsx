import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import SortBy from './ratingsReviews_components/SortBy';
import ReviewList from './ratingsReviews_components/ReviewList';
import Ratings from './ratingsReviews_components/Ratings';
import NewReview from './ratingsReviews_components/NewReview';

const RatingsReviews = (props) => {
  const {
    currentItem, reviewsCount, rating, metaData, relevantReviews,
  } = props;
  const { id, name } = currentItem;
  const [sortedReviews, setSortedReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [sortState, setSortState] = useState('relevant');
  const [modalNewReview, setModalNewReview] = useState(false);
  const [oldSortState, setOldSortState] = useState('relevant');

  const handleSortReviews = async () => {
    const sortedReviewsResults = await axios.get(`/api/reviews2/${id}/100/${sortState}`);
    const allNewSortReviews = sortedReviewsResults.data.results;
    setSortedReviews(allNewSortReviews);
    setReviews(allNewSortReviews.slice(0, count));
  };

  const getCountReviews = () => {
    if (sortState !== oldSortState) {
      handleSortReviews();
      setOldSortState(sortState);
    }
    if (sortState === 'relevant') {
      setSortedReviews(relevantReviews);
      setReviews(relevantReviews.slice(0, count));
    }
    if (sortState === oldSortState && sortedReviews.length > 0) {
      setReviews(sortedReviews.slice(0, count));
    }
  };

  useEffect(() => {
    getCountReviews();
  }, [id, count, sortState, setSortState]);

  return (
    <Container fluid className="main-container">
      <div className="ratingsReview-container" id="ratingsReview-container">
        <h3 className="ratingsReview-title">
          Ratings & Reviews
        </h3>
        <div className="ratingsReviewList-container">
          <div className="ratings">
            Ratings
            <br />
            <Ratings
              rating={rating}
              metaData={metaData}
              reviews={reviews}
              setReviews={setReviews}
              sortedReviews={sortedReviews}
              count={count}
            />
          </div>
          <div className="reviewList">
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
                      <button type="button" className="more-reviews" onClick={() => setCount(count + 2)}>More Reviews</button>
                      :
                      null}
                    <button type="button" className="add-review" onClick={() => setModalNewReview(true)}>Add Review</button>

                    <NewReview
                      show={modalNewReview}
                      onHide={() => setModalNewReview(false)}
                      name={name}
                      characteristics={metaData.characteristics}
                      id={id}
                    />
                  </div>
                </span>
              )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RatingsReviews;
