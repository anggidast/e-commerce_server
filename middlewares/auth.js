const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
const { Product } = require('../models');

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

module.exports = { authentication, productsAuthorization };
