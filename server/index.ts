import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cors from "cors";
// import chalk from "chalk";
import {
  ApolloServer,
  gql,
  IResolvers,
  withFilter,
  makeExecutableSchema
} from "apollo-server";
import { registerServer } from "apollo-server-express";
import { ApolloEngine } from "apollo-engine";
import { importSchema } from "graphql-import";
// import { createTodo, getTodos } from "./graphql/resolvers/todos";
// import { pubsub } from "./pubsub";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { pubsub } from "./pubsub";
import { createTodo, getTodos } from "./graphql/resolvers/todos";
// import { createTodo } from "./graphql/resolvers/todos";
// import devDataStore from "./DevDataStore";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { PORT = 4000, WS_PORT = 5000, APOLLO_ENGINE_KEY } = process.env;
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

// app.use("/graphql", (req: express.Request, _, next: express.NextFunction) => {
//   const { operationName } = req.body;
//   console.log(
//     chalk.bold.magenta("[GraphQL Query]:"),
//     operationName || "Anonymous operation!"
//   );

//   next();
// });

// type Todo = { id: string; description: string };
// const todosStore: Todo[] = [];

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
  },
  Subscription: {
    todoAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator("todoAdded"), () => true)
    }
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

const createWebsocketServer = () => {
  // Create WS server
  // Create WebSocket listener server
  const websocketServer = createServer((_, response) => {
    response.writeHead(404);
    response.end();
  });

  // Bind it to port and start listening
  websocketServer.listen(WS_PORT, () =>
    console.log(
      `Websocket Server is now running on http://localhost:${WS_PORT}`
    )
  );
  SubscriptionServer.create(
    {
      // Convert compiled schema String to GraphQL Object
      // via: https://dev-blog.apollodata.com/three-ways-to-represent-your-graphql-schema-a41f4175100d
      schema: makeExecutableSchema({
        typeDefs: schema,
        resolvers
      }),
      execute,
      subscribe
    },
    {
      server: websocketServer,
      path: "/graphql"
    }
  );
};

// app.listen(PORT, () => {
//   console.log(`🚀 Server ready! @:${PORT}`);
//   createWebsocketServer()
// });

engine.listen(
  {
    port: PORT,
    expressApp: app
  },
  createWebsocketServer
);
