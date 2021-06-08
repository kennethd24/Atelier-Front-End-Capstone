import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCard = (props) => {
  const { currentProduct } = props;
  const [productDefault, setProductDefault] = useState();
  const [onSale, setOnSale] = useState(false);

  const handleCompare = (e) => {
    e.preventDefault();
    console.log('compared');
  };

  const checkSale = () => {
    // console.log('hello from check sale');
    // console.log('product default checksale', productDefault);
    if (productDefault) {
      if (productDefault.sale_price) {
        setOnSale(true);
        // console.log('onSale', onSale);
      }
    }
  };

  const getStyles = () => {
    axios.get(`/api/products/${currentProduct.id}/styles`)
      .then((results) => {
        // console.log('results from get styles', results.data);
        const resultsArr = results.data.results;
        let foundDefault = false;
        for (let i = 0; i < resultsArr.length; i++) {
          const currentResult = resultsArr[i];
          if (currentResult['default?']) {
            // console.log('found a match');
            // console.log('current result', currentResult);
            foundDefault = true;
            setProductDefault(currentResult);
          }
        }
        if (foundDefault === false) {
          setProductDefault(resultsArr[0]);
        }
      })
      // .then(() => {
      //   // console.log('product default', productDefault);
      //   checkSale();
      // })
      .catch((err) => {
        console.log('err in getStyles', err);
      });
  };

  const renderPhotos = () => {
    // console.log('product default', productDefault);
    if (productDefault) {
      return (
        <img src={productDefault.photos[0].thumbnail_url} alt="product" />
      );
    }
  };

  useEffect(() => {
    getStyles();
  }, [currentProduct]);

  return (
    <div className="product-card">
      {/* <img src={productDefault.default.photos[0].thumnail_url}></img> */}
      {renderPhotos()}
      <div>{currentProduct.category}</div>
      <div>{currentProduct.name}</div>
      {checkSale()}
      <div>{currentProduct.default_price}</div>
      <div>Product Rating</div>
      <button className="compare-button" type="button" onClick={handleCompare}>Compare</button>
    </div>
  );
};

export default ProductCard;
