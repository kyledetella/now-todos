import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import chalk from "chalk";
import { ApolloEngine } from "apollo-engine";
import { initializeDB } from "./db";
import { Db } from "mongodb";
import initalizeApolloServer from "./graphql/initializeApolloServer";

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

const Main = async () => {
  // Setup DB
  const db: Db = await initializeDB({
    name: DB_NAME,
    password: DB_PASSWORD,
    user: DB_USER
  });

  // Setup ApolloServer
  initalizeApolloServer(app, db);

  // Set up ApolloEngine
  const engine = new ApolloEngine({
    apiKey: APOLLO_ENGINE_KEY
  });

  engine.listen(
    {
      port: PORT,
      expressApp: app
    },
    () => console.log(`🚀 Server ready! @:${PORT}`)
  );
};

Main().catch(err => {
  console.log("Error starting application\n");
  console.log(err);
});
