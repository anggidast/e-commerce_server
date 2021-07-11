const router = require('express').Router();
const { authentication, cartsAuthorization } = require('../middlewares/auth');
const { Product, User, ShoppingCart } = require('../models');

router.use(authentication);

router.post('/:id', (req, res, next) => {
  let newCart;
  ShoppingCart.create({
    amount: req.body.amount,
    ProductId: req.params.id,
    UserId: req.UserId,
  })
    .then((result) => {
      newCart = result;
      return Product.decrement('stock', { by: result.amount, where: { id: result.ProductId } });
    })
    .then(() => {
      res.status(201).json({ message: 'created', data: newCart });
    })
    .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  ShoppingCart.findAll({ attributes: ['id', 'amount', 'UserId', 'createdAt', 'updatedAt'], include: [Product], where: { UserId: req.UserId } })
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch((err) => next(err));
});

router.delete('/:id', cartsAuthorization, (req, res, next) => {
  const { cart } = req;
  cart
    .destroy()
    .then(() => {
      return Product.increment('stock', { by: cart.amount, where: { id: cart.ProductId } });
    })
    .then(() => {
      res.status(200).json({
        message: 'deleted',
        deletedData: cart,
      });
    })
    .catch((err) => next(err));
});

router.put('/:id', cartsAuthorization, (req, res, next) => {
  const { cart } = req;
  const oldAmount = cart.amount;
  let updatedProduct;

  Object.keys(req.body).forEach((key) => {
    if (cart[key]) cart[key] = req.body[key];
  });

  cart
    .save()
    .then((result) => {
      updatedProduct = result;
      return Product.decrement('stock', { by: result.amount - oldAmount, where: { id: result.ProductId } });
    })
    .then(() => {
      res.status(200).json({ success: true, data: updatedProduct });
    })
    .catch((err) => next(err));
});

module.exports = router;
