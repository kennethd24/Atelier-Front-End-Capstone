import React from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import QuestionsAnswers from './QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews.jsx';
import RelatedItems from './RelatedItems.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentItem: {}
    };
  }

  componentDidMount() {
    this.getFirstItem();
  }

  getFirstItem = () => {
    axios.get('/api/products')
      .then((res) => {
        this.setState({
          currentItem: res.data[1]
          // currentItem: res.data[0] changed for better dummy review data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { currentItem } = this.state;

    return (
      // <div>Hello World</div>
      <div>
        <Overview currentItem={currentItem} />
        <RelatedItems currentItem={currentItem} />
        <QuestionsAnswers currentItem={currentItem} />
        <RatingsReviews currentItem={currentItem} />
      </div>
    );
  }
}

export default App;
