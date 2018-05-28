import devDataStore from "../../DevDataStore";
import { pubsub } from "../../pubsub";

export const createTodo = (_: any, { input }: any) => {
  const newTodo = devDataStore.createTodo(input.description);

  pubsub.publish("todoAdded", { todoAdded: newTodo });

  return newTodo;
};

export const getTodos = () => devDataStore.getTodos();

module.exports = { createTodo, getTodos };
