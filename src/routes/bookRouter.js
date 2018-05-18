// Requiring necessary Modules
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:bookRouter');
const bookRouter = express.Router();


// Defining routing function
function router(nav) {
  // Defining our books data hard coded as an array of books
  const books = [{
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    },
    {
      title: 'Les Misérables',
      genre: 'Historical Fiction',
      author: 'Victor Hugo',
      read: false
    },
    {
      title: 'The Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      read: false
    },
    {
      title: 'A Journey into the Center of the Earth',
      genre: 'Science Fiction',
      author: 'Jules Verne',
      read: false
    },
    {
      title: 'The Dark World',
      genre: 'Fantasy',
      author: 'Henry Kuttner',
      read: false
    },
    {
      title: 'The Wind in the Willows',
      genre: 'Fantasy',
      author: 'Kenneth Grahame',
      read: false
    },
    {
      title: 'Life On The Mississippi',
      genre: 'History',
      author: 'Mark Twain',
      read: false
    },
    {
      title: 'Childhood',
      genre: 'Biography',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    }
  ];

  // Rendring The bookListView file from views dir on /books path
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to the server');

          const db = client.db(dbName);

          const col = await db.collection('books');
          const book = await col.find().toArray();

          res.render('bookListView', {
            title: 'My Library',
            book,
            nav
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  // Rendring The bookView file from views dir on /books/id path with the data of selected book by it's id
  bookRouter.route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params; // Requesting the id parameter from the url path

      const url = "mongodb://localhost:27017";
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to database');

          const db = client.db(dbName);
          const col = await db.collection('books');
          const book = await col.findOne({
            _id: new ObjectId(id)
          });

          res.render(
            'bookView', {
              title: 'My Library',
              book,
              nav
            });
        } catch (err) {
          debug(err.stack);
        }
      }())
    });
  return bookRouter;
};

// Export The route Function to the other modules to require
module.exports = router;