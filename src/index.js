require('module-alias/register');

// define all the routes/handlers
const hello = require('./handler/hello');

module.exports = {
  hello
};
