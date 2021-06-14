import React from 'react';

const ProductInfo = (props) => {
  const {
    category,
    mainName,
    styleName,
  } = props;

  return (
    <div className="product-info-wrapper">
      <div>{category}</div>
      <div>
        {mainName}
        -
        {styleName}
      </div>
    </div>
  );
};

export default ProductInfo;
