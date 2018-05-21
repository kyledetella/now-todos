const devDataStore = require("../../DevDataStore");

const createTodo = (context, args) => {
  return devDataStore.createTodo(args.description);
};

const getTodos = () => devDataStore.getTodos();

module.exports = { createTodo, getTodos };
