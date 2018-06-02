import devDataStore from "../../DevDataStore";
import { pubsub } from "../../pubsub";

export const createTodo = async (_: any, { input }: any) => {
  const newTodo = devDataStore.createTodo(input.description);

  // TODO: Broadcast over Google pubsub
  // await pubsub.publish()
  await pubsub.publish("todoAdded", { todoAdded: newTodo });

  return newTodo;
};

export const getTodos = () => devDataStore.getTodos();

module.exports = { createTodo, getTodos };
