const { storeBook, getBooks } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: storeBook,
  },
];

module.exports = routes;
