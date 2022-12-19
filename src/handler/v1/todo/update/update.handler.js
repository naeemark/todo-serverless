const httpStatus = require('http-status');
const { OK } = require('@utils/helper');
const { update } = require('@services/todo');
const logger = require('@utils/logger');

/**
 * update
 * @public
 */
exports.handler = async (event) => {
  logger.debug(event);
  const { id } = event.pathParameters;
  const response = await update(id, event.body);
  return OK('To-Do object updated successfully.', response, httpStatus.CREATED);
};
