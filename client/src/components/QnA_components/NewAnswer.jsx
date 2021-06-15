import React from 'react';
import {
  Modal, Button, Col, Form, InputGroup, FormControl,
} from 'react-bootstrap';

const NewAnswer = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Submit You Answer
          <Modal.Title>[product][questionBody]</Modal.Title>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>Your Answer*</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="textarea" rows={7}/>
              {/* <Form.Control.Feedback>
                Please enter a response
              </Form.Control.Feedback> */}
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>What is your nickname?*</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="input" placeholder="Example: jack543!" />
              {/* <Form.Control.Feedback>
                Please enter a nickname
              </Form.Control.Feedback> */}
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>Your email*</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" placeholder="Example: jack@email.com"/>
              {/* <Form.Control.Feedback type="invalid">
                Please enter a email
              </Form.Control.Feedback> */}
            </InputGroup>
          </Form.Group>

          <Form.Row>
            <Col>
              <Form.File/>
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