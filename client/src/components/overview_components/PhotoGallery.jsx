import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const PhotoGallery = (props) => {
  const { currentStyle } = props;

  const [mainIndex, setMainIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState();
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [showUpBtn, setShowUpBtn] = useState(true);
  const [showDownBtn, setShowDownBtn] = useState(true);

  SwiperCore.use([Navigation, Thumbs]);

  const slideTo = () => {
    mainSwiper.slideTo(mainIndex);
  };

  useEffect(() => {
    if (mainSwiper) {
      slideTo();
      hideArrows(thumbsSwiper);
    }
  }, [currentStyle]);

  const slideThumb = (direction) => {
    if (direction === 'up') {
      mainSwiper.slidePrev();
    } else {
      mainSwiper.slideNext();
    }
  };

  const hideArrows = (swiperArg) => {
    const slideArr = Array.prototype.slice.call(swiperArg.el.children[0].children);

    let setFirst = false;
    let firstVisibleIndex;
    let lastVisibleIndex;

    slideArr.forEach((slideDiv, index) => {
      if (slideDiv.className.includes('visible')) {
        if (setFirst) {
          lastVisibleIndex = index;
        }

        if (!setFirst) {
          firstVisibleIndex = index;
          setFirst = true;
        }
      }
    });

    if (firstVisibleIndex === 0) {
      setShowUpBtn(false);
    } else {
      setShowUpBtn(true);
    }

    if (lastVisibleIndex === slideArr.length - 1) {
      setShowDownBtn(false);
    } else {
      setShowDownBtn(true);
    }
  };

  return (
    <div className="gallery-overlay">
      <div className="thumb-swiper">
        <button type="button" className={`arrow-btn ${!showUpBtn ? 'hide-btn' : ''}`} onClick={() => slideThumb('up')}>
          <i className="fas fa-chevron-up" />
        </button>
        <Swiper
          spaceBetween={15}
          slidesPerView={7}
          direction={'vertical'}
          onImagesReady={hideArrows}
          onSlideChange={hideArrows}
          onSwiper={setThumbsSwiper}
          watchSlidesVisibility
        >
          {currentStyle.photos.map((photoObj, index) => (
            <SwiperSlide key={index} className={`thumbnail-slide ${index === mainIndex ? 'thumb-active' : ''}`}>
              <img className="thumbnail-pic" src={photoObj.thumbnail_url} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button type="button" className={`arrow-btn ${!showDownBtn ? 'hide-btn' : ''}`} onClick={() => slideThumb('down')}>
          <i className="fas fa-chevron-down" />
        </button>
      </div>

      <Swiper
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        navigation
        onSlideChange={(swiper) => setMainIndex(swiper.activeIndex)}
        onSwiper={setMainSwiper}
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
