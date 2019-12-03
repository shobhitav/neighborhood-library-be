const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const cookieSession = require('cookie-session');
const passport = require('passport');

const lenderRouter= require('./lender/lenderCollection-router.js');
const borrowerRouter= require('./borrower/borrowerWishlist-router.js');
const authRouter = require('./routes/authRoutes.js');

//middleware to all routers to ensure they are protected. DO NOT USE ON AUTHROUTER.  Was added to borrowerRouter, and lenderRouter.
function protectedRoute(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.redirect('/login')
}

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
// server.use('/api/users', usersRouter);
server.use('/api/lender-collection', protectedRoute,  lenderRouter);
server.use('/api/borrower-wishlist', protectedRoute, borrowerRouter);

server.get('/', (req, res) => {
    res.status(200).json("Welcome to the muoVivlio, your peer-to-peer neighboor library.");
  });
  
module.exports = server;