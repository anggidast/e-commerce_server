const router = require('express').Router();
const axios = require('axios');
const baseURL =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.rajaongkir.com/starter/';
const { authentication, cartsAuthorization } = require('../middlewares/auth');

// router.use(authentication);

router.get('/province/:id', (req, res, next) => {
  axios({
    method: 'GET',
    url: baseURL + 'province?id=' + req.params.id,
    headers: {
      key: process.env.ONGKIR_KEY,
    },
  })
    .then((result) => {
      // console.log(result.data);
      res.status(200).json(result.data.rajaongkir.results);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get('/city/:id', (req, res, next) => {
  axios({
    method: 'GET',
    url: baseURL + 'city?id=' + req.params.id,
    headers: {
      key: process.env.ONGKIR_KEY,
    },
  })
    .then((result) => {
      res.status(200).json(result.data.rajaongkir.results);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/cities/:province', (req, res, next) => {
  axios({
    method: 'GET',
    url: baseURL + 'city?province=' + req.params.province,
    headers: {
      key: process.env.ONGKIR_KEY,
    },
  })
    .then((result) => {
      res.status(200).json(result.data.rajaongkir.results);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/cost', (req, res, next) => {
  axios({
    method: 'POST',
    url: baseURL + 'cost',
    headers: {
      key: process.env.ONGKIR_KEY,
    },
    data: req.body,
  })
    .then((result) => {
      // console.log(result.data.rajaongkir.results);
      res.status(200).json(result.data.rajaongkir.results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
