import ApolloClient from "apollo-boost"
import * as React from 'react';
import {ApolloProvider} from "react-apollo"
import {CreateTodo} from "./CreateTodo"
import {Todos} from "./Todos"

import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
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