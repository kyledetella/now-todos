const { promisify } = require("util");
const fs = require("fs");

const shortid = require("shortid");
const { ApolloServer, gql } = require("apollo-server");

const readFile = promisify(fs.readFile);

const todos = [];

const startServer = async () => {
  const schema = await readFile("./schema.graphql", "utf8");

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

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer().catch(err => {
  console.log("ERROR STARTING SERVER", err);
});
