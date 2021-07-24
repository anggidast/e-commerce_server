const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
const { Product, ShoppingCart } = require('../models');

const authentication = (req, res, next) => {
  if (!req.headers.access_token) {
    throw {
      name: 'TokenMissing',
      message: 'Missing access token',
    };
  }

  try {
    const decoded = jwt.verify(req.headers.access_token, privateKey);
    req.role = decoded.role;
    req.UserId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

const productsAuthorization = (req, res, next) => {
  const { id } = req.params;

  Product.findOne({ where: { id } })
    .then((product) => {
      if (!product) {
        throw {
          name: 'NotFound',
          message: 'product not found',
        };
      }
      return Product.findOne({ where: { id } });
    })
    .then((product) => {
      if (req.role == 'admin') {
        if (!product) {
          throw {
            name: 'Unauthorized',
            message: 'user unauthorized',
          };
        }
        req.product = product;
        next();
      } else {
        throw {
          name: 'Unauthorized',
          message: 'user unauthorized',
        };
      }
    })
    .catch((err) => next(err));
};

const cartsAuthorization = (req, res, next) => {
  const { id } = req.params;

  ShoppingCart.findOne({ where: { id } })
    .then((cart) => {
      if (!cart) {
        throw {
          name: 'NotFound',
          message: 'cart not found',
        };
      }
      return ShoppingCart.findOne({
        include: { model: Product, attributes: ['stock'] },
        where: { id, UserId: req.UserId },
      });
    })
    .then((cart) => {
      if (!cart) {
        throw {
          name: 'Unauthorized',
          message: 'user unauthorized',
        };
      }
      req.cart = cart;
      next();
    })
    .catch((err) => next(err));
};

module.exports = { authentication, productsAuthorization, cartsAuthorization };
