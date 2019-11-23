const request = require('supertest');

const server = require('../server.js'); // Routes
const db = require('../database/dbConfig.js'); // DB

const baseURI = '/api/borrower-wishlist';

//TEST ROUTES
describe('Borrower routes', () => {
  let createdRecID = undefined;

  // clear db before tests
  beforeAll(async () => {
    await db('borrower_wishlist').truncate();
  });

  describe('insert()', () => {
    it('should insert borrower wishlist book', async () => {
      await request(server)
        .post(`${baseURI}/`)
        .send({
          borrower_id: 29,
          google_book_id: "12345",
          isbn: 12345678912345,
          request_to_borrow: true
        })
        .then(async (res) => {
          // save id for delete
          createdRecID = res.body[0].id;

          expect(res.status).toBe(201);
          expect(res.type).toBe('application/json');
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
        .del(`${baseURI}/${createdRecID}`)
        .then(async (res) => {
          expect(res.status).toBe(200);
        })
    });
  });

});