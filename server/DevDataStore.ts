// A temp/fake data store
const shortid = require("shortid");

type Todo = {
  id: string;
  description: string;
};

class DevDataStore {
  _todos: Todo[];

  constructor() {
    this._todos = [];
  }

  createTodo(description: string): Todo {
    const newTodo = {
      id: this.__generateId(),
      description
    };
    this._todos.push(newTodo);

    return newTodo;
  }

  getTodos(): Todo[] {
    return this._todos;
  }

  __generateId(): string {
    return String(shortid() || "");
  }
}

export default new DevDataStore();
