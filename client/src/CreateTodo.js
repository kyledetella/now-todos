import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { GET_TODOS } from "./Todos";

export const CREATE_TODO = gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      description
    }
  }
`;

export const CreateTodo = () => {
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
