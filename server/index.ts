import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import chalk from "chalk";
import { ApolloServer, gql, IResolvers } from "apollo-server";
import { registerServer } from "apollo-server-express";
import { ApolloEngine } from "apollo-engine";
import { importSchema } from "graphql-import";
import { createTodo, getTodos } from "./graphql/resolvers/todos";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { PORT = 4000, APOLLO_ENGINE_KEY } = process.env;
const app = express();

if (!APOLLO_ENGINE_KEY) {
  throw new Error(
    "A valid Apollo Engine API key is required. See: https://www.apollographql.com/docs/engine/setup-node.html"
  );
}

app.use(bodyParser.json());
app.use(morgan("dev"));
// TODO: Lock this down in prod?
app.use(cors());

app.use("/graphql", (req: express.Request, _, next: express.NextFunction) => {
  const { operationName } = req.body;
  console.log(
    chalk.bold.magenta("[GraphQL Query]:"),
    operationName || "Anonymous operation!"
  );

  next();
});

app.get("/", (req, res) => {
  const { headers } = req;

  if (headers.accept === "application/json") {
    res.json({ graphQL: "/graphql" });
  } else {
    res.send(`<a href="/graphql">GraphQL API</a>`);
  }
});

const schema = importSchema("./graphql/schema.graphql");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  ${schema}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: getTodos
  },
  Mutation: {
    createTodo: createTodo
  }
};

const engine = new ApolloEngine({
  apiKey: APOLLO_ENGINE_KEY
});

// via: https://www.apollographql.com/docs/apollo-server/v2/migration-two-dot.html
const server = new ApolloServer({
  typeDefs,
  // TODO: Shouldn't have to cast this
  resolvers: resolvers as IResolvers,

  // TODO: We may not always want to do this in production! Consider restricting
  introspection: true,

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
