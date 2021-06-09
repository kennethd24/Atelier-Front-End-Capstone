import React from 'react';

const SortBy = (props) => {
  const { totalReviews, setSortState } = props;
  return (
    <span>
      {totalReviews}
      {' '}
      reviews, sorted by
      &nbsp;
      <select onChange={(e) => { setSortState(e.target.value); }}>
        <option value="relevant">Relevance</option>
        <option value="newest">Most Recent</option>
        <option value="helpful">Helpfullness</option>
      </select>
    </span>
  );
};

export default SortBy;
