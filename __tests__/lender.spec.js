const request = require('supertest');

const server = require('../server.js'); // Routes
const db = require('../database/dbConfig.js'); // DB

const baseURI = '/api/lender-collection';

describe('lender routes', () => {

  // clear db before tests
  beforeAll(async () => {
    await db('lender_collection').truncate();
  });

  // POST
  describe('insert lender book', () => {
    it('add book to DB', async () => {
      await request(server)
        .post(`${baseURI}/`)
        .send({
          google_book_id: 1591984,
          lender_id: 29,
          isbn: 626558,
          is_available: true
        })
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body).toHaveLength(1);
        });
    });

    it('deny adding book', async () => {
      await request(server)
        .post(`${baseURI}/`)
        .send({
          google_book_id: 1591984
        })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });

  // GET
  describe('return lender book', () => {
    it('', async () => {
      await request(server);
    });
  });

  // PUT
  describe('update lender book status', () => {
    it('', async () => {
      await request(server);
    });
  });

  // DELETE
  describe('delete lender book', () => {
    it('', async () => {
      await request(server);
    });
  });
})