const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { queryInterface } = sequelize;
const { User, Product } = require(`../models`);
let admin_access_token;
let cust_access_token;

beforeAll((done) => {
  queryInterface
    .bulkDelete('Users', null, {})
    .then(() => {
      // masukin user ke db untuk test get
      const salt = bcrypt.genSaltSync(10);
      const admin = {
        email: 'admin@mail.com',
        password: bcrypt.hashSync('admin1', salt),
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
          email: admin.email,
          role: admin.role,
        },
        'secretkey'
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
          email: user.email,
          role: user.role,
        },
        'secretkey'
      );
      cust_access_token = token;

      return queryInterface.bulkDelete('Products', null, {});
    });
});

afterAll((done) => {
  // bersihin db
  queryInterface.bulkDelete('Users', null, {}).then(() => {
    done();
  });
});

describe('POST /products', () => {
  it('User login success with access_token and id in JSON response', function (done) {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'admin@mail.com', password: 'admin1' })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token', expect.any(String));
        done();
      });
  });

  it('Should not create user and give response error if empty input', function (done) {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ email: '', password: '' })
      .then((response) => {
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      });
  });
});
