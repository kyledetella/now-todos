import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
import { GET_TODOS } from "./Todos";

const DELETE_TODO = gql`
  mutation deleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      success
    }
  }
`;

export const Todo = ({ todo }: { todo: ITodo }) => {
  return (
    <Mutation
      mutation={DELETE_TODO}
      // tslint:disable-next-line:jsx-no-lambda
      update={(cache, { data: { deleteTodo } }) => {
        const { todos }: any = cache.readQuery({ query: GET_TODOS });

        cache.writeQuery({
          data: { todos: todos.filter((t: ITodo) => t._id !== todo._id) },
          query: GET_TODOS
        });
      }}
    >
      {deleteTodo => (
        <div style={{margin: '0 0 1em', borderBottom: '1px solid #ddd'}}>
          <button
            style={{ display: "inline", marginRight: "0.8em" }}
            // tslint:disable-next-line:jsx-no-lambda
            onClick={() => {
              deleteTodo({ variables: { input: { id: todo._id } } });
            }}
          >
            &times;
          </button>
          {todo.description}
        </div>
      )}
    </Mutation>
  );
};
