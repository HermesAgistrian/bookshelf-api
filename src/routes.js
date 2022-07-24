const { storeBook, getBooks, getBookById } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: storeBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
];

module.exports = routes;
