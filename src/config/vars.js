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
  offlineMode: process.env.IS_OFFLINE_MODE,
  clientAuthKey: process.env.CLIENT_AUTH_KEY,
  jwtSetting: {
    expiryTime: process.env.JWT_EXPIRATION_TIME,
    refreshTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
    secret: process.env.JWT_SECRET,
    webPageAuthExpiry: process.env.WEB_PAGE_JWT_EXPIRATION_TIME
  },
  dynamoDb: {
    localEndpoint: process.env.LOCAL_DYNAMODB_END_POINT,
    usersTableName: process.env.TABLE_NAME_USERS
  },
  sesSourceEmail: process.env.SES_SOURCE_EMAIL,
  verifyEmailNextUrl: process.env.VERIFY_EMAIL_URL,
  resetPasswordPageUrl: process.env.RESET_PASSWORD_PAGE_URL,
  changePasswordNextUrl: process.env.CHANGE_PASSWORD_URL,
  appIdFacebook: process.env.FACEBOOK_APP_ID
};
