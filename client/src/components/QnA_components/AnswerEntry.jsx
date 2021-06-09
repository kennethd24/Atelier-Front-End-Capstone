import React, { useState, useEffect } from 'react';

const AnswerEntry = ({ answer }) => {
  return (
    <div>
      A: {answer.body}
    </div>
  );
};

export default AnswerEntry;
