const router = require(`express`).Router();
// const Product = require('./product');
const { User } = require(`../models`);
const { compareHash } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
// const { OAuth2Client } = require('google-auth-library');
const privateKey = process.env.PRIVATE_KEY;
const CLIENT_ID = process.env.CLIENT_ID;

router.get('/', (req, res) => res.send('OK'));

// router.use('/products', Product);

// router.post('/register', (req, res, next) => {
//   User.create(req.body)
//     .then((user) => res.status(201).json({ success: true, user: { id: user.id, email: user.email } }))
//     .catch((err) => next(err));
// });

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
          res.status(200).json({ success: true, id: user.id, access_token });
        } else {
          throw {
            name: 'LoginError',
            message: 'wrong password',
          };
        }
      } else {
        throw {
          name: 'LoginError',
          message: 'email is not registered',
        };
      }
    })
    .catch((err) => next(err));
});

// router.post('/google-login', (req, res, next) => {
//   const client = new OAuth2Client(CLIENT_ID);
//   const token = req.body.token;
//   async function verify() {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     });
//     const payload = ticket.getPayload();
//     const userid = payload['sub'];
//     // If request specified a G Suite domain:
//     // const domain = payload['hd'];
//     User.findOne({ where: { email: payload.email } })
//       .then((user) => {
//         if (!user) {
//           return User.create({
//             email: payload.email,
//             password: Math.random().toString().substring(10),
//           });
//         } else {
//           return user;
//         }
//       })
//       .then((user) => {
//         const access_token = jwt.sign({ id: user.id }, privateKey);
//         res.status(201).json({ success: true, access_token });
//       })
//       .catch((err) => next(err));
//   }
//   verify().catch(console.error);
// });

module.exports = router;
