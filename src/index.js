import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game";
import StartScreen from "./components/Start";

import "./styles.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      start_countdown: 0
    };

    this.onStartClicked = this.onStartClicked.bind(this);
    this.startCountdownInc = this.startCountdownInc.bind(this);
  }

  onStartClicked() {
    console.log("on start clicked!")

    this.startCountdownInc();
  }

  startCountdownInc() {
    const start_countdown = this.state.start_countdown + 1;

    this.setState({
      start_countdown: start_countdown
    })

    if(start_countdown < 3)
      setTimeout(this.startCountdownInc, 500);
    else
      setTimeout( () => { this.setState({index: 1}); }, 500 );
  }

  render() {
    // render the start screen
    if (this.state.index === 0)
      return <StartScreen 
        onStartClicked={this.onStartClicked}
        start_countdown={this.state.start_countdown}
        />;

    // render the game board
    if (this.state.index === 1)
      return <Game />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
