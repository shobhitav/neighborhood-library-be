const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  port: process.env.PGPORT
});

passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    //add code here to take the googleId out of profile, and first filter through the database to see if there is a profile
    //if one exists, move on, if not, create one tagged to the googleId, and then move on.  This whole process will handle
    //reg and auth in one step.  It is how people do it.  I did in another application with MongoDb, and can show you if need
    //be as an example of the logic
    pool.query('SELECT * FROM users WHERE googleId = $1', [profile.id], (err, result) => {
        if (err) {
            res.status(500).json(err.message);
        }
        // sets new auth cookie to user account?
        else if (result) {
            res.status(200).json(result.rows);
        } else {
            pool.query('INSERT INTO users '//we need to pull profile.id and everythilng else that shobhita tells us to put in the user schema here from google
            )
        }
    })
}));