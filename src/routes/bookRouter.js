// Requiring necessary Modules
const express = require('express');
const {
  MongoClient,
  ObjectId
} = require('mongodb');
const debug = require('debug')('app:bookRouter');
const bookRouter = express.Router();
const bookController = require('../Controllers/bookController');
const bookServices = require('../services/goodReadsService');


// Defining routing function
function router(nav) {
  const { getIndex, getById } = bookController(bookServices, nav);
  // Protecting the Books If i'm not loged in it redirects to sign in:
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  // Rendring The bookListView file from views dir on /books path
  bookRouter.route('/')
    .get( getIndex )

  // Rendring The bookView file from views dir on /books/id path with the data of selected book by it's id
  bookRouter.route('/:id')
    .get( getById );
  return bookRouter;
};

// Export The route Function to the other modules to require
module.exports = router;