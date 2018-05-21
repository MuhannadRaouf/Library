const passport = require('passport');
// require Strategy class from passport-local module
const {
    Strategy
} = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');


module.exports = function localStrategy() {
    // Adding username and password Strategy:
    passport.use(new Strategy ({
            // Pulling the username and password from the html body
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            // Database Configuration:
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo(){
                let client;
                try{
                    // Opens Database Connection:
                    client = await MongoClient.connect(url);
                    debug('Connected correctly from local Strategy');
                    const db = client.db(dbName);
                    // Creating the collection if it's not exist or connecting to the collection:
                    const col = db.collection('users');
                    // Find the username from the body in the database:
                    const user = await col.findOne({ username });
                    // check if the password matches or not:
                    if( user.password === password){
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                } catch(err){
                    debug(err.stack);
                }
                // Closing Database Connection:
                client.close();
            }());
        }));
    };