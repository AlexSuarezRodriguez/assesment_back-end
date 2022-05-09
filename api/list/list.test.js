const supertest = require('supertest');
const mongoose = require('mongoose');

const { createUser, getUserByEmail } = require('../user/user.service');
const { signToken } = require('../../auth/auth.service');

const app = require('../../app');
const connectDB = require('../../config/database');
const users = require('../user/user.model');

const request = supertest(app);

let user = '';
let token = '';

describe('Favs Endpoint', () => {
  beforeAll(async () => {
    await connectDB();
    user = await createUser({
      fullName: 'prueba alexander',
      email: 'pruebafavs@test.com',
      password: 'Alex7573,',
    });
    token = signToken(user.profile);
  });
  afterAll(async () => {
    await users.deleteMany();
    await mongoose.connection.close();
  });

  describe('get all favs', () => {
    test('should response with a 200 status code', async () => {
      const res = await request.get('/api/favs/').set('authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
    });
    test('Should get an array of tasks', async () => {
      const res = await request.get('/api/favs/').set('authorization', `Bearer ${token}`);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('Create list of favs', () => {
    test('Shoul respond with a 201 status code', async () => {
      const { _id } = await getUserByEmail('pruebauser@test.com');
      const newFavs = await request.post('/api/favs').set('authorization', `Bearer ${token}`).send({
        name: 'Prueba crear nueva lista',
        item: [
          {
            title:'item de prueba',
            description:'descripcion de prueba',
            link:'www.google.com'
          }
        ],
        userId: _id,
      });
      expect(newFavs.statusCode).toEqual(201);
    });
  });

  // describe('GET /api/favs/:id', () => {
  //   test('should respond with a 200 status code if search for id GET/:id', async () => {
  //     const res = await request.get('/api/favs').set('authorization', `Bearer ${token}`);
  //     const listId = res.body[0]._id;
  //     const respond = await request.get(`/api/users/${listId}`);

  //     expect(respond.statusCode).toEqual(200);
  //   });

  //   test('should respond with an array of favs and with date specifics GET/:id', async () => {
  //     const res = await request.get('/api/users');
  //     const searchID = res.body[0]._id;
  //     const respond = await request.get(`/api/users/${searchID}`);

  //     expect(respond.body).toEqual(
  //       expect.objectContaining({
  //         email: expect.any(String),
  //         fullName: expect.any(String),
  //         password: expect.any(String),
  //       }),
  //     );
  //   });
  // });

  describe('PATCH task', () => {
    test('should respond with a 200 status code PATCH', async () => {
      const newFav = {
        title: 'new favorit',
        description:'un nuevo favorito',
        link:'https://google.com',
      };
      const res = await request.get('/api/favs').set('authorization', `Bearer ${token}`);
      const listId = res.body[0]._id;
      const response = await request.patch(`/api/favs/${listId}`).set('authorization', `Bearer ${token}`).send(newFav);
      expect(response.statusCode).toEqual(201);
    });
  });

  describe('DELETE task', () => {
    test('Should respond with a 200 status code DELETE', async () => {
      const res = await request.get('/api/favs').set('authorization', `Bearer ${token}`);
      const listId = res.body[0]._id;
      const response = await request.delete(`/api/favs/${listId}`).set('authorization', `Bearer ${token}`);
      expect(response.statusCode).toEqual(200);
    });
  });

});