import React from 'react';
import Reviews from './Reviews';
import StyleSelector from './StyleSelector';

const ProductInfo = (props) => {
  const {
    currentProduct,
    styles,
    currentStyle,
    setCurrentStyle,
  } = props;

  return (
    <div className="product-info">
      <Reviews currentProduct={currentProduct} />
      <span>{currentProduct.category}</span>
      <span>{currentProduct.name}</span>
      <StyleSelector
        styles={styles}
        currentStyle={currentStyle}
        setCurrentStyle={setCurrentStyle}
      />
    </div>
  );
};

export default ProductInfo;
