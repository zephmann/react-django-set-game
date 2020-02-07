import React from "react";
import {Board, shuffleCards, analyzeSet} from "./Card";


import "../styles.css";


class Practice extends React.Component {
  constructor(props) {
    super(props);

    // card dimensions
    // 0 - number, 1 - shape, 2 - color, 3 - fill
    
    // set up the component's state, the cards in the deck
    // will never change so they don't need to be in the state
    this.state = {
      indices: [],
      selected: [],
      set_indices: [0, 1, 2],
      is_board_shuffled: false,
      set_found: null,
      number: null,
      shape: null,
      color: null,
      size: null,
    };

    this.shuffle = this.shuffle.bind(this);
    this.showSet = this.showSet.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.shuffle();
  }

  shuffle() {
    // reset the state
    this.setState({
      selected: [],
      set_indices: [0, 1, 2],
      is_board_shuffled: false,
      set_found: null,
      number: null,
      shape: null,
      color: null,
      size: null,
    });

    const current_indices = shuffleCards();

    // shuffle the indices
    this.setState({
      indices: current_indices,
      is_board_shuffled: true
    });
  }

  showSet() {
    let set_indices = this.state.set_indices;

    set_indices[2]++;

    while(set_indices[0] < 10) {
      while(set_indices[1] < 11) {
        while(set_indices[2] < 12) {

          // check the set
          let [number, shape, color, size, set_found] = analyzeSet(
            set_indices.map(i => this.state.indices[i])
          );
          
          // if a set was found, update the state and return
          if(set_found) {
            this.setState({
              set_indices: set_indices,
              selected: set_indices,
              set_found: set_found,
              number: number,
              shape: shape,
              color: color,
              size: size,
            });
            return;
          }

          set_indices[2]++;
        }

        set_indices[1]++;
        set_indices[2] = set_indices[1] + 1;
      }

      set_indices[0]++;
      set_indices[1] = set_indices[0] + 1;
      set_indices[2] = set_indices[1] + 1;
    }

    // if we haven't found a set yet
    console.log("RESETTING!");
    set_indices = [0,1,2];

    while(set_indices[0] < 10) {
      while(set_indices[1] < 11) {
        while(set_indices[2] < 12) {

          // check the set
          let [number, shape, color, size, set_found] = analyzeSet(
            set_indices.map(i => this.state.indices[i])
          );
          
          // if a set was found, update the state and return
          if(set_found) {
            this.setState({
              set_indices: set_indices,
              selected: set_indices,
              set_found: set_found,
              number: number,
              shape: shape,
              color: color,
              size: size,
            });
            return;
          }

          set_indices[2]++;
        }

        set_indices[1]++;
        set_indices[2] = set_indices[1] + 1;
      }

      set_indices[0]++;
      set_indices[1] = set_indices[0] + 1;
      set_indices[2] = set_indices[1] + 1;
    }
    
  }

  handleClick(i) {
    // get the newly selected index
    let new_selected = this.state.selected;

    // card was already selected
    const selected_index = new_selected.indexOf(i);
    if (selected_index !== -1) {
      new_selected.splice(selected_index, 1);
    } 

    // new card was selected
    else {
      // if three cards are already selected, pop the first card
      if (new_selected.length === 3)
        new_selected.shift();

      new_selected.push(i);
    }

    if (new_selected.length < 3) {
      this.setState({
        selected: new_selected,
        set_found: null,
        number: null,
        shape: null,
        color: null,
        size: null
      });

      return;
    }
    
    // check if a set has been found
    const [number, shape, color, size, set_found] = analyzeSet(
      new_selected.map(i => this.state.indices[i])
    );

    // update the state with the new list of selected indices and set found flag
    this.setState({
      selected: new_selected,
      set_found: set_found,
      number: number,
      shape: shape,
      color: color,
      size: size,
    });
  }

  render() {
    // if board hasn't finished shuffling, then return nothing
    if(!this.state.is_board_shuffled) 
      return null;

    let dimensions = <div className="container text-center pt-4 cursive-font">
        <h2>Number:</h2>
        <h2>Shape:</h2>
        <h2>Color:</h2>
        <h2>Size:</h2>
      </div>;

    if (this.state.set_found != null) {
      const number_classes = this.state.number !== "NEITHER" ? "true-set" : "false-set";
      const shape_classes = this.state.shape !== "NEITHER" ? "true-set" : "false-set";
      const color_classes = this.state.color !== "NEITHER" ? "true-set" : "false-set";
      const size_classes = this.state.size !== "NEITHER" ? "true-set" : "false-set";
      

      dimensions = <div className="container text-center pt-4 cursive-font">
        <h2 className={number_classes}>Number: {this.state.number}</h2>
        <h2 className={shape_classes}>Shape: {this.state.shape}</h2>
        <h2 className={color_classes}>Color: {this.state.color}</h2>
        <h2 className={size_classes}>Size: {this.state.size}</h2>
      </div>
    }

    // render the board and the shuffle button
    return (
      <div>
        <div className="py-5 bg-light">
          <div className="container">
            <Board
              indices={this.state.indices}
              selected={new Set(this.state.selected)}
              set_found={this.state.set_found}
              onClick={i => this.handleClick(i)}
            />
          </div>
          {dimensions}
          <div className="container text-center pt-4">
            <button 
              className="btn-lg btn-primary mr-1" 
              onClick={this.showSet} >
              HELP
            </button>
            <button 
              className="btn-lg btn-primary ml-1" 
              onClick={this.shuffle} >
              SHUFFLE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Practice;