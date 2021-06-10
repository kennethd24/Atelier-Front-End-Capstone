import React from 'react';

const SortBy = (props) => {
  const { totalReviews, setSortState } = props;
  // need to fix sorting when count is only 2
  return (
    <span>
      {totalReviews}
      {' '}
      reviews, Sort by
      &nbsp;
      <select onChange={(e) => { setSortState(e.target.value); }}>
        <option value="relevant">Most Relevant</option>
        <option value="newest">Most Recent</option>
        <option value="helpful">Most Helpful</option>
      </select>
    </span>
  );
};

export default SortBy;
