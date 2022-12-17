/**
 * Todo Service
 *
 */
const repository = require('../../repositories/todo');

const create = async requestBody => repository.create(requestBody);

module.exports = {
  create
};
