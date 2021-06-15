import React from 'react';
import {
  Modal, Table,
} from 'react-bootstrap';

const CompareModal = (props) => {
  const {
    show,
    onHide,
    selectedItem,
    relatedItem,
  } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      // name={name}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Comparing
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table>
          <tr>
            <th colSpan="1.5">{selectedItem.name}</th>
            <th colSpan="1.5">{relatedItem.name}</th>
          </tr>
          <tr>
            <td>{selectedItem.price}</td>
            <td>PRICE</td>
            <td>{relatedItem.price}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>RATING</td>
            <td>5</td>
          </tr>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default CompareModal;
