import React, { useState, UseEffect } from 'react';

const ReviewList = (props) => {
  return (
    <div className="reviewListEntry-container">
      <div className="reviewListEntry">Review {props.review.review_id} </div>
    </div>
  )
}

export default ReviewList;
