import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Overview from './Overview';
import QuestionsAnswers from './QuestionsAnswers';
import RatingsReviews from './RatingsReviews';
import RelatedItems from './RelatedItems';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentItem: {},
      rating: 0,
      reviewsCount: 0,
      metaData: [],
      defaultStyle: {},
      cart: [],
    };
  }

  componentDidMount() {
    this.getFirstItem();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentItem } = this.state;
    const currentLength = Object.keys(currentItem).length;
    const prevLength = Object.keys(prevState.currentItem).length;

    if ((prevLength === 0 && currentLength > 0)
      || (prevState.currentItem.id !== currentItem.id)) {
      this.getMetadata();
      this.getTotalReviews();
      this.getStyles();
      this.getMetadataCurrentItem();
    }
  }

  getFirstItem = () => {
    axios.get('/api/products')
      .then((res) => {
        this.setState({
          currentItem: res.data[0],
          // currentItem: res.data[0] changed for better dummy review data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  calcAvgRating = (ratingsObj, cb) => {
    let count = 0;
    let sumproduct = 0;

    Object.entries(ratingsObj).forEach((keyValPair) => {
      const key = Number(keyValPair[0]);
      const val = Number(keyValPair[1]);

      count += val;
      sumproduct += (key * val);
    });

    const avgRating = sumproduct / count;
    const roundedRating = Number((Math.round(avgRating * 4) / 4).toFixed(2));

    if (cb) {
      cb(roundedRating);
    } else {
      this.setState({
        rating: roundedRating,
      });
    }
  };

  getMetadata = (id, cb) => {
    const { currentItem } = this.state;
    const itemId = id || currentItem.id;
    axios.get(`/api/reviews/meta/${itemId}`)
      .then((res) => {
        this.calcAvgRating(res.data.ratings, cb);
      })
      .catch((err) => {
        console.log('err getting metadata', err);
      });
  };

  getMetadataCurrentItem = () => {
    const { currentItem } = this.state;
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/reviews/meta/${currentItem.id}`)
        .then((res) => {
          this.setState({
            metaData: res.data,
          });
        })
        .catch((err) => {
          console.log('err getting metadata currentItem', err);
        });
    }
  };

 getTotalReviews = () => {
   const { currentItem } = this.state;
   if (Object.keys(currentItem).length > 0) {
     axios.get(`/api/reviews2/${currentItem.id}/10000/relevant`)
       .then((results) => {
         this.setState({
           reviewsCount: results.data.results.length,
         });
       })
       .catch((err) => {
         console.log('getTotalReviews: ', err);
       });
   }
 };

  handleRelatedClick = (relatedItem) => {
    this.setState({
      currentItem: relatedItem,
    });
  };

  getStyles = (id, cb) => {
    const { currentItem } = this.state;
    const itemId = id || currentItem.id;
    axios.get(`/api/products/${itemId}/styles`)
      .then((res) => {
        const stylesArr = res.data.results;
        if (!cb) {
          this.setState({
            styles: stylesArr,
          });
        }
        this.setDefault(stylesArr, cb);
      })
      .catch((err) => {
        console.log('error in getStyles', err);
      });
  };

  setDefault = (stylesArr, cb) => {
    let defaultStyle;

    for (let i = 0; i < stylesArr.length; i++) {
      if (stylesArr[i]['default?']) {
        defaultStyle = stylesArr[i];
      }
    }

    if (!defaultStyle) { [defaultStyle] = stylesArr; }

    if (cb) {
      cb(defaultStyle);
    } else {
      this.setState({
        defaultStyle,
      });
    }
  };

  addToCart = (item) => {
    this.setState((prevState) => ({
      cart: prevState.cart.concat(item),
    }));
  };

  render() {
    const {
      currentItem,
      defaultStyle,
      rating,
      reviewsCount,
      metaData,
      cart,
    } = this.state;

    return (
      <div>
        <Overview
          currentItem={currentItem}
          rating={rating}
          reviewsCount={reviewsCount}
          cart={cart}
          addToCart={this.addToCart}
        />
        <RelatedItems
          selectedItem={currentItem}
          selectedRating={rating}
          selectedDefault={defaultStyle}
          handleClick={this.handleRelatedClick}
          getRating={this.getMetadata}
          getDefault={this.getStyles}
        />
        <QuestionsAnswers currentItem={currentItem} />
        <RatingsReviews
          currentItem={currentItem}
          rating={rating}
          reviewsCount={reviewsCount}
          metaData={metaData}
        />
      </div>
    );
  }
}

export default App;
