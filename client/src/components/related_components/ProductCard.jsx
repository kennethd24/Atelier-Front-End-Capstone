import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating';

const ProductCard = (props) => {
  const { currentProduct } = props;
  const [productDefault, setProductDefault] = useState();
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(null);

  const handleCompare = (e) => {
    e.preventDefault();
    // console.log('compared');
  };

  const checkSale = () => {
    if (productDefault) {
      if (productDefault.sale_price) {
        setOnSale(true);
        setSalePrice(productDefault.sale_price);
      }
    }
  };

  const getStyles = () => {
    axios.get(`/api/products/${currentProduct.id}/styles`)
      .then((results) => {
        const resultsArr = results.data.results;
        let foundDefault = false;
        for (let i = 0; i < resultsArr.length; i++) {
          const currentResult = resultsArr[i];
          if (currentResult['default?']) {
            foundDefault = true;
            setProductDefault(currentResult);
          }
        }
        if (foundDefault === false) {
          setProductDefault(resultsArr[0]);
        }
      })
      .catch((err) => {
        console.log('err in getStyles', err);
      });
  };

  const getRating = () => {

  };

  const getMetadata = () => {
    if (currentProduct) {
      axios.get(`/api/reviews/meta/${currentProduct.id}`)
        .then((results) => {
          // console.log('results data', results);
        })
        .catch((err) => {
          console.log('err getting metadata', err);
        });
    }
  };

  const renderPhotos = () => {
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
      {renderPhotos()}
      <div>{currentProduct.category}</div>
      <div>{currentProduct.name}</div>
      {checkSale()}
      <div>{currentProduct.default_price}</div>
      {getMetadata()}
      <div>Product Rating</div>
      <button className="compare-button" type="button" onClick={handleCompare}>Compare</button>
    </div>
  );
};

export default ProductCard;
