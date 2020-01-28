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
      start_countdown: 0,
      num_found: -1,
      num_skipped: -1
    };

    this.onStartClicked = this.onStartClicked.bind(this);
    this.startCountdownInc = this.startCountdownInc.bind(this);

    this.onGameFinished = this.onGameFinished.bind(this);
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

  onGameFinished(num_found, num_skipped) {
    this.setState({
      index: 2,
      num_found: num_found,
      num_skipped: num_skipped
    });
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
      return <Game onGameFinished={this.onGameFinished}/>;

    if (this.state.index === 2)
      return (
        <div>
          <div className="container text-center">
            <h1>Score page!</h1>
            <h2>Num Found: {this.state.num_found}</h2>
            <h2>Num Skipped: {this.state.num_skipped}</h2>
          </div>
          <div className="container text-center pt-4 pb-5">
            <button 
              className="btn-lg btn-primary" 
              onClick={this.onStartClicked}
            >
              PLAY AGAIN
            </button>
          </div>

        </div>
      );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
