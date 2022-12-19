require('module-alias/register');

// define all the routes/handlers
const hello = require('./handler/hello');

const createTodoV1 = require('./handler/v1/todo/create');
const getTodoV1 = require('./handler/v1/todo/get');
const listTodoV1 = require('./handler/v1/todo/list');

module.exports = {
  hello,
  createTodoV1,
  getTodoV1,
  listTodoV1
};
