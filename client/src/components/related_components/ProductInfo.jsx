import React from 'react';

const ProductInfo = (props) => {
  const {
    category,
    mainName,
    styleName,
  } = props;

  return (
    <div className="product-info-wrapper">
      <div className="product-info-category">{category}</div>
      <div className="product-info-name">
        {mainName}
        -
        {styleName}
      </div>
    </div>
  );
};

export default ProductInfo;
