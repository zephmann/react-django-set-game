import React from "react";
import {Board, shuffleCards, checkSet} from "./Card";


import "../styles.css";


const TIME_LIMIT = 60;


class Game extends React.Component {
  constructor(props) {
    super(props);

    // card dimensions
    // 0 - number, 1 - shape, 2 - color, 3 - fill
    
    // set up the component's state, the cards in the deck
    // will never change so they don't need to be in the state
    this.state = {
      indices: [],
      selected: new Set(),
      set_found: null,
      is_board_shuffled: false,
      timer: -1,
      num_found: -1,
      num_skipped: -1
    };

    this.shuffle = this.shuffle.bind(this);
    this.onSkipped = this.onSkipped.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    console.log("component did mount! resetting!");

    this.shuffle();

    this.setState({
      timer: TIME_LIMIT,
      num_found: 0,
      num_skipped: 0
    });

    setTimeout(this.tick, 1000);
  }

  shuffle() {
    // reset the state
    this.setState({
      selected: new Set(),
      is_board_shuffled: false,
      set_found: null,
    });

    const current_indices = shuffleCards();

    // shuffle the indices
    this.setState({
      indices: current_indices,
      is_board_shuffled: true
    });
  }

  tick() {
    const next_tick = this.state.timer - 1;

    this.setState({
      timer: next_tick
    });

    if (next_tick)
      setTimeout(this.tick, 1000);
    else
      this.props.onGameFinished(this.state.num_found, this.state.num_skipped);
  }

  onSkipped() {
    this.shuffle();

    this.setState({
      num_skipped: this.state.num_skipped + 1
    });
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
    } else if (this.state.selected.length === 3) {
      return;
    } else {
      new_selected.add(i);
    }

    // check if a set has been found
    let set_found = null;
    let num_found = this.state.num_found;
    if (new_selected.size === 3) {
      const selected_array = Array.from(new_selected);
      set_found = checkSet(selected_array.map(i => this.state.indices[i]));

      if(set_found) {
        num_found++;
        setTimeout(this.shuffle, 250);
      }
    }

    // update the state with the new list of selected indices and set found flag
    this.setState({
      selected: new_selected,
      set_found: set_found,
      num_found: num_found
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
            <h2>Timer: {this.state.timer}</h2>
            <h2>Score: {this.state.num_found}</h2>
            <h2>Skipped: {this.state.num_skipped}</h2>
          </div>
          <div className="container">
            <Board
              indices={this.state.indices}
              selected={this.state.selected}
              set_found={this.state.set_found}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="container text-center pt-4">
            <button 
              className="btn-lg btn-warning" 
              onClick={this.onSkipped} >
              SKIP
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;