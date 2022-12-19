/**
 * Todo Service
 *
 */
const { v4: uuidv4 } = require('uuid');

const repository = require('../../repositories/todo');

const create = async requestBody => repository.createItem({ id: uuidv4(), ...requestBody });

module.exports = {
  create
};
