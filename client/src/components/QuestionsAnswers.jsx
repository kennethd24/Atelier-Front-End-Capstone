import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './QnA_components/Search';
import QuestionList from './QnA_components/QuestionList';

const QuestionsAnswers = (props) => {
  const [questions, setQuestions] = useState({
    results: [],
    moreQuestion: [],
  });

  const handleMoreQuestions = () => {
    setQuestions({
      results: questions.results.concat(questions.moreQuestions.slice(0, 4)),
      moreQuestions: questions.moreQuestions.slice(4),
    });
  };

  useEffect(() => {
    axios.get('/api/qa/questions/')
      .then((response) => {
        // console.log(response.data);
        setQuestions({
          results: response.data.results.slice(0, 4),
          moreQuestions: response.data.results.slice(4),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h3>Questions & Answers</h3>
      <div className="Search">
        <Search />
      </div>
      <div className="QuestionList">
        {questions.results.map((question, index) => (
          <QuestionList question={question} key={index} />
        ))}
      </div>
      <input type="button" value="More Answered Questions" onClick={handleMoreQuestions} />
    </div>
  );
};

export default QuestionsAnswers;
