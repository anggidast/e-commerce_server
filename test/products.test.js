const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { queryInterface } = sequelize;
const { User, Product } = require(`../models`);
let admin_access_token;
let cust_access_token;
let productId;

beforeAll((done) => {
  queryInterface
    .bulkDelete('Users', null, {})
    .then(() => {
      const salt = bcrypt.genSaltSync(10);
      const admin = {
        email: 'admin@mail.com',
        password: bcrypt.hashSync('1234', salt),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const user = {
        email: 'user1@mail.com',
        password: bcrypt.hashSync('password1', salt),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return queryInterface.bulkInsert('Users', [admin, user]);
    })
    .then(() => {
      return User.findOne({
        where: { email: 'admin@mail.com' },
      });
    })
    .then((admin) => {
      const token = jwt.sign(
        {
          id: admin.id,
          role: admin.role,
        },
        'anggidastariana'
      );
      admin_access_token = token;

      return User.findOne({
        where: { email: 'user1@mail.com' },
      });
    })
    .then((user) => {
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        'anggidastariana'
      );
      cust_access_token = token;

      return queryInterface.bulkDelete('Products', null, {});
    })
    .then(() => {
      const product1 = {
        name: 'Sunglasses',
        image_url:
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 500000,
        stock: 15,
        category: 'accessories',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const product2 = {
        name: 'Jacket',
        image_url:
          'https://images.unsplash.com/photo-1624930199388-580d52e8106e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        price: 850000,
        stock: 11,
        category: 'outer',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return queryInterface.bulkInsert('Products', [product1, product2]);
    })
    .then(() => {
      return Product.findOne({
        where: { name: 'Sunglasses' },
      });
    })
    .then((product) => {
      productId = product.id;
      console.log(productId);
      done();
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete('Products', null, {})
    .then(() => {
      return queryInterface.bulkDelete('Users', null, {});
    })
    .then(() => {
      done();
    });
});

describe('GET /products', () => {
  it('Get all products success with JSON response', function (done) {
    request(app)
      .get('/products')
      .set('Content-Type', 'application/json')
      .set('access_token', cust_access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data', expect.any(Object));
        done();
      });
  });

  it('Should be fail to get all products, because access token is not attached', function (done) {
    request(app)
      .get('/products')
      .set('Content-Type', 'application/json')
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      });
  });
});

describe('POST /products', () => {
  it('Add new product success with JSON response', function (done) {
    request(app)
      .post('/products')
      .set('Content-Type', 'application/json')
      .set('access_token', cust_access_token)
      .send({ name: 'Jacket', image_url: 'https://images.unsplash.com/', price: 850000, stock: 11, category: 'accessories' })
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data', expect.any(Object));
        done();
      });
  });

  it('Should be fail to add product, because access token is not attached', function (done) {
    request(app)
      .get('/products')
      .set('Content-Type', 'application/json')
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      });
  });
});

describe('GET /products/:id', () => {
  it('Get product by id success with JSON response', function (done) {
    request(app)
      .get(`/products/${productId}`)
      .set('Content-Type', 'application/json')
      .set('access_token', cust_access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data', expect.any(Object));
        done();
      });
  });

  it('Should be fail to get product (404/not found), because product with id 200 is not exist', function (done) {
    request(app)
      .get('/products/200')
      .set('Content-Type', 'application/json')
      .set('access_token', cust_access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      });
  });
});

describe('PUT /products/:id', () => {
  it('Edit product by id success with JSON response', function (done) {
    request(app)
      .put(`/products/${productId}`)
      .set('Content-Type', 'application/json')
      .set('access_token', admin_access_token)
      .send({ name: 'Jacket', image_url: 'https://images.unsplash.com/', price: 850000, stock: 15, category: 'accessories' })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data', expect.any(Object));
        done();
      });
  });

  it('Should be fail to edit product (404/not found), because product with id 200 is not exist', function (done) {
    request(app)
      .put('/products/200')
      .set('Content-Type', 'application/json')
      .set('access_token', admin_access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      });
  });
});

describe('DELETE /products/:id', () => {
  it.only('Delete product by id success with JSON response', function (done) {
    request(app)
      .delete(`/products/${productId}`)
      .set('Content-Type', 'application/json')
      .set('access_token', admin_access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      });
  });

  it('Should be fail to delete product (404/not found), because product with id 200 is not exist', function (done) {
    request(app)
      .delete('/products/200')
      .set('Content-Type', 'application/json')
      .set('access_token', admin_access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      });
  });
});
