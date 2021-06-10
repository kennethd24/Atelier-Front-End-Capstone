import React from 'react';
import Rating from 'react-rating';
import Characteristics from './Characteristics';

const Ratings = (props) => {
  const { rating, metaData } = props;

  const percentRecommend = () => {
    if (Object.keys(metaData).length > 0) {
      const recommend = Number(metaData.recommended.true);
      const notRecommend = Number(metaData.recommended.false);
      return (
        `${(recommend / (recommend + notRecommend)).toFixed(2) * 100}%`
      );
    }
  };

  const mapCharacteristics = () => {
    if (Object.keys(metaData).length > 0) {
      return (
        Object.keys(metaData.characteristics).map((characteristic, index) => (
          <Characteristics characteristic={characteristic} key={index} />
        ))
      );
    }
  };

  return (
    <div className="ratingsInner-container">
      <div className="ratings-header">
        <span>
          {rating}
        </span>
        <Rating
          initialRating={rating}
          readonly
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
        />
      </div>
      <div>
        {' '}
        Rating Breakdown
        <div>
          5 star
          {' '}
          <span>~~Add bar lines here~~</span>
        </div>
        <div> 4 star</div>
        <div> 3 star</div>
        <div> 2 star</div>
        <div> 1 star</div>
        <div>
          {percentRecommend()}
          {' '}
          of reviews recommend the product
        </div>
        {mapCharacteristics()}
      </div>
    </div>
  );
};

export default Ratings;
