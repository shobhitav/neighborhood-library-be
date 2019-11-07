const passport = require('passport');

module.exports = (server) => {
    server.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    
        server.get('/auth/google/callback', passport.authenticate('google'));

        server.get('/api/logout', (req, res) => {
            req.logout();
            res.send('<h1>You are logged out</h1>');
        })
        
        server.get('/api/current_user', (req, res) => {
            res.send(req.user);
        }) 
};
