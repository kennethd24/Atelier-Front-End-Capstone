import React, { useState } from 'react';
import {
  Modal, Button, Col, Row, Form, InputGroup, FormControl, Container,
} from 'react-bootstrap';
import Rating from 'react-rating';
import DisplayCharNewReview from './DisplayCharNewReview';

const NewReview = (props) => {
  const {
    show, onHide, name, characteristics,
  } = props;
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
          onChange={(rate) => setSubmission({
            ...submission,
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
              setSubmission({
                ...submission,
                recommend: true,
              });
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
              setSubmission({
                ...submission,
                recommend: false,
              });
            }}
          />
        </div>
      ))}
    </Form.Group>
  );

  const findCharacteristics = () => {
    if (Object.keys(characteristics).length > 0) {
      return (
        Object.keys(characteristics).map((characteristic) => (
          <DisplayCharNewReview
            characteristic={characteristic}
            key={characteristics[characteristic].id}
            submission={submission}
            setSubmission={setSubmission}
          />
        ))
      );
    }
    return null;
  };

  const handleChange = (eventInput) => {
    setSubmission({ ...submission, [eventInput.target.id]: eventInput.target.value });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      name={name}
      size="lg"
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
                <InputGroup.Text id="inputGroup-sizing-sm">Review Summary</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="summary" value={submission.summary} onChange={(event) => handleChange(event)} maxLength={60} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Example: Best purchase ever!" />
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Review Body*</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="body" value={submission.body} onChange={(event) => handleChange(event)} maxLength={1000} required as="textarea" aria-label="With textarea" placeholder="Why did you like the product or not?" />
            </InputGroup>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Email*</Form.Label>
              <Form.Control id="email" value={submission.email} onChange={(event) => handleChange(event)} maxLength={60} required type="email" placeholder="Example: jackson11@email.com" />
              <Form.Text className="text-muted">
                For authentication reasons, you will not be emailed
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Nickname*</Form.Label>
              <Form.Control id="name" value={submission.name} onChange={(event) => handleChange(event)} maxLength={60} required type="nickname" placeholder="Example: jackson11!" />
              <Form.Text className="text-muted">
                For privacy reasons, do not use your full name or email address
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Photo URL</Form.Label>
            <InputGroup className="uploadPhotos">
              <InputGroup.Text id="basic-addon3">
                Add URL
              </InputGroup.Text>
              <FormControl id="photos" />
            </InputGroup>
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
