import React from 'react';
import Reviews from './Reviews.jsx';

const ProductInfo = (props) => {
  console.log('hello');
  const { currentProduct } = props;

  return (
    <div className="product-info">
      <Reviews currentProduct={currentProduct} />
    </div>
  );
};

export default ProductInfo;
