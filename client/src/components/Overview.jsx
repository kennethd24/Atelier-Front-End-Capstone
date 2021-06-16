import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductInfo from './overview_components/ProductInfo';
import PhotoGallery from './overview_components/PhotoGallery';

const Overview = (props) => {
  const {
    currentItem,
    rating,
    reviewsCount,
    cart,
    addToCart,
  } = props;

  useEffect(() => {
    // reset the current style when a new product is clicked
    setCurrentStyle(null);
    getStyles();
  }, [currentItem]);

  const [currentStyle, setCurrentStyle] = useState(null);

  const [styles, setStyles] = useState([]);

  const [price, setPrice] = useState(0);

  const [size, setSize] = useState(null);

  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    if (styles.length > 0 && currentStyle === null) {
      for (let i = 0; i < styles.length; i++) {
        if (styles[i]['default?']) {
          setCurrentStyle(styles[i]);
          return;
        }
      }

      // if no default style found, set it to the first style available
      setCurrentStyle(styles[0]);
    }
  }, [styles]);

  useEffect(() => {
    if (currentStyle !== null) {
      shiftSelectedStyle();
      filterPrice();
    }
  }, [currentStyle]);

  const getStyles = () => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/products/${currentItem.id}/styles`)
        .then((res) => {
          setStyles(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const shiftSelectedStyle = () => {
    const copy = [...styles];
    const index = copy.findIndex((styleObj) => styleObj.style_id === currentStyle.style_id);
    copy.splice(index, 1);
    copy.unshift(currentStyle);
    setStyles(copy);
  };

  const filterPrice = () => {
    if (currentStyle.sale_price) {
      setPrice(Number(currentStyle.sale_price));
    } else {
      setPrice(Number(currentStyle.original_price));
    }
  };

  return (
    <Container fluid className="d-flex flex-column container-border main-container">
      {currentStyle &&
        (
          <Row>
            <Col xs={7} className="container-border p-0">
              <PhotoGallery currentStyle={currentStyle} />
            </Col>
            <Col className="container-border">
              <ProductInfo
                currentProduct={currentItem}
                styles={styles}
                currentStyle={currentStyle}
                setCurrentStyle={setCurrentStyle}
                rating={rating}
                reviewsCount={reviewsCount}
                price={price}
                size={size}
                setSize={setSize}
                quantity={quantity}
                setQuantity={setQuantity}
                addToCart={addToCart}
              />
            </Col>
          </Row>
        )}
      <Row>
        <div>product details</div>
      </Row>
    </Container>
  );
};

export default Overview;
