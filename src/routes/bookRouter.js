// Requiring necessary Modules
const express = require('express');
const bookRouter = express.Router();
// Defining routing function
function route(nav){
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
    res.render('bookListView', {
      title: 'My Library',
      books: books,
      nav
    });
  });

// Rendring The bookView file from views dir on /books/id path with the data of selected book by it's id
bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;  // Requesting the id parameter from the url path
    res.render(
        'bookView', {
        title: 'My Library',
        books: books[id],
        nav
      });
    });
    return bookRouter;

}
// Export The route Function to the other modules to require
module.exports = route;
