const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const bcrypt = require('bcryptjs');

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
      return queryInterface.bulkInsert('Users', [user, admin]);
    })
    .then(() => {
      done();
    });
});

afterAll((done) => {
  queryInterface.bulkDelete('Users', null, {}).then(() => {
    done();
  });
});

describe('POST /login', () => {
  it('User login success with access_token and id in JSON response', function (done) {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'admin@mail.com', password: '1234' })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token', expect.any(String));
        done();
      });
  });

  it('Should not login and give response error and message if empty input', function (done) {
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
