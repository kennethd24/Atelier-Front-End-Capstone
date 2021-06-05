const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router.js');

const atelier = require('../helpers/atelier.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// app.get('/product', atelier);

app.use('/api', router);

app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});

app.use(express.static(path.join(__dirname, '..', 'client/dist')));
