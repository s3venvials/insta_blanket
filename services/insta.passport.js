let passport = require('passport');
let InstagramStrategy = require('passport-instagram').Strategy;
let mongoose = require("mongoose");
let keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new InstagramStrategy({
    clientID: keys.instagramClientID,
    clientSecret: keys.instagramClientSecret,
    callbackURL: "http://localhost:3000/auth/instagram/callback",
    proxy: true
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
            return done(null, existingUser);
        }

        const user = await new User({ instaId: profile.id, username: profile.displayName }).save();
        done(null, user);

    }
));