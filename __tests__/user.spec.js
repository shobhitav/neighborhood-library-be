const request = require('supertest');

const server = require('../server.js'); // Routes
const db = require('../database/dbConfig.js'); // DB

const userURI = '/api/user';
const authURI = '/auth';

// describe('user routes', () => {
  // let currUserID = 0;

  // clear db before tests
  // beforeAll(async () => {
  //   await db('users').truncate();
  // });

  // REGISTER
  // describe('insert lender book', () => {
  //   it('add book to DB', async () => {
  //     await request(server)
  //       .post(`${baseURI}/`)
  //       .send({
  //         google_book_id: 1591984,
  //         lender_id: 1,
  //         isbn: 6265581337
  //       })
  //       .then(res => {
  //         currBookID = res.body[0].id;

  //         expect(res.status).toBe(201);
  //         expect(res.body).toHaveLength(1);
  //       });
  //   });
  // });

  // POST
  // describe('insert lender book', () => {
  //   it('add book to DB', async () => {
  //     await request(server)
  //       .post(`${baseURI}/`)
  //       .send({
  //         google_book_id: 1591984,
  //         lender_id: 1,
  //         isbn: 6265581337
  //       })
  //       .then(res => {
  //         currBookID = res.body[0].id;

  //         expect(res.status).toBe(201);
  //         expect(res.body).toHaveLength(1);
  //       });
  //   });
  // });
// });