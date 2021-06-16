import React, { useState, useEffect } from 'react';
import Rating from 'react-rating';
import {
  Modal,
} from 'react-bootstrap';

const CompareModal = (props) => {
  const {
    show,
    onHide,
    selectedItem,
    // selectedDefault,
    selectedRating,
    relatedItem,
    relatedRating,
  } = props;

  const [selFeats, setSelFeats] = useState([]);
  const [relFeats, setRelFeats] = useState([]);
  const [shareFeats, setShareFeats] = useState([]);

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

  useEffect(() => {
    checkFeatures(selFeats, relFeats);
  }, [selFeats, relFeats]);

  const checkFeatures = (selArr, relArr) => {
    const sharedObj = {};

    if (Array.isArray(selArr)) {
      selArr.forEach((selFeat) => {
        sharedObj[selFeat.feature] = { selVal: selFeat.value, relVal: null };
      });
    }

    if (Array.isArray(relArr)) {
      relArr.forEach((relFeat) => {
        if (sharedObj[relFeat.feature]) {
          sharedObj[relFeat.feature].relVal = relFeat.value;
        } else {
          sharedObj[relFeat.feature] = { selVal: null, relVal: relFeat.value };
        }
      });
    }

    const featuresArr = Object.entries(sharedObj);
    setShareFeats([...featuresArr]);
  };

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
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="compare-item-name">{selectedItem.name}</th>
              <th> </th>
              <th className="compare-item-name">{relatedItem.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedItem.category}</td>
              <td>Category</td>
              <td>{relatedItem.category}</td>
            </tr>
            <tr>
              <td>{selectedItem.default_price}</td>
              <td>Price</td>
              <td>{relatedItem.default_price}</td>
            </tr>
            <tr>
              <td>
                <Rating
                  initialRating={selectedRating}
                  readonly
                  emptySymbol="far fa-star"
                  fullSymbol="fas fa-star"
                  className="rating"
                />
              </td>
              <td>Rating</td>
              <td>
                <Rating
                  initialRating={relatedRating}
                  readonly
                  emptySymbol="far fa-star"
                  fullSymbol="fas fa-star"
                  className="rating"
                />
              </td>
            </tr>
            {shareFeats.map((featObj, i) => (
              <tr key={i}>
                <td>{featObj[1].selVal}</td>
                <td>{featObj[0]}</td>
                <td>{featObj[1].relVal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default CompareModal;
