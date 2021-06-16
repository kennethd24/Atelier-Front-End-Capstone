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

  // console.log('selectedItem', selectedItem);
  // console.log('relatedItem', relatedItem);

  const [selFeats, setSelFeats] = useState([]);
  const [relFeats, setRelFeats] = useState([]);
  const [shareFeats, setShareFeats] = useState([]);

  useEffect(() => {
    if (selectedItem.features) {
      // console.log('first fired');
      setSelFeats([...selectedItem.features]);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (relatedItem.features) {
      // console.log('second fired');
      setRelFeats([...relatedItem.features]);
    }
  }, [relatedItem]);

  // useEffect(() => {
  //   checkFeatures(selectedItem.features, relatedItem.features);
  // }, [selectedItem, relatedItem]);

  // take longer of the two arrays and set each feature as a key, each feature value as a value
  // then iterate through shorter of the arrays, if key(feature)
  // already exists, do something? (maybe push both to a new array)
  const checkFeatures = (selArr, relArr) => {
    const selObj = {};
    const relObj = {};
    const sharedObj = {};

    if (selArr >= relArr) {
      selArr.forEach((selFeat) => {
        selObj[selFeat.feature] = selFeat.value;
      });
      relArr.forEach((relFeat) => {
        if (selObj[relFeat.feature]) {
          sharedObj[relFeat.feature] = [selObj[relFeat.feature], relFeat.value];
        } else {
          relObj[relFeat.feature] = relFeat.value;
        }
      });
    } else {
      relArr.forEach((relFeat) => {
        relObj[relFeat.feature] = relFeat.value;
      });
      selArr.forEach((selFeat) => {
        if (relObj[selFeat.feature]) {
          sharedObj[selFeat.feature] = [selFeat.value, relObj[selFeat.feature]];
        } else {
          selObj[selFeat.feature] = selFeat.value;
        }
      });
    }
    // console.log('sel obj', selObj);
    // console.log('rel obj', relObj);
    // console.log('shared obj', sharedObj);
    const selFncArr = Object.entries(selObj);
    // setSelFeats([...selFncArr]);
    const relFncArr = Object.entries(relObj);
    // setRelFeats([...relFncArr]);
    const sharedArr = Object.entries(sharedObj);
    // setShareFeats([...sharedArr]);
    // console.log('selFncArr', selFncArr);
    // console.log('relFncArr', relFncArr);
    // console.log('sharedArr', sharedArr);
  };

  useEffect(() => {
    checkFeatures(selFeats, relFeats);
  }, [selectedItem, relatedItem]);

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
              <td>???</td>
              <td>Rating</td>
              <td>???</td>
            </tr>
            {/* <tr>
              <td>{selectedItem.description}</td>
              <td>DESCRIPTION</td>
              <td>{relatedItem.description}</td>
            </tr> */}
            <tr>
              <td>{selectedItem.slogan}</td>
              <td>SLOGAN</td>
              <td>{relatedItem.slogan}</td>
            </tr>
            {/* {shareFeats.map((featObj, i) => (
              <tr key={i}>
                <td>{featObj[1][0]}</td>
                <td>{featObj[0]}</td>
                <td>{featObj[1][1]}</td>
              </tr>
            ))} */}
            {selFeats.map((featObj, i) => (
              <tr key={i}>
                <td>{featObj.value}</td>
                <td>
                  {featObj.feature}
                </td>
                <td> </td>
              </tr>
            ))}
            {relFeats.map((featObj, i) => (
              <tr key={i}>
                <td> </td>
                <td>
                  {featObj.feature}
                </td>
                <td>{featObj.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default CompareModal;
