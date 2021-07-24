const router = require('express').Router();
const { authentication, cartsAuthorization } = require('../middlewares/auth');
const { Product, User, ShoppingCart } = require('../models');

router.use(authentication);

router.post('/:id', (req, res, next) => {
  ShoppingCart.findOne({
    where: { ProductId: req.params.id, UserId: req.UserId },
    attributes: ['id'],
    include: { model: Product, attributes: ['stock'] },
  })
    .then((cart) => {
      if (cart) {
        if (cart.amount < cart.Product.stock) {
          return ShoppingCart.increment('amount', { by: req.body.amount, where: { id: cart.id } });
        } else {
          throw {
            name: 'BadRequest',
            message: 'Shopping cart amount must be less than or equal to stock product',
          };
        }
      } else {
        return ShoppingCart.create({
          amount: req.body.amount,
          ProductId: req.params.id,
          UserId: req.UserId,
        });
      }
    })
    .then((newCart) => {
      if (newCart[0]) {
        res.status(201).json({ message: 'edited', data: newCart[0][0][0] });
      } else {
        res.status(201).json({ message: 'created', data: newCart });
      }
    })
    .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  ShoppingCart.findAll({
    attributes: ['id', 'amount', 'UserId', 'createdAt', 'updatedAt'],
    include: [Product],
    where: { UserId: req.UserId },
  })
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
      res.status(200).json({
        message: 'deleted',
        deletedData: cart,
      });
    })
    .catch((err) => next(err));
});

router.put('/:id', cartsAuthorization, (req, res, next) => {
  const { cart } = req;
  const stock = cart.Product.stock;

  Object.keys(req.body).forEach((key) => {
    if (cart[key]) cart[key] = req.body[key];
  });

  if (cart.amount <= stock && cart.amount > 0) {
    cart
      .save()
      .then((updatedProduct) => {
        res.status(200).json({ success: true, data: updatedProduct });
      })
      .catch((err) => next(err));
  } else {
    throw {
      name: 'BadRequest',
      message: 'Shopping cart amount must be less than or equal to stock product and can not be zero',
    };
  }
});

module.exports = router;
