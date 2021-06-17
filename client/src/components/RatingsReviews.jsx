import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import SortBy from './ratingsReviews_components/SortBy';
import ReviewList from './ratingsReviews_components/ReviewList';
import Ratings from './ratingsReviews_components/Ratings';
import NewReview from './ratingsReviews_components/NewReview';

const RatingsReviews = (props) => {
  const {
    currentItem, reviewsCount, rating, metaData, allReviews, getTotalReviews,
  } = props;
  const { id, name } = currentItem;
  const [sortedReviews, setSortedReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [sortState, setSortState] = useState('relevant');
  const [modalNewReview, setModalNewReview] = useState(false);
  const [previousStates, setPreviousStates] = useState({
    id,
    sortState,
  });

  const getCountReviews = () => {
    setReviews(allReviews.slice(0, count));
    // if (sortState !== previousStates.sortState) {
    //   axios.get(`/api/reviews2/${id}/1000/${sortState}`)
    //     .then((results) => {
    //       setSortedReviews(results.data.results);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .then(() => {
    //       setReviews(reviews.slice(0, count));
    //     });
    // } else {
    // setReviews(allReviews.slice(0, count));
    // }
    // console.log('Outside getCountReviews', Object.keys(currentItem).length);
    if (Object.keys(currentItem).length > 0) {
    console.log('hi from inside getCountReviews');
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
    if (id !== previousStates.id) {
      setCount(2);
      setPreviousStates({
        id,
        sortState,
      });
    }
    if (sortState !== previousStates.sortState) {
      console.log('inside sortState useEffect');
      setPreviousStates({
        id,
        sortState,
      });
      getTotalReviews('newest');
    }
    getCountReviews();
  }, [id, count, sortState, setSortState]);

  // useEffect(() => {
  //   setReviews([]);
  //   setCount(2);
  //   getCountReviews();
  // }, [id]);

  return (
    <Container>
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
            <Ratings
              rating={rating}
              metaData={metaData}
              reviews={reviews}
              setReviews={setReviews}
            />
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
