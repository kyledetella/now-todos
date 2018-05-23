// tslint:disable
// graphql typescript definitions

declare namespace NowTodosGQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /**
   * Root query
   */
  interface IQuery {
    __typename: "Query";

    /**
     * Retrieve all todos for the current user
     */
    todos: Array<ITodo>;
  }

  /**
   * A Todo
   */
  interface ITodo {
    __typename: "Todo";

    /**
     * The unique ID representing the Todo
     */
    id: string;

    /**
     * The description to be rendered for a given Todo
     */
    description: string;
  }

  /**
   * Root mutation
   */
  interface IMutation {
    __typename: "Mutation";

    /**
     * Create a new Todo
     */
    createTodo: ITodo | null;
  }

  interface ICreateTodoOnMutationArguments {
    input: ICreateTodoInput;
  }

  /**
   * A Todo input
   */
  interface ICreateTodoInput {
    /**
     * The description for the Todo
     */
    description: string;
  }
}

// tslint:enable
