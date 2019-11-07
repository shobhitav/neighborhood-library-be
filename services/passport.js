const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys.js');
const db = require('../database/dbConfig.js');



passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user[0].user_credential);
});

passport.deserializeUser( async (id, done) => {
    
        
        const User = await db('users').where({user_credential: id})
        
        if (User) {
            done(null, User)
        }
    
        

})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
dd
   
    let user = await db('users').where({user_credential: profile.id})
    
    if (user.length > 0) {
        console.log('user:',user);
       return done(null, user);
    }
     
      let newUser = await addNewUser(profile)
      
      done(null, newUser);
      
    
}))

async function addNewUser(p) {
        console.log('asdfasfasf', p.emails[0].value)
       let newUser =  await db('users').insert({user_name: p.emails[0].value, user_email: p.emails[0].value, user_identity: 'google', user_credential: p.id});
        console.log(newUser)      
       return newUser

    }