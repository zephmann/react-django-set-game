import React from "react";
import {DECK, StartCard} from "./Card";

import "../styles.css";


class StartScreen extends React.Component {
  constructor(props) {
    super(props);

    // card dimensions
    // 0 - number, 1 - shape, 2 - color, 3 - fill

    // set up the component's state, the cards in the deck
    // will never change so they don't need to be in the state
    this.state = {
      card_indices: []
    };

    this.initCards = this.initCards.bind(this);
  }

  componentDidMount() {
    this.initCards();
  }

  initCards() {
    // to ensure that at least one set is always present, select a random card
    // and construct a set around it. pick four random values for the four
    // characteristics. then pick a random number 1-15 and use this as bit
    // masking for the characteristics that will be "different" vs "same". 
    // don't use 0 because the cards would be all the same.
    const set_card_1 = [
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 3)
    ];
    let set_card_2 = [...set_card_1];
    let set_card_3 = [...set_card_1];

    const diff_bit_mask = Math.ceil(Math.random() * 15);

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

    this.setState({
      card_indices: [index_1, index_2, index_3, 0, 0, 0]
    });
  }

  start() {
    console.log("starting!");
  }

  render() {
    // if three cards haven't finished shuffling, then return nothing
    if(!this.state.card_indices.length) 
      return null;

    // render the board and the shuffle button
    return (
      <div>
        <section class="jumbotron text-center pb-4 pt-5 m-0">
          <div class="container">
            <h1 class="cursive-font">Chet!</h1>
          </div>
          <div className="container">
            <div className="row">
              <StartCard card={DECK[this.state.card_indices[0]]} />
              <StartCard card={DECK[this.state.card_indices[1]]} />
              <StartCard card={DECK[this.state.card_indices[2]]} />
            </div>
          </div>
        </section>

        <div className="bg-light">
          
          <div className="container text-center pt-4 pb-5">
            <button 
              className="btn-lg btn-primary" 
              onClick={this.shuffleBoard}
            >
              Start!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StartScreen;