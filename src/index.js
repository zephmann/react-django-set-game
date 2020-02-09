import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {Header} from "./components/Header";
import StartScreen from "./components/Home";
import Game from "./components/Game";
import Practice from "./components/Practice";
import {FinalScore, HighScores} from "./components/Score";
import {About} from "./components/About";

import "./styles.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: "home",
      start_countdown: 0,
      num_found: -1,
      num_skipped: -1,
      high_scores: [],
      user_name: "",
      score_submitted: false
    };

  }

  componentDidMount = () => {
    this.refreshScores();
  }

  refreshScores = () => {
    axios
      .get("http://localhost:8000/api/high_scores/")
      .then(res => {
        this.setState({ high_scores: res.data });
      })
      .catch(err => console.log(err))
  }

  onUserNameUpdated = (user_name) => {
    this.setState({
      user_name: user_name
    });
  }

  submitScore = () => {
    const new_score = {
      score: this.state.num_found,
      skipped: this.state.num_skipped,
      name: this.state.user_name
    }

    axios
      .post("http://localhost:8000/api/high_scores/", new_score)
      .then(this.refreshScores)
      .catch(err => console.log(err));

    this.setState({
      score_submitted: true
    })
  }

  onStartClicked = () => {
    this.startCountdownInc();

    this.setState({
      num_found: -1,
      num_skipped: -1,
      user_name: "",
      score_submitted: false
    })
  };

  startCountdownInc = () => {
    const start_countdown = this.state.start_countdown + 1;

    this.setState({
      start_countdown: start_countdown
    })

    if(start_countdown < 3)
      setTimeout(this.startCountdownInc, 500);
    else
      setTimeout( () => { this.setState({index: "game"}); }, 500 );
  };

  onGameFinished = (num_found, num_skipped) => {
    this.setState({
      index: "final_score",
      num_found: num_found,
      num_skipped: num_skipped
    });
  };

  onHomeClicked = () => {
    this.setState({
      index: "home",
      start_countdown: 0
    });
  };

  onAboutClicked = () => {
    this.setState({
      index: "about"
    });
  };

  onPracticeClicked = () => {
    this.setState({
      index: "practice"
    });
  };

  onHighScoresClicked = () => {
    this.refreshScores();

    this.setState({
      index: "high_scores"
    })
  }

  render() {
    let main_body = null;

    // render the home screen
    if (this.state.index === "home")
      main_body = <StartScreen 
        onStartClicked={this.onStartClicked}
        start_countdown={this.state.start_countdown} />;

    // render the game board
    else if (this.state.index === "game")
      main_body = <Game onGameFinished={this.onGameFinished}/>;

    // render the players score
    else if (this.state.index === "final_score") {
      let new_high_score = false;

      // handle case where scores are still negative
      if (this.state.num_found >= 0 && this.state.num_skipped >= 0) {
        if (this.state.high_scores.length < 10)
          new_high_score = true;
        else {
          const lowest_score = this.state.high_scores[9];

          if (lowest_score.score < this.state.num_found)
            new_high_score = true;
          else if(
            lowest_score.score === this.state.num_found && 
            lowest_score.skipped < this.state.num_skipped
          )
            new_high_score = true;
        }
      }

      main_body = <FinalScore
        num_found={this.state.num_found}
        user_name={this.state.user_name}
        onUserNameUpdated={this.onUserNameUpdated}
        num_skipped={this.state.num_skipped}
        onStartClicked={this.onStartClicked} 
        new_high_score={new_high_score}
        onSubmitScoreClicked={this.submitScore}
        score_submitted={this.state.score_submitted} />;
    }

    // render the about page
    else if (this.state.index === "about")
      main_body = <About 
        onPracticeClicked={this.onPracticeClicked}
        onStartClicked={this.onStartClicked} />;

    // render the practice game
    else if (this.state.index === "practice")
      main_body = <Practice />;

    // render a list of high scores
    else if (this.state.index === "high_scores")
      main_body = <HighScores scores={this.state.high_scores} />;
    
    return (
      <div>
        <Header 
          currentPage={this.state.index}
          onHomeClicked={this.onHomeClicked}
          onAboutClicked={this.onAboutClicked}
          onPracticeClicked={this.onPracticeClicked}
          onHighScoresClicked={this.onHighScoresClicked} />
        <main role="main">
          {main_body}
        </main>
      </div>
    );

  }
}

ReactDOM.render(<App />, document.getElementById("root"));
