import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemEntry from './RelatedItemEntry';

const RelatedItemsComp = (props) => {
  const {
    selectedItem,
    // selectedRating,
    // selectedDefault,
    handleClick,
    getRating,
    getDefault,
  } = props;

  const [relatedItems, setRelatedItems] = useState([]);

  const getRelatedItems = (arr) => {
    const items = [];
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
    if (Object.keys(selectedItem).length > 0) {
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
    getRelatedIds(selectedItem.id);
  }, [selectedItem]);

  return (
    <div className="related-items-carousel">
      {relatedItems.map((item) => (
        <RelatedItemEntry
          relatedItem={item}
          // selectedRating={selectedRating}
          selectedItem={selectedItem}
          handleClick={handleClick}
          getRating={getRating}
          getDefault={getDefault}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default RelatedItemsComp;
