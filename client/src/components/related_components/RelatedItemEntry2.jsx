import React, { useState, useEffect } from 'react';
import Rating from 'react-rating';
import Image from './Image';
// import Price from '../overview_components/Price';
import Price from './Price';
import ProductInfo from './ProductInfo';

const RelatedItemEntry = (props) => {
  const {
    relatedItem,
    selectedItem,
    handleClick,
    getRating,
    getDefault,
  } = props;

  const [defaultStyle, setDefaultStyle] = useState({});
  const [rating, setRating] = useState(0);
  const itemId = relatedItem.id;

  // GET/SET DEFAULT STYLE
  useEffect(() => {
    // console.log('get default firing');
    getDefault(itemId, ((results) => {
      setDefaultStyle(results);
      // console.log('defaultStyle', results);
    }));
  }, [relatedItem]);

  // GET RATING
  useEffect(() => {
    // console.log('get rating firing');
    getRating(itemId, ((results) => {
      setRating(results);
      // console.log('rating', results);
    }));
  }, [relatedItem]);

  return (
    <div>
      <Image photos={defaultStyle.photos} />
      <div>{relatedItem.category}</div>
      <div>
        {relatedItem.name}
        -
        {defaultStyle.name}
      </div>
      <Price
        sale={defaultStyle.sale_price}
        original={defaultStyle.original_price}
      />
      <Rating
        initialRating={rating}
        readonly
        emptySymbol="far fa-star"
        fullSymbol="fas fa-star"
      />
    </div>
  );
};

// {/* <div className="product-card" onClick={() => handleClick(relatedItem)} role="button" tabIndex="0" onKeyPress={() => handleClick(relatedItem)}>
//         {/* {renderPhotos()} */}
//         <Image defaultStyle={relatedDefault} />
//         <div className="product-info-wrapper">
//           <div>{relatedItem.category}</div>
//           <div>{relatedItem.name}</div>
//           {/* {checkSale()} */}
//           <Rating
//             initialRating={rating}
//             readonly
//             emptySymbol="far fa-star"
//             fullSymbol="fas fa-star"
//           />
//           <button className="compare-button" type="button" onClick={handleCompare}>Compare</button>
//         </div>
//       </div> */}

export default RelatedItemEntry;
