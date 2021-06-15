import React, { useState } from 'react';
import {
  Modal, Button, Col, Row, Form, InputGroup, FormControl, Container,
} from 'react-bootstrap';
import Rating from 'react-rating';
import DisplayCharNewReview from './DisplayCharNewReview';

const NewReview = (props) => {
  const {
    show, onHide, name, characteristics,
  } = props;
  const [submission, setSubmission] = useState({
    product_id: 0,
    rating: 0,
    summary: '',
    body: '',
    recommend: null,
    name: '',
    email: '',
    photos: [],
    characteristics: {},
  });

  const ratingSelectionText = () => {
    const ratingChosen = submission.rating;
    if (ratingChosen === 5) {
      return (
        <span>
          5 stars - “Great”
        </span>
      );
    }
    if (ratingChosen === 4) {
      return (
        <span>
          4 stars - “Good”
        </span>
      );
    }
    if (ratingChosen === 3) {
      return (
        <span>
          3 stars - “Average”
        </span>
      );
    }
    if (ratingChosen === 2) {
      return (
        <span>
          2 stars - “Fair”
        </span>
      );
    }
    if (ratingChosen === 1) {
      return (
        <span>
          1 star - “Poor”
        </span>
      );
    }
    return null;
  };

  const overallRating = (
    <Form.Group>
      <Form.Row>
        <Form.Label>Overall Rating*</Form.Label>
      </Form.Row>
      <Form.Row>
        <Rating
          onChange={(rate) => setSubmission({
            ...submission,
            rating: rate,
          })}
          initialRating={submission.rating}
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
        />
        {ratingSelectionText()}
      </Form.Row>
    </Form.Group>
  );
  const recommendProduct = (
    <Form.Group>
      <Form.Label>Do you recommend this product?*</Form.Label>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            required
            inline
            label="Yes"
            name="group2"
            type={type}
            id={`inline-${type}-Yes`}
            onChange={() => {
              setSubmission({
                ...submission,
                recommend: true,
              });
            }}
          />
          <Form.Check
            required
            inline
            label="No"
            name="group2"
            type={type}
            id={`inline-${type}-No`}
            onChange={() => {
              setSubmission({
                ...submission,
                recommend: false,
              });
            }}
          />
        </div>
      ))}
    </Form.Group>
  );

  // const DisplayCharacteristics = ({ characteristic }) => {
  //   const charSelections = {
  //     Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
  //     Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  //     Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  //     Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  //     Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  //     Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  //   };

  //   const showSelected = () => {
  //     const selected = { characteristic };
  //     const nameSelected = Object.values(selected)[0];
  //     if (submission.characteristics[nameSelected] > 0) {
  //       const index = submission.characteristics[nameSelected] - 1;
  //       return (
  //         <Form.Text className="text-muted">
  //           {charSelections[nameSelected][index]}
  //         </Form.Text>
  //       );
  //     }
  //     return (
  //       <Form.Text className="text-muted">
  //         None Selected
  //       </Form.Text>
  //     );
  //   };

  //   const selectChar = (eventInput) => {
  //     setSubmission({
  //       ...submission,
  //       characteristics: {
  //         ...submission.characteristics,
  //         [eventInput.target.name]: eventInput.target.value,
  //       },
  //     });
  //   };

  //   return (
  //     <Form.Group>
  //       {['radio'].map((type) => (
  //         <div key={`inline-${type}`} className="CharacteristicsNewReview">
  //           <Container>
  //             <Row>
  //               <Col>
  //                 <div>
  //                   {characteristic}
  //                   {showSelected()}
  //                 </div>
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col>
  //                 <Form.Check inline label="1" value="1" name={`${characteristic}`} type={type} id={`inline-${type}-1-${characteristic}`} onClick={(event) => selectChar(event)} />
  //               </Col>
  //               <Col>
  //                 <Form.Check inline label="2" value="2" name={`${characteristic}`} type={type} id={`inline-${type}-2-${characteristic}`} onClick={(event) => selectChar(event)} />
  //               </Col>
  //               <Col>
  //                 <Form.Check inline label="3" value="3" name={`${characteristic}`} type={type} id={`inline-${type}-3-${characteristic}`} onClick={(event) => selectChar(event)} />
  //               </Col>
  //               <Col>
  //                 <Form.Check inline label="4" value="4" name={`${characteristic}`} type={type} id={`inline-${type}-4-${characteristic}`} onClick={(event) => selectChar(event)} />
  //               </Col>
  //               <Col>
  //                 <Form.Check inline label="5" value="5" name={`${characteristic}`} type={type} id={`inline-${type}-5-${characteristic}`} onClick={(event) => selectChar(event)} />
  //               </Col>
  //             </Row>
  //           </Container>

  //         </div>
  //       ))}
  //     </Form.Group>
  //   );
  // };

  const findCharacteristics = () => {
    if (Object.keys(characteristics).length > 0) {
      return (
        Object.keys(characteristics).map((characteristic) => (
          <DisplayCharNewReview
            characteristic={characteristic}
            key={characteristics[characteristic].id}
            submission={submission} setSubmission={setSubmission}
          />
        ))
      );
    }
    return null;
  };

  const handleChange = (eventInput) => {
    setSubmission({ ...submission, [eventInput.target.id]: eventInput.target.value });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      name={name}
      // size="lg"
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
            {overallRating}
          </Form.Row>
          <Form.Row>
            {recommendProduct}
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Label>Characteristics*</Form.Label>
              {findCharacteristics()}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">Review Summary</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="summary" value={submission.summary} onChange={(event) => handleChange(event)} maxLength={60} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Example: Best purchase ever!" />
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Review Body*</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="body" value={submission.body} onChange={(event) => handleChange(event)} maxLength={1000} required as="textarea" aria-label="With textarea" placeholder="Why did you like the product or not?" />
            </InputGroup>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Email*</Form.Label>
              <Form.Control id="email" value={submission.email} onChange={(event) => handleChange(event)} maxLength={60} required type="email" placeholder="Example: jackson11@email.com" />
              <Form.Text className="text-muted">
                For authentication reasons, you will not be emailed
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Nickname*</Form.Label>
              <Form.Control id="name" value={submission.name} onChange={(event) => handleChange(event)} maxLength={60} required type="nickname" placeholder="Example: jackson11!" />
              <Form.Text className="text-muted">
                For privacy reasons, do not use your full name or email address
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Photo URL</Form.Label>
            <InputGroup className="uploadPhotos">
              <InputGroup.Text id="basic-addon3">
                Add URL
              </InputGroup.Text>
              <FormControl id="photos" />
            </InputGroup>
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
