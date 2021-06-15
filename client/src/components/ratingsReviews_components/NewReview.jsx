import React from 'react';
import {
  Modal, Button, Col, Form, InputGroup, FormControl,
} from 'react-bootstrap';

const NewReview = (props) => {
  const { show, onHide, name } = props;
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
            <Form.Group>
              <Form.Label>Overall Rating*</Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check inline label="1" name="group1" type={type} id={`inline-${type}-1`} />
                  <Form.Check inline label="2" name="group1" type={type} id={`inline-${type}-2`} />
                  <Form.Check inline label="3" name="group1" type={type} id={`inline-${type}-3`} />
                  <Form.Check inline label="4" name="group1" type={type} id={`inline-${type}-4`} />
                  <Form.Check inline label="5" name="group1" type={type} id={`inline-${type}-5`} />
                </div>
              ))}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Label>Do you recommend this product?*</Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check inline label="Yes" name="group2" type={type} id={`inline-${type}-Yes`} />
                  <Form.Check inline label="No" name="group2" type={type} id={`inline-${type}-No`} />
                </div>
              ))}
            </Form.Group>
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
              <p>For authentication reasons, you will not be emailed</p>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridNickname">
              <Form.Label>Nickname*</Form.Label>
              <Form.Control type="nickname" placeholder="Example: jackson11!" />
              <p>For privacy reasons, do not use your full name or email address</p>
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
