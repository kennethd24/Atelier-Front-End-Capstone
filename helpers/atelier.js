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
        console.log(response.data);
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  getReviews: (req, res) => {
    const { id, count } = req.params;
    const options = {
      method: 'get',
      // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/?product_id=${id}&count=1000`,
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${id}&count=${count}`,
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
        console.log(response.data);
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

};

module.exports = atelier;
