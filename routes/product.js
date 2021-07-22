const router = require('express').Router();
const { authentication, productsAuthorization } = require('../middlewares/auth');
const { Product, User, ShoppingCart } = require('../models');
const cloudinary = require('cloudinary');
const fs = require('fs');
let image_url = [];

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// app level middleware
router.use(authentication);

router.post('/upload', (req, res, next) => {
  if (req.query.index == 0) {
    image_url = [];
  }
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
    const path = `${__dirname}/../public/${myFile.name}`;
    cloudinary.uploader.upload(path, function (result) {
      image_url.push(result.secure_url);
      if (req.query.lastImage) {
        return res.status(200).send({ name: myFile.name, image_url });
      }
      // fs.rmSync(`${__dirname}/../public/${myFile.name}`);
      // fs.unlinkSync(`./${path}`);
    });
  });
});

router.post('/', (req, res, next) => {
  const { name, price, stock, category, image_url } = req.body;

  Product.create({
    name,
    price,
    stock,
    category,
    image_url1: image_url[0],
    image_url2: image_url[1] || '',
    image_url3: image_url[2] || '',
    image_url4: image_url[3] || '',
    image_url5: image_url[4] || '',
  })
    .then((result) => {
      res.status(201).json({ message: 'created', data: result });
    })
    .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch((err) => next(err));
});

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

// router level middleware

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
