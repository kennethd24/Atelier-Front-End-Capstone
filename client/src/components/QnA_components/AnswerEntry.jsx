import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnswerEntry = ({ answer }) => {
  const [helpful, setHelpful] = useState(answer.helpfulness);
  const [click, setClick] = useState(false);

  const handleHelpfulness = (id, help) => {
    const updateHelpful = {
      updateHelpful: help + 1,
    };
    axios.put(`/api/qa/answers/${answer.answer_id}/helpful`, updateHelpful)
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        A: {answer.body}
      </div>
      <div>
        {answer.answerer_name}
        ,
        &nbsp;
        {new Date(answer.date).toString().slice(4, 16)}
        {!click ? <span onClick={() => {
          handleHelpfulness(answer.answer_id, helpful);
          setHelpful(helpful + 1);
          setClick(true);
        }}>
          helpful? ({helpful})
        </span> : <span>helpful? ({helpful})</span>}
      </div>
    </div>
  );
};

export default AnswerEntry;
