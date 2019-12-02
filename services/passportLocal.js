const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy();
const db = require('../database/dbConfig.js');
 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
      
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    db('users').where({username: username}, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

  


 