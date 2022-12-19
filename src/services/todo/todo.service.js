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

const update = async (id, requestBody) => {
  await get(id); // ensures if the item exists
  // eslint-disable-next-line no-return-await
  return await repository.updateItem(id, requestBody);
};

const deleteItem = async (id) => {
  await get(id); // ensures if the item exists
  // eslint-disable-next-line no-return-await
  return await repository.deleteItem(id);
};

const list = async () => repository.list();

module.exports = {
  create,
  get,
  update,
  deleteItem,
  list
};
