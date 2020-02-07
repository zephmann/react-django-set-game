import React from "react";


export const Header = (props) => {
  let about_classes = "nav-item nav-link cursive-font";
  let practice_classes = "nav-item nav-link cursive-font";
  let high_scores_classes = "nav-item nav-link cursive-font";

  // eslint-disable-next-line
  switch(props.currentPage) {
    case "about":
      about_classes += " active";
      break;
    case "practice":
      practice_classes += " active";
      break;
    case "high_scores":
      high_scores_classes += " active";
      break;
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <h3 className="navbar-brand cursive-font" onClick={props.onHomeClicked}>CHET!</h3>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <p className={about_classes} onClick={props.onAboutClicked}>about chet</p>
            <p className={practice_classes} onClick={props.onPracticeClicked}>practice</p>
            <p className={high_scores_classes} onClick={props.onHighScoresClicked}>high scores</p>
          </div>
        </div>
      </nav>
    </header>
  );
};