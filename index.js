const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const shortid = require("shortid");
const { ApolloServer, gql } = require("apollo-server");
const { registerServer } = require("apollo-server-express");

const todos = [];
const { PORT = 4000 } = process.env;
const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("ok");
});

const schema = fs.readFileSync("./schema.graphql", "utf8");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  ${schema}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: () => todos
  },
  Mutation: {
    createTodo: (context, args) => {
      const newTodo = { id: shortid, description: args.description };
      todos.push(newTodo);

      return newTodo;
    }
  }
};

// via: https://www.apollographql.com/docs/apollo-server/v2/migration-two-dot.html
const server = new ApolloServer({ typeDefs, resolvers });
registerServer({ app, server });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
