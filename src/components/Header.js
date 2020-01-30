import React from "react";


export const Header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <h3 className="navbar-brand cursive-font" onClick={props.onHomeClicked}>CHET!</h3>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <p className="nav-item nav-link cursive-font" onClick={props.onAboutClicked}>about chet</p>
            <p className="nav-item nav-link cursive-font" onClick={props.onHighScoresClicked}>high scores</p>
          </div>
        </div>
      </nav>
    </header>
  );
};