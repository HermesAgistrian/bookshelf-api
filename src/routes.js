const {
  storeBook, getBooks, getBookById, updateBook,
} = require('./handler');

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
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
];

module.exports = routes;
