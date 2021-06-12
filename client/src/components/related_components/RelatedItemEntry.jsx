import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Rating from 'react-rating';
import ProductCard from './ProductCard';
import Image from './Image';

const RelatedItemEntry = (props) => {
  const {
    relatedItem,
    // selectedRating,
    selectedItem,
    handleClick,
    getRating,
    getDefault,
  } = props;

  const [relatedDefault, setRelatedDefault] = useState(null);
  const [rating, setRating] = useState(0);
  // const [onSale, setOnSale] = useState(false);
  // const [salePrice, setSalePrice] = useState(0);
  // const [selectedDefault, setSelectedDefault] = useState();
  // const [selectedChars, setSelectedChars] = useState();
  // const [relatedChars, setRelatedChars] = useState();

  const handleCompare = (e) => {
    e.preventDefault();
    // console.log('selectedChars', selectedChars);
    // console.log('relatedChars', relatedChars);
  };

  // const checkSale = () => {
  //   if (relatedDefault) {
  //     if (relatedDefault.sale_price) {
  //       setOnSale(true);
  //       setSalePrice(salePrice + relatedDefault.sale_price);
  //     }
  //     if (onSale) {
  //       return (
  //         <div>
  //           $
  //           {salePrice}
  //         </div>
  //       );
  //     }
  //     return (
  //       <div>
  //         $
  //         {relatedItem.default_price}
  //       </div>
  //     );
  //   }
  // };

  // const getStyles = (id, selected) => {
  //   // console.log('getStyles Fired');
  //   axios.get(`/api/products/${id}/styles`)
  //     .then((results) => {
  //       const resultsArr = results.data.results;
  //       console.log('resultsArr', resultsArr);
  //       let foundDefault = false;
  //       for (let i = 0; i < resultsArr.length; i++) {
  //         const currentResult = resultsArr[i];
  //         if (currentResult['default?']) {
  //           foundDefault = true;
  //           if (!selected) {
  //             setProductDefault(currentResult);
  //           } else if (selected) {
  //             setSelectedDefault(currentResult);
  //           }
  //         }
  //       }
  //       if (foundDefault === false && selected === false) {
  //         setProductDefault(resultsArr[0]);
  //       } else {
  //         setSelectedDefault(resultsArr[0]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('err in getStyles', err);
  //     });
  // };

  const renderPhotos = () => {
    // console.log('renderphotos');
    console.log('relateddefault', relatedDefault);
    if (relatedDefault) {
      if (relatedDefault.photos) {
        const imgUrl = relatedDefault.photos[0].thumbnail_url;
        if (imgUrl) {
          return (
            <div className="product-photo-wrapper">
              <img className="product-photo" src={relatedDefault.photos[0].thumbnail_url} alt="product" />
            </div>
          );
        }
        return (
          <div className="product-photo-wrapper">
            <img className="product-photo" src="no-photo.png" alt="no product" />
          </div>
        );
      }
    }
  };

  // useEffect(() => {
  //   getStyles(relatedItem.id, false);
  // }, [relatedItem]);



  useEffect(() => {
    // console.log('relatedItem', relatedItem);
    if (getRating) {
      getRating(relatedItem.id, (results) => {
        // console.log('results from get rating', results);
        setRating(results);
        // console.log('rating', rating);
      });
    }
  }, [relatedItem]);

  useEffect(() => {
    if (getDefault) {
      getDefault(relatedItem.id, (results) => {
        console.log('results from get default', results);
        setRelatedDefault(results);
        console.log('relatedDefault', relatedDefault);
      });
    }
  }, [relatedItem]);

  // useEffect(() => {
  //   console.log('relatedItem', relatedItem);
  //   console.log('rating', rating);
  //   console.log('relatedDefault', relatedDefault);
  // }, [relatedItem, selectedItem, props, rating, relatedDefault]);

  if (relatedDefault) {
    return (
      <div className="product-card" onClick={() => handleClick(relatedItem)} role="button" tabIndex="0" onKeyPress={() => handleClick(relatedItem)}>
        {/* {renderPhotos()} */}
        <Image defaultStyle={relatedDefault} />
        <div className="product-info-wrapper">
          <div>{relatedItem.category}</div>
          <div>{relatedItem.name}</div>
          {/* {checkSale()} */}
          <Rating
            initialRating={rating}
            readonly
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
          />
          <button className="compare-button" type="button" onClick={handleCompare}>Compare</button>
        </div>
      </div>
      // <ProductCard
      //   item={relatedItem}
      //   rating={rating}
      //   defaultStyle={relatedDefault[0]}
      //   handleClick={handleClick}
      //   handleCompare={handleCompare}
      //   key={relatedItem.id}
      // />
    );
  } else {
    return <div>testy</div>
  }
};

export default RelatedItemEntry;
