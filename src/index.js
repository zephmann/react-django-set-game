import React from "react";
import ReactDOM from "react-dom";
import Board from "./components/Board"

import "./styles.css";


// hard-coded cards. 4 dimensions x 3 possibilities = 81 cards.
const INITAL_CARDS = [
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


function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}


class Game extends React.Component {
  constructor(props) {
    super(props);

    // 0 - number, 1 - shape, 2 - color, 3 - fill
    this.cards = INITAL_CARDS;

    // set up the component's state, the cards in the deck
    // will never change so they don't need to be in the state
    this.state = {
      indices: [],
      selected: new Set(),
      set_found: null,
      is_board_shuffled: false
    };

    this.shuffleBoard = this.shuffleBoard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.shuffleBoard();
  }

  shuffleBoard() {
    // reset the state
    this.setState({
      selected: new Set(),
      set_found: null,
      is_board_shuffled: false
    });

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
      set_card_2[0] = (set_card_1[0] + 1)%3;
      set_card_3[0] = (set_card_1[0] + 2)%3;
    }
    if (diff_bit_mask & 2) {
      set_card_2[1] = (set_card_1[1] + 1)%3;
      set_card_3[1] = (set_card_1[1] + 2)%3;
    }
    if (diff_bit_mask & 4) {
      set_card_2[2] = (set_card_1[2] + 1)%3;
      set_card_3[2] = (set_card_1[2] + 2)%3;
    }
    if (diff_bit_mask & 8) {
      set_card_2[3] = (set_card_1[3] + 1)%3;
      set_card_3[3] = (set_card_1[3] + 2)%3;
    }

    // calc the corresponding indices
    let index_1 = 0;
    let index_2 = 0;
    let index_3 = 0;
    let pow_3 = 1;
    for(let i = 0; i < 4; i++) {
      index_1 += set_card_1[i] * pow_3;
      index_2 += set_card_2[i] * pow_3;
      index_3 += set_card_3[i] * pow_3;
      pow_3 *= 3;
    }

    // initialize the indices used for the game board
    // remove the three selected indices, shuffle the rest, and
    // take the first nine indices
    let indices = [...this.cards.keys()];

    swap(indices, 0, index_1);
    swap(indices, 1, index_2);
    swap(indices, 2, index_3);

    for(let i = 3, j=78; i < 12; i++, j--) {
      let index = Math.floor(Math.random() * j) + i;
      swap(indices, i, index);
    }

    let current_indices = indices.slice(0, 12);
    current_indices.sort((a,b) => Math.random() * 2 -1);

    // shuffle the indices
    this.setState({
      indices: current_indices,
      is_board_shuffled: true
    });
  }

  check_set(a, b, c) {
    // get the cards from the shuffled indices
    const card_a = this.cards[this.state.indices[a]];
    const card_b = this.cards[this.state.indices[b]];
    const card_c = this.cards[this.state.indices[c]];

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
  }

  handleClick(i) {
    // if the user has already found a set, lock the board
    if (this.state.set_found)
      return;
    
    // get the newly selected index
    let new_selected = this.state.selected;

    // if card was already selected, then deselect it
    // else if 3 other cards are already selected, simply return
    // else add the card to the selected indices
    if (new_selected.has(i)) {
      new_selected.delete(i);
    } else if (this.state.selected.size === 3) {
      return;
    } else {
      new_selected.add(i);
    }

    // check if a set has been found
    let set_found = null;
    if (new_selected.size === 3) {
      const selected_array = Array.from(new_selected);
      set_found = this.check_set(
        selected_array[0], selected_array[1], selected_array[2]
      );
    }

    // update the state with the new list of selected indices and set found flag
    this.setState({
      selected: new_selected,
      set_found: set_found
    });
  }

  render() {
    // if board hasn't finished shuffling, then return nothing
    if(!this.state.is_board_shuffled) 
      return null;

    // render the board and the shuffle button
    return (
      <div>
        <div className="py-5 bg-light">
          <div className="container">
            <Board
              cards={this.cards}
              indices={this.state.indices}
              selected={this.state.selected}
              set_found={this.state.set_found}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="container text-center pt-4">
            <button 
              className="btn-lg btn-primary" 
              onClick={this.shuffleBoard}
            >
              Shuffle
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
