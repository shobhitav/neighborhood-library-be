const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const cookieSession = require('cookie-session');
const passport = require('passport');

const lenderRouter= require('./lender/lenderCollection-router.js');
const borrowerRouter= require('./borrower/borrowerWishlist-router.js');
const authRouter = require('./routes/authRoutes.js');
const transactionRouter=require('./transaction/transaction-router.js')

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.cookieKey],
  })
);
server.use(passport.initialize());
server.use(passport.session());

server.use('/auth', authRouter);
server.use('/api/lender-collection', lenderRouter);
server.use('/api/borrower-wishlist', borrowerRouter);
server.use('/api/transaction',transactionRouter);

server.get('/', (req, res) => {
    res.status(200).json("Welcome to the muoVivlio, your peer-to-peer neighboor library.");
  });
  
module.exports = server;