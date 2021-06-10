import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const RelatedItemsComp = (props) => {
  const {
    currentItem,
    selectedRating,
    handleClick,
    getRating,
  } = props;
  const [relatedItems, setRelatedItems] = useState([]);

  const getRelatedItems = (arr) => {
    const items = [];
    // console.log('arr', arr);
    // console.log('relateditems', relatedItems);
    arr.map((item) => (
      axios.get(`/api/products/${item}`)
        .then((results) => {
          items.push(results.data);
        })
        .then(() => {
          setRelatedItems([...items]);
        })
        .catch((err) => {
          console.log('err in getRelatedItems', err);
        })
    ));
  };

  const getRelatedIds = (id) => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/related/${id}`)
        .then((results) => {
          const uniq = [...new Set(results.data)];
          getRelatedItems(uniq);
        })
        .catch((err) => {
          console.log('error in getRelatedIds', err);
        });
    }
  };

  useEffect(() => {
    getRelatedIds(currentItem.id);
  }, [currentItem]);

  return (
    <div className="related-items-carousel">
      {relatedItems.map((item) => (
        <ProductCard
          relatedItem={item}
          selectedRating={selectedRating}
          selectedItem={currentItem}
          key={item.id}
          handleClick={handleClick}
          getRating={getRating}
        />
      ))}
    </div>
  );
};

export default RelatedItemsComp;
