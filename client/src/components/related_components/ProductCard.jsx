import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating';

const ProductCard = (props) => {
  const {
    relatedItem,
    selectedRating,
    selectedItem,
    handleClick,
  } = props;

  const [productDefault, setProductDefault] = useState();
  const [selectedDefault, setSelectedDefault] = useState();
  const [selectedChars, setSelectedChars] = useState();
  const [relatedChars, setRelatedChars] = useState();
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [rating, setRating] = useState(0);

  const handleCompare = (e) => {
    e.preventDefault();
    // console.log('selectedChars', selectedChars);
    // console.log('relatedChars', relatedChars);
  };

  const checkSale = () => {
    if (productDefault) {
      if (productDefault.sale_price) {
        setOnSale(true);
        setSalePrice(salePrice + productDefault.sale_price);
      }
      if (onSale) {
        return (
          <div>
            $
            {salePrice}
          </div>
        );
      }
      return (
        <div>
          $
          {relatedItem.default_price}
        </div>
      );
    }
  };

  const getStyles = (id, selected) => {
    axios.get(`/api/products/${id}/styles`)
      .then((results) => {
        const resultsArr = results.data.results;
        let foundDefault = false;
        for (let i = 0; i < resultsArr.length; i++) {
          const currentResult = resultsArr[i];
          if (currentResult['default?']) {
            foundDefault = true;
            if (!selected) {
              setProductDefault(currentResult);
            } else if (selected) {
              setSelectedDefault(currentResult);
            }
          }
        }
        if (foundDefault === false && selected === false) {
          setProductDefault(resultsArr[0]);
        } else {
          setSelectedDefault(resultsArr[0]);
        }
      })
      .catch((err) => {
        console.log('err in getStyles', err);
      });
  };

  const getRating = (ratings) => {
    let counter = 0;
    let total = 0;

    Object.entries(ratings).forEach((set) => {
      const star = Number(set[0]);
      const quantity = Number(set[1]);
      total += star * quantity;
      counter += quantity;
    });

    const avg = total / counter;
    const round = (Math.round(avg * 4) / 4).toFixed(2);
    setRating(round);
  };

  const getMetadata = (id, selected) => {
    if (relatedItem) {
      axios.get(`/api/reviews/meta/${id}`)
        .then((results) => {
          getRating(results.data.ratings);
          if (!selected) {
            setRelatedChars(results.data.characteristics);
          } else {
            setSelectedChars(results.data.characteristics);
          }
        })
        .catch((err) => {
          console.log('err getting metadata', err);
        });
    }
  };

  const renderPhotos = () => {
    if (productDefault) {
      const imgUrl = productDefault.photos[0].thumbnail_url;
      if (imgUrl) {
        return (
          <div className="product-photo-wrapper">
            <img className="product-photo" src={productDefault.photos[0].thumbnail_url} alt="product" />
          </div>
        );
      }
      return (
        <div className="product-photo-wrapper">
          <img className="product-photo" src="no-photo.png" alt="no product" />
        </div>
      );
    }
  };

  useEffect(() => {
    getStyles(relatedItem.id, false);
    getMetadata(relatedItem.id, false);
    // getMetadata(selectedItem.id, true);
  }, [relatedItem]);

  return (
    <div className="product-card" onClick={() => handleClick(relatedItem)} role="button" tabIndex="0" onKeyPress={() => handleClick(relatedItem)}>
      {renderPhotos()}
      <div className="product-info-wrapper">
        <div>{relatedItem.category}</div>
        <div>{relatedItem.name}</div>
        {checkSale()}
        <Rating
          initialRating={rating}
          readonly
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
        />
        <button className="compare-button" type="button" onClick={handleCompare}>Compare</button>
      </div>
    </div>
  );
};

export default ProductCard;
