const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passport = require('passport');

const lenderRouter = require('./lender/lenderCollection-router.js');
const borrowerRouter = require('./borrower/borrowerWishlist-router.js');
const authRouter = require('./services/auth-routes.js');
const usersRouter = require('./users/user-routes.js');

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
server.use('/api/users', usersRouter);
server.use('/api/lender-collection', lenderRouter);
server.use('/api/borrower-wishlist', borrowerRouter);

server.get('/', (req, res) => {
    res.status(200).json("Welcome to the muoVivlio, your peer-to-peer neighboor library.");
  });
  
module.exports = server;