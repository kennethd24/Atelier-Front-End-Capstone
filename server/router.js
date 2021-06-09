const router = require('express').Router();
const atelier = require('../helpers/atelier.js');

router.get('/products', atelier.getProducts);





router.get('/qa/questions', atelier.getQuestions);

module.exports = router;
