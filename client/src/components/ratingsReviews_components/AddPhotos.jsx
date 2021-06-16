import React, { useState } from 'react';
import {
  Modal, Button, Col, Row, Form, Image, InputGroup, FormControl, Container,
} from 'react-bootstrap';

const AddPhotos = ({ submission, setSubmission }) => {
  const [modalShow, setModalShow] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [photosObj, setPhotosObj] = useState({
    id: 0,
    url: '',
  });

  const randomID = () => (
    Math.floor(100000 + Math.random() * 900000)
  );
  const handleChange = (eventInput) => {
    const idResult = randomID();
    setPhotosObj({
      id: idResult,
      url: eventInput.target.value,
    });
  };
  const handleSubmit = () => {
    setSubmission({
      ...submission,
      photos: [...submission.photos, photosObj],
    });
    setPhotosObj({
      id: 0,
      url: '',
    });
    setModalShow(false);
    setPhotoCount(photoCount + 1);
  };

  function showUploadedPics() {
    if (submission.photos.length > 0) {
      return (
        <Form.Row>
          {submission.photos.map((photo) => (
            <Image src={photo.url} key={photo.id} thumbnail />
          ))}
        </Form.Row>
      );
    }
    return null;
  }

  const PreviewPhotosModal = ({ show, onHide }) => (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Photos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Image src={photosObj.url} fluid />
          </Form.Row>
          <Form.Row>
            <Button onClick={(e) => handleSubmit(e)} variant="secondary" type="button">
              Confirm Upload
            </Button>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <Form.Group>
      <Form.Label>Upload Photos {photoCount}/5</Form.Label>
      { (photoCount < 5) ? (
        <InputGroup className="uploadPhotos">
          <Form.Group />
          <Form.Control
            type="url"
            placeholder="Enter photo URL"
            value={photosObj.url}
            onChange={(e) => handleChange(e)}
          />
          <Button onSubmit={(e) => { e.preventDefault(); setModalShow(true); }} variant="secondary" type="submit">Add Photos</Button>
          <PreviewPhotosModal show={modalShow} onHide={() => setModalShow(false)} />
        </InputGroup>
      ) : null}
      <Form.Row>
        {showUploadedPics()}
      </Form.Row>
    </Form.Group>
  );
};

export default AddPhotos;

// photos= [{id: 1234, url: 'somelink.com'}];
