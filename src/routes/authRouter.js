const express = require('express');
const {
    MongoClient
} = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:authRouter');

const authRouter = express.Router();

module.exports = function router(nav) {
    authRouter.route('/signUp')
        .all((req, res, next) => {
            if (req.user) {
                res.redirect('/auth/profile');
            } else {
                next();
            }
        })
        .post((req, res) => {
            // Pulling the username and password from the body:
            const {
                username,
                password
            } = req.body;
            // Database Configuration:
            url = 'mongodb://localhost:27017';
            dbName = 'libraryApp';

            (async function addUser() {
                let client;
                try {
                    // Database Connection:
                    client = await MongoClient.connect(url);
                    debug("Connected correctly to database from signUp")
                    const db = await client.db(dbName);
                    // Creating the collection if it's not exist or connecting to the collection:
                    const col = await db.collection('users');
                    // Create a user
                    const user = {
                        username,
                        password
                    };
                    // Insert the user in the DB
                    const result = await col.insertOne(user);
                    req.login(result.ops, () => {
                        // redirect to the profile page:
                        res.redirect('/auth/profile');
                    });
                } catch (err) {
                    debug(err.stack);
                }
                // Closing Database Connection:
                client.close();
            }());
        });



    authRouter.route('/signIn')
        .all((req, res, next) => {
            if (req.user) {
                res.redirect('/auth/profile');
            } else {
                next();
            }
        })
        .get((req, res) => {
            res.render('signIn', {
                nav,
                title: 'Sign In'
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));
    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.render('profile', {
                nav,
                title: 'Profile'
            });
        });
    authRouter.get('/logOut', (req, res) => {
        req.logout();
        res.redirect('/');
    })
    return authRouter;
};