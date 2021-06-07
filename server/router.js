const router = require('express').Router();
const atelier = require('../helpers/atelier.js');

router.get('/products', atelier.getProducts);

router.get('/reviews/meta/:id', atelier.getReviewMetadata);

module.exports = router;
