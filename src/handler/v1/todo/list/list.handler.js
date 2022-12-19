const { OK } = require('@utils/helper');
const logger = require('@utils/logger');
const { list } = require('@services/todo');

exports.handler = async (event) => {
  logger.debug(event);
  const response = await list();
  return OK('Get Todo', response);
};
