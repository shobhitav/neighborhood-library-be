const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig');

const router = express.Router();
//Oauth Routes//////////////////////////////////////////////
// sends user to Google auth sign in
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// gets user info back after log in
router.get('/google/callback', passport.authenticate('google'),
    
    (req, res) => {
        console.log(req.headers.cookie) 
        res.redirect('/dashboard')
    }
);

// logs user out and removes req.user property and session
router.get('/logout', (req, res) => {
    req.logout();
    console.log(req.headers.cookie)
    res.redirect('/');
})

// returns current user info
router.get('/current_user', (req, res) => {
    
    res.send(req.user);
});

/////Regular Username Password (non oauth)Routes///////////////////////////////////////////////////////////

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    userDb.create(user)///change to db knex postgres syntax
    .then(u => {
        res.status(201).json(user);
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})
///////////

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  userDb.findBy({username})//change to knex postgres syntax
  .first()
  .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({message: 'hi user', token}); 
      } else {
          res.status(401).json({message: "unauthorized user"});
      }
  })
  .catch(err => {
      console.log(err)
      res.status(500).json(err);
  })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const secret = process.env.JWTSECRET;
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secret, options);
}


module.exports = router;