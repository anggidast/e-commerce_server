const router = require('express').Router();
const { authentication, productsAuthorization } = require('../middlewares/auth');
const { Product, User } = require('../models');
const path = require('path');
// const multer = require('multer');
const cloudinary = require('cloudinary');

// const storage = multer.diskStorage({
//   destination: './public/images/',
//   filename: function(req, file, cb) {
//     const postId = req.app.locals.postId;
//     cb(null, file.fieldname + '-' + postId + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage
// }).single('image');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

let filePath;

router.post('/upload', (req, res, next) => {
  if (!req.files) {
    return res.status(500).send({ msg: 'file is not found' });
  }
  // accessing the file
  const myFile = req.files.file;

  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/../public/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      next(err);
      return res.status(500).send({ msg: 'Error occured' });
    }
    // returing the response with file path and name
    filePath = `public/${myFile.name}`;
    // console.log(filePath);
    return res.send({ name: myFile.name, path: `/${myFile.name}` });
  });
});

// app level middleware
router.use(authentication);

router.post('/', (req, res, next) => {
  const { name, price, stock, category, image_url } = req.body;
  // const filePath = req.app.locals.path;
  console.log(filePath);
  // delete req.app.locals.path;
  let id;
  cloudinary.uploader.upload(
    filePath,
    function (result) {
      console.log(result);

      Product.create({
        name,
        price,
        stock,
        category,
        image_url,
        // image_url: `${result.secure_url}`,
      })
        .then((result) => {
          id = result.data.id;
          res.status(201).json({ message: 'created', data: result });
        })
        .catch((err) => next(err));
    },
    { public_id: id }
  );

  // Product.create(req.body)
  //   .then((result) => res.status(201).json({ message: 'created', data: result }))
  //   .catch((err) => next(err));
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
