import React, { useState } from 'react';
import {
  Modal, Button, Col, Row, Form, InputGroup, FormControl, Container,
} from 'react-bootstrap';
import Rating from 'react-rating';

const NewReview = (props) => {
  const {
    show, onHide, name, characteristics,
  } = props;
  const [recommendation, setRecommendation] = useState(null);
  const [submission, setSubmission] = useState({
    product_id: 0,
    rating: 0,
    summary: '',
    body: '',
    recommend: null,
    name: '',
    email: '',
    photos: [],
    characteristics: {},
  });

  const ratingSelectionText = () => {
    const ratingChosen = submission.rating;
    if (ratingChosen === 5) {
      return (
        <span>
          5 stars - “Great”
        </span>
      );
    }
    if (ratingChosen === 4) {
      return (
        <span>
          4 stars - “Good”
        </span>
      );
    }
    if (ratingChosen === 3) {
      return (
        <span>
          3 stars - “Average”
        </span>
      );
    }
    if (ratingChosen === 2) {
      return (
        <span>
          2 stars - “Fair”
        </span>
      );
    }
    if (ratingChosen === 1) {
      return (
        <span>
          1 star - “Poor”
        </span>
      );
    }
    return null;
  };

  const overallRating = (
    <Form.Group>
      <Form.Row>
        <Form.Label>Overall Rating*</Form.Label>
      </Form.Row>
      <Form.Row>
        <Rating
          onChange={(rate, prevState) => setSubmission({
            ...prevState,
            rating: rate,
          })}
          initialRating={submission.rating}
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
        />
        {ratingSelectionText()}
      </Form.Row>
    </Form.Group>
  );
  const recommendProduct = (
    <Form.Group>
      <Form.Label>Do you recommend this product?*</Form.Label>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            required
            inline
            label="Yes"
            name="group2"
            type={type}
            id={`inline-${type}-Yes`}
            onChange={() => {
              setRecommendation(true);
            }}
          />
          <Form.Check
            required
            inline
            label="No"
            name="group2"
            type={type}
            id={`inline-${type}-No`}
            onChange={() => {
              setRecommendation(false);
            }}
          />
        </div>
      ))}
    </Form.Group>
  );

  const DisplayCharacteristics = (props) => {
    const { characteristic } = props;
    return (
      <Form.Group>
        {['radio'].map((type) => (
          <div key={`inline-${type}`} className="CharacteristicsNewReview">
            <Container>
              <Row>
                <Col>
                  <div>{characteristic}</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Check inline label="1" name={`group-${characteristic}`} type={type} id={`inline-${type} -1-${characteristic}`} />
                </Col>
                <Col >
                  <Form.Check inline label="2" name={`group-${characteristic}`} type={type} id={`inline-${type} -2-${characteristic}`} />
                </Col>
                <Col>
                  <Form.Check inline label="3" name={`group-${characteristic}`} type={type} id={`inline-${type} -3-${characteristic}`} />
                </Col>
                <Col>
                  <Form.Check inline label="4" name={`group-${characteristic}`} type={type} id={`inline-${type} -4-${characteristic}`} />
                </Col>
                <Col>
                  <Form.Check inline label="5" name={`group-${characteristic}`} type={type} id={`inline-${type} -5-${characteristic}`} />
                </Col>
              </Row>
            </Container>

          </div>
        ))}
      </Form.Group>
    );
  };

  const findCharacteristics = () => {
    if (Object.keys(characteristics).length > 0) {
      return (
        Object.keys(characteristics).map((characteristic) => (
          <DisplayCharacteristics
            characteristic={characteristic}
            key={characteristics[characteristic].id}
          />
        ))
      );
    }
    return null;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      name={name}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Write Your Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          About the
          {' '}
          {name}
        </h5>
        <Form>
          <Form.Row>
            {overallRating}
          </Form.Row>
          <Form.Row>
            {recommendProduct}
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Label>Characteristics*</Form.Label>
              {findCharacteristics()}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text maxLength="5" id="inputGroup-sizing-sm">Review Summary</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Example: Best purchase ever!" />
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Review Body*</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl required as="textarea" aria-label="With textarea" placeholder="Why did you like the product or not?" />
            </InputGroup>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email*</Form.Label>
              <Form.Control required type="email" placeholder="Example: jackson11@email.com" />
              <Form.Text className="text-muted">
                For authentication reasons, you will not be emailed
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridNickname">
              <Form.Label>Nickname*</Form.Label>
              <Form.Control required type="nickname" placeholder="Example: jackson11!" />
              <Form.Text className="text-muted">
                For privacy reasons, do not use your full name or email address
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.File id="exampleFormControlFile1" label="Upload photos" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewReview;
