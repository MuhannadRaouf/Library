const passport = require('passport');
// execute the local strategy required:
require('./strategies/local.strategy')();

module.exports = function passportConfig(app){
    // to initialize passport on the app
    app.use(passport.initialize());
    // To build our session
    app.use(passport.session());

    // To Store the user in the session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // To Retrive the user from the session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};