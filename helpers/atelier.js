const axios = require('axios');
const config = require('../config.js');

let getProducts = (req, res) => {
  let options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products`,
    headers: {
      // 'User-Agent': 'request',
      // 'Authorization': `token ${config.TOKEN}`
      'Authorization': `${config.TOKEN}`
    }
  };

  axios(options)
    .then((response) => {
      // callback(null, res.data);
      console.log(response.data);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      // callback(err);
      console.log(err);
      res.status(400).send(err);
    });
};

module.exports = getProducts;