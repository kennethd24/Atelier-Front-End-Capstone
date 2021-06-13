import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Reviews from './Reviews';
import Price from './Price';
import StyleSelector from './StyleSelector';
import SizeDropdown from './SizeDropdown';
import QuantityDropdown from './QuantityDropdown';
import SizeDropdownv2 from './SizeDropdownv2';

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

  // const sizeDropdownRef = useRef(null);

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
    }
  };


  // useEffect(() => {
    // console.log(sizeDropdownRef.current);
    // const sizeBtnText = sizeDropdownRef.current.querySelector('button').textContent;

    // if (sizeBtnText === 'OUT OF STOCK'
    // || (size && !quantity)) {
    //   setShowCartBtn(false);
    // } else {
    //   setShowCartBtn(true);
    // }
  // }, [currentProduct, styles, currentStyle, size, quantity]);

  useEffect(() => {
    setShowAlert(false);
  }, [currentStyle]);

  useEffect(() => {
    if (size) {
      setShowAlert(false);
    }
  }, [size]);

  return (
    <div className="product-info">
      <Reviews rating={rating} reviewsCount={reviewsCount} />
      <span>{currentProduct.category}</span>
      <span>{currentProduct.name}</span>
      <Price price={price} currentStyle={currentStyle} />
      <StyleSelector
        styles={styles}
        currentStyle={currentStyle}
        setCurrentStyle={setCurrentStyle}
      />
      <Container>
        <Row>
          <Col xs={7}>
            <Alert variant="danger" show={showAlert} className="py-1 text-center">
              <span className="alert-text">Please select size</span>
            </Alert>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={7}>
            {/* <SizeDropdown
              currentStyle={currentStyle}
              size={size}
              setSize={setSize}
              sizeDropdownRef={sizeDropdownRef}
            /> */}
            <SizeDropdownv2
              currentStyle={currentStyle}
              size={size}
              setSize={setSize}
              // sizeDropdownRef={sizeDropdownRef}
              showAlert={showAlert}
              showCartBtn={showCartBtn}
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
      </Container>
    </div>
  );
};

export default ProductInfo;
