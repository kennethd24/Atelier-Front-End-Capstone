import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfo from './overview_components/ProductInfo';

const Overview = (props) => {
  const { currentItem, rating, reviewsCount } = props;

  useEffect(() => {
    getStyles();
  }, [currentItem]);

  const [currentStyle, setCurrentStyle] = useState(null);

  const [styles, setStyles] = useState([]);

  useEffect(() => {
    if (styles.length > 0 && currentStyle === null) {
      for (let i = 0; i < styles.length; i++) {
        if (styles[i]['default?']) {
          setCurrentStyle(styles[i]);
          return;
        }
      }
    }
  }, [styles]);

  useEffect(() => {
    if (currentStyle !== null) {
      shiftSelectedStyle();
    }
  }, [currentStyle]);

  const getStyles = () => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/products/${currentItem.id}/styles`)
        .then((res) => {
          setStyles(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const shiftSelectedStyle = () => {
    const copy = [...styles];
    const index = copy.findIndex((styleObj) => styleObj.style_id === currentStyle.style_id);
    copy.splice(index, 1);
    copy.unshift(currentStyle);
    setStyles(copy);
  };

  return (
    <div className="overview-container">
      <div className="top">
        <div className="gallery-overlay">photo gallery</div>
        {currentStyle &&
          (
          <ProductInfo
            currentProduct={currentItem}
            styles={styles}
            currentStyle={currentStyle}
            setCurrentStyle={setCurrentStyle}
            rating={rating}
            reviewsCount={reviewsCount}
          />
          )}
      </div>
      <div className="bottom">
        <div>product details</div>
      </div>
    </div>
  );
};

export default Overview;
