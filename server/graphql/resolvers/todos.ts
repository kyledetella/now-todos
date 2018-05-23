import devDataStore from "../../DevDataStore";

export const createTodo = (_: any, args: { description: string }) => {
  return devDataStore.createTodo(args.description);
};

export const getTodos = () => devDataStore.getTodos();

module.exports = { createTodo, getTodos };
