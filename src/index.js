import React from "react";
import ReactDOM from "react-dom";
import Board from "./components/Board"

import "./styles.css";

function SetJumbotron(props) {
  if (props.set_found === null)
    return null;

  const jumbo_text = props.set_found ? "you found a chet!" : "nope, not a chet";
  const jumbo_class = props.set_found ? "true-set" : "false-set";

  return (
    <section className="jumbotron text-center m-0 py-4">
      <div className="container">
        <h2 className={jumbo_class}>{jumbo_text}</h2>
      </div>
    </section>
  );
};

class Game extends React.Component {
  constructor(props) {
    super(props);

    // construct all of the cards in the deck
    // 0 - number, 1 - shape, 2 - color, 3 - fill
    // use arrays to make it easier to check for sets
    this.cards = Array.from(Array(81), (x, i) => {
      return this.index_to_card(i);
    });

    // initialize the indices used for the game board
    const current_indices = [...Array(81).keys()].sort(
      (a, b) => Math.random() * 2 - 1
    );

    // set up the component's state, the cards in the deck
    // will never change so they don't need to be in the state
    this.state = {
      indices: current_indices,
      selected: new Set(),
      set_found: null
    };

    // find all of the possible sets in the current cards
    let sets = this.compile_sets();

    // ensure a set is present in the cards

    this.setState({ sets: sets });

    this.shuffleBoard = this.shuffleBoard.bind(this);
  }

  shuffleBoard() {
    // shuffle the indices
    this.setState({
      indices: this.state.indices.sort((a, b) => Math.random() * 2 - 1),
      selected: new Set()
    });

    // find all of the possible sets in the current cards
    let sets = this.compile_sets();

    // ensure a set is present in the cards

    this.setState({ 
      sets: sets,
      set_found: null
    });
  }

  index_to_card(index) {
    return [
      index % 3,
      Math.floor(index / 3) % 3,
      Math.floor(index / 9) % 3,
      Math.floor(index / 27)
    ];
  }

  card_to_index(card) {
    return card[3] * 27 + card[2] * 9 + card[1] * 3 + card[0];
  }

  compile_sets() {
    // iterate through all shuffled indices
    // checking if there are any sets present
    let sets = [];
    for (let k = 2; k < 12; k++) {
      for (let j = 1; j < k; j++) {
        for (let i = 0; i < j; i++) {
          if (this.check_set(i, j, k)) {
            console.log([i, j, k]);
            sets.push(new Set([i, j, k]));
          }
        }
      }
    }

    return sets;
  }

  check_set(a, b, c) {
    // get the cards from the shuffled indices
    const card_a = this.cards[this.state.indices[a]];
    const card_b = this.cards[this.state.indices[b]];
    const card_c = this.cards[this.state.indices[c]];

    // check all the dimenions of differences in the cards
    // for all the same, the differences will be 0, for all
    // different, the differences will be in (-2, -1, 1, 2).
    // use Boolean to convert all non-zero values
    // to 1 to compare
    for (let i = 0; i < 4; i++) {
      // check the difference between the 3 cards
      const dif_ab = Boolean(card_a[i] - card_b[i]);
      const dif_bc = Boolean(card_b[i] - card_c[i]);
      const dif_ca = Boolean(card_c[i] - card_a[i]);

      // ensure either all are non-zero or all are zero
      if (dif_ab !== dif_bc || dif_bc !== dif_ca || dif_ca !== dif_ab)
        return false;
    }

    return true;
  }

  handleClick(i) {

    if (this.state.set_found)
      return;
    
    let new_selected = this.state.selected;
    if (new_selected.has(i)) {
      new_selected.delete(i);
    } else if (this.state.selected.size === 3) {
      return;
    } else {
      new_selected.add(i);
    }

    let set_found = null;
    if (new_selected.size === 3) {
      const selected_array = Array.from(new_selected);
      set_found = this.check_set(
        selected_array[0], selected_array[1], selected_array[2]
      );
    }

    this.setState({
      selected: new_selected,
      set_found: set_found
    });
  }

  render() {
    return (
      <div>
        <SetJumbotron set_found={this.state.set_found} />
        <div className="py-5 bg-light">
          <div className="container">
            <Board
              cards={this.cards}
              indices={this.state.indices}
              selected={this.state.selected}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="container text-center pt-4">
            <button className="btn-lg btn-primary" onClick={this.shuffleBoard}>Shuffle</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
