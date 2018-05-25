import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export const GET_TODOS = gql`
  {
    todos {
      description
      id
    }
  }
`;

export const Todos = ({ name }) => (
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
