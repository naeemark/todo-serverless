require('module-alias/register');

// define all the routes/handlers
const hello = require('./handler/hello');

const createTodoV1 = require('./handler/v1/todo/create');
const createByPutTodoV1 = require('./handler/v1/todo/createByPut');
const getTodoV1 = require('./handler/v1/todo/get');
const updateTodoV1 = require('./handler/v1/todo/update');
const deleteTodoV1 = require('./handler/v1/todo/delete');
const listTodoV1 = require('./handler/v1/todo/list');

module.exports = {
  hello,
  createTodoV1,
  createByPutTodoV1,
  getTodoV1,
  updateTodoV1,
  deleteTodoV1,
  listTodoV1
};
