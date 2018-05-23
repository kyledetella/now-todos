import devDataStore from "../../DevDataStore";

export const createTodo = (
  _: any,
  args: NowTodosGQL.ICreateTodoOnMutationArguments
) => {
  return devDataStore.createTodo(args.input.description);
};

export const getTodos = () => devDataStore.getTodos();

module.exports = { createTodo, getTodos };
