import React from "react";

import "../styles.css";


const SetCard = (props) => {
  // 0 - number, 1 - shape, 2 - color, 3 - fill
  const shape = props.card[1] === 0 ? "X" : props.card[1] === 1 ? "O" : "S";
  const card_text = Array(props.card[0] + 1).fill(shape);

  // compile class names for color and filling
  let class_names = "card";
  class_names += " color-" + props.card[2];
  class_names += " fill-" + props.card[3];

  // if the card is seleted, add an outline
  if (props.selected) class_names += " selected";

  return (
    <button className={class_names} onClick={props.onClick}>
      {card_text}
    </button>
  );
};


class Board extends React.Component {
  renderSquare(i) {
    // get the card index from the shuffled array
    const index = this.props.indices[i];

    // return the card at the index, pass down the onClick
    // and whether the card is selected or not
    return (
      <SetCard
        card={this.props.cards[index]}
        selected={this.props.selected.has(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // render the first twelve shuffled indices of the cards
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
      </div>
    );
    
  }
}

export default Board;