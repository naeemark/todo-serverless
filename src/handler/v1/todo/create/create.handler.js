const { OK } = require('@utils/helper');
const { create } = require('@services/todo');
const logger = require('@utils/logger');

/**
 * register
 * @public
 */
exports.register = async (event) => {
  logger.debug(event);

  const response = await create(event.body);
  return OK('Create a Todo', response);
};
