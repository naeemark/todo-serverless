const { OK } = require('@utils/helper');
const logger = require('@utils/logger');
const { deleteItem } = require('@services/todo');

exports.handler = async (event) => {
  logger.debug(event);
  const { id } = event.pathParameters;
  const response = await deleteItem(id);
  return OK('To-Do object deleted successfully.', response);
};
