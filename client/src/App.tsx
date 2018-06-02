import ApolloClient from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { CreateTodo } from "./CreateTodo";
import { Todos } from "./Todos";

import "./App.css";

const graphQLEndpoint =
  process.env.REACT_APP_GRAPHQL_API_URL || "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: graphQLEndpoint
});

class App extends React.PureComponent {
  public render() {
    return (
      <ApolloProvider client={client}>
        <React.Fragment>
          <Todos />
          <CreateTodo />
        </React.Fragment>
      </ApolloProvider>
    );
  }
}

export default App;
