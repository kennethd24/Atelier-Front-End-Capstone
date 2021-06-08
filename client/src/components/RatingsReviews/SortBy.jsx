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
        <option>Newest</option>
        <option>Helpful</option>
        <option>Relevant</option>
      </select>
    </span>
  );
};

export default SortBy;
