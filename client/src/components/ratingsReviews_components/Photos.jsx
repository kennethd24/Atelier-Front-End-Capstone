import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Photos = (props) => {
  const [modalShow, setModalShow] = useState(false);

  function MyVerticallyCenteredModal() {
    return (
      <Modal
        size="xl"
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton />
        <img src={url} alt="review" />
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const { url } = props;
  return (
    <div className="reviews-photo-entry">
      <img onClick={() => setModalShow(true)} className="reviews-photo-single" src={url} alt="review" aria-hidden="true" />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Photos;
