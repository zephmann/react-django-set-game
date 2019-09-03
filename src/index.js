import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Card(props) {
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
}

class Board extends React.Component {
  renderSquare(i) {
    // get the card index from the shuffled array
    const index = this.props.indices[i];

    // return the card at the index, pass down the onClick
    // and whether the card is selected or not
    return (
      <Card
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
      set_found: false
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

    this.setState({ sets: sets });
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
    console.log(i + " clicked!");

    let new_selected = this.state.selected;
    if (new_selected.has(i)) {
      new_selected.delete(i);
    } else if (this.state.selected.size === 3) {
      return;
    } else {
      new_selected.add(i);
    }

    this.setState({
      selected: new_selected
    });

    // if 3 selected, check for a set
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            cards={this.cards}
            indices={this.state.indices}
            selected={this.state.selected}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div id="reset-btn">
          <button onClick={this.shuffleBoard}>Shuffle</button>
        </div>
      </div>
    );
  }
}

/*
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Card
        value={this.props.cards[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="board-row">
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: Array(12).fill(null)
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
*/

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function compare_sets(set_a, set_b) {
  if (set_a.size !== set_b.size) return false;

  for (var a of set_a) if (!set_b.has(a)) return false;

  return true;
}
