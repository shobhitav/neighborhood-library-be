const passport = require('passport');

module.exports = (server) => {
    server.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    server.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/login'
    }) /*, (req, res) => {
        res.redirect('/');
        }); this commented out code will redirect to the not yet created landing page route upon auth*/ ) 
};
