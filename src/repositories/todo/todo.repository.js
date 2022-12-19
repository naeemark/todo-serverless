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
    throw APIError.notCreated();
  }
};

/**
 * Returns Single Item
 * @method getItem
 * @param {id} Id of an Item
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

/**
 * Updates Single Item
 * @method getItem
 * @param {id} Id of an Item
 * @returns {Promise} Resolves with Single Item, Rejects Dynamo Error
 */
const updateItem = async (id, requestParams) => {
  logger.info('updateItem', { id, requestParams });
  const params = {
    TableName,
    Key: { id },
    ExpressionAttributeNames: { '#title': 'title' },
    ExpressionAttributeValues: { ':title': requestParams.title, ':description': requestParams.description },
    UpdateExpression: 'SET #title = :title, description = :description',
    ReturnValues: 'ALL_NEW'
  };
  try {
    const result = await dynamoDbClient.update(params).promise();
    return result.Attributes;
  } catch (err) {
    throw APIError.notUpdated();
  }
};

/**
 * Delete Single Item
 * @method deleteItem
 * @param {id} Id of a Todo
 * @returns {Promise} Delete Single Item, Rejects Dynamo Error
 */
const deleteItem = async (id) => {
  logger.info('deleteItem', { id });
  const params = { TableName, Key: { id } };
  try {
    await dynamoDbClient.delete(params).promise();
    return { success: true };
  } catch (err) {
    throw APIError.notFound();
  }
};

/**
 * Returns List
 * @method list
 * @returns {Promise} Resolves with a list, Rejects Dynamo Error
 */
const list = async () => {
  const params = { TableName };
  try {
    const result = await dynamoDbClient.scan(params).promise();
    return result.Items;
  } catch (err) {
    throw APIError.notFound();
  }
};


module.exports = {
  createItem, getItem, updateItem, deleteItem, list
};
