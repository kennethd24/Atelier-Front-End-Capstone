const axios = require('axios');
const config = require('../config');

const atelier = {
  getProducts: (req, res) => {
    const options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products',
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  getQuestions: (req, res) => {
    const { product_id } = req.params;
    const options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/?product_id=16060&count=100',
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };
    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },

  getReviews: (req, res) => {
    const { id, count, sort } = req.params;
    const options = {
      method: 'get',
      // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/?product_id=${id}&count=1000`,
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${id}&count=${count}&sort=${sort}`,

      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };
    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  getReviewMetadata: (req, res) => {
    const options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta?product_id=${req.params.id}`,
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  getProductStyles: (req, res) => {
    const options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.id}/styles`,
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  getRelatedItems: (req, res) => {
    const { id } = req.params;
    const options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/related`,
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  getOneProduct: (req, res) => {
    const { id } = req.params;
    const options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}`,
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  getAnswersByQuestionId: (req, res) => {
    const { question_id } = req.params;
    const options = {
      method: 'get',
      // eslint-disable-next-line camelcase
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${question_id}/answers`,
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },

  updateHelpfulAnswer: (req, res) => {
    const { answer_id } = req.params;
    const options = {
      method: 'put',
      // eslint-disable-next-line camelcase
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${answer_id}/helpful`,
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },

  reportAnswers: (req, res) => {
    const { answer_id } = req.params;
    const options = {
      method: 'put',
      // eslint-disable-next-line camelcase
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${answer_id}/report`,
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },

  updateHelpfulQuestion: (req, res) => {
    const { question_id } = req.params;
    const options = {
      method: 'put',
      // eslint-disable-next-line camelcase
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${question_id}/helpful`,
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },

  postAnswer: (req, res) => {
    const { question_id } = req.params;
    const { body, name, email, photos } = req.body;
    const options = {
      method: 'post',
      // eslint-disable-next-line camelcase
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${question_id}/answers`,
      data: {
        body,
        name,
        email,
        photos,
      },
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    };

    axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },

};

module.exports = atelier;
