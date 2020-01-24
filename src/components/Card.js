import React from "react";


// hard-coded cards. 4 dimensions x 3 possibilities = 81 cards.
/*
cards = []
dims = 4
for i in range(3**dims):
    card = []
    for j in range(dims):
        card.append(i//(3**j) % 3)
    cards.append(card)
*/

export const DECK = [
  [0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [2, 1, 0, 0],
  [0, 2, 0, 0], [1, 2, 0, 0], [2, 2, 0, 0], [0, 0, 1, 0], [1, 0, 1, 0], [2, 0, 1, 0],
  [0, 1, 1, 0], [1, 1, 1, 0], [2, 1, 1, 0], [0, 2, 1, 0], [1, 2, 1, 0], [2, 2, 1, 0],
  [0, 0, 2, 0], [1, 0, 2, 0], [2, 0, 2, 0], [0, 1, 2, 0], [1, 1, 2, 0], [2, 1, 2, 0],
  [0, 2, 2, 0], [1, 2, 2, 0], [2, 2, 2, 0], [0, 0, 0, 1], [1, 0, 0, 1], [2, 0, 0, 1],
  [0, 1, 0, 1], [1, 1, 0, 1], [2, 1, 0, 1], [0, 2, 0, 1], [1, 2, 0, 1], [2, 2, 0, 1],
  [0, 0, 1, 1], [1, 0, 1, 1], [2, 0, 1, 1], [0, 1, 1, 1], [1, 1, 1, 1], [2, 1, 1, 1],
  [0, 2, 1, 1], [1, 2, 1, 1], [2, 2, 1, 1], [0, 0, 2, 1], [1, 0, 2, 1], [2, 0, 2, 1],
  [0, 1, 2, 1], [1, 1, 2, 1], [2, 1, 2, 1], [0, 2, 2, 1], [1, 2, 2, 1], [2, 2, 2, 1],
  [0, 0, 0, 2], [1, 0, 0, 2], [2, 0, 0, 2], [0, 1, 0, 2], [1, 1, 0, 2], [2, 1, 0, 2],
  [0, 2, 0, 2], [1, 2, 0, 2], [2, 2, 0, 2], [0, 0, 1, 2], [1, 0, 1, 2], [2, 0, 1, 2],
  [0, 1, 1, 2], [1, 1, 1, 2], [2, 1, 1, 2], [0, 2, 1, 2], [1, 2, 1, 2], [2, 2, 1, 2],
  [0, 0, 2, 2], [1, 0, 2, 2], [2, 0, 2, 2], [0, 1, 2, 2], [1, 1, 2, 2], [2, 1, 2, 2],
  [0, 2, 2, 2], [1, 2, 2, 2], [2, 2, 2, 2]
];


export const StartCard = (props) => {
  // 0 - number, 1 - shape, 2 - color, 3 - fill
  const shape = props.card[1] === 0 ? "X" : props.card[1] === 1 ? "O" : "S";
  const card_text = Array(props.card[0] + 1).fill(shape);

  // compile class names for color and filling
  let text_classes = "card-text text-center";
  text_classes += " color-" + props.card[2];
  text_classes += " fill-" + props.card[3];

  return (
    <div className="col-4 pr-1 pl-1">
      <div className="card m-1 shadow-sm">
        <div className="card-body mt-2 mb-2">
          <p className={text_classes}>
            {card_text}
          </p>
        </div>
      </div>
    </div>
  );
};


export const SetCard = (props) => {
  // 0 - number, 1 - shape, 2 - color, 3 - fill
  const shape = props.card[1] === 0 ? "X" : props.card[1] === 1 ? "O" : "S";
  const card_text = Array(props.card[0] + 1).fill(shape);

  // compile class names for color and filling
  let text_classes = "card-text text-center";
  text_classes += " color-" + props.card[2];
  text_classes += " fill-" + props.card[3];

  // if the card is seleted, add an outline
  let border_classes = "card m-1 shadow-sm";
  if (props.selected) {
    border_classes += " selected";
    if(props.set_found === true)
      border_classes += " true-set";
    else if (props.set_found === false)
      border_classes += " false-set";
  }

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
