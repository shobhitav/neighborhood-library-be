const request = require('supertest');

const server = require('../server.js'); // Routes
const db = require('../database/dbConfig.js'); // DB

const baseURI = '/api/borrower-wishlist';

//TEST ROUTES
describe('Borrower routes', () => {
  let createdRecID;

  // clear db before tests
  beforeEach(async () => {
    await db('borrower_wishlist').truncate();
  });

  describe('insert()', () => {
    it('should insert borrower wishlist book', async (done) => {
      await request(server)
        .post(`${baseURI}/`)
        .send({
          "borrower_id": 1,
          "google_book_id": 12345,
          "isbn": 12345678912345,
          "request_to_borrow": true
        })
        .then(res => {
          createRecID = res.body.id;

          expect(res.type).toBe('application/json');
          expect(res.status).toBe(201);

          done();
        })
    });
  });

  // describe('get book record', () => {
  //   it('return book record', async () => {
  //     const borrowerID = 1;

  //     const res = await request(server).get(`${baseURI}/:${borrowerID}`);

  //     expect(res).toHaveLength(1);

  //   });

    // it('return error', async () => {
    //   const borrowerID = 1337;

    //   const res = await request(server).get(`${baseURI}/:${borrowerID}`);

    //   expect(res).toBe(null);
    // })
  // });

  describe('delete()', () => {
    it('should delete borrower book record', async () => {
      await request(server)
        .delete(`${baseURI}/`)
        .send({id: createdRecID})
        .then(res => {
          console.log(res.error)
          
          expect(res.status).toBe(200);

          done();
        })
    });
  });
});