const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}) /*, (req, res) => {
        res.redirect('/');
        }); this commented out code will redirect to the not yet created landing page route upon auth*/ ) 

module.exports = router;