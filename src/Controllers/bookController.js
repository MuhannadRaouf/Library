const {
  MongoClient,
  ObjectId
} = require('mongodb');
const debug = require('debug')('app:bookRouter');

module.exports = function bookController(bookServices, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to database from book Router');

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
      // Closing Database Connection:
      client.close();
    }());
  };

  function getById(req, res) {
    const {
      id
    } = req.params; // Requesting the id parameter from the url path

    const url = "mongodb://localhost:27017";
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to database from book Router ID');

        const db = client.db(dbName);
        const col = await db.collection('books');
        const book = await col.findOne({
          _id: new ObjectId(id)
        });
        book.details = await bookServices.getBookById(book.bookId);

        res.render(
          'bookView', {
            title: 'My Library',
            book,
            nav
          });
      } catch (err) {
        debug(err.stack);
      }
      // Closing Database Connection:
      client.close();
    }());
  }
  return {
    getIndex,
    getById
  };
}