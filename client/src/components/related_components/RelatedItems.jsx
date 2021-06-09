import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';

const RelatedItemsComp = (props) => {
  const { currentItem, selectedRating } = props;
  const [relatedItems, setRelatedItems] = useState([]);

  const getRelatedItems = (arr) => {
    const items = [];

    arr.map((item) => (
      axios.get(`/api/products/${item}`)
        .then((results) => {
          items.push(results.data);
        })
        .then(() => {
          setRelatedItems(relatedItems.concat(items));
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
          getRelatedItems(results.data);
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
    <div>
      {relatedItems.map((item) => (
        <ProductCard
          relatedItem={item}
          selectedRating={selectedRating}
          selectedItem={currentItem}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default RelatedItemsComp;
