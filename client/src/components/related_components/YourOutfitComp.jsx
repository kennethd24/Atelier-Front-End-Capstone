import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import YourOutfitEntry from './YourOutfitEntry';

SwiperCore.use([Navigation, Pagination]);

const YourOutfitComp = (props) => {
  const {
    selectedItem,
    selectedRating,
    selectedDefault,
  } = props;

  // console.log('yourOutfit', yourOutfit);

  // const [yourOutfit, setYourOutfit] = useState([]);
  const [yourOutfit, setYourOutfit] = useState(
    // console.log(JSON.parse(localStorage.getItem('yourOutfitInLocal')));
    JSON.parse(localStorage.getItem('yourOutfitInLocal')) || [],
  );

  const [outfitIds, setOutfitIds] = useState([]);
  // const [value, setValue] = React.useState(
  //   localStorage.getItem('valueInLocal') || '',
  // );

  // React.useEffect(() => {
  //   localStorage.setItem('valueInLocal', value);
  // }, [value]);
  useEffect(() => {
    localStorage.setItem('yourOutfitInLocal', JSON.stringify(yourOutfit));
  }, [yourOutfit]);

  const handleAdd = () => {
    if (!outfitIds.includes(selectedItem.id)) {
      setOutfitIds([...outfitIds, selectedItem.id]);
      selectedItem.rating = selectedRating;
      selectedItem.photos = selectedDefault.photos;
      selectedItem.styleName = selectedDefault.name;
      selectedItem.salePrice = selectedDefault.sale_price;
      selectedItem.origPrice = selectedDefault.original_price;
      setYourOutfit([...yourOutfit, selectedItem]);
      // localStorage.setItem('yourOutfitInLocal', JSON.stringify(yourOutfit));
      // console.log(JSON.parse(localStorage.getItem('yourOutfitInLocal')));
    }
  };

  const handleRemove = (id) => {
    if (outfitIds.length === 1) {
      setOutfitIds([]);
      setYourOutfit([]);
    } else {
      setOutfitIds(outfitIds.filter((outfitId) => outfitId !== id));
      setYourOutfit(yourOutfit.filter((outfitItem) => outfitItem.id !== id));
    }
  };

  return (
    <div className="your-outfit-carousel">
      {/* <div>{value}</div> */}
      <Swiper
        slidesPerView={3.5}
        spaceBetween={25}
        pagination={{ clickable: true }}
        navigation
      >
        <SwiperSlide>
          <button type="button" onClick={handleAdd} className="product-card" id="add-outfit">
            <i className="fas fa-plus" />
            <div className="add-label">Add Selected Item to Your Outfit</div>
          </button>
        </SwiperSlide>
        {yourOutfit.map((item, i) => (
          <SwiperSlide key={i}>
            <YourOutfitEntry
              item={item}
              handleRemove={handleRemove}
              key={item.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default YourOutfitComp;
