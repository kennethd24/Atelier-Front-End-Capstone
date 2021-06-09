import React from 'react';

const SortBy = (props) => {
  const { totalReviews } = props;
  return (
    <span>
      {totalReviews}
      {' '}
      reviews, sorted by
      &nbsp;
      <select>
        <option>Relevant</option>
        <option>Newest</option>
        <option>Helpful</option>
      </select>
    </span>
  );
};

export default SortBy;
