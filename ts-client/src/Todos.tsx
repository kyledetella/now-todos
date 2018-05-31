/* tslint:disable:ordered-imports */
/* tslint:disable:jsx-no-lambda */
import { DocumentNode } from "graphql"
import { Query } from "react-apollo";
import gql from "graphql-tag";
import * as React from "react";

export const GET_TODOS = gql`
  {
    todos {
      description
      id
    }
  }
`;

const TODOS_SUBSCRIPTION = gql`
  subscription TodoAdded {
    todoAdded {
      id
      description
    }
  }
`;

interface ITodo {
  id: string
  description: string
}

interface ITodosSubscriberProps {
  subscribeToNewTodos: () => void
}

// Dummy-component to facilitate calling subscribeToMore()
// via: https://www.apollographql.com/docs/react/advanced/subscriptions.html#subscribe-to-more
class TodosSubscriber extends React.PureComponent<ITodosSubscriberProps> {
  public componentDidMount() {
    this.props.subscribeToNewTodos()
  }

  public render() {
    return null
  }
}

export const Todos = () => (
  <Query query={GET_TODOS}>
    {({ subscribeToMore, loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
      }

      return (
        <div>
          <h2>Todos (name):</h2>
          <TodosSubscriber
            subscribeToNewTodos={() => subscribeToMore({
              document: TODOS_SUBSCRIPTION as DocumentNode,
              updateQuery: (prev: {todos: ITodo[]}, {subscriptionData}) => {
                if (!subscriptionData.data) {
                  return prev;
                }
                const newTodo = subscriptionData.data.todoAdded;

                return {
                  ...prev,
                  todos: prev.todos.concat(newTodo)
                }
              }
            })} />
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
