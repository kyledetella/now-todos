import { IGraphQLContext } from "../../types/context";
import { Collection } from "mongodb";

export const createTodo = async (
  _: any,
  args: NowTodosGQL.ICreateTodoOnMutationArguments,
  { db }: IGraphQLContext
) => {
  const newTodoData = args.input;

  const collection: Collection = db.collection("todos");
  const result = await collection.insertOne(newTodoData);

  return result.ops[0];
};

export const getTodos = async (_: any, __: any, { db }: IGraphQLContext) => {
  const collection: Collection = db.collection("todos");
  const cursor = await collection.find();
  let todos = [];

  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    todos.push(doc);
  }

  return todos;
};

module.exports = { createTodo, getTodos };
