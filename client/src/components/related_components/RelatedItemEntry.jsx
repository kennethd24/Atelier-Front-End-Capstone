import React, { useState, useEffect } from 'react';
import Rating from 'react-rating';
import Image from './Image';
import Price from './Price';
import ProductInfo from './ProductInfo';
import CompareModal from './CompareModal';

const RelatedItemEntry = (props) => {
  // console.log('relatedItemEntry fired');
  const {
    relatedItem,
    selectedItem,
    handleClick,
    getRating,
    getDefault,
  } = props;

  const [defaultStyle, setDefaultStyle] = useState({});
  const [rating, setRating] = useState(0);
  const [showCompModal, setShowCompModal] = useState(false);
  const itemId = relatedItem.id;

  // const handleCompare = (e) => {
  //   e.preventDefault();
  //   // console.log('selectedChars', selectedChars);
  //   // console.log('relatedChars', relatedChars);
  //   setShowCompModal
  // };

  useEffect(() => {
    getDefault(itemId, ((results) => {
      setDefaultStyle(results);
    }));
    getRating(itemId, ((results) => {
      setRating(results);
    }));
  }, [relatedItem]);

  if (Object.keys(defaultStyle) < 1) {
    return (
      <div>Product Loading</div>
    );
  }
  return (
    <div className="product-card">
      <CompareModal
        show={showCompModal}
        onHide={() => setShowCompModal(false)}
        selectedItem={selectedItem}
        relatedItem={relatedItem}
      />
      <Image
        photos={defaultStyle.photos}
        item={relatedItem}
        handleClick={handleClick}
      />
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
      <button className="compare-button" type="button" onClick={() => setShowCompModal(true)}>Compare</button>
    </div>
  );
};

export default RelatedItemEntry;
