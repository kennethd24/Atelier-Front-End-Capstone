const router = require('express').Router();
const atelier = require('../helpers/atelier.js');

router.get('/products', atelier.getProducts);

router.get('/products/:id/styles', atelier.getProductStyles);

router.get('/reviews/:id', atelier.getReviews);

router.get('/reviews/meta/:id', atelier.getReviewMetadata);

module.exports = router;
