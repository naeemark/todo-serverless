/**
 * Todo Repository
 *
 */

const { dynamoDbClient } = require('@services/aws');
const { dynamoDb: { todoTableName: TableName } } = require('@config/vars');
const { APIError } = require('@utils/APIError');
const logger = require('@utils/logger');

const create = async requestBody => requestBody;

/**
 * Creates Item
 * @method createItem
 * @param {Object} requestParams       Contains params to create a new item
 * @return {Object}                    New Object
 */
const createItem = async (requestParams) => {
  logger.info('DYNAMODB_CREATE', requestParams);
  try {
    await dynamoDbClient.put({ TableName, Item: requestParams }).promise();
    return requestParams;
  } catch (error) {
    console.log(error);
    throw APIError.notCreated();
  }
};


module.exports = {
  create, createItem
};
