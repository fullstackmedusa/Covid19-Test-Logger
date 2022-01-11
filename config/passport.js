const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require("../models/user");
const Profile = require("../models/profile");

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {   // <-- profile here is a googleid
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    console.log(profile, "<-- profile");

    // check the database for user with existing account
    User.findOne({ googleId: profile.id }, function (err, userDoc) {
      if(err) return cb(err);

      // if they exist, return their user doc
      if (userDoc) {
        return cb(null, userDoc); // <-- first param must be null in this callback function

        // if the user does not exist, create a new user and pull below info from their google profile
      } else {
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
        // remember to save!!
        newUser.save(function (err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
        // creating profile for user
        const newProfile = new Profile({
          name: newUser.name,
          user_id: newUser._id,
          })
          newProfile.save(function (err) {
            if (err) console.log('error', err);
        })
      }
    });
  }
)
);

// vvv this is to store the user id in the cookie
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user
  User.findById(id, function (err, userDoc) {
    done(err, userDoc);
  });
});



