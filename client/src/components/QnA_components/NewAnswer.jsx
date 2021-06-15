import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal, Button, Col, Form, InputGroup, FormControl,
} from 'react-bootstrap';

const NewAnswer = ({ show, onHide, question, product }) => {
  const [modalAnswer, setModalAnswer] = useState({
    body: '',
    name: '',
    email: '',
    photos: [],
  });

  const submitAnswer = (e) => {
    const inputAnswer = {
      body: modalAnswer.body,
      name: modalAnswer.name,
      email: modalAnswer.email,
      photos: modalAnswer.photos,
    };
    axios.post(`/api/qa/questions/${question.question_id}/answers`, inputAnswer)
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setModalAnswer({ ...modalAnswer, [e.target.name]: e.target.value }, console.log(modalAnswer));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Submit You Answer
          <Modal.Title>[{product.name}] [{question.question_body}]</Modal.Title>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitAnswer}>

          <Form.Group>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>Your Answer*</InputGroup.Text>
              </InputGroup.Prepend>
              {modalAnswer.body.length < 1 ? <Form.Control as="textarea" rows={7} name="body" onChange={(e) => handleChange(e)} maxLength={1000} required isInvalid />
                :
              <Form.Control as="textarea" rows={7} name="body" onChange={(e) => handleChange(e)} maxLength={1000} />}
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>What is your nickname?*</InputGroup.Text>
              </InputGroup.Prepend>
              {modalAnswer.name < 1 ? <Form.Control as="input" placeholder="Example: jack543!" name="name" onChange={(e) => handleChange(e)} maxLength={60} required isInvalid />
                :
              <Form.Control as="input" placeholder="Example: jack543!" name="name" onChange={(e) => handleChange(e)} maxLength={60} />}
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>Your email*</InputGroup.Text>
              </InputGroup.Prepend>
              {modalAnswer.email < 1 ? <Form.Control type="text" placeholder="Example: jack@email.com" name="email" onChange={(e) => handleChange(e)} maxLength={60} required isInvalid />
                :
              <Form.Control type="text" placeholder="Example: jack@email.com" name="email" onChange={(e) => handleChange(e)} maxLength={60} />}
            </InputGroup>
          </Form.Group>

          <Form.Row>
            <Col>
              <Form.Label>Upload your photos</Form.Label>
              <Form.File />
            </Col>
            <Col>
              <Button type="submit" className="float-right">Submit</Button>
            </Col>
          </Form.Row>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewAnswer;