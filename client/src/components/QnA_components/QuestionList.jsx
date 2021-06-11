/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerEntry from './AnswerEntry';

const QuestionList = ({ question }) => {
  const [answers, setAnswers] = useState({
    results: [],
    moreAnswers: [],
  });

  const handleMoreAnswers = () => {
    setAnswers({
      results: answers.results.concat(answers.moreAnswers.slice(0, 2)),
      moreAnswers: answers.moreAnswers.slice(2),
    });
  };

  useEffect(() => {
    axios.get(`/api/qa/questions/${question.question_id}/answers`)
      .then((response) => {
        console.log('answers', response.data);
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
      <div className="questions">
        Q:{question.question_body}
      </div>
      <div className="answerListScroll">
        {answers.results.map((answer) => (
          <AnswerEntry
            answer={answer}
            key={answer.answer_id}
            question={question}
          />
        ))}
        {!answers.moreAnswers.length < 1 ?
          (
            <input
              type="button"
              value="Load More Answers"
              onClick={handleMoreAnswers}
            />
          ) :
          (null)}
      </div>
      <hr />
    </div>
  );
};

export default QuestionList;
