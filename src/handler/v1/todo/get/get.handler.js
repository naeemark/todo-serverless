const { OK } = require('@utils/helper');
const logger = require('@utils/logger');
const { get } = require('@services/todo');

exports.handler = async (event) => {
  logger.debug(event);
  const { id } = event.pathParameters;
  const response = await get(id);
  return OK('Get Todo', response);
};
