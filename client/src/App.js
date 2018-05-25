import React, { Fragment, PureComponent } from "react";
import "./App.css";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query, Mutation } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const GET_TODOS = gql`
  {
    todos {
      description
      id
    }
  }
`;

const CREATE_TODO = gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      description
    }
  }
`;

const CreateTodo = () => {
  let input;

  return (
    <Mutation
      mutation={CREATE_TODO}
      update={(cache, { data: { createTodo } }) => {
        const { todos } = cache.readQuery({ query: GET_TODOS });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: todos.concat([createTodo]) }
        });
      }}
    >
      {(createTodo, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              createTodo({
                variables: { input: { description: input.value } }
              });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

const Todos = ({ name }) => (
  <Query query={GET_TODOS}>
    {({ loading, err, data }) => {
      if (loading) return <p>Loading...</p>;
      if (err) return <p style={{ color: "red" }}>{err}</p>;

      return (
        <div>
          <h2>Todos (name):</h2>
          {data.todos.length ? (
            <ul>
              {data.todos.map(todo => (
                <li key={todo.id}>{todo.description}</li>
              ))}
            </ul>
          ) : (
            <div>None!</div>
          )}
        </div>
      );
    }}
  </Query>
);

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
