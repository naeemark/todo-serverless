/**
 * Aws Service
 *
 */
const AWS = require('aws-sdk');
const { dynamoDb, offlineMode } = require('@config/vars');

if (offlineMode) AWS.config.update({ endpoint: dynamoDb.localEndpoint });

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports = { AWS, dynamoDbClient };
