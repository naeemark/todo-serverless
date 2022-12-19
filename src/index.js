require('module-alias/register');

// define all the routes/handlers
const hello = require('./handler/hello');

const createTodoV1 = require('./handler/v1/todo/create');
const getTodoV1 = require('./handler/v1/todo/get');

module.exports = {
  hello,
  createTodoV1,
  getTodoV1
};
