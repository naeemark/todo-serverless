/**
 * Todo Service
 *
 */
const { v4: uuidv4 } = require('uuid');
const { APIError } = require('@utils/APIError');

const repository = require('../../repositories/todo');

const create = async requestBody => repository.createItem({ id: uuidv4(), ...requestBody });

const get = async (id) => {
  const item = await repository.getItem(id);
  if (!item) throw APIError.notFound();
  return item;
};

module.exports = {
  create,
  get
};
