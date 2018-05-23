import devDataStore from "./DevDataStore";

describe("DevDataStore", () => {
  beforeAllg(() => {
    jest
      .spyOn(devDataStore, "__generateId")
      .mockImplementation(() => "test-id");
  });

  describe("createTodo", () => {
    it("adds new todo to collection", () => {
      devDataStore.createTodo("Foo");

      expect(devDataStore).toMatchSnapshot();
    });
  });

  describe("getTodos", () => {
    it("returns Todo collection", () => {
      expect(devDataStore.getTodos()).toMatchSnapshot();
    });
  });
});
