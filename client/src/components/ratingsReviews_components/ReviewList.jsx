/* eslint-disable camelcase */
import React from 'react';
import Rating from 'react-rating';
import Button from 'react-bootstrap/Button'

const ReviewList = (props) => {
  const {
    response,
    date,
    review_id,
    rating,
    summary,
    body,
    recommend,
    reviewer_name,
    helpfulness,
  } = props.review;

  const showResponse = () => {
    if (response !== null && response !== '') {
      return (
        <div className="reviewListEntry-response">
          {`Response from seller: ${response}`}
        </div>
      );
    }
    return null;
  };
  const formatDate = () => {
    const entireDate = new Date(date).toString();
    return (
      `${entireDate.slice(4, 10)},${entireDate.slice(10, 16)}`
    );
  };
  const showRecommendation =
    (recommend ? (
      <div>
        ✓ I recommend this product!
      </div>
    ) : null);

  return (
    <div className="reviewListEntry">
      Review
      {review_id}
      <div className="reviewListEntry-header">
        <div>
          <Rating
            initialRating={rating}
            readonly
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
          />
        </div>
        <div>
          {formatDate()}
        </div>
      </div>
      <div className="reviewListEntry-summary">{summary}</div>
      <div className="reviewListEntry-body">{body}</div>
      <br />
      {showRecommendation}
      <div className="reviewListEntry-recommendation">
        <div>
          {reviewer_name}
          {' '}
          ✓Verfied Purchaser(need to check email?)
        </div>
      </div>
      {showResponse()}
      <div>Need to Add Photos(bootstrap?)</div>
      <div className="reviewListEntry-footer">
        Was this review helpful?
          Yes(
          {helpfulness}
          )
          <Button variant="outline-secondary">Yes</Button>{' '}
      </div>
    </div>
  );
};

export default ReviewList;
