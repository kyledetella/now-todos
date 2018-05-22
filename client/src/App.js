import React, { Component } from "react";
import "./App.css";

class App extends Component {
  async componentDidMount() {
    const res = await fetch("http://localhost:4000", {
      headers: { accept: "application/json" }
    });
    const data = await res.json();

    console.log(data);
  }

  render() {
    return <div className="App">GraphQL</div>;
  }
}

export default App;
