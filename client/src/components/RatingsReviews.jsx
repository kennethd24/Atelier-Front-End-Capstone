import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingsReviews = (props) => {
  const { currentItem } = props;
  const { id, name } = currentItem;
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    getReviews();
  }, [id]);

  const getReviews = () => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/reviews/${id}`)
        .then((results) => {
          console.log(results);
          const allReviews = results.data.results;
          setReviews(allReviews);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div id="ratingsReview">
      Ratings & Reviews
      <div>
        <div className="ratings">
          Ratings (ID is equal to
          {id}
          )
          {/* <Ratings /> */}
        </div>
        <div className="reviewList">
          Review List (Product name is
          {name}
          )
          {/* < ReviewList /> */}
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
