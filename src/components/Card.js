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


export const shuffleCards = () => {
  // to ensure that at least one set is always present, select a random card
  // and construct a set around it. pick four random values for the four
  // characteristics. then pick a random number 1-15 and use this as bit
  // masking for the characteristics that will be "different" vs "same". 
  // don't use 0 because the cards would be all the same.
  let set_card_1 = [
    Math.floor(Math.random() * 3),
    Math.floor(Math.random() * 3),
    Math.floor(Math.random() * 3),
    Math.floor(Math.random() * 3)
  ];
  let set_card_2 = [...set_card_1];
  let set_card_3 = [...set_card_1];

  let diff_bit_mask = Math.ceil(Math.random() * 15);

  // number, shape, color, fill
  if (diff_bit_mask & 1) {
    set_card_2[0] = (set_card_1[0] + 1) % 3;
    set_card_3[0] = (set_card_1[0] + 2) % 3;
  }
  if (diff_bit_mask & 2) {
    set_card_2[1] = (set_card_1[1] + 1) % 3;
    set_card_3[1] = (set_card_1[1] + 2) % 3;
  }
  if (diff_bit_mask & 4) {
    set_card_2[2] = (set_card_1[2] + 1) % 3;
    set_card_3[2] = (set_card_1[2] + 2) % 3;
  }
  if (diff_bit_mask & 8) {
    set_card_2[3] = (set_card_1[3] + 1) % 3;
    set_card_3[3] = (set_card_1[3] + 2) % 3;
  }

  // calc the corresponding indices
  let set_indices = [0, 0, 0];
  let pow_3 = 1;
  for(let i = 0; i < 4; i++) {
    set_indices[0] += set_card_1[i] * pow_3;
    set_indices[1] += set_card_2[i] * pow_3;
    set_indices[2] += set_card_3[i] * pow_3;
    pow_3 *= 3;
  }

  // begin by swapping lowest index first to avoid messing up calculated
  // indices of other cards. ex: if card 1 is index 74, and card 2 is 0, then
  // after swapping index 74 with 0, card 2's index would need to be 74
  set_indices.sort();

  // initialize the indices used for the game board
  // remove the three selected indices, shuffle the rest, and
  // take the first nine indices
  let indices = [...DECK.keys()];

  swap(indices, 0, set_indices[0]);
  swap(indices, 1, set_indices[1]);
  swap(indices, 2, set_indices[2]);

  for(let i = 3, j=78; i < 12; i++, j--) {
    let index = Math.floor(Math.random() * j) + i;

    swap(indices, i, index);
  }

  let current_indices = indices.slice(0, 12);
  current_indices.sort((a,b) => Math.random() * 2 - 1);

  return current_indices;
}


export const checkSet = (indices) => {
  // get the cards from the shuffled indices
  const card_a = DECK[indices[0]];
  const card_b = DECK[indices[1]];
  const card_c = DECK[indices[2]];

  // check all the differences of the characteristic dimensions of the 
  // selected cards.
  for (let i = 0; i < 4; i++) {
    // check two pairs first. 
    // if one pairs don't match, then eliminate it right away.
    // otherwise check the remaining pair against one of the first two pairs.
    const dif_ab = card_a[i] !== card_b[i];
    const dif_bc = card_b[i] !== card_c[i];
    if (dif_ab !== dif_bc)
      return false;

    // safe to assume ab and bc match, so if ab != ca then bc != ca
    const dif_ca = card_c[i] !== card_a[i];
    if (dif_ab !== dif_ca)
      return false;
  }

  return true;
};


export const analyzeSet = (indices) => {
  // get the cards from the shuffled indices
  const card_a = DECK[indices[0]];
  const card_b = DECK[indices[1]];
  const card_c = DECK[indices[2]];

  let set_found = true;
  let dimensions = new Array(5).fill(true);

  // check all the differences of the characteristic dimensions of the 
  // selected cards.
  for (let i = 0; i < 4; i++) {
    // check two pairs first. 
    // if one pairs don't match, then eliminate it right away.
    // otherwise check the remaining pair against one of the first two pairs.
    const dif_ab = card_a[i] !== card_b[i];
    const dif_bc = card_b[i] !== card_c[i];
    if (dif_ab !== dif_bc) {
      dimensions[i] = "NEITHER";
      set_found = false;
      continue;
    }

    // safe to assume ab and bc match, so if ab != ca then bc != ca
    const dif_ca = card_c[i] !== card_a[i];
    if (dif_ab !== dif_ca) {
      dimensions[i] = "NEITHER";
      set_found = false;
    }

    else
      dimensions[i] = dif_ca ? "different" : "same"
  }

  dimensions[4] = set_found;

  return dimensions;
};


export const StartCard = (props) => {
  // 0 - number, 1 - shape, 2 - color, 3 - fill
  const shape = props.card[1] === 0 ? "X" : props.card[1] === 1 ? "O" : "S";
  const card_text = Array(props.card[0] + 1).fill(shape);

  // compile class names for color and filling
  let text_classes = "card-text text-center";
  text_classes += " color-" + props.card[2];
  text_classes += " fill-" + props.card[3];

  let card_classes = "card m-1 shadow-sm";
  if (props.card_classes)
    card_classes += " " + props.card_classes;

  return (
    <div className="col-12 col-sm-4 pr-1 pl-1 start-card">
      <div className={card_classes}>
        <div className="card-body mt-2 mb-2">
          <p className={text_classes}>
            {card_text}
          </p>
        </div>
      </div>
    </div>
  );
};


export const ExampleCard = (props) => {
  const card = DECK[props.card_index];

  // 0 - number, 1 - shape, 2 - color, 3 - fill
  const shape = card[1] === 0 ? "X" : card[1] === 1 ? "O" : "S";
  const card_text = Array(card[0] + 1).fill(shape);

  // compile class names for color and filling
  let text_classes = "card-text text-center";
  text_classes += " color-" + card[2];
  text_classes += " fill-" + card[3];

  // if the card is seleted, add an outline
  let border_classes = "card m-1 shadow-sm";
  if(props.set_found === true)
    border_classes += " true-set";
  else if (props.set_found === false)
    border_classes += " false-set";

  return (
    <div className="col-12 col-sm-4 pr-1 pl-1">
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


export const swap = (arr, a, b) => {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};


export const Board = class Board extends React.Component {
  renderCard(i) {
    // get the card index from the shuffled array
    const index = this.props.indices[i];

    // return the card at the index, pass down the onClick
    // and whether the card is selected or not
    return (
      <SetCard
        card={DECK[index]}
        selected={this.props.selected.has(i)}
        set_found={this.props.set_found}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // render the first twelve shuffled indices of the cards
    return (
      <div className="row">
        {this.renderCard(0)}
        {this.renderCard(1)}
        {this.renderCard(2)}
        {this.renderCard(3)}
        {this.renderCard(4)}
        {this.renderCard(5)}
        {this.renderCard(6)}
        {this.renderCard(7)}
        {this.renderCard(8)}
        {this.renderCard(9)}
        {this.renderCard(10)}
        {this.renderCard(11)}
      </div>
    );
    
  }
}


