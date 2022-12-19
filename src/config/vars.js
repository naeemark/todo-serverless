/* eslint-disable global-require */
const path = require('path');

// import .env variables
if (process.env.IS_OFFLINE_MODE) {
  require('dotenv-safe').load({
    path: path.join(process.cwd(), '.env'),
    sample: path.join(process.cwd(), '.env.example')
  });
}

module.exports = {
  env: process.env.NODE_ENV,
  stage: process.env.STAGE,
  serviceName: 'todo-serverless',
  offlineMode: process.env.IS_OFFLINE,
  clientAuthKey: process.env.CLIENT_AUTH_KEY,
  jwtSetting: {
    expiryTime: process.env.JWT_EXPIRATION_TIME,
    refreshTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
    secret: process.env.JWT_SECRET
  },
  dynamoDb: {
    localEndpoint: process.env.LOCAL_DYNAMODB_END_POINT,
    todoTableName: process.env.TABLE_NAME_TODO
  }
};
