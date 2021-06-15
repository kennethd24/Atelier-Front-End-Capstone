import React, { useState, useEffect } from 'react';
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

  console.log('selectedItem', selectedItem);
  console.log('relatedItem', relatedItem);

  const [selFeats, setSelFeats] = useState([]);
  const [relFeats, setRelFeats] = useState([]);

  // useEffect(() => {
  //   if (selectedItem.category === relatedItem.category) {

  //   }
  // }, [selectedItem, relatedItem]);

  useEffect(() => {
    if (selectedItem.features) {
      setSelFeats([...selectedItem.features]);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (relatedItem.features) {
      setRelFeats([...relatedItem.features]);
    }
  }, [relatedItem]);
  // const checkFeatures = (selArr, relArr) => {
  //   if (selArr >= relArr) {
  //     selArr.forEach((selFeat) => {
  //       relArr.forEach((relFeat) => {

  //       })
  //     }
  //   }
  // }

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
          <thead>
            <tr>
              <th>{selectedItem.name}</th>
              <th> </th>
              <th>{relatedItem.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedItem.category}</td>
              <td>CATEGORY</td>
              <td>{relatedItem.category}</td>
            </tr>
            <tr>
              <td>{selectedItem.price}</td>
              <td>PRICE</td>
              <td>{relatedItem.price}</td>
            </tr>
            <tr>
              <td>???</td>
              <td>RATING</td>
              <td>???</td>
            </tr>
            <tr>
              <td>{selectedItem.description}</td>
              <td>DESCRIPTION</td>
              <td>{relatedItem.description}</td>
            </tr>
            <tr>
              <td>{selectedItem.slogan}</td>
              <td>SLOGAN</td>
              <td>{relatedItem.slogan}</td>
            </tr>
            {selFeats.map((featObj) => (
              <tr>
                <td>YES</td>
                <td>
                  {featObj.feature}
                  -
                  {featObj.value}
                </td>
                <td>NO</td>
              </tr>
            ))}
            {relFeats.map((featObj) => (
              <tr>
                <td>NO</td>
                <td>
                  {featObj.feature}
                  -
                  {featObj.value}
                </td>
                <td>YES</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default CompareModal;
