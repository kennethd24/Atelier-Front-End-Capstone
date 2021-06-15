import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import RelatedItemEntry from './RelatedItemEntry';

SwiperCore.use([Navigation, Pagination]);
// import SwiperCore, {
//   Pagination,
//   Navigation,
//   Scrollbar,
// } from 'swiper/core';
// import "swiper/swiper.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/scrollbar/scrollbar.min.css";
// import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

// SwiperCore.use([Navigation, Pagination, Scrollbar]);

const RelatedItemsComp = (props) => {
  // console.log('relatedItemsComp fired');
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
          if (items.length === arr.length) {
            setRelatedItems([...items]);
          }
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
    <Swiper
      slidesPerView={3.5}
      spaceBetween={25}
      pagination={{ clickable: true }}
      navigation
    >
      {relatedItems.map((item, i) => (
        <SwiperSlide key={i}>
          <RelatedItemEntry
            relatedItem={item}
            // selectedRating={selectedRating}
            selectedItem={selectedItem}
            handleClick={handleClick}
            getRating={getRating}
            getDefault={getDefault}
            key={item.id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RelatedItemsComp;
