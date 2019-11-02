const express = require('express');
const helmet = require('helmet');

// const userRouter = require('./router/userRoutes.js');
const authRouter = require('./routes/authRoutes.js');
// const bookRouter = require('./routes/bookRoutes.js');

const server = express();

// required to run Passport OAuth
require('./services/passport.js');

server.use(helmet());
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/google', authRouter);
// server.use('/api/books', bookRouter);

server.get('/', (req, res) => {
  res.send("Welcome to the muoVivlio, your peer-to-peer neighboor library.");
});

module.exports = server;