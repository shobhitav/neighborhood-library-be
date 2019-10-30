const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys.js');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    //add code here to take the googleId out of profile, and first filter through the database to see if there is a profile
    //if one exists, move on, if not, create one tagged to the googleId, and then move on.  This whole process will handle
    //reg and auth in one step.  It is how people do it.  I did in another application with MongoDb, and can show you if need
    //be as an example of the logic
}))