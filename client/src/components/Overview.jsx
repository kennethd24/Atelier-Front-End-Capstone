import React from 'react';
import ProductInfo from './overview_components/ProductInfo.jsx';

const Overview = (props) => {
  const { currentItem } = props;

  return (
    <div className="overview-container">
      <div className="top">
        <div className="gallery-overlay">photo gallery</div>
        <ProductInfo currentProduct={currentItem} />
      </div>
      <div className="bottom">
        <div>product details</div>
      </div>
    </div>
  );
};

export default Overview;
