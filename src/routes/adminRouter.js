const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    genre: 'Fantasy',
    author: 'J.K. Rowling',
    bookId: 3,
    read: false
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    genre: 'Fantasy',
    author: 'J.K. Rowling',
    bookId: 15881,
    read: false
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    genre: 'Fantasy',
    author: 'J.K. Rowling',
    bookId: 5,
    read: false
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    genre: 'Fantasy',
    author: 'J.K. Rowling',
    bookId: 6,
    read: false
  },
  {
    title: "Harry Potter and the Order of the Phoenix",
    genre: 'Fantasy',
    author: 'J.K. Rowling',
    bookId: 2,
    read: false
  },
  {
    title: "Harry Potter and Half-Blood Prince",
    genre: 'Fantasy',
    author: 'J.K. Rowling',
    bookId: 1,
    read: false
  },
  {
    title: "Harry Potter and the Deathly Hallows",
    genre: 'Fantasy',
    author: 'J.K. Rowling',
    bookId: 136251,
    read: false
  },
  {
    title: "Harry Potter and the Cursed Child",
    genre: 'Fantasy',
    author: 'J.K. Rowling',
    bookId: 29056083,
    read: false
  }];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
