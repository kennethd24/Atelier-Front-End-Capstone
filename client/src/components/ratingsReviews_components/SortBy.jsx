import React from 'react';

const SortBy = (props) => {
  const { totalReviews, setSortState } = props;
  // need to fix sorting when count is only 2
  return (
    <span>
      {totalReviews}
      {' '}
      reviews, sorted by
      &nbsp;
      <select onChange={(e) => { setSortState(e.target.value); }}>
        <option value="relevant">Relevance</option>
        <option value="newest">Most Recent</option>
        <option value="helpful">Helpfulness</option>
      </select>
    </span>
  );
};

export default SortBy;
