import React, { useState, useEffect } from 'react';

const AnswerEntry = ({ answer }) => {
  return (
    <div>
      <div>
        A: {answer.body}
      </div>
      <div>{answer.answerer_name}, &nbsp; {new Date(answer.date).toString().slice(4, 16)} </div>
    </div>
  );
};

export default AnswerEntry;
