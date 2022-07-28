const books = require('./book');
const ValidationError = require('./validationError');

const validateStore = (request) => {
  if (!request.payload.name) {
    throw new ValidationError('Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (request.payload.readPage > request.payload.pageCount) {
    throw new ValidationError('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }
};

const validateUpdate = (request) => {
  if (!request.payload.name) {
    throw new ValidationError('Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (request.payload.readPage > request.payload.pageCount) {
    throw new ValidationError('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  }

  if (books.findIndex((book) => book.id === request.params.bookId) === -1) {
    throw new ValidationError('Gagal memperbarui buku. Id tidak ditemukan', 404);
  }
};

const validateDelete = (request) => {
  if (books.findIndex((book) => book.id === request.params.bookId) === -1) {
    throw new ValidationError('Buku gagal dihapus. Id tidak ditemukan', 404);
  }
};

module.exports = {
  validateStore,
  validateUpdate,
  validateDelete,
};
