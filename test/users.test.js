const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

describe('POST /login', () => {
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
