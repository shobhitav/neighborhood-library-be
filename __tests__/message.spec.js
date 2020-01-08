const request = require('supertest');
const server = require('../server.js'); // Routes
const db = require('../database/dbConfig.js'); // DB

const baseURI = '/api/message';
let lender_id, borrower_id;

describe('message routes', () => {

    beforeAll(async () => {
        await db.migrate.latest();
    
        lender_id = await db('users').insert({
            first_name: 'User', 
            last_name: 'One', 
            user_name: 'user_one', 
            user_email: 'user_one@email.com', 
            user_identity: 'db', 
            user_credential: 'password' }).returning('id');

        borrower_id = await db('users').insert({
            first_name: 'User', 
            last_name: 'Two', 
            user_name: 'user_two', 
            user_email: 'user_two@email.com', 
            user_identity: 'db', 
            user_credential: 'password' }).returning('id');        

        await db('lender_collection').insert({
            google_book_id: '9U5I_tskq9MC', 
            lender_id: `${lender_id}`, 
            isbn: '9781593272821', 
            is_available: true});        

        await db('borrower_wishlist').insert({
            google_book_id: '9U5I_tskq9MC', 
            borrower_id: `${borrower_id}`, 
            isbn: '9781593272821', 
            request_to_borrow: true}); 
    });    
    
    afterAll(async () => {
        await db.migrate.rollback();
    });

    // POST
    describe('insert message', () => {
        it('add borrow request message', async () => {
            await request(server)
            .post(`${baseURI}/`)
            .send({
                "sender_id": `${lender_id}`,
                "receiver_id": `${borrower_id}`,
                "google_book_id": "9U5I_tskq9MC",
                "message_type" : "BORROW_REQUEST",
                "content" : "Hello !" 
            })
            .then(res => {
                currMessageID = res.body.id;
                expect(res.status).toBe(201); 
            });
        });
    }); 
})