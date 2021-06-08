import React from 'react';
import Search from './QnA_components/Search';
import QuestionList from './QnA_components/QuestionList';


const QuestionsAnswers = (props) => (
  <div>
    <div>
      <Search/>
    </div>
    <div>
      <QuestionList />
    </div>
  </div>
);

export default QuestionsAnswers;
