const { nanoid } = require('nanoid');
const books = require('./book');
const ValidationError = require('./validationError');
const { validateStore, validateUpdate, validateDelete } = require('./validators');

const storeBook = (request, h) => {
  let response;

  try {
    validateStore(request);

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
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

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
      insertedAt,
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

      response.code(error.code);
    }
  }

  return response;
};

const getBooks = () => {
  const filteredBook = [];

  books.forEach((book) => {
    const validBook = {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };

    filteredBook.push(validBook);
  });

  return {
    status: 'success',
    data: {
      books: filteredBook,
    },
  };
};

const getBookById = (request, h) => {
  let response;
  const { bookId } = request.params;
  const book = books.find((findingBook) => findingBook.id === bookId);

  if (book) {
    response = h.response({
      status: 'success',
      data: {
        book,
      },
    });

    response.code(200);
  } else {
    response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
      data: {
        book,
      },
    });

    response.code(404);
  }

  return response;
};

const updateBook = (request, h) => {
  const { bookId } = request.params;
  const updatedAt = new Date().toISOString();
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

  let response;

  try {
    validateUpdate(request);

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };
    }

    response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
  } catch (error) {
    if (error instanceof ValidationError) {
      response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(error.code);
    }
  }

  return response;
};

const deleteBook = (request, h) => {
  let response;
  const { bookId } = request.params;

  try {
    validateDelete(request);

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      books.splice(index, 1);
    }

    response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(error.code);
    }
  }

  return response;
};

module.exports = {
  storeBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
