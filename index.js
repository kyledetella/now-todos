const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const shortid = require("shortid");
const { ApolloServer, gql } = require("apollo-server");
const { registerServer } = require("apollo-server-express");
const { ApolloEngine } = require("apollo-engine");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const todos = [];
const { PORT = 4000, APOLLO_ENGINE_KEY } = process.env;
const app = express();

if (!APOLLO_ENGINE_KEY) {
  throw new Error(
    "A valid Apollo Engine API key is required. See: https://www.apollographql.com/docs/engine/setup-node.html"
  );
}

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/graphql", (req, res, next) => {
  const { operationName } = req.body;
  console.log(
    chalk.bold.magenta("[GraphQL Query]:"),
    operationName || "Anonymous operation!"
  );

  next();
});

app.get("/", (req, res) => {
  res.send(`<a href="/graphql">GraphQL API</a>`);
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

const engine = new ApolloEngine({
  apiKey: APOLLO_ENGINE_KEY
});

// via: https://www.apollographql.com/docs/apollo-server/v2/migration-two-dot.html
const server = new ApolloServer({
  typeDefs,
  resolvers,

  // Addding Apollo Engine
  tracing: true,
  cacheControl: true
});
registerServer({ app, server });

engine.listen(
  {
    port: PORT,
    expressApp: app
  },
  () => {
    console.log(`🚀 Server ready! @:${PORT}`);
  }
);
