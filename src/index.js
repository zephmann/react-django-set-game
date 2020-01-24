import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game";
import StartScreen from "./components/Start";

import "./styles.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  render() {
    // render the start screen
    if (this.state.index === 0)
      return <StartScreen />;

    // render the game board
    if (this.state.index === 1)
      return <Game />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
