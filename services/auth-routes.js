const express = require('express');
const passport = require('passport');

const router = express.Router();

// sends user to Google auth sign in
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// gets user info back after log in
router.get('/google/callback', passport.authenticate('google'),
    (req, res) => res.redirect('/dashboard')
);

// logs user out and removes req.user property and session
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// returns current user info
router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;