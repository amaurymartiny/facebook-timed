import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

import schema from './graphql';

var app = express();

//
// Set up graphql server
// -----------------------------------------------------------------------------
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  graphiql: true,
  pretty: true
})));

//
// Authentication
// -----------------------------------------------------------------------------
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//
// Connect to database
// -----------------------------------------------------------------------------
mongoose.connect('mongodb://localhost/timed');

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

//
// Routes
// -----------------------------------------------------------------------------
app.get('/callback', passport.authenticate('auth0', { failureRedirect: '/error' }), function(req, res) {
  res.redirect(req.session.returnTo || '/user');
});

//
// Launch server
// -----------------------------------------------------------------------------
var server = app.listen(8080, () => {
  console.log('Listening at port', server.address().port);
});
