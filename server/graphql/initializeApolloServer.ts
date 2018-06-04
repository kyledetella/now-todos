import * as path from "path";
import { ApolloServer, gql, IResolvers } from "apollo-server";
import { importSchema } from "graphql-import";
import { getTodos, createTodo, deleteTodo } from "./resolvers/todos";
import { Application } from "express";
import { Db } from "mongodb";
import { registerServer } from "apollo-server-express";

const schema = importSchema(path.resolve("graphql/schema.graphql"));

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  ${schema}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: getTodos,
    deployment: () => ({
      nowURL: process.env.NOW_URL || "__local",
      id: process.env.DEPLOYMENT_ID || "__local"
    })
  },
  Mutation: {
    createTodo: createTodo,
    deleteTodo: deleteTodo
  }
};

const initalizeApolloServer = (app: Application, db: Db) => {
  // via: https://www.apollographql.com/docs/apollo-server/v2/migration-two-dot.html
  const server = new ApolloServer({
    typeDefs,
    // TODO: Shouldn't have to cast this
    resolvers: resolvers as IResolvers,

    context: { db },

    // TODO: We may not always want to do this in production! Consider restricting
    introspection: true,

    // Addding Apollo Engine
    tracing: true,
    cacheControl: true
  });

  registerServer({ app, server });
};

export default initalizeApolloServer;
