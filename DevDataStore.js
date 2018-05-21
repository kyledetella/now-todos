// A temp/fake data store
const shortid = require("shortid");

class DevDataStore {
  constructor() {
    this._todos = [];
  }

  createTodo(description) {
    const newTodo = { id: shortid, description };
    this._todos.push(newTodo);

    return newTodo;
  }

  getTodos() {
    return this._todos;
  }
}

const dataStore = new DevDataStore();

module.exports = dataStore;
