const { storeBook } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: storeBook,
  },
];

module.exports = routes;
