import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Reviews from './Reviews';
import Price from './Price';
import StyleSelector from './StyleSelector';
import SizeDropdown from './SizeDropdown';
import QuantityDropdown from './QuantityDropdown';

const ProductInfo = (props) => {
  const {
    currentProduct,
    styles,
    currentStyle,
    setCurrentStyle,
    rating,
    reviewsCount,
    price,
    size,
    setSize,
    quantity,
    setQuantity,
    addToCart,
  } = props;

  const [showAlert, setShowAlert] = useState(false);

  const [showCartBtn, setShowCartBtn] = useState(true);

  const handleCartClick = () => {
    if (!size) {
      setShowAlert(true);
    } else {
      addToCart({
        style: currentStyle,
        size,
        quantity,
      });

      setSize(null);
      setQuantity(null);
    }
  };

  useEffect(() => {
    setShowAlert(false);
    setSize(null);
    setQuantity(null);
  }, [currentStyle]);

  useEffect(() => {
    if (size) {
      setShowAlert(false);
    }
  }, [size]);

  return (
    <div className="product-info">
      <Row>
        <Col>
          <Reviews rating={rating} reviewsCount={reviewsCount} />
        </Col>
      </Row>
      <Row>
        <Col>
          <span>{currentProduct.category}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>{currentProduct.name}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Price price={price} currentStyle={currentStyle} />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyleSelector
            styles={styles}
            currentStyle={currentStyle}
            setCurrentStyle={setCurrentStyle}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={7}>
          <Alert variant="danger" show={showAlert} className="py-1 text-center">
            <span className="alert-text">Please select size</span>
          </Alert>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={7}>
          <SizeDropdown
            currentStyle={currentStyle}
            size={size}
            setSize={setSize}
            showAlert={showAlert}
            setShowCartBtn={setShowCartBtn}
          />
        </Col>
        <Col>
          <QuantityDropdown
            currentStyle={currentStyle}
            size={size}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </Col>
      </Row>
      {
        showCartBtn &&
        (
          <Row className="mb-3">
            <Col>
              <Button className="w-100" onClick={handleCartClick}>ADD TO CART</Button>
            </Col>
          </Row>
        )
      }
    </div>
  );
};

export default ProductInfo;
