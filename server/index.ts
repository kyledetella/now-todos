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
import { initializeDB } from "./db";
import { Db } from "mongodb";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const {
  PORT = 4000,
  APOLLO_ENGINE_KEY,
  DB_NAME,
  DB_PASSWORD,
  DB_USER
} = process.env;
const app = express();

if (!APOLLO_ENGINE_KEY) {
  throw new Error(
    "A valid Apollo Engine API key is required. See: https://www.apollographql.com/docs/engine/setup-node.html"
  );
}

if (!DB_NAME || !DB_PASSWORD || !DB_USER) {
  throw new Error(
    "Valid database configuration credentials are required. Please provide `DB_{USER,PASSWORD,NAME}"
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
    todos: getTodos,
    deployment: () => ({
      nowURL: process.env.NOW_URL || "__local",
      id: process.env.DEPLOYMENT_ID || "__local"
    })
  },
  Mutation: {
    createTodo: createTodo
  }
};

(async () => {
  // Setup DB
  const db: Db = await initializeDB({
    name: DB_NAME,
    password: DB_PASSWORD,
    user: DB_USER
  });

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

  // Set up ApolloEngine
  const engine = new ApolloEngine({
    apiKey: APOLLO_ENGINE_KEY
  });

  engine.listen(
    {
      port: PORT,
      expressApp: app
    },
    () => {
      console.log(`🚀 Server ready! @:${PORT}`);
      console.log("Running via ts");
    }
  );
})();
