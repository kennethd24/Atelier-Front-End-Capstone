import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating';

const Reviews = (props) => {
  const { currentProduct } = props;

  const [rating, setRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  const calcAvgRating = (ratingsObj) => {
    let count = 0;
    let sumproduct = 0;

    Object.entries(ratingsObj).forEach((keyValPair) => {
      const key = Number(keyValPair[0]);
      const val = Number(keyValPair[1]);

      count += val;
      sumproduct += (key * val);
    });

    const avgRating = sumproduct / count;
    const roundedRating = Number((Math.round(avgRating * 4) / 4).toFixed(2));

    console.log('roundedrating:', roundedRating);
    setRating(roundedRating);
    setReviewsCount(count);
  };

  const getMetadata = () => {
    if (Object.keys(currentProduct).length > 0) {
      axios.get(`/api/reviews/meta/${currentProduct.id}`)
        .then((res) => {
          console.log(res.data.ratings);
          calcAvgRating(res.data.ratings);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log(currentProduct);
    getMetadata();
  }, [currentProduct]);

  return (
    <>
      <Rating
        initialRating={rating}
        readonly
        emptySymbol="far fa-star"
        fullSymbol="fas fa-star"
      />
      {reviewsCount > 0 &&
        <a href="#" className="reviews-link">Read all {reviewsCount} reviews</a>
      }
    </>
  );
};

export default Reviews;
