const router = require('express').Router();
const atelier = require('../helpers/atelier.js');

router.get('/products', atelier.getProducts);

module.exports = router;
