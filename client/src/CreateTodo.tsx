import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
import { GET_TODOS } from "./Todos";

export const CREATE_TODO = gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      _id
      description
    }
  }
`;

export const CreateTodo = () => {
  let input: any;

  return (
    <Mutation
      mutation={CREATE_TODO}
      // tslint:disable-next-line:jsx-no-lambda
      update={(cache, { data: { createTodo } }) => {
        const {todos}: any = cache.readQuery({ query: GET_TODOS })
        cache.writeQuery({
          data: { todos: (todos || []).concat([createTodo]) },
          query: GET_TODOS,          
        });
      }}
    >
      {(createTodo, { data }) => (
        <div>
          <form
            // tslint:disable-next-line:jsx-no-lambda
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
