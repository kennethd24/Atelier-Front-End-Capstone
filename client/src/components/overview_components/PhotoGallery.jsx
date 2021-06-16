import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const PhotoGallery = (props) => {
  const { currentStyle } = props;

  const [mainIndex, setMainIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState();
  const [thumbsSwiper, setThumbsSwiper] = useState();

  SwiperCore.use([Navigation, Thumbs]);

  const slideTo = () => {
    mainSwiper.slideTo(mainIndex);
  };

  useEffect(() => {
    if (mainSwiper) {
      slideTo();
    }
  }, [currentStyle]);

  return (
    <div className="gallery-overlay">
      <div className="thumb-swiper">
        <button type="button" className="arrow-btn up-btn">
          <i className="fas fa-chevron-up" />
        </button>
        <Swiper
          spaceBetween={15}
          slidesPerView={7}
          direction={'vertical'}
          onSwiper={setThumbsSwiper}
          navigation={{
            nextEl: '.down-btn',
            prevEl: '.up-btn',
          }}
        >
          {currentStyle.photos.map((photoObj, index) => (
            <SwiperSlide key={index} className="thumbnail-slide">
              <img className="thumbnail-pic" src={photoObj.thumbnail_url} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button type="button" className="arrow-btn down-btn">
          <i className="fas fa-chevron-down" />
        </button>
      </div>

      <Swiper
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setMainIndex(swiper.activeIndex)}
        onSwiper={setMainSwiper}
        className="info-swiper"
        navigation
      >
        {currentStyle.photos.map((photoObj, index) => (
          <SwiperSlide key={index}>
            <img className="slider-pic" src={photoObj.url} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoGallery;
