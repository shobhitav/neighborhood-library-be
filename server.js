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
const transactionRouter=require('./transaction/transaction-router.js')

//middleware to all routers to ensure they are protected. DO NOT USE ON AUTHROUTER.  Was added to borrowerRouter, and lenderRouter.
function protectedRoute(req, res, next) {
  if (process.env.ENV === 'test') {
    next();
  } else if (req.isAuthenticated()) {
    return next(null);
  } else {
    res.redirect('/login');
  }
}

// Multi-Origin for CORS
const whitelist = ['https://neighborhood-library-labspt5.netlify.com', 'http://localhost:3000']
const corsOptions = (req, callback) => {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: req.header('Origin'), credentials: true }
  } else {
    corsOptions = { origin: false, credentials: true } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

server.use(helmet());
server.use(cors(corsOptions));
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
  console.log(`${req.method}`);
  next();
});

server.use('/auth', authRouter);

server.use('/api/lender-collection', protectedRoute,  lenderRouter);
server.use('/api/borrower-wishlist', protectedRoute, borrowerRouter);
server.use('/api/users', protectedRoute, usersRouter);
server.use('/api/transaction', protectedRoute, transactionRouter);


server.get('/', (req, res) => {
    res.status(200).json("Welcome to the muoVivlio, your peer-to-peer neighboor library.");
  });
  
module.exports = server;