import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { Todo } from "./Todo";

export const GET_TODOS = gql`
  {
    todos {
      description
      _id
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
              {data.todos.map((todo: ITodo) => (
                <Todo key={todo._id} todo={todo} />
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
