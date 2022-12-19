/**
 * Todo Repository
 *
 */

const { dynamoDbClient } = require('@services/aws');
const { dynamoDb: { todoTableName: TableName } } = require('@config/vars');
const { APIError } = require('@utils/APIError');
const logger = require('@utils/logger');

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

/**
 * Returns Single Item
 * @method getItem
 * @param {id} Id of a
 * @returns {Promise} Resolves with Single Item, Rejects Dynamo Error
 */
const getItem = async (id) => {
  logger.info('getItem', { id });
  const params = { TableName, Key: { id } };
  try {
    const result = await dynamoDbClient.get(params).promise();
    return result.Item;
  } catch (err) {
    throw APIError.notFound();
  }
};


module.exports = {
  createItem, getItem
};
