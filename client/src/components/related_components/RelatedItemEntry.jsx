import React, { useState, useEffect } from 'react';
import Rating from 'react-rating';
import Image from './Image';
import Price from './Price';
import ProductInfo from './ProductInfo';

const RelatedItemEntry = (props) => {
  const {
    relatedItem,
    // selectedItem,
    handleClick,
    getRating,
    getDefault,
  } = props;

  const [defaultStyle, setDefaultStyle] = useState({});
  const [rating, setRating] = useState(0);
  const itemId = relatedItem.id;

  const handleCompare = (e) => {
    e.preventDefault();
    // console.log('selectedChars', selectedChars);
    // console.log('relatedChars', relatedChars);
    // console.log('rating in RE', rating);
    // console.log('typeofrating in RE', typeof rating);
  };

  useEffect(() => {
    getDefault(itemId, ((results) => {
      setDefaultStyle(results);
    }));
    getRating(itemId, ((results) => {
      setRating(results);
    }));
  }, [relatedItem]);

  return (
    <div className="product-card" onClick={() => handleClick(relatedItem)} role="button" tabIndex="0" onKeyPress={() => handleClick(relatedItem)}>
      <Image photos={defaultStyle.photos} />
      <ProductInfo
        category={relatedItem.category}
        mainName={relatedItem.name}
        styleName={defaultStyle.name}
      />
      <Price
        sale={defaultStyle.sale_price}
        original={defaultStyle.original_price}
      />
      <Rating
        initialRating={rating}
        readonly
        emptySymbol="far fa-star"
        fullSymbol="fas fa-star"
      />
      <button className="compare-button" type="button" onClick={handleCompare}>Compare</button>
    </div>
  );
};

export default RelatedItemEntry;
