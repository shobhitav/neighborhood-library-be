const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passport = require('passport');
const flash = require('connect-flash');

const lenderRouter= require('./lender/lenderCollection-router.js');
const borrowerRouter= require('./borrower/borrowerWishlist-router.js');
const authRouter = require('./services/auth-routes.js');
const usersRouter = require('./users/user-routes.js');
const transactionRouter=require('./transaction/transaction-router.js');
const messageRouter=require('./message/message-router.js')

//middleware to all routers to ensure they are protected. DO NOT USE ON AUTHROUTER.  Was added to borrowerRouter, and lenderRouter.
function protectedRoute(req, res, next) {
  if (req.isAuthenticated()) {
    return next(null);
  } else {
    //res.redirect('/login'); 
    return next(null);
  }
}

server.use(helmet());
server.use(cors({ origin: process.env.REQ_URL, credentials: true }));
server.use(express.json());
server.use(flash());
server.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.cookieKey]
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use(function(req, res, next){
  console.log(`${req.method} from ${req.headers['referer']}`);
  next();
});

server.use('/auth', authRouter);

server.use('/api/lender-collection', protectedRoute,  lenderRouter);
server.use('/api/borrower-wishlist', protectedRoute, borrowerRouter);
server.use('/api/users', protectedRoute, usersRouter);
server.use('/api/transaction', protectedRoute, transactionRouter);
server.use('/api/message', protectedRoute, messageRouter);

server.get('/', (req, res) => {
    res.status(200).json("Welcome to the muoVivlio, your peer-to-peer neighboor library.");
  });
  
module.exports = server;