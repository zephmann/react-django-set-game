import React from "react";

import "../styles.css";


function SetCard(props) {
  // 0 - number, 1 - shape, 2 - color, 3 - fill
  const shape = props.card[1] === 0 ? "X" : props.card[1] === 1 ? "O" : "S";
  const card_text = Array(props.card[0] + 1).fill(shape);

  // compile class names for color and filling
  let text_classes = "card-text text-center";
  text_classes += " color-" + props.card[2];
  text_classes += " fill-" + props.card[3];

  // if the card is seleted, add an outline
  let border_classes = "card m-1 shadow-sm";
  if (props.selected) 
    border_classes += " selected";

  return (
    <div className="col-4 col-md-3 pr-1 pl-1 hover-pointer" onClick={props.onClick}>
      <div className={border_classes}>
        <div className="card-body mt-2 mb-2">
          <p className={text_classes}>
            {card_text}
          </p>
        </div>
      </div>
    </div>
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
      <div className="row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
        {this.renderSquare(9)}
        {this.renderSquare(10)}
        {this.renderSquare(11)}
      </div>
    );
    
  }
}

export default Board;