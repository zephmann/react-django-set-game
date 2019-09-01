import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Card(props) {
  const shape =
    props.card.shape === 0 ? "X" : props.card.shape === 1 ? "O" : "S";
  const card_text = Array(props.card.number + 1).fill(shape);

  let class_names = "card";
  class_names += " color-" + props.card.color;
  class_names += " fill-" + props.card.fill;
  if (props.card.selected) class_names += " selected";

  return (
    <button className={class_names} onClick={props.onClick}>
      {card_text}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const index = this.props.indices[i];
    return (
      <Card
        card={this.props.cards[index]}
        onClick={() => this.props.onClick(index)}
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

    const indices = [...Array(81).keys()].sort((a, b) => Math.random() * 2 - 1);

    const cards = Array.from(Array(81), (x, i) => {
      return {
        number: i % 3,
        color: Math.floor(i / 3) % 3,
        shape: Math.floor(i / 9) % 3,
        fill: Math.floor(i / 27)
      };
    });

    this.state = {
      cards: cards,
      indices: indices
    };

    this.shuffleBoard = this.shuffleBoard.bind(this);
  }

  shuffleBoard() {
    this.setState({
      indices: this.state.indices.sort((a, b) => Math.random() * 2 - 1)
    });
  }

  handleClick(i) {
    console.log(i + " was clicked!");
    this.setState(state => {
      const cards = state.cards.map((item, j) => {
        if (j === i) {
          return {
            number: item.number,
            color: item.color,
            shape: item.shape,
            fill: item.fill,
            selected: !item.selected
          };
        } else {
          return item;
        }
      });
      return {
        cards
      };
    });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            cards={this.state.cards}
            indices={this.state.indices}
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
