const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/users');

passport.use(new googleStrategy({
    clientID:"892104638546-ltfkugpfgtp55vvi1jidlnr9be4k1fb7.apps.googleusercontent.com",//Here Enter your client ID
    clientSecret:"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",//Here Enter your Client Secret
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},

    function(access,refresh,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google Strategy : ',err);
                return;
            }
            console.log(profile);
            if(user){
                return done(null,user)
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString("hex")
                },function(err,user){
                    if(err){
                        console.log('Error in google Strategy : ',err);
                        return;
                    }

                    return done(null,user);
                })
            }
        })
    }

));

module.exports=passport;
