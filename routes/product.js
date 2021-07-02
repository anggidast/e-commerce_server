const router = require('express').Router();
const { authentication, productsAuthorization } = require('../middlewares/auth');
const { Product, User } = require('../models');

// app level middleware
router.use(authentication);

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then((result) => res.status(201).json({ message: 'created', data: result }))
    .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch((err) => next(err));
});

// router level middleware
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Product.findOne({ where: { id } })
    .then((product) => {
      if (!product) {
        throw {
          name: 'NotFound',
          message: 'product not found',
        };
      }
      res.status(200).json({ success: true, data: product });
    })
    .catch((err) => next(err));
});

router.put('/:id', productsAuthorization, (req, res, next) => {
  const { product } = req;

  // instance method sequelize, because we already get the task
  Object.keys(req.body).forEach((key) => {
    if (product[key]) product[key] = req.body[key];
  });

  product
    .save()
    .then((updatedProduct) => res.status(200).json({ success: true, data: updatedProduct }))
    .catch((err) => next(err));
});

router.delete('/:id', productsAuthorization, (req, res, next) => {
  const { product } = req;
  console.log(product);
  product
    .destroy()
    .then(() => {
      res.status(200).json({
        message: 'deleted',
        deletedData: req.product,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
