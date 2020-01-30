import React from "react";

import "../styles.css";


export const FinalScore = (props) => {
  // if user got a high score, add form for entering name
  let submit_score = null;
  if (props.score_submitted) {
    submit_score = <div className="pt-4 bg-white border rounded mb-2">
      <h1>SCORE SUBMITTED</h1>
    </div>;
  }
  else if(props.new_high_score) {
    submit_score = <div className="bg-white border rounded mb-2">
      <form className="pt-2 pb-2">
        <label className="description cursive-font">name: </label>
        <input type="text" name="username" pattern="[A-Z1-9 ]" 
          minLength="1" maxLength="3" value={props.user_name} size="3"
          onChange={event => 
            props.onUserNameUpdated(event.target.value.toUpperCase())}/>
      </form> 
      <button 
        className="btn-lg pt-3 pb-0 mb-2 btn-success " 
        onClick={props.onSubmitScoreClicked}>
        <h3>SUBMIT HIGH SCORE</h3>
      </button>
    </div>;
  }

  // render the high scores list
  return (
    <div className="bg-light pt-4">
      <div className="container text-center cursive-font">
        {submit_score}
        <h1>GAME OVER</h1>
        <h2>chets found: {props.num_found}</h2>
        <h2>boards skipped: {props.num_skipped}</h2>
      </div>
      <div className="container text-center pt-4 pb-5">
        <button 
          className="btn-lg btn-primary" 
          onClick={props.onStartClicked}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};


export const HighScores = (props) => {
  const list = props.scores.map((high_score, i) => 
    <li className="list-group-item high-score-list mx-auto pb-1" 
      id={i === 0 ? "gold" : (i === 1 ? "silver" : (i === 2 ? "bronze": ""))} 
      key={high_score.id} >
      <div className="d-flex justify-content-between align-items-center mono-font m-0 p-0">
        <h4>#{i+1}{i+1 === 10 ? "" : "\u00A0"}</h4>
        <h1>{high_score.score}/{high_score.skipped}</h1>
        <h1>{["\u00A0'", "\u00A0'", "\u00A0"].slice(high_score.name.length, 3).join("") + high_score.name}</h1>
      </div>
      <small className="cursive-font m-0 p-0">
        {high_score.days_since_score} day{high_score.days_since_score !== 1 ? "s" : ""} ago
      </small>
    </li>

    //<li className="list-group-item flex-column align-items-start" key={high_score.id}>
    //  <h5 className="mb-1">#{i+1}&nbsp;&nbsp;&nbsp;{high_score.name} {high_score.score} / {high_score.skipped}</h5>
    //  <small>{high_score.days_since_score} day{high_score.days_since_score !== 1 ? "s" : ""} ago</small>
    //</li>
  );

  // render the high scores list
  return (
    <div>
      <div className="bg-light">
        
        <div className="container text-center cursive-font pt-4 pb-5">
          <h1>HIGH SCORES</h1>
          <h3>( score / skipped )</h3>
          
          <ul className="list-group">
            {list}
          </ul>

        </div>
      </div>
    </div>
  );
};