import React from 'react';
import {
  Modal, Button, Col, Row, Form, InputGroup, FormControl, Container,
} from 'react-bootstrap';

const AddPhotos = ({ submission, setSubmission })=> {
  const holder = 'holder';

  return (
    <Form.Group>
    <Form.Label>Photo URL</Form.Label>
    <InputGroup className="uploadPhotos">
      <InputGroup.Text id="basic-addon3">
        Add URL
      </InputGroup.Text>
      <FormControl id="photos" />
    </InputGroup>
  </Form.Group>
  )
}

export default AddPhotos;

// photos= [{id: 1234, url: 'somelink.com'}];
