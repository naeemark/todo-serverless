require('module-alias/register');

// define all the routes/handlers
const hello = require('./handler/hello');

const createTodoV1 = require('./handler/v1/todo/create');

module.exports = {
  hello,
  createTodoV1
};
