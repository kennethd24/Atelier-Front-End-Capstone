import React, { useState, useEffect } from 'react';

const Price = (props) => {
  const { sale, original } = props;
  // console.log('sale', sale);
  // console.log('original', original);
  // console.log('props', props);

  const formatPrice = (priceNum) => `$${priceNum.toFixed(2)}`;

  let displayPrice = 0;

  if (sale || original) {
    if (sale) {
      // console.log('sale', sale);
      // console.log('original', original);
      displayPrice =
      (
        <div className="price-container">
          <span className="sale-price">
            {formatPrice(Number(sale))}
          </span>
          <span className="orig-price">
            $
            {original}
          </span>
        </div>
      );
    } else {
      displayPrice =
      (
        <div className="price-container">
          <span className="reg-price">{formatPrice(Number(original))}</span>
        </div>
      );
    }
  }

  return (
    displayPrice
  );
};

export default Price;

// const Price = (props) => {
//   const { price, currentStyle } = props;

//   const formatPrice = (priceNum) => `$${priceNum.toFixed(2)}`;

//   let displayPrice;

//   if (currentStyle.sale_price) {
//     displayPrice =
//     (
//       <div className="price-container">
//         <span className="sale-price">
//           {formatPrice(price)}
//         </span>
//         <span className="orig-price">
//           $
//           {currentStyle.original_price}
//         </span>
//       </div>
//     );
//   } else {
//     displayPrice =
//     (
//       <div className="price-container">
//         <span className="reg-price">{formatPrice(price)}</span>
//       </div>
//     );
//   }

//   return (
//     displayPrice
//   );
// };


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
