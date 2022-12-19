const httpStatus = require('http-status');
const { OK } = require('@utils/helper');
const { create } = require('@services/todo');
const logger = require('@utils/logger');

/**
 * create
 * @public
 */
exports.create = async (event) => {
  logger.debug(event);
  const response = await create(event.body);
  return OK('To-Do object created successfully.', response, httpStatus.CREATED);
};
