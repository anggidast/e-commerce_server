const router = require('express').Router();
const { authentication, cartsAuthorization } = require('../middlewares/auth');
const { Product, User, ShoppingCart } = require('../models');

router.use(authentication);

router.post('/:id', (req, res, next) => {
  ShoppingCart.create({
    amount: req.body.amount,
    ProductId: req.params.id,
    UserId: req.UserId,
  })
    .then((result) => {
      res.status(201).json({ message: 'created', data: result });
    })
    .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  ShoppingCart.findAll({ attributes: ['id', 'amount', 'UserId', 'createdAt', 'updatedAt'], include: [Product], where: { UserId: req.UserId } })
    .then((result) => {
      console.log(result);
      res.status(200).json({ success: true, data: result });
    })
    .catch((err) => next(err));
});

router.delete('/:id', cartsAuthorization, (req, res, next) => {
  const { cart } = req;
  cart
    .destroy()
    .then(() => {
      res.status(200).json({
        message: 'deleted',
        deletedData: req.cart,
      });
    })
    .catch((err) => next(err));
});

router.put('/:id', cartsAuthorization, (req, res, next) => {
  const { cart } = req;

  Object.keys(req.body).forEach((key) => {
    if (cart[key]) cart[key] = req.body[key];
  });

  cart
    .save()
    .then((updatedProduct) => res.status(200).json({ success: true, data: updatedProduct }))
    .catch((err) => next(err));
});

module.exports = router;
