/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerEntry from './AnswerEntry';

const QuestionList = ({ question }) => {
  const [answers, setAnswers] = useState({
    results: [],
    moreAnswers: [],
  });

  useEffect(() => {
    axios.get(`/api/qa/questions/${question.question_id}/answers`)
      .then((response) => {
        // console.log('answers', response.data);
        setAnswers({
          results: response.data.results.slice(0, 2),
          moreAnswers: response.data.results.slice(2),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div>
        Q:{question.question_body}
      </div>
      <div>
        {answers.results.map((answer, index) => (
          <AnswerEntry answer={answer} key={index} />
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
