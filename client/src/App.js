import React, { Fragment, PureComponent } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { Todos } from "./Todos";
import { CreateTodo } from "./CreateTodo";

import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Fragment>
          <Todos />
          <CreateTodo />
        </Fragment>
      </ApolloProvider>
    );
  }
}

export default App;
