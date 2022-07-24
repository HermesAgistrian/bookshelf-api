const { nanoid } = require('nanoid');
const books = require('./book');
const ValidationError = require('./validationError');
const validateStore = require('./validators');

const storeBook = (request, h) => {
  let response;

  try {
    validateStore(request.payload);

    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const createdAt = new Date().toISOString;
    const updatedAt = createdAt;

    const newBook = {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      id,
      createdAt,
      updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });

      response.code(201);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(400);
    }
  }

  return response;
};

module.exports = {
  storeBook,
};
