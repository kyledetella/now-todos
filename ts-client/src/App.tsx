/* tslint:disable:ordered-imports */
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { CreateTodo } from "./CreateTodo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getMainDefinition } from "apollo-utilities";
import { onError } from "apollo-link-error";
import { split } from "apollo-link";
import { Todos } from "./Todos";
import * as React from "react";

import "./App.css";

import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

const GRAPHQL_WS_URI = "ws://localhost:5000/graphql";
const GRAPHQL_HTTP_URI = "http://localhost:4000/graphql";

const subscriptionClient = new SubscriptionClient(GRAPHQL_WS_URI, {
  reconnect: true
});

const wsLink = new WebSocketLink(subscriptionClient);
const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_URI
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const apolloClientOptions = {
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          // tslint:disable-next-line:no-console
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
              locations,
              null,
              2
            )}, Path: ${path}`
          )
        );
      }

      if (networkError) {
        // tslint:disable-next-line:no-console
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    link
  ])
};

const client = new ApolloClient(apolloClientOptions);

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
