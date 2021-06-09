import React from 'react';
import Reviews from './Reviews';
import Price from './Price';
import StyleSelector from './StyleSelector';

const ProductInfo = (props) => {
  const {
    currentProduct,
    styles,
    currentStyle,
    setCurrentStyle,
    rating,
    reviewsCount,
    price,
  } = props;

  return (
    <div className="product-info">
      <Reviews rating={rating} reviewsCount={reviewsCount} />
      <span>{currentProduct.category}</span>
      <span>{currentProduct.name}</span>
      <Price price={price} currentStyle={currentStyle} />
      <StyleSelector
        styles={styles}
        currentStyle={currentStyle}
        setCurrentStyle={setCurrentStyle}
      />
    </div>
  );
};

export default ProductInfo;
