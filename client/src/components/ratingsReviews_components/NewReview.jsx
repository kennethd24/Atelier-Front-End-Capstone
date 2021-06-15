import React, { useState } from 'react';
import {
  Modal, Button, Col, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import Rating from 'react-rating';

const NewReview = (props) => {
  const { show, onHide, name } = props;
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
          <Form.Check required inline label="No" name="group2" type={type} id={`inline-${type}-No`} onChange={() => {
              setRecommendation(false);
            }} />
        </div>
      ))}
    </Form.Group>
  );

  return (
    <Modal
      show={show}
      onHide={onHide}
      name={name}
      size="xl"
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
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="Characteristics">
                  <Form.Check inline label="1" name="group3" type={type} id={`1inline-${type}-1`} />
                  <Form.Check inline label="2" name="group3" type={type} id={`2inline-${type}-2`} />
                  <Form.Check inline label="3" name="group3" type={type} id={`3inline-${type}-3`} />
                  <Form.Check inline label="4" name="group3" type={type} id={`4inline-${type}-4`} />
                  <Form.Check inline label="5" name="group3" type={type} id={`5inline-${type}-5`} />
                </div>
              ))}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">Review Summary</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Example: Best purchase ever!" />
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Review Body*</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" placeholder="Why did you like the product or not?" />
            </InputGroup>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email*</Form.Label>
              <Form.Control type="email" placeholder="Example: jackson11@email.com" />
              <Form.Text className="text-muted">
                For authentication reasons, you will not be emailed
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridNickname">
              <Form.Label>Nickname*</Form.Label>
              <Form.Control type="nickname" placeholder="Example: jackson11!" />
              <Form.Text className="text-muted">
                For privacy reasons, do not use your full name or email address
              </Form.Text>
            </Form.Group>
          </Form.Row>
          {/*
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

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
