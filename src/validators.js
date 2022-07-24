const ValidationError = require('./validationError');

const validateStore = (payload) => {
  if (!payload.name) {
    throw new ValidationError('Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (payload.readPage > payload.pageCount) {
    throw new ValidationError('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }
};

module.exports = validateStore;
