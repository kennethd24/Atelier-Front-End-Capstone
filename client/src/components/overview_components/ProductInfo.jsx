import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
  } = props;

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
          <Col>
            <SizeDropdown currentStyle={currentStyle} size={size} setSize={setSize} />
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
      </Container>
    </div>
  );
};

export default ProductInfo;
