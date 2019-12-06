const request = require('supertest');

const server = require('../server.js'); // Routes
const db = require('../database/dbConfig.js'); // DB

const userURI = '/api/users';
const authURI = '/auth';

describe('user routes', () => {
  let currUserID = 0;

  // REGISTER
  // describe('insert user', () => {
  //   it('add user', async () => {
  //     // await request(server)
  //     //   .post(`${userURI}/`)
  //     //   .then(() => )

  //    await db('users').insert({
  //       user_name: 'brownie3',
  //       user_email: 'cookie@brownie.com3',
  //       user_identity: 'muoVivlio',
  //       user_credential: 'heyThere'
  //     });

  //     await request(server) {
  //       .get(`${}/`)
  //     }
  //     .then(res => {
  //       currUserID = res.body[0].id;
  
  //       expect(userInfo).toHaveLength(1);
  //     });
        
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

  // DELETE
  // describe('delete user', () => {
  //   it('delete user', async () => {
  //     await request(server)
  //       .delete(`${userURI}/${currUserID}`)
  //       .then(res => {
  //         console.log(res.body);
  //         expect(res.body.message).toBe('User deleted');
  //       })

  //   });
  // });
});