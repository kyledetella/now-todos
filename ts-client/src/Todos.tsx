import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";

export const GET_TODOS = gql`
  {
    todos {
      description
      id
    }
  }
`;

export const Todos = () => (
  <Query query={GET_TODOS}>
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
      }

      return (
        <div>
          <h2>Todos (name):</h2>
          {data.todos.length ? (
            <ul>
              {data.todos.map((todo: any) => (
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
