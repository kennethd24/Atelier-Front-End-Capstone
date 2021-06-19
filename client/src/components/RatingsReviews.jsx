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
  const [starFilters, setStarFilters] = useState([]);
  const [oldStarFilters, setOldStarFilters] = useState([]);

  const handleSortReviews = async () => {
    const sortedReviewsResults = await axios.get(`/api/reviews2/${id}/100/${sortState}`);
    const allNewSortReviews = sortedReviewsResults.data.results;
    // eslint-disable-next-line max-len
    const starFilteredReviews = allNewSortReviews.filter((review) => starFilters.indexOf(review.rating) > -1);
    if (starFilters.length > 0) {
      setReviews(starFilteredReviews.slice(0, count));
      setSortedReviews(starFilteredReviews);
    } else {
      setReviews(allNewSortReviews.slice(0, count));
      setSortedReviews(allNewSortReviews);
    }
  };

  const getCountReviews = () => {
    if (starFilters !== oldStarFilters) {
      handleSortReviews();
      setOldStarFilters(starFilters);
    }
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
  // const handleStarFilter = (numStar) => {
  //   setStarFilters([numStar]);
  //   console.log('starFilters: ', starFilters);
  //   getCountReviews(numStar);
  // };

  // const handleStarFilter = (numStar) => {
  //   if (starFilters.includes(numStar)) {
  //     setStarFilters(starFilters.filter((star) => star !== numStar));
  //     const starArr = sortedReviews.filter((review) => starFilters.includes(review.rating));
  //     setReviews(starArr.slice(0, count));
  //   } else {
  //     setStarFilters([...starFilters, numStar]);
  //     console.log('starFilters: ', starFilters);
  //     getCountReviews(num)
  //     const starArr = sortedReviews.filter((review) => starFilters.includes(review.rating));
  //     console.log('starArr: ', starArr);
  //     setReviews(starArr.slice(0, count));
  //   }
  // };
  const handleStarFilter = (starInput) => {
    if (!starFilters.includes(starInput)) {
      setStarFilters([...starFilters, starInput]);
    } else {
      setStarFilters(starFilters.filter((star) => star !== starInput));
    }
  };

  useEffect(() => {
    getCountReviews();
    console.log('useEffect runs', starFilters);
  }, [id, count, sortState, starFilters]);

  return (
    <Container fluid className="main-container">
      <button onClick={() => handleStarFilter(5)} type="button">Click to filter 5 stars</button>

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
              handleStarFilter={handleStarFilter}
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
