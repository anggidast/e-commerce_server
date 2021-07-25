const router = require(`express`).Router();
const Product = require('./product');
const Cart = require('./cart');
const { User } = require(`../models`);
const { compareHash } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;

router.get('/', (req, res) => res.send('OK'));

router.use('/products', Product);
router.use('/carts', Cart);

router.post('/register', (req, res, next) => {
  User.findOne({ where: { email: req.body.email.toLowerCase() } })
    .then((user) => {
      if (user) {
        throw {
          name: 'SequelizeUniqueConstraintError',
          message: `Email ${user.email} is already registered`,
        };
      } else return User.create(req.body);
    })
    .then((user) => res.status(201).json({ success: true, user: { id: user.id, email: user.email, role: user.role } }))
    .catch((err) => next(err));
});

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email.toLowerCase(),
    },
  })
    .then((user) => {
      if (user) {
        if (compareHash(req.body.password, user.password)) {
          const access_token = jwt.sign({ id: user.id, role: user.role }, privateKey);
          res.status(200).json({ success: true, id: user.id, role: user.role, access_token });
        } else {
          throw {
            name: 'LoginError',
            message: 'Wrong password',
          };
        }
      } else {
        throw {
          name: 'LoginError',
          message: 'Email is not registered',
        };
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
